import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Group, Layer, Rect, Text } from "react-konva";
import { Html } from "react-konva-utils";
import colors from "../../colors";
import constants from "../../constants";
import layerStore from "../../stores/LayerStore";
import styles from "./LayerPanel.module.css";

const LayerPanel = observer(() => {
  const { layers, selectedLayer, setSelectedLayer, removeLayer } = layerStore;

  return (
    <Layer>
      <Group
        draggable
        x={window.innerWidth - 220}
        y={20}
      >
        <Rect
          width={150}
          height={200}
          fill={colors.lblue}
          stroke={colors.black}
          strokeWidth={5}
          cornerRadius={5}
        />
        <Text
          text="Layers"
          fontSize={14}
          fontFamily="Finger Paint, sans-serif !important"
          x={10}
          y={10}
        />
        <Html>
          <>
            <div className={styles.container}>
              {[...layers].sort((a, b) => Number(a.id) - Number(b.id)).map(layer => (
                <div
                  key={layer.id}
                  className={`${styles.card} ${selectedLayer?.id === layer.id && styles.selectedCard}`}
                  onClick={() => setSelectedLayer(layer.id)}
                >
                  <Icon
                    icon={constants.elements
                      .find(element => element.type === layer.type)?.icon
                      || "solar:layers-bold"}
                    fontSize={25}
                  />
                  Layer {layer.id}
                </div>
              ))}

            </div>
            <IconButton
              disabled={selectedLayer === null}
              size="small"
              className={styles.delete}
              sx={{
                color: colors.black
              }}
              onClick={() => {
                if (selectedLayer) removeLayer(selectedLayer.id)}
              }>
              <Icon icon="material-symbols:delete-outline" fontSize={20} />
            </IconButton>
          </>
        </Html>
      </Group>
    </Layer>
  )
})

export default LayerPanel;