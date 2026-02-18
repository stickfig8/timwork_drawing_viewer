import DrawingCanvas from "./DrawingCanvas";
import DrawingController from "../controller/DrawingController";
import { useDrawingStore } from "@/stores/DrawingsStore";
import { useDrawingIndexController } from "@/hooks/useDrawingIndexController";
import { ChevronDown, ChevronUp } from "lucide-react";
import DefaultCanvas from "./DefaultCanvas";

export default function DrawingViewerSection() {
  const { selectedDrawings } = useDrawingStore();

  const {
    current,
    setCurrent,

    currentDrawing,
    moveNext,
    movePrev,
  } = useDrawingIndexController(selectedDrawings);

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      {selectedDrawings.length > 0 && (
        <DrawingController current={current} setCurrent={setCurrent} />
      )}

      {selectedDrawings.length > 0 && currentDrawing ? (
        <>
          <DrawingCanvas drawing={currentDrawing} />

          {selectedDrawings.length > 1 && (
            <>
              <button
                className="w-10 h-10 absolute top-3 left-1/2 -translate-x-1/2 z-40 cursor-pointer text-[var(--main-gray)]"
                onClick={movePrev}
              >
                <ChevronUp className="w-full h-full" />
              </button>

              <button
                className="w-10 h-10 absolute bottom-3 left-1/2 -translate-x-1/2 z-40 cursor-pointer text-[var(--main-gray)]"
                onClick={moveNext}
              >
                <ChevronDown className="w-full h-full" />
              </button>
            </>
          )}
        </>
      ) : (
        <DefaultCanvas />
      )}
    </section>
  );
}
