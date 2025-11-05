import { useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";
import styles from "./Canvas.module.css";

const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [stageDimension, setStageDimension] = useState<Record<string, number>>({ width: 0, height: 0 })

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
      />
    </div>
  )
}

export default Canvas;