import { ShapeType, ToolType } from "./stores/ElementStore";

export type shapeToolsType = 'shapeWidth' | 'shapeHeight' | 'shapeFill' | 'none';

const elements: {
  type: ToolType,
  icon: string
}[] = [
    { type: 'brush', icon: 'material-symbols:brush' },
    { type: 'shape', icon: 'fluent:shapes-28-regular' },
    { type: 'fill', icon: 'fluent:paint-bucket-24-filled' },
    { type: 'eraser', icon: 'solar:eraser-bold-duotone' },
    { type: 'image', icon: 'mdi-light:image' }
  ]

const shapes: {
  type: ShapeType,
  icon: string
}[] = [
    { type: 'rect', icon: "material-symbols-light:rectangle-outline" },
    { type: 'circle', icon: "material-symbols-light:circle-outline" }
  ]

const shapeTools: {
  type: shapeToolsType,
  icon: string
}[] = [
    { type: 'shapeWidth', icon: "carbon:fit-to-width" },
    { type: 'shapeHeight', icon: "carbon:fit-to-height"},
    { type: 'shapeFill', icon: "fluent:paint-bucket-24-filled"}
  ]

export default { elements, shapes, shapeTools };