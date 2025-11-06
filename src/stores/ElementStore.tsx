import { makeAutoObservable } from "mobx";
import colors from "../colors";

export type ToolType = 'brush' | 'shape' | 'fill' | 'eraser'| 'none';
export type ShapeType = 'circle' | 'rect' | 'none';

class ElementStore {
  selectedElement: ToolType = 'none';
  selectedColor: string = colors.white;
  selectedShape: ShapeType = 'circle';

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
}

const elementStore = new ElementStore();
export default elementStore;