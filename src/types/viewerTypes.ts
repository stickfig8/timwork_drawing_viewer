export type ViewerLayer = {
  id: string;
  image: string;
  isBase: boolean;
  imageTransform?: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
    relativeTo?: string;
  };
  polygon?: {
    vertices: number[][];
    polygonTransform?: {
      x: number;
      y: number;
      scale: number;
      rotation: number;
    };
  };
};
