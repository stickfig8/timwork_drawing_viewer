import metadataJson from "@/data/metadata.json";
import type { Metadata } from "@/types/dataTypes";
import { useEffect, useMemo, useState } from "react";
import { createFlatRows } from "@/utils/normalizeUtils";
import { ALL } from "@/configs/configs";

export function useSearchEngine() {
  const metadata = metadataJson as Metadata;

  const flatData = createFlatRows(metadata).sort((a, b) =>
    b.image.toLowerCase() > a.image.toLowerCase() ? -1 : 1,
  );

  const [selectedBuilding, setSelectedBuilding] = useState<string>(ALL);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(ALL);

  const [selectedRegion, setSelectedRegion] = useState<string>(ALL);
  const [selectedRevision, setSelectedRevision] = useState<string>(ALL);

  const [keyword, setKeyword] = useState<string>("");

  const allDisciplines = metadata.disciplines.map(
    (discipline) => discipline.name,
  );

  const buildingOptions = useMemo(() => {
    return [...new Set(flatData.map((r) => r.drawingName))];
  }, [flatData]);

  const activeDisciplines = useMemo(() => {
    if (!selectedBuilding) return allDisciplines;

    return [
      ...new Set(
        flatData
          .filter((r) => r.drawingName === selectedBuilding)
          .map((r) => r.discipline)
          .filter(Boolean),
      ),
    ];
  }, [selectedBuilding, flatData]);

  const regionOptions = useMemo(() => {
    return [
      ...new Set(
        flatData
          .filter((r) => {
            if (
              selectedBuilding !== ALL &&
              r.drawingName !== selectedBuilding
            ) {
              return false;
            }

            if (
              selectedDiscipline !== ALL &&
              r.discipline !== selectedDiscipline
            ) {
              return false;
            }

            return true;
          })
          .flatMap((r) => (r.region ? [r.region] : [])),
      ),
    ];
  }, [selectedBuilding, selectedDiscipline, flatData]);

  const revisionOptions = useMemo(() => {
    return [
      ...new Set(
        flatData
          .filter((r) => {
            if (
              selectedBuilding !== ALL &&
              r.drawingName !== selectedBuilding
            ) {
              return false;
            }

            if (
              selectedDiscipline !== ALL &&
              r.discipline !== selectedDiscipline
            ) {
              return false;
            }

            return true;
          })
          .flatMap((r) => (r.revision ? [r.revision] : [])),
      ),
    ];
  }, [selectedBuilding, selectedDiscipline, selectedRegion, flatData]);

  useEffect(() => {
    if (selectedDiscipline && !activeDisciplines.includes(selectedDiscipline)) {
      setSelectedDiscipline(ALL);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (regionOptions.length === 0 && !regionOptions.includes(selectedRegion))
      setSelectedRegion(ALL);
  }, [selectedBuilding, selectedDiscipline, selectedRevision, flatData]);

  useEffect(() => {
    if (
      revisionOptions.length === 0 &&
      !revisionOptions.includes(selectedRevision)
    )
      setSelectedRevision(ALL);
  }, [selectedBuilding, selectedDiscipline, selectedRegion, flatData]);

  const searchResult = useMemo(() => {
    return flatData.filter((data) => {
      if (selectedBuilding !== ALL && data.drawingName !== selectedBuilding) {
        return false;
      }

      if (
        selectedDiscipline !== ALL &&
        data.discipline !== selectedDiscipline
      ) {
        return false;
      }

      if (selectedRegion !== ALL && data.region !== selectedRegion) {
        return false;
      }

      if (selectedRevision !== ALL && data.revision !== selectedRevision) {
        return false;
      }

      if (keyword.trim() !== "") {
        const lowerKeyword = keyword.toLowerCase();

        const targetString = [
          data.drawingName,
          data.image,
          data.discipline,
          data.region,
          data.revision,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!targetString.includes(lowerKeyword)) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedBuilding,
    selectedDiscipline,
    selectedRegion,
    selectedRevision,
    keyword,
    flatData,
  ]);

  function resetOptions() {
    setSelectedBuilding(ALL);
    setSelectedDiscipline(ALL);
    setSelectedRegion(ALL);
    setSelectedRevision(ALL);
    setKeyword("");
  }

  return {
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

    flatData,

    searchResult,

    setSelectedBuilding,
    setSelectedDiscipline,
    setSelectedRegion,
    setSelectedRevision,
    setKeyword,

    resetOptions,
  };
}
