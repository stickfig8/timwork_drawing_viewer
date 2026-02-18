import { useDrawingStore } from "@/stores/DrawingsStore";
import type { FlatRow } from "@/types/controlTypes";
import { removeImageExtension } from "@/utils/normalizeUtils";
import { CircleMinus } from "lucide-react";

type Props = {
  drawing: FlatRow;
  index: number;
  setCurrent: (index: number) => void;
  isCurrent: boolean;
};

export default function SelectedListCard({
  drawing,
  index,
  setCurrent,
  isCurrent,
}: Props) {
  const { removeDrawing } = useDrawingStore();

  return (
    <div
      className={`flex w-full gap-9 px-2 py-1 justify-between items-center rounded-[16px] bg-[var(--main-neutral)] text-white ${isCurrent && "ring-2 ring-[var(--main-orange)]"}`}
      onClick={() => setCurrent(index)}
    >
      <p className="text-sm cursor-default">
        {removeImageExtension(drawing.image)}
      </p>
      <button
        className="cursor-pointer w-4 h-4"
        onClick={(e) => {
          e.stopPropagation();
          removeDrawing(drawing.id);
        }}
      >
        <CircleMinus className="w-full h-full" />
      </button>
    </div>
  );
}
