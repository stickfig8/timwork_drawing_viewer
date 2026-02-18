import { useDrawingStore } from "@/stores/DrawingsStore";
import type { FlatRow } from "@/types/controlTypes";
import type { SortOrder, SortType } from "@/types/searchTypes";
import { canAdd } from "@/utils/normalizeUtils";
import { useMemo, useState } from "react";

export function useSearchResultController(searchResult: FlatRow[]) {
  const [sortType, setSortType] = useState<SortType>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ASC");

  const [isCompareOnly, setIsCompareOnly] = useState(false);

  const { selectedDrawings } = useDrawingStore();

  const sortedResult = useMemo(() => {
    let result = [...searchResult];

    // 정렬
    result.sort((a, b) => {
      let compareValue = 0;

      if (sortType === "title") {
        compareValue = a.image
          .toLowerCase()
          .localeCompare(b.image.toLowerCase());
      }

      if (sortType === "date") {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        compareValue = dateA - dateB;
      }

      return sortOrder === "ASC" ? compareValue : -compareValue;
    });

    // 비교 가능 도면 필터
    if (isCompareOnly && selectedDrawings.length > 0) {
      result = result.filter((drawing) => canAdd(drawing, selectedDrawings));
    }

    return result;
  }, [searchResult, sortType, sortOrder, selectedDrawings, isCompareOnly]);

  return {
    sortType,
    sortOrder,
    setSortType,
    setSortOrder,

    isCompareOnly,
    setIsCompareOnly,

    sortedResult,
  };
}
