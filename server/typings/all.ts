export interface ContentItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TransformedItem {
  index: number;
  text: string;
  position: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

export interface RequiredExtractedData {
  [key: string]: any;
}
