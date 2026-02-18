import ControllerSectionTitle from "./ControllerSectionTitle";
import SelectedListCard from "./SelectedListCard";
import type { FlatRow } from "@/types/controlTypes";

type Props = {
  current: number;
  setCurrent: (current: number) => void;
  selectedDrawings: FlatRow[];
};
export default function SelectedListSection({
  current,
  setCurrent,
  selectedDrawings,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      <ControllerSectionTitle title="선택 도면" />
      <div className="flex flex-col gap-2 w-full">
        {selectedDrawings.map((drawing, i) => (
          <SelectedListCard
            key={i}
            drawing={drawing}
            index={i}
            setCurrent={setCurrent}
            isCurrent={i === current}
          />
        ))}
      </div>
    </div>
  );
}
