import { makeAutoObservable } from "mobx";
import { ShapeType } from "./ElementStore";

interface LayerType {
  id: string
  type: 'brush'| 'shape' | 'fill'
  color: string
  shape?: ShapeType
  width?: number
  height?: number
  points?: number[]
  strokeWidth?: number
  x?: number
  y?: number
  isEraser?: boolean
}

class LayerStore {
  layers: LayerType[] = [];
  selectedLayer: LayerType = this.layers[this.layers.length - 1];

  constructor() {
    makeAutoObservable(this);
  }

  addLayer = (layer: LayerType) => {
    this.layers.push(layer);
  }

  removeLayer = (id: string) => {
    this.layers = this.layers.filter(layer => layer.id !== id);
  }

  setSelectedLayer = (id: string) => {
    const layer = this.layers.find(layer => layer.id === id)
    if (layer) this.selectedLayer = layer;
  }

  setBrushPoints = (id: string, pointer: {x: number, y: number}) => {
    const layer = this.layers.find(layer => layer.id === id)
    if (layer && layer.type === 'brush')
      layer.points = [...(layer.points || []), pointer.x, pointer.y]
  }
}

const layerStore = new LayerStore();
export default layerStore;