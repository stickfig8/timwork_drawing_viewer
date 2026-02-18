import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDrawingStore } from "@/stores/DrawingsStore";
import type { FlatRow } from "@/types/controlTypes";
import { removeImageExtension } from "@/utils/normalizeUtils";

type Props = {
  searchData: FlatRow;
  isDisabled: boolean;
};

export default function SearchResultCard({ searchData, isDisabled }: Props) {
  const { selectedDrawings, toggleDrawing } = useDrawingStore();

  const isIncluded = selectedDrawings.some((d) => d.id === searchData.id);

  return (
    <Card
      onClick={() => {
        toggleDrawing(searchData);
      }}
      className={`gap-1 py-3 ${isIncluded ? "bg-[var(--main-blue-blur)] border-[var(--main-blue)]" : "hover:brightness-90"} ${isDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
    >
      <CardHeader>
        <CardTitle className="text-sm">
          {removeImageExtension(searchData.image)}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-[var(--main-neutral)] text-xs">
        <div className="flex flex-col gap-1">
          <p>{searchData.drawingName}</p>

          <div className="flex justify-between">
            <p>
              {[
                searchData.isBase ? "기준도면" : null,
                searchData.discipline,
                searchData.region,
                searchData.revision,
              ]
                .filter(Boolean)
                .join(" | ")}
            </p>

            {!searchData.isBase && <p>{searchData.date ?? "-"}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
