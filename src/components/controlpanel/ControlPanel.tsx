import { Icon } from "@iconify/react";
import { IconButton, Slider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { MutableRefObject, useState } from "react";
import { Group, Layer, Rect, Text, } from "react-konva";
import { Html } from "react-konva-utils";
import colors from "../../colors";
import constants, { shapeToolsType } from "../../constants";
import elementStore, { BrushType, ShapeType } from "../../stores/ElementStore";
import ColorPicker from "../colorpicker/ColorPicker";

interface Props {
  isDrawing: MutableRefObject<boolean>;
}

const ControlPanel = observer(({ isDrawing }: Props) => {
  const {
    selectedElement,
    selectedShape, shapeWidth, shapeHeight, shapeFill, setShape, setShapeWidth, setShapeHeight,
    selectedBrush, brushStrokeWidth, setBrush, setBrushStrokeWidth
  } = elementStore;
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 20, y: 20 })
  const [showStrokeSlider, setShowStrokeSlider] = useState<boolean>(false);
  const [selectedShapeAction, setSelectedShapeAction] = useState<shapeToolsType>('none')
  const [showWidthSlider, setShowWidthSlider] = useState<boolean>(false);
  const [showHeightSlider, setShowHeightSlider] = useState<boolean>(false);
  const height = selectedElement === 'brush' ? 150 : selectedElement === 'shape' ? 390 : 100

  const handleShapeToggle = (type: ShapeType) => {
    if (selectedShape === type)
      setShape('none');
    else setShape(type);
  };

  const handleStrokeWidthToggle = (type: BrushType) => {
    if (selectedBrush === type) {
      setBrush('none');
      setShowStrokeSlider(false);
    }
    else {
      setBrush('stroke');
      setShowStrokeSlider(true);
    }
  };

  const handleShapeActionToggle = (type: shapeToolsType) => {
    if (selectedShapeAction === type) {
      setSelectedShapeAction('none');
      setShowWidthSlider(false);
      setShowHeightSlider(false);
    } else {
      setSelectedShapeAction(type);
      setShowWidthSlider(type === 'shapeWidth');
      setShowHeightSlider(type === 'shapeHeight');
    }
  };

  const handleSliderChange = (_e: Event, type: string, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue

    switch (type) {
      case 'brushStrokeWidth':
        setBrushStrokeWidth(value)
        break;
      case 'shapeWidth':
        setShapeWidth(value)
        break;
      case 'shapeHeight':
        setShapeHeight(value)
        break;
    };
  };

  return (
    <Layer>
      <Group
        draggable
        onMouseMove={() => isDrawing.current = false}
        x={position.x}
        y={position.y}
        visible={selectedElement !== 'eraser' && selectedElement !== 'none'}
        onDragMove={(e) => setPosition({
          x: e.target.position().x,
          y: e.target.position().y
        })}
      >
        <Rect
          width={100}
          height={height}
          fill={colors.lblue}
          stroke={colors.black}
          strokeWidth={5}
          cornerRadius={5}
        />
        <Text
          text={selectedElement.toUpperCase().charAt(0) + selectedElement.slice(1) + ' Tool'}
          fontSize={14}
          fontFamily="Finger Paint, sans-serif"
          x={10}
          y={10}
        />
        <Html>
          <ColorPicker type="color" top={40} left={30} />
          {selectedElement === 'shape' &&
            constants.shapes.map(({ type, icon }, index) => (
              <IconButton
                key={type}
                sx={{
                  position: 'absolute',
                  top: 80 + (index * 60),
                  left: 15,
                  zIndex: 11,
                  color: selectedShape === type ? colors.dwhite : colors.black
                }}
                onClick={() => handleShapeToggle(type)}
              >
                <Icon icon={icon} fontSize={50} />
              </IconButton>
            ))}
          {selectedElement === 'shape' && (
            <>
              {constants.shapeTools.map(({ type, icon }, index) => (
                <IconButton
                  key={index}
                  sx={{
                    position: 'absolute',
                    top: 205 + index * 60,
                    left: 20,
                    zIndex: 11,
                    color: type === 'shapeFill' ? shapeFill : selectedShapeAction === type ? colors.dwhite : colors.black
                  }}
                  onClick={() => {
                    if (type !== 'shapeFill') handleShapeActionToggle(type)
                  }}
                >
                  <Icon icon={icon} fontSize={40} />
                </IconButton>
              ))}
              {showWidthSlider && (
                <Slider
                  aria-label="Shape Width"
                  orientation="vertical"
                  valueLabelDisplay="auto"
                  value={shapeWidth}
                  onChange={(e, value) => handleSliderChange(e, 'shapeWidth', value)}
                  min={1}
                  max={window.innerWidth - 10}
                  marks={false}
                  sx={{
                    color: colors.teal,
                    position: 'absolute',
                    top: 0,
                    left: 100,
                    width: 10,
                    height: height - 5,
                    zIndex: 12
                  }}
                />
              )}
              {showHeightSlider && (
                <Slider
                  aria-label="Shape Height"
                  orientation="vertical"
                  valueLabelDisplay="auto"
                  value={shapeHeight}
                  onChange={(e, value) => handleSliderChange(e, 'shapeHeight', value)}
                  min={1}
                  max={window.innerHeight - 10}
                  marks={false}
                  sx={{
                    color: colors.teal,
                    position: 'absolute',
                    top: 0,
                    left: 100,
                    width: 10,
                    height: height - 5,
                    zIndex: 12
                  }}
                />
              )}
              <ColorPicker type="fill" top={335} left={30} />
            </>
          )}
          {selectedElement === 'brush' && (
            <>
              <IconButton sx={{
                position: 'absolute',
                top: 80,
                left: 15,
                color: selectedBrush === 'stroke' ? colors.dwhite : colors.black
              }}
                onClick={() => handleStrokeWidthToggle('stroke')}
              >
                <Icon icon='fluent:ink-stroke-20-filled' fontSize={50} />
              </IconButton>
              {showStrokeSlider && (
                <Slider
                  aria-label="Stroke Width"
                  orientation="vertical"
                  valueLabelDisplay="auto"
                  value={brushStrokeWidth}
                  defaultValue={0}
                  onChange={(e, value) => handleSliderChange(e, 'brushStrokeWidth', value)}
                  min={1}
                  max={50}
                  marks={false}
                  sx={{
                    color: colors.teal,
                    position: 'absolute',
                    top: 0,
                    left: 100,
                    width: 10,
                    height: height - 5,
                    zIndex: 12
                  }}
                />
              )}
            </>
          )}
        </Html>
      </Group>
    </Layer>
  )
})

export default ControlPanel;