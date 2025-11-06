import { makeAutoObservable } from "mobx";
import { ShapeType } from "./ElementStore";

interface LayerType {
  id: string
  type: 'brush'| 'shape' | 'fill'
  color: string
  shape?: ShapeType
  x?: number
  y?: number
}

class LayerStore {
  layers: LayerType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addLayer = (layer: LayerType) => {
    this.layers.push(layer);
  }

  removeLayer = (id: string) => {
    this.layers = this.layers.filter(layer => layer.id !== id);
  }
}

const layerStore = new LayerStore();
export default layerStore;