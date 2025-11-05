import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Group, Layer, Rect, Circle, Stage, Text, } from "react-konva";
import colors from "../../colors";
import elementStore from "../../stores/ElementStore";
import ColorPicker from "../colorpicker/ColorPicker";
import styles from "./ControlPanel.module.css";

const ControlPanel = observer(() => {
  const { selectedElement, selectedShape, setShape } = elementStore;
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 20, y: 20 })

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
            <Group
              visible={selectedElement === 'shape'}
            >
              <Rect
                width={50}
                height={30}
                stroke={colors.black}
                x={25}
                y={100}
                onMouseOver={(e) => e.target.getStage()?.container().style.setProperty("cursor", "pointer")}
                onMouseLeave={(e) => e.target.getStage()?.container().style.setProperty("cursor", "default")}
                onClick={() => setShape('rect')}
              />
              <Circle
                radius={20}
                stroke={colors.black}
                x={50}
                y={175}
                onMouseOver={(e) => e.target.getStage()?.container().style.setProperty("cursor", "pointer")}
                onMouseLeave={(e) => e.target.getStage()?.container().style.setProperty("cursor", "default")}
                onClick={() => setShape('circle')}
              />
            </Group>
          </Group>
        </Layer>
      </Stage>
      <ColorPicker position={position} />
    </div>
  )
})

export default ControlPanel;