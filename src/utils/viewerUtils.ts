import type { FlatRow } from "@/types/controlTypes";
import type { Metadata } from "@/types/dataTypes";

export function findDrawingMeta(metadata: Metadata, flat: FlatRow) {
  const drawing = metadata.drawings[flat.drawingId];
  if (!drawing) return null;

  // discipline 없음 → base 도면
  if (!flat.discipline) {
    return {
      imageTransform: drawing.position?.imageTransform,
      polygon: drawing.position?.vertices
        ? {
            vertices: drawing.position.vertices,
            polygonTransform: drawing.position.imageTransform,
          }
        : null,
    };
  }

  const discipline = drawing.disciplines?.[flat.discipline];
  if (!discipline) return null;

  // region 있는 경우
  if (flat.region && discipline.regions) {
    const region = discipline.regions[flat.region];
    if (!region) return null;

    // region revision
    if (flat.revision && region.revisions) {
      const revision = region.revisions.find(
        (r) => r.version === flat.revision,
      );

      return {
        imageTransform: revision?.imageTransform ?? discipline.imageTransform,
        polygon: revision?.polygon ?? region.polygon,
      };
    }

    return {
      imageTransform: discipline.imageTransform,
      polygon: region.polygon,
    };
  }

  // discipline revision
  if (flat.revision && discipline.revisions) {
    const revision = discipline.revisions.find(
      (r) => r.version === flat.revision,
    );

    return {
      imageTransform: revision?.imageTransform ?? discipline.imageTransform,
      polygon: revision?.polygon ?? discipline.polygon,
    };
  }

  // discipline 기본
  return {
    imageTransform: discipline.imageTransform,
    polygon: discipline.polygon,
  };
}

export function getPolygonCenter(vertices: [number, number][]) {
  const x = vertices.reduce((sum, v) => sum + v[0], 0) / vertices.length;
  const y = vertices.reduce((sum, v) => sum + v[1], 0) / vertices.length;

  return { x, y };
}
