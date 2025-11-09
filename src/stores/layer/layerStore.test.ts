import { describe, it, expect, beforeEach } from "vitest";
import layerStore, { LayerType } from "./layerStore";

describe('LayerStore', () => {
  beforeEach(() => {
    layerStore.layers = [];
    layerStore.selectedLayer = null;
  });

  it('adds a layer and select it', () => {
    const layer: LayerType = {
      id: '1',
      type: 'shape',
      color: '#000000',
      shape: 'rect',
      x: 40,
      y: 40
    };

    layerStore.addLayer(layer);

    expect(layerStore.layers.length).toBe(1);
    expect(layerStore.selectedLayer?.id).toBe('1');
    expect(layerStore.selectedLayer?.type).toBe('shape');
    expect(layerStore.selectedLayer?.shape).toBe('rect');
    expect(layerStore.selectedLayer?.color).toBe('#000000');
  })

  it('deletes a layer by id and sets selectedLayer to null', () => {
    const layer1: LayerType = { id: '1', type: 'shape' };
    const layer2: LayerType = { id: '2', type: 'image' };
    const layer3: LayerType = { id: '3', type: 'fill' };

    layerStore.addLayer(layer1);
    layerStore.addLayer(layer2);
    layerStore.addLayer(layer3);

    layerStore.removeLayer('2');

    expect(layerStore.layers.length).toBe(2);
    expect(layerStore.selectedLayer).toBeNull();
  })

  it('sets a selected layer by id', () => {
    const layer1: LayerType = { id: '1', type: 'shape' };
    const layer2: LayerType = { id: '2', type: 'image' };

    layerStore.addLayer(layer1);
    layerStore.addLayer(layer2);

    layerStore.setSelectedLayer('1');

    expect(layerStore.selectedLayer).not.toBeNull();
    expect(layerStore.selectedLayer?.id).toBe('1');
  })

  it('moves the dragged layer to the top of the layers array', () => {
    const layer1: LayerType = { id: '1', type: 'shape' };
    const layer2: LayerType = { id: '2', type: 'image' };
    const layer3: LayerType = { id: '3', type: 'fill' };

    layerStore.addLayer(layer1);
    layerStore.addLayer(layer2);
    layerStore.addLayer(layer3);

    layerStore.setMoveToTop('1');

    expect(layerStore.layers.map(layer => layer.id)).toEqual(['2', '3', '1']);
  })

  it('does nothing if the layer id does not exist', () => {
    const layer1: LayerType = { id: '1', type: 'shape' };

    layerStore.addLayer(layer1);

    layerStore.setMoveToTop('2');

    expect(layerStore.layers.map(layer => layer.id)).toEqual(['1']);
  })
})