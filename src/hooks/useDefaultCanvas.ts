import { useMemo, useRef, useState, useEffect } from "react";
import metadataJson from "@/data/metadata.json";
import type { Metadata } from "@/types/dataTypes";
import { createFlatRows } from "@/utils/normalizeUtils";

export function useDefaultCanvas() {
  const metadata = metadataJson as Metadata;

  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 00 도면 찾기
  const defaultDrawing = useMemo(() => {
    return Object.values(metadata.drawings).find(
      (d) => d.parent === null && d.position === null,
    );
  }, [metadata]);

  // 하위 건물 polygon
  const childPolygons = useMemo(() => {
    return Object.values(metadata.drawings)
      .filter(
        (d): d is typeof d & { position: { vertices: [number, number][] } } =>
          !!d.position && !!d.position.vertices?.length,
      )
      .map((d) => ({
        id: d.id,
        name: d.name,
        vertices: d.position.vertices,
      }));
  }, [metadata]);

  const flatRows = useMemo(() => createFlatRows(metadata), [metadata]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      setImgSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    return () => img?.removeEventListener("load", handleLoad);
  }, []);

  return {
    imgRef,
    imgSize,
    hoveredId,
    setHoveredId,

    defaultDrawing,
    childPolygons,
    flatRows,
  };
}
