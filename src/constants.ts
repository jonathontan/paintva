import { ShapeType, ToolType } from "./stores/ElementStore";

const elements: {
  type: ToolType,
  icon: string
}[] = [
    { type: 'brush', icon: 'material-symbols:brush' },
    { type: 'shape', icon: 'fluent:shapes-28-regular' },
    { type: 'fill', icon: 'fluent:paint-bucket-24-filled' },
    { type: 'eraser', icon: 'solar:eraser-bold-duotone' },
  ]

  const shapes: {
    type: ShapeType,
    icon: string
  }[] = [
    { type: 'rect', icon: "material-symbols-light:rectangle-outline" },
    { type: 'circle', icon: "material-symbols-light:circle-outline" }
  ]

export default { elements, shapes };