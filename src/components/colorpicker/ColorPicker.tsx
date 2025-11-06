import { observer } from "mobx-react-lite";
import elementStore from "../../stores/ElementStore";
import styles from "./ColorPicker.module.css";
import { Icon } from "@iconify/react";

const ColorPicker = observer(() => {
  const { selectedElement, selectedColor, setColor } = elementStore;

  return (
    <>
      <input
        className={styles.input}
        hidden={selectedElement === 'eraser' || selectedElement === 'none'}
        type="color"
        value={selectedColor}
        onChange={(e) => setColor(e.target.value)}
      />
      <Icon
        icon="mingcute:color-picker-fill"
        className={styles.icon}
        style={{
          visibility: selectedElement === 'eraser' || selectedElement === 'none' ? 'hidden' : 'visible'
        }}
      />
    </>
  )
})
export default ColorPicker;