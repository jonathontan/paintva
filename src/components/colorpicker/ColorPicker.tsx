import { observer } from "mobx-react-lite";
import elementStore from "../../stores/ElementStore";
import styles from "./ColorPicker.module.css";
import { Icon } from "@iconify/react";

interface Props {
  position: { x: number, y: number }
}

const ColorPicker = observer(({ position }: Props) => {
  const { selectedElement, selectedColor, setColor } = elementStore;

  return (
    <>
      <input
        className={styles.input}
        hidden={selectedElement === 'eraser' || selectedElement === 'none'}
        type="color"
        value={selectedColor}
        onChange={(e) => setColor(e.target.value)}
        style={{
          top: position.y + 40,
          left: position.x + 30,
        }}
      />
      <Icon
        icon="mingcute:color-picker-fill"
        className={styles.icon}
        style={{
          top: position.y + 40,
          left: position.x + 55,
          visibility: selectedElement === 'eraser' || selectedElement === 'none' ? 'hidden' : 'visible'
        }}
      />
    </>
  )
})
export default ColorPicker;