import { ALL } from "@/configs/configs";
import SearchSelectBox from "./SearchSelectBox";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CommonButton from "@/components/common/CommonButton";
import SidebarSectionTitle from "./SidebarSectionTitle";

// Prop 타입
type SearchValues = {
  selectedBuilding: string;
  selectedDiscipline: string;
  selectedRegion: string;
  selectedRevision: string;
  keyword: string;
};

type SearchOptions = {
  buildingOptions: string[];
  allDisciplines: string[];
  activeDisciplines: (string | undefined)[];
  regionOptions: string[];
  revisionOptions: string[];
};

type SearchActions = {
  setSelectedBuilding: (val: string) => void;
  setSelectedDiscipline: (val: string) => void;
  setSelectedRegion: (val: string) => void;
  setSelectedRevision: (val: string) => void;
  setKeyword: (val: string) => void;
  resetOptions: () => void;
};

type Props = {
  values: SearchValues;
  options: SearchOptions;
  actions: SearchActions;
};

export default function SearchInputSection({
  values,
  options,
  actions,
}: Props) {
  // 구조분해
  const {
    selectedBuilding,
    selectedDiscipline,
    selectedRegion,
    selectedRevision,
    keyword,
  } = values;

  const {
    buildingOptions,
    allDisciplines,
    activeDisciplines,
    regionOptions,
    revisionOptions,
  } = options;

  const {
    setSelectedBuilding,
    setSelectedDiscipline,
    setSelectedRegion,
    setSelectedRevision,
    setKeyword,
    resetOptions,
  } = actions;

  return (
    <section className="flex flex-col gap-3 pb-3 border-b-1">
      <Accordion type="single" collapsible defaultValue="searchSection">
        <AccordionItem value="searchSection">
          <AccordionTrigger className="hover:no-underline">
            <SidebarSectionTitle title="도면 검색" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SearchSelectBox
                  label="도면"
                  value={selectedBuilding}
                  options={buildingOptions}
                  onChange={setSelectedBuilding}
                />
                <div className="flex gap-2">
                  <SearchSelectBox
                    label="공종"
                    value={selectedDiscipline}
                    options={allDisciplines}
                    onChange={setSelectedDiscipline}
                    isOptionDisabled={(discipline) =>
                      selectedBuilding !== ALL &&
                      !activeDisciplines.includes(discipline)
                    }
                  />
                  <SearchSelectBox
                    label="영역"
                    value={selectedRegion}
                    options={regionOptions}
                    onChange={setSelectedRegion}
                  />

                  <SearchSelectBox
                    label="리비전"
                    value={selectedRevision}
                    options={revisionOptions}
                    onChange={setSelectedRevision}
                  />
                </div>
              </div>

              <div className="relative">
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  className="pl-7 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset transition-all"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--main-gray)]" />
                {keyword.length > 0 && (
                  <button
                    onClick={() => setKeyword("")}
                    className="absolute right-2 text-[var(--main-neutral)] top-1/2 -translate-y-1/2 cursor-pointer w-4 h-4 flex items-center justify-center"
                  >
                    <X />
                  </button>
                )}
              </div>

              <CommonButton text="초기화" onClick={resetOptions} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
