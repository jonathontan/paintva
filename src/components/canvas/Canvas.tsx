import { useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";
import ControlPanel from "../controlpanel/ControlPanel";
import LayerPanel from "../layerpanel/LayerPanel";
import styles from "./Canvas.module.css";

const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [stageDimension, setStageDimension] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    if (canvasRef.current) {
      setStageDimension({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight
      });
    }
  }, [])

  return (
    <div ref={canvasRef} className={styles.canvas}>
      <Stage
        width={stageDimension.width}
        height={stageDimension.height}
      >
        <ControlPanel />
        <LayerPanel />
      </Stage>
    </div>
  )
}

export default Canvas;