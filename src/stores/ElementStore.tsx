import { makeAutoObservable } from "mobx";
import colors from "../colors";

export type ToolType = 'brush' | 'shape' | 'fill' | 'eraser'| 'none';
export type ShapeType = 'circle' | 'rect' | 'none';
export type BrushType = 'stroke' | 'none'

class ElementStore {
  selectedElement: ToolType = 'none';
  selectedColor: string = colors.black;
  selectedShape: ShapeType = 'none';
  selectedBrush: BrushType = 'none';
  brushStrokeWidth: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setElement = (tool: ToolType) => {
    this.selectedElement = tool;
  }

  setColor = (color: string) => {
    this.selectedColor = color;
  }

  setShape = (shape: ShapeType) => {
    this.selectedShape = shape;
  }

  setBrush = (brush: BrushType) => {
    this.selectedBrush = brush;
  }

  setBrushStrokeWidth = (stroke: number) => {
    this.brushStrokeWidth = stroke;
  }
}

const elementStore = new ElementStore();
export default elementStore;