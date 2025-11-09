import { observer } from "mobx-react-lite";
import elementStore from "../../stores/element/elementStore";
import styles from "./ColorPicker.module.css";
import { Icon } from "@iconify/react";

interface Props {
  type: string
  top: number,
  left: number
}

const ColorPicker = observer(({ type, top, left }: Props) => {
  const { selectedElement, selectedColor, shapeFill, setColor, setShapeFill } = elementStore;

  return (
    <>
      <input
        className={styles.input}
        hidden={selectedElement === 'eraser' || selectedElement === 'none' || selectedElement === 'image'}
        type="color"
        value={type === 'color' ? selectedColor : shapeFill}
        onChange={(e) => type === 'color' ? setColor(e.target.value) : setShapeFill(e.target.value)}
        style={{
          top: top,
          left: left,
          opacity: type === 'color' ? 1 : 0,
          zIndex: 11
        }}
      />
      {type === 'color' && (
        <Icon
          icon="mingcute:color-picker-fill"
          className={styles.icon}
          style={{
            visibility: selectedElement === 'eraser' || selectedElement === 'none' ? 'hidden' : 'visible',
          }}
        />
      )}
    </>
  )
})
export default ColorPicker;