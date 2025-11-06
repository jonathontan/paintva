import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import elementStore, { ToolType } from "../../stores/ElementStore";
import ControlPanel from "../controlpanel/ControlPanel";
import LayerPanel from "../layerpanel/LayerPanel";
import styles from "./Canvas.module.css";

const Canvas = observer(() => {
  const { selectedElement, selectedColor, brushStrokeWidth } = elementStore;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [stageDimension, setStageDimension] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
  const [brushLines, setBrushLines] = useState<{
    type: ToolType,
    color: string,
    width: number,
    points: number[]
  }[]>([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (canvasRef.current) {
      setStageDimension({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight
      });
    }
  }, []);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (pointer) {
      const newLine = {
        type: selectedElement,
        color: selectedColor,
        width: brushStrokeWidth,
        points: [pointer.x, pointer.y]
      }
      setBrushLines(prev => [...prev, newLine])
    };
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    const lastLine = brushLines[brushLines.length - 1];

    if (pointer)
      lastLine.points = lastLine.points.concat([pointer?.x, pointer.y]);
    brushLines.splice(brushLines.length - 1, 1, lastLine);
    setBrushLines(brushLines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div ref={canvasRef} className={styles.canvas}>
      <Stage
        width={stageDimension.width}
        height={stageDimension.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {brushLines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.width}
              globalCompositeOperation={
                line.type === 'eraser' ? 'destination-out' : 'source-over'
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