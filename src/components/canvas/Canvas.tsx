import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Line, Rect, Stage } from "react-konva";
import elementStore from "../../stores/ElementStore";
import layerStore from "../../stores/LayerStore";
import ControlPanel from "../controlpanel/ControlPanel";
import KonvaImage from "../konvaimage/KonvaImage";
import LayerPanel from "../layerpanel/LayerPanel";
import styles from "./Canvas.module.css";

const Canvas = observer(() => {
  const { selectedElement, selectedColor, selectedShape, brushStrokeWidth,
    shapeWidth, shapeHeight, shapeFill, setShape } = elementStore;
  const { layers, selectedLayer, addLayer, setBrushPoints, setSelectedLayer, setMoveToTop } = layerStore;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [stageDimension, setStageDimension] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
  const [brushLineId, setBrushLineId] = useState<string>('')
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    if (canvasRef.current) {
      setStageDimension({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight
      });
    }
  }, []);

  const handleCanvasClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedLayer = e.target.getAttrs();
    if (selectedLayer?.id !== clickedLayer.id)
      setSelectedLayer(String(clickedLayer.id));

    if (selectedShape === 'none' && selectedElement !== 'fill') return;

    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!pointer) return

    if (selectedElement === 'shape') {
      addLayer({
        id: String(layers.length + 1),
        type: 'shape',
        color: selectedColor,
        shape: selectedShape,
        fill: shapeFill,
        width: shapeWidth,
        height: shapeHeight,
        x: pointer.x,
        y: pointer.y
      });
      setShape('none')
    } else {
      addLayer({
        id: String(layers.length + 1),
        type: 'fill',
        color: selectedColor
      });
    }
  }

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedElement !== 'brush' && selectedElement !== 'eraser') return;

    isDrawing.current = true;
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!pointer) return

    if (selectedElement === 'brush' || selectedElement === 'eraser') {
      const id = String(layers.length + 1)
      addLayer({
        id: id,
        type: 'brush',
        color: selectedColor,
        points: [pointer.x, pointer.y],
        strokeWidth: brushStrokeWidth,
        isEraser: selectedElement === 'eraser'
      });
      setBrushLineId(id);
      isDrawing.current = true;
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!pointer) return;

    setBrushPoints(brushLineId, pointer)
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setBrushLineId('');
  };

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    console.log(id)
    if (selectedLayer?.id !== id)
      setSelectedLayer(String(id));

    setMoveToTop(String(id))
  };

  return (
    <div ref={canvasRef} className={styles.canvas}>
      <Stage
        width={stageDimension.width}
        height={stageDimension.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
        onDragStart={handleDragStart}
      >
        {layers.map(layer => (
          <Layer key={layer.id}>
            {layer.type === 'shape' && layer.shape === 'rect' && (
              <Rect id={layer.id} x={layer.x} y={layer.y} width={layer.width} height={layer.height} stroke={layer.color} fill={layer.fill} draggable />
            )}
            {layer.type === 'shape' && layer.shape === 'circle' && (
              <Circle id={layer.id} x={layer.x} y={layer.y} radius={layer.width} stroke={layer.color} fill={layer.fill} draggable />
            )}
            {layer.type === 'fill' && (
              <Rect id={layer.id} width={stageDimension.width} height={stageDimension.height} fill={layer.color} />
            )}
            {layer.type === 'image' && layer.src && (
              <KonvaImage id={layer.id} src={layer.src} />
            )}
          </Layer>
        ))}
        <Layer>
          {layers.map(layer => (
            <Line
              key={layer.id}
              id={layer.id}
              points={layer.points}
              stroke={layer.color}
              strokeWidth={layer.strokeWidth}
              lineCap="round"
              lineJoin="round"
              draggable={!layer.isEraser}
              globalCompositeOperation={
                layer.isEraser ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
        <LayerPanel />
        <ControlPanel isDrawing={isDrawing} />
      </Stage>
    </div>
  )
})

export default Canvas;