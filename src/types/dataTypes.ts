export type Vertex = number[];

export type ImageTransform = {
  relativeTo?: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type PolygonTransform = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type Polygon = {
  vertices: Vertex[];
  polygonTransform: PolygonTransform;
};

export type Revision = {
  version: string;
  image: string;
  date: string;
  description: string;
  changes: string[];

  //특수 케이스 2
  imageTransform?: ImageTransform;
  polygon?: Polygon;
};

export type Region = {
  polygon: Polygon;
  revisions: Revision[];
};

export type Discipline = {
  revisions?: Revision[];

  imageTransform?: ImageTransform;

  // region이 존재 할 경우 공종에 이미지 있음
  image?: string;
  // 특수 케이스 3
  polygon?: Polygon;
  // 특수 케이스 1
  regions?: Record<string, Region>;
};

export type Position = {
  vertices: Vertex[];
  imageTransform: ImageTransform;
};

export type Drawing = {
  id: string;
  name: string;
  image: string;
  parent: string | null;
  position: Position | null;
  disciplines?: Record<string, Discipline>;
};

// 루트 메타데이터
export type ProjectInfo = {
  name: string;
  unit: string;
};

export type DisciplineInfo = {
  name: string;
};

export type Metadata = {
  project: ProjectInfo;
  disciplines: DisciplineInfo[];
  drawings: Record<string, Drawing>;
};
