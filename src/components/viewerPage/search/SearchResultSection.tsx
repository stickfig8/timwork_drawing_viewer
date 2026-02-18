import type { FlatRow } from "@/types/controlTypes";
import SearchResultCard from "./SearchResultCard";
import SearchSortButton from "./SearchSortButton";
import { useSearchResultController } from "@/hooks/useSearchResultController";
import { Checkbox } from "@/components/ui/checkbox";
import { useDrawingStore } from "@/stores/DrawingsStore";
import SidebarSectionTitle from "./SidebarSectionTitle";
import { canAdd } from "@/utils/normalizeUtils";

type Props = {
  searchResult: FlatRow[];
};

export default function SearchResultSection({ searchResult }: Props) {
  const {
    sortType,
    sortOrder,
    setSortType,
    setSortOrder,

    isCompareOnly,
    setIsCompareOnly,

    sortedResult,
  } = useSearchResultController(searchResult);
  const { selectedDrawings } = useDrawingStore();

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-3">
      <div className="flex flex-col pr-2 gap-3">
        <div className="flex gap-2 items-end">
          <SidebarSectionTitle title="검색 결과" />
          <p className="text-xs text-[var(--main-neutral)] mb-1">{`${sortedResult.length}건`}</p>
        </div>
        <div className="flex justify-between items-center pr-2 pl-2">
          <SearchSortButton
            sortOrder={sortOrder}
            sortType={sortType}
            setSortOrder={setSortOrder}
            setSortType={setSortType}
          />
          <div
            className="flex gap-1"
            onClick={() => {
              if (selectedDrawings.length !== 0)
                setIsCompareOnly(!isCompareOnly);
            }}
          >
            <Checkbox
              checked={isCompareOnly}
              disabled={selectedDrawings.length === 0}
            />
            <p className="text-xs text-[var(--main-neutral)] cursor-default select-none">
              비교 가능 도면
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-style">
        {searchResult.length === 0 ? (
          <p className="text-sm text-[var(--main-neutral)] m-auto">
            검색 결과가 없습니다.
          </p>
        ) : (
          sortedResult.map((searchData) => (
            <SearchResultCard
              key={searchData.id}
              searchData={searchData}
              isDisabled={!canAdd(searchData, selectedDrawings)}
            />
          ))
        )}
      </div>
    </section>
  );
}
