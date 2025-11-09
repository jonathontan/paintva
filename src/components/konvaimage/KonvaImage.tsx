import { Image } from "react-konva";
import { useImage } from "react-konva-utils";

interface Props {
  id: string
  src: string
}

const KonvaImage = ({ id, src }: Props) => {
  const [image] = useImage(src, 'anonymous');

  return <Image id={id} image={image} x={0} y={0} draggable />
}

export default KonvaImage;