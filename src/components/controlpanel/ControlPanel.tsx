import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Group, Layer, Rect, Text, } from "react-konva";
import { Html } from "react-konva-utils";
import colors from "../../colors";
import constants from "../../constants";
import elementStore, { ShapeType } from "../../stores/ElementStore";
import ColorPicker from "../colorpicker/ColorPicker";

const ControlPanel = observer(() => {
  const { selectedElement, selectedShape, setShape } = elementStore;
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 20, y: 20 })

  const handleShapeToggle = (type: ShapeType) => {
    if (selectedShape === type)
      setShape('none')
    else setShape(type)
  }

  return (
    <Layer>
      <Group
        draggable
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
          height={220}
          fill={colors.lblue}
          stroke={colors.black}
          strokeWidth={5}
          cornerRadius={5}
        />
        <Text
          text="Shape Tool"
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
        </Html>
      </Group>
    </Layer>
  )
})

export default ControlPanel;