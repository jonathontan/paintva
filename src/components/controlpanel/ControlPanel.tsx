import { Icon } from "@iconify/react";
import { IconButton, Slider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { MutableRefObject, useState } from "react";
import { Group, Layer, Rect, Text, } from "react-konva";
import { Html } from "react-konva-utils";
import colors from "../../colors";
import constants from "../../constants";
import elementStore, { BrushType, ShapeType } from "../../stores/ElementStore";
import ColorPicker from "../colorpicker/ColorPicker";

interface Props {
  isDrawing: MutableRefObject<boolean>;
}

const ControlPanel = observer(({ isDrawing }: Props) => {
  const { selectedElement, selectedShape, selectedBrush, brushStrokeWidth, setShape, setBrush, setBrushStrokeWidth } = elementStore;
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 20, y: 20 })
  const [showStrokeSlider, setShowStrokeSlider] = useState<boolean>(false);

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

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue
    setBrushStrokeWidth(value);
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
          height={selectedElement === 'brush' ?
            150 : selectedElement === 'shape' ? 220 : 100}
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
          <ColorPicker />
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
                  onChange={handleSliderChange}
                  min={1}
                  max={50}
                  marks={false}
                  sx={{
                    color: colors.teal,
                    position: 'absolute',
                    top: 10,
                    left: 100,
                    width: 10,
                    height: 200,
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