import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import colors from "../../colors";
import constants from "../../constants";
import elementStore from "../../stores/ElementStore";
import styles from "./Elementbar.module.css";

const Elementbar = observer(() => {
  const { selectedElement, setElement } = elementStore;

  return (
    <div className={styles.container}>
      <Typography fontSize={30} className={styles.title}>Paintva</Typography>
      {constants.elements.map(element => (
        <IconButton key={element.type}
          sx={{
            color: selectedElement === element.type ? colors.teal : colors.green,
            ':hover': { color: colors.teal }
          }}
          onClick={() => setElement(element.type)}>
          <Icon icon={element.icon} fontSize={30} />
        </IconButton>
      ))}
    </div>
  )
})

export default Elementbar;