import { makeAutoObservable } from "mobx";
import colors from "../colors";

type ToolType = 'brush' | 'shape' | 'fill' | 'none';
type ShapeType = 'circle' | 'rect';

class ElementStore {
  selectedElement: ToolType = 'none';
  selectedColor: string = colors.black;
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