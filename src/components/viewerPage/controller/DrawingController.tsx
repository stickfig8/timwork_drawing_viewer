import Draggable from "react-draggable";

import { useRef, useState } from "react";
import { useDrawingStore } from "@/stores/DrawingsStore";
import CommonButton from "@/components/common/CommonButton";
import { Maximize2, Minimize2 } from "lucide-react";
import { removeImageExtension } from "@/utils/normalizeUtils";
import CurrentInfoSection from "./CurrentInfoSection";
import SelectedListSection from "./SelectedListSection";

type Props = {
  current: number;
  setCurrent: (current: number) => void;
};

export default function DrawingController({ current, setCurrent }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  const { selectedDrawings, clearDrawings } = useDrawingStore();

  const currentDrawing = selectedDrawings[current];

  if (!currentDrawing) return null;

  return (
    <Draggable nodeRef={nodeRef} bounds="body">
      <div
        ref={nodeRef}
        className="absolute top-4 left-[calc(100%-390px)] z-50 w-[370px] bg-white shadow-xl rounded-lg p-3 flex border-1 border-[var(--main-orange)] overflow-y-auto scrollbar-style"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer absolute top-${isOpen ? "4" : "1/2 -translate-y-1/2"} right-4 w-4 h-4 text-[var(--main-gray)]`}
        >
          {isOpen ? (
            <Minimize2 className="w-full h-full" />
          ) : (
            <Maximize2 className="w-full h-full" />
          )}
        </button>
        {isOpen ? (
          <article className="flex flex-col gap-7 items-start w-full">
            <CurrentInfoSection currentDrawing={currentDrawing} />
            <SelectedListSection
              current={current}
              setCurrent={setCurrent}
              selectedDrawings={selectedDrawings}
            />

            <CommonButton text="선택 초기화" onClick={clearDrawings} />
          </article>
        ) : (
          <h3 className="text-[var(--main-gray)] text-sm">
            {removeImageExtension(currentDrawing.image)}
          </h3>
        )}
      </div>
    </Draggable>
  );
}
