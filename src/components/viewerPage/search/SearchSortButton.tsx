import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { SortOrder, SortType } from "@/types/searchTypes";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  sortOrder: SortOrder;
  sortType: SortType;

  setSortOrder: (order: SortOrder) => void;
  setSortType: (type: SortType) => void;
};

export default function SearchSortButton({
  sortOrder,
  sortType,
  setSortOrder,
  setSortType,
}: Props) {
  return (
    <ButtonGroup>
      <Button
        onClick={() => setSortType(sortType === "title" ? "date" : "title")}
        className="bg-white text-[var(--main-gray)] border-1 border-[var(--main-orange)] h-6 w-13 cursor-pointer hover:bg-white hover:brightness-90 text-xs"
      >
        {sortType === "title" ? "제목순" : "날짜순"}
      </Button>
      <Button
        onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
        className="bg-white text-[var(--main-gray)] border-1 border-[var(--main-orange)] h-6 w-6 cursor-pointer hover:bg-white hover:brightness-90 "
      >
        {sortOrder === "ASC" ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </ButtonGroup>
  );
}
