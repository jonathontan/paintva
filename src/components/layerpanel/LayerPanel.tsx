import { observer } from "mobx-react-lite";
import { Group, Layer, Rect, Text } from "react-konva";
import colors from "../../colors";
import layerStore from "../../stores/LayerStore";

const LayerPanel = observer(() => {
  const { layers } = layerStore;

  return (
    <Layer>
      <Group
        draggable
        x={window.innerWidth - 120}
        y={20}
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
          text="Layers"
          fontSize={14}
          fontFamily="Finger Paint, sans-serif"
          x={10}
          y={10}
        />
      </Group>
    </Layer>
  )
})

export default LayerPanel;