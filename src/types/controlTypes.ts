export type FlatRow = {
  id: string;
  drawingId: string;
  drawingName: string;

  discipline?: string;
  region?: string;

  revision?: string;
  date?: string;

  image: string;

  isBase: boolean;

  relativeTo?: string;
  scale?: number;

  description?: string;
  changes?: string[];
};
