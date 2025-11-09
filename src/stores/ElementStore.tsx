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

  brushArray: [] = [];
  brushStrokeWidth: number = 1;

  shapeWidth: number = 40;
  shapeHeight: number = 40;
  shapeFill: string = colors.black;

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

  setShapeWidth = (width: number) => {
    this.shapeWidth = width;
  }

  setShapeHeight = (height: number) => {
    this.shapeHeight = height;
  }

  setShapeFill = (color: string) => {
    this.shapeFill = color;
  }
}

const elementStore = new ElementStore();
export default elementStore;