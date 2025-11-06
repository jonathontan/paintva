import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Group, Layer, Rect, Stage, Text, } from "react-konva";
import colors from "../../colors";
import constants from "../../constants";
import elementStore, { ShapeType } from "../../stores/ElementStore";
import ColorPicker from "../colorpicker/ColorPicker";
import styles from "./ControlPanel.module.css";

const ControlPanel = observer(() => {
  const { selectedElement, selectedShape, setShape } = elementStore;
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 20, y: 20 })

  const handleShapeToggle = (type: ShapeType) => {
    if (selectedShape === type)
      setShape('none')
    else setShape(type)
  }

  return (
    <div className={styles.container}>
      <Stage width={window.innerWidth} height={window.innerHeight - 50}>
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
          </Group>
        </Layer>
      </Stage>
      <ColorPicker position={position} />
      {selectedElement === 'shape' &&
        constants.shapes.map(({ type, icon }, index) => (
          <IconButton
            key={type}
            sx={{
              position: 'absolute',
              top: position.y + 80 + (index * 60),
              left: position.x + 15,
              zIndex: 11,
              color: selectedShape === type ? colors.dwhite : colors.black
            }}
            onClick={() => handleShapeToggle(type)}
          >
            <Icon icon={icon} fontSize={50} />
          </IconButton>
        ))}
    </div>
  )
})

export default ControlPanel;