import { useRef, useState } from "react";

export function useDrawingMagnifier() {
  const [showMagnifier, setShowMagnifier] = useState(false);

  const magnifierRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleMagnifierMove(e: React.MouseEvent) {
    if (!magnifierRef.current || !imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();

    // 이미지 기준 마우스 좌표
    const imageX = e.clientX - imgRect.left;
    const imageY = e.clientY - imgRect.top;

    // 이미지 밖이면 무시
    if (
      imageX < 0 ||
      imageY < 0 ||
      imageX > imgRect.width ||
      imageY > imgRect.height
    ) {
      return;
    }

    const magnifierScale = 2.5;

    const magnifierRect = magnifierRef.current.getBoundingClientRect();
    const offsetX = magnifierRect.width / 2;
    const offsetY = magnifierRect.height / 2;

    requestAnimationFrame(() => {
      magnifierRef.current!.style.backgroundSize = `
      ${imgRect.width * magnifierScale}px
      ${imgRect.height * magnifierScale}px
    `;

      magnifierRef.current!.style.backgroundPosition = `
      -${imageX * magnifierScale - offsetX}px
      -${imageY * magnifierScale - offsetY}px
    `;
    });
  }

  return {
    showMagnifier,
    setShowMagnifier,
    imgRef,
    magnifierRef,
    handleMagnifierMove,
  };
}
