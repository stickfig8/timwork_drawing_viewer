import type { FlatRow } from "@/types/controlTypes";
import type { Metadata } from "@/types/dataTypes";

export function createFlatRows(metadata: Metadata): FlatRow[] {
  const rows: FlatRow[] = [];

  Object.values(metadata.drawings).forEach((drawing) => {
    // 전체 배치도
    if (!drawing.disciplines) {
      rows.push({
        id: createRowId({
          drawingId: drawing.id,
          image: drawing.image,
        }),
        drawingId: drawing.id,
        drawingName: drawing.name,
        image: drawing.image,
        isBase: true,
      });
      return;
    }

    // 전체 배치도를 제외한 건물 도면
    if (drawing.image) {
      rows.push({
        id: createRowId({
          drawingId: drawing.id,
          image: drawing.image,
        }),
        drawingId: drawing.id,
        drawingName: drawing.name,
        image: drawing.image,
        isBase: true,
      });
    }

    Object.entries(drawing.disciplines).forEach(
      ([disciplineName, discipline]) => {
        // 리비전 없는 경우
        if (discipline.image) {
          rows.push({
            id: createRowId({
              drawingId: drawing.id,
              discipline: disciplineName,
              image: discipline.image,
            }),
            drawingId: drawing.id,
            drawingName: drawing.name,
            discipline: disciplineName,
            image: discipline.image,
            isBase: true,
            relativeTo: discipline.imageTransform?.relativeTo,
            scale: discipline.imageTransform?.scale,
          });
        }

        // 리비전 있는 경우
        discipline.revisions?.forEach((revision) => {
          rows.push({
            id: createRowId({
              drawingId: drawing.id,
              discipline: disciplineName,
              revision: revision.version,
              image: revision.image,
            }),
            drawingId: drawing.id,
            drawingName: drawing.name,
            discipline: disciplineName,
            revision: revision.version,
            date: revision.date,
            description: revision.description,
            changes: revision.changes,
            image: revision.image,
            isBase: false,
            relativeTo:
              revision.imageTransform?.relativeTo ??
              discipline.imageTransform?.relativeTo,
            scale:
              revision.imageTransform?.scale ??
              discipline.imageTransform?.scale,
          });
        });

        // 리전
        if (discipline.regions) {
          Object.entries(discipline.regions).forEach(([regionName, region]) => {
            region.revisions.forEach((revision) => {
              rows.push({
                id: createRowId({
                  drawingId: drawing.id,
                  discipline: disciplineName,
                  region: regionName,
                  revision: normalizeRevision(revision.version),
                  image: revision.image,
                }),
                drawingId: drawing.id,
                drawingName: drawing.name,
                discipline: disciplineName,
                region: regionName,
                revision: normalizeRevision(revision.version),
                date: revision.date,
                description: revision.description,
                changes: revision.changes,
                image: revision.image,
                isBase: false,
                relativeTo: revision.imageTransform?.relativeTo,
                scale: revision.imageTransform?.scale,
              });
            });
          });
        }
      },
    );
  });

  return rows;
}

export function normalizeRevision(version: string): string {
  const match = version.match(/^REV(\d+)/i);
  if (!match) return version;

  return `REV${match[1]}`;
}

export function removeImageExtension(imageName: string): string {
  return imageName.trim().replace(/(.png|.jpg|.jpeg|)$/, "");
}

function createRowId(params: {
  drawingId: string;
  discipline?: string;
  region?: string;
  revision?: string;
  image: string;
}) {
  return [
    params.drawingId,
    params.discipline ?? "base",
    params.region ?? "all",
    params.revision ?? "latest",
    params.image,
  ].join("__");
}

export function isCompatible(a: FlatRow, b: FlatRow) {
  // 같은 건물
  if (a.drawingId !== b.drawingId) return false;

  // 서로 연관된 relative가 없을 경우
  const areWeFamily =
    a.relativeTo === b.relativeTo ||
    a.relativeTo === b.image ||
    b.relativeTo === a.image;

  if (!areWeFamily) return false;

  // 다른 region 배척
  if (a.region && b.region && a.region !== b.region) {
    return false;
  }

  return true;
}

export function canAdd(newRow: FlatRow, selected: FlatRow[]) {
  return selected.every((existing) => isCompatible(existing, newRow));
}
