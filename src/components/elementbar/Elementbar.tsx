import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import colors from "../../colors";
import elementStore from "../../stores/ElementStore";
import styles from "./Elementbar.module.css";

const Elementbar = observer(() => {
  const { selectedElement, setElement } = elementStore;

  return (
    <div className={styles.container}>
      <Typography fontSize={30} className={styles.title}>Paintva</Typography>
      <IconButton
        sx={{
          color: selectedElement === 'brush' ? colors.teal : colors.green,
          ':hover': { color: colors.teal }
        }}
        onClick={() => setElement('brush')}>
        <Icon icon={"material-symbols:brush"} fontSize={30} />
      </IconButton>
      <IconButton
        sx={{
          color: selectedElement === 'shape' ? colors.teal : colors.green,
          ':hover': { color: colors.teal }
        }}
        onClick={() => setElement('shape')}>
        <Icon icon={"fluent:shapes-28-regular"} fontSize={30} />
      </IconButton>
      <IconButton
        sx={{
          color: selectedElement === 'fill' ? colors.teal : colors.green,
          ':hover': { color: colors.teal }
        }} onClick={() => setElement('fill')}>
        <Icon icon={"fluent:paint-bucket-24-filled"} fontSize={30} />
      </IconButton>
    </div>
  )
})

export default Elementbar;