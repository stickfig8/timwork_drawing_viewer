import { removeImageExtension } from "@/utils/normalizeUtils";

import type { FlatRow } from "@/types/controlTypes";
import ControllerSectionTitle from "./ControllerSectionTitle";

type Props = {
  currentDrawing: FlatRow;
};

export default function CurrentInfoSection({ currentDrawing }: Props) {
  if (!currentDrawing) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      <ControllerSectionTitle title="현재 도면 정보" />

      {/* 제목 */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-[var(--main-gray)]">
          {removeImageExtension(currentDrawing.image)}
        </h3>
        <p className="text-xs text-[var(--main-neutral)]">
          {currentDrawing.drawingName}
        </p>
      </div>

      {/* 기본 정보 */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
        {currentDrawing.discipline && (
          <>
            <label className="text-[var(--main-neutral)]">공종</label>
            <p>{currentDrawing.discipline}</p>
          </>
        )}

        {currentDrawing.region && (
          <>
            <label className="text-[var(--main-neutral)]">구역</label>
            <p>{currentDrawing.region}</p>
          </>
        )}

        {currentDrawing.revision && (
          <>
            <label className="text-[var(--main-neutral)]">리비전</label>
            <p className="font-medium text-[var(--main-orange)]">
              {currentDrawing.revision}
            </p>
          </>
        )}

        {currentDrawing.date && (
          <>
            <label className="text-[var(--main-neutral)]">날짜</label>
            <p>{currentDrawing.date}</p>
          </>
        )}

        {/* 설명 */}
        {currentDrawing.description && (
          <>
            <label className="text-[var(--main-neutral)]">설명</label>
            <p>{currentDrawing.description}</p>
          </>
        )}
      </div>

      {/* 변경사항 */}
      {currentDrawing.changes && currentDrawing.changes.length > 0 && (
        <div className="border rounded-sm p-1 bg-[var(--main-blue-blur)]">
          <p className="text-xs font-semibold mb-1 text-[var(--main-blue)]">
            변경 사항
          </p>
          <ul className="list-disc list-inside text-xs space-y-1">
            {currentDrawing.changes.map((change, i) => (
              <li key={i}>{change}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
