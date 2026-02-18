import { useSearchEngine } from "@/hooks/useSearchEngine";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SearchResultSection from "./SearchResultSection";
import SearchInputSection from "./SearchInputSection";
import ProjectTitle from "@/components/design/ProjectTitle";

export default function SideBar() {
  const {
    selectedBuilding,
    selectedDiscipline,
    selectedRegion,
    selectedRevision,
    keyword,

    buildingOptions,
    allDisciplines,
    activeDisciplines,
    regionOptions,
    revisionOptions,

    searchResult,

    setSelectedBuilding,
    setSelectedDiscipline,
    setSelectedRegion,
    setSelectedRevision,
    setKeyword,

    resetOptions,
  } = useSearchEngine();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-screen">
      <div
        className={`
      absolute left-0 top-0 flex
      transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%-40px)]"} z-100
    `}
      >
        {/* 사이드바 */}
        <aside
          className="
        w-90 h-screen border-r-1 border-[var(--main-orange)] bg-white 
        flex flex-col gap-6 p-3
      "
        >
          <ProjectTitle />
          <SearchInputSection
            values={{
              selectedBuilding,
              selectedDiscipline,
              selectedRegion,
              selectedRevision,
              keyword,
            }}
            options={{
              buildingOptions,
              allDisciplines,
              activeDisciplines,
              regionOptions,
              revisionOptions,
            }}
            actions={{
              setSelectedBuilding,
              setSelectedDiscipline,
              setSelectedRegion,
              setSelectedRevision,
              setKeyword,
              resetOptions,
            }}
          />

          <SearchResultSection searchResult={searchResult} />
        </aside>

        {/* 사이드바 온오프 */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-10 h-20 bg-white border rounded-r-xl shadow-md flex items-center justify-center self-center cursor-pointer text-[var(--main-orange)]"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
    </div>
  );
}
