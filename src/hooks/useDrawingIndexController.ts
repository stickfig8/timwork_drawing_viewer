import type { FlatRow } from "@/types/controlTypes";
import { getNextIndex, getPrevIndex } from "@/utils/commonUtils";
import { useCallback, useEffect, useRef, useState } from "react";

export function useDrawingIndexController(selectedDrawings: FlatRow[]) {
  const [current, setCurrent] = useState(0);

  // 이전 length 기억
  const prevLengthRef = useRef(selectedDrawings.length);

  // 추가&제거 인덱스 변경
  useEffect(() => {
    const prevLength = prevLengthRef.current;
    const currentLength = selectedDrawings.length;

    // 추가된 경우
    if (currentLength > prevLength) {
      setCurrent(currentLength - 1);
    }

    // 제거된 경우
    else if (currentLength < prevLength) {
      setCurrent((prev) => {
        if (currentLength === 0) return 0;

        // 현재 인덱스가 아직 유효하면 유지
        if (prev < currentLength) return prev;

        // 사라졌다면 바로 위 인덱스로
        return currentLength - 1;
      });
    }

    prevLengthRef.current = currentLength;
  }, [selectedDrawings]);

  const currentDrawing =
    selectedDrawings[current] ?? selectedDrawings[selectedDrawings.length - 1];

  const moveNext = useCallback(() => {
    setCurrent((prev) => getNextIndex(prev, selectedDrawings.length));
  }, [selectedDrawings.length]);

  const movePrev = useCallback(() => {
    setCurrent((prev) => getPrevIndex(prev, selectedDrawings.length));
  }, [selectedDrawings.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedDrawings.length === 0) return;
      e.preventDefault();

      if (e.key === "ArrowUp") movePrev();
      if (e.key === "ArrowDown") moveNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveNext, movePrev, selectedDrawings.length]);

  return {
    current,
    setCurrent,

    currentDrawing,

    moveNext,
    movePrev,
  };
}
