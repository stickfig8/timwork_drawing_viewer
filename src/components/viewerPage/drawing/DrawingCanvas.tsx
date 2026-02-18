import CommonButton from "@/components/common/CommonButton";
import { useDrawingCanvasZoomPan } from "@/hooks/useDrawingCanvasZoomPan";
import type { FlatRow } from "@/types/controlTypes";

type Props = {
  drawing: FlatRow;
};

export default function DrawingCanvas({ drawing }: Props) {
  const {
    scale,
    position,
    isDragging,

    containerRef,

    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,

    initialize,
  } = useDrawingCanvasZoomPan();

  //const baseScale = drawing.scale ?? 1;
  //const normalizedScale = 1 / baseScale;

  return (
    <article
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        <img
          src={`/drawings/${drawing.image}`}
          className="max-w-full max-h-[90vh] object-contain select-none"
          draggable={false}
        />
      </div>

      {(scale !== 1 || position.x !== 0 || position.y! !== 0) && (
        <div className="absolute z-40 right-4 bottom-4">
          <CommonButton text="위치 초기화" onClick={initialize} />
        </div>
      )}
    </article>
  );
}
