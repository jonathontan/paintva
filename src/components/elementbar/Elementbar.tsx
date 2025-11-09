import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import colors from "../../colors";
import constants from "../../constants";
import elementStore, { ToolType } from "../../stores/ElementStore";
import layerStore from "../../stores/LayerStore";
import styles from "./Elementbar.module.css";

const Elementbar = observer(() => {
  const { selectedElement, setElement } = elementStore;
  const { layers, addLayer } = layerStore;

  const handleToggle = (type: ToolType) => {
    if (selectedElement === type)
      setElement('none');
    else setElement(type);
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const image = files[0];
    const imageUrl = URL.createObjectURL(image);

    addLayer({
      id: String(layers.length + 1),
      type: 'image',
      src: imageUrl
    })
  }

  return (
    <div className={styles.container}>
      <Typography fontSize={30} className={styles.title}>Paintva</Typography>
      {constants.elements.map((element) => {
        const style = {
          color: selectedElement === element.type ? colors.teal : colors.green,
          ':hover': { color: colors.teal }
        }
        return (
          element.type === 'image' ? (
            <IconButton
              key={element.type}
              component="label"
              role={undefined}
              tabIndex={-1}
              sx={style}
            >
              <Icon icon={element.icon} fontSize={30} />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </IconButton>
          ) : (
            <IconButton key={element.type}
              sx={style}
              onClick={() => handleToggle(element.type)}>
              <Icon icon={element.icon} fontSize={30} />
            </IconButton>)
        )
      })}
    </div>
  )
})

export default Elementbar;