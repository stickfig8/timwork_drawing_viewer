import { useDefaultCanvas } from "@/hooks/useDefaultCanvas";
import { useDrawingStore } from "@/stores/DrawingsStore";

export default function DefaultCanvas() {
  const { addDrawing } = useDrawingStore();
  const {
    imgRef,
    imgSize,
    hoveredId,
    setHoveredId,

    defaultDrawing,
    childPolygons,
    flatRows,
  } = useDefaultCanvas();

  if (!defaultDrawing) return null;

  return (
    <article className="relative w-full h-full flex justify-center items-center">
      <div className="relative">
        <img
          ref={imgRef}
          src={`/drawings/${defaultDrawing.image}`}
          className="max-w-full max-h-[90vh] object-contain select-none"
        />

        {imgSize.width > 0 && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${imgSize.width} ${imgSize.height}`}
          >
            {childPolygons.map((item) => {
              const points = item.vertices
                .map(([x, y]) => `${x},${y}`)
                .join(" ");

              return (
                <g key={item.id}>
                  <polygon
                    points={points}
                    fill={
                      hoveredId === item.id
                        ? "rgba(0,120,255,0.35)"
                        : "rgba(0,120,255,0.15)"
                    }
                    stroke="rgb(0,120,255)"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => {
                      const base = flatRows.find(
                        (r) => r.drawingId === item.id && r.isBase,
                      );
                      if (base) addDrawing(base);
                    }}
                  />

                  {/* 도면 이름 */}
                  {hoveredId === item.id && (
                    <text
                      x={item.vertices[0][0]}
                      y={item.vertices[0][1] - 10}
                      fill="black"
                      fontSize="55"
                      fontWeight="bold"
                    >
                      {item.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </article>
  );
}
