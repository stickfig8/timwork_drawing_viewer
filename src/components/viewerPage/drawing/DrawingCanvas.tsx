import CommonButton from "@/components/common/CommonButton";
import { useDrawingCanvasZoomPan } from "@/hooks/useDrawingCanvasZoomPan";
import { useDrawingMagnifier } from "@/hooks/useDrawingMagnifier";
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

  const {
    showMagnifier,
    setShowMagnifier,
    imgRef,
    magnifierRef,
    handleMagnifierMove,
  } = useDrawingMagnifier();

  return (
    <article
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleMagnifierMove(e);
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setShowMagnifier(false);
      }}
      onMouseEnter={() => setShowMagnifier(true)}
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
          ref={imgRef}
          src={`/drawings/${drawing.image}`}
          className="max-w-full max-h-[90vh] object-contain select-none"
          draggable={false}
        />
      </div>

      <div className="absolute z-40 right-4 bottom-4 space-y-4 text-right">
        {/* 돋보기 */}
        {showMagnifier && (
          <div
            ref={magnifierRef}
            className="w-48 h-48 border rounded-lg border-gray-400 shadow-lg pointer-events-none"
            style={{
              backgroundImage: `url(${new URL(`/drawings/${drawing.image}`, window.location.origin)})`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        {/* 초기화 버튼 */}
        {(scale !== 1 || position.x !== 0 || position.y !== 0) && (
          <CommonButton text="위치 초기화" onClick={initialize} />
        )}
      </div>
    </article>
  );
}
