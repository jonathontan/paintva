import { beforeEach, describe, expect, it } from "vitest";
import elementStore from "./elementStore";

describe('elementStore', () => {
  beforeEach(() => {
    elementStore.selectedElement = 'none';
    elementStore.selectedColor = '#000000';
    elementStore.selectedShape = 'none';
    elementStore.selectedBrush = 'none';
  });

  it('sets selectedElement to brush', () => {
    expect(elementStore.selectedElement).toBe('none');

    elementStore.setElement('brush');
    expect(elementStore.selectedElement).toBe('brush');
  });

  it('sets selectedColor to black', () => {
    expect(elementStore.selectedColor).toBe('#000000')
    elementStore.setColor('#ffffff')
    expect(elementStore.selectedColor).toBe('#ffffff');
  });

  it('sets selectedShape to rect', () => {
    expect(elementStore.selectedShape).toBe('none');
    elementStore.setShape('rect');
    expect(elementStore.selectedShape).toBe('rect');
  });

  it('sets selectedBrush to stroke', () => {
    expect(elementStore.selectedBrush).toBe('none');
    elementStore.setBrush('stroke');
    expect(elementStore.selectedBrush).toBe('stroke');
  });
})