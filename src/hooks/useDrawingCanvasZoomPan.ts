import { useEffect, useRef, useState } from "react";

export function useDrawingCanvasZoomPan() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  function initialize() {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }

  // 휠
  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();

    const zoomIntensity = 0.001;
    const delta = -e.deltaY;

    setScale((prev) => {
      const next = prev + delta * zoomIntensity;
      return Math.min(Math.max(0.5, next), 4); // 최소/최대 줌 제한
    });
  }

  // 마우스
  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);
    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  //키보드 조작
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "0") {
        initialize();
      }

      if (e.key === "-" || e.key === "_") {
        setScale((prev) => Math.max(0.5, prev - 0.1));
      }

      if (e.key === "+" || e.key === "=") {
        setScale((prev) => Math.min(4, prev + 0.1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    scale,
    position,
    isDragging,
    start,

    setScale,
    setPosition,
    setIsDragging,
    setStart,

    containerRef,

    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,

    initialize,
  };
}
