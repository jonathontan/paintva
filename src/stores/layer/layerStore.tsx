import { makeAutoObservable } from "mobx";
import { ShapeType } from "../element/ElementStore";

export interface LayerType {
  id: string
  type: 'brush' | 'shape' | 'fill' | 'image'
  color?: string
  shape?: ShapeType
  width?: number
  height?: number
  fill?: string
  points?: number[]
  strokeWidth?: number
  x?: number
  y?: number
  src?: string
  isEraser?: boolean
}

class LayerStore {
  layers: LayerType[] = [];
  selectedLayer: LayerType | null = null;
  layerId = 1;

  constructor() {
    makeAutoObservable(this);
  }

  addLayer = (layer: LayerType) => {
    this.layers.push(layer);
    this.selectedLayer = layer;
    this.layerId++;
  }

  removeLayer = (id: string) => {
    this.layers = this.layers.filter(layer => layer.id !== id);
    this.selectedLayer = null;
    if (this.layers.length === 0) this.layerId = 1;
  }

  setSelectedLayer = (id: string) => {
    const layer = this.layers.find(layer => layer.id === id);
    if (layer) this.selectedLayer = layer;
  }

  setBrushPoints = (id: string, pointer: { x: number, y: number }) => {
    const layer = this.layers.find(layer => layer.id === id);
    if (layer && layer.type === 'brush')
      layer.points = [...(layer.points || []), pointer.x, pointer.y];
  }

  setMoveToTop = (id: string) => {
    const index = this.layers.findIndex(layer => layer.id === id);
    if (index !== -1) {
      const [layer] = this.layers.splice(index, 1);
      this.layers.push(layer);
    }
  }
}

const layerStore = new LayerStore();
export default layerStore;