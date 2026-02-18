import { MAX_DRAWINGS } from "@/configs/configs";
import type { FlatRow } from "@/types/controlTypes";
import { canAdd } from "@/utils/normalizeUtils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type DrawingsStoreState = {
  selectedDrawings: FlatRow[];

  setSelectedDrawings: (drawings: FlatRow[]) => void;

  addDrawing: (drawing: FlatRow) => void;
  removeDrawing: (id: string) => void;
  toggleDrawing: (drawing: FlatRow) => void;
  clearDrawings: () => void;
};

export const useDrawingStore = create<DrawingsStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        selectedDrawings: [],

        setSelectedDrawings: (drawings) => set({ selectedDrawings: drawings }),

        clearDrawings: () =>
          set({
            selectedDrawings: [],
          }),

        addDrawing: (drawing) => {
          const { selectedDrawings } = get();

          const exists = selectedDrawings.some((d) => d.id === drawing.id);
          if (exists) return;

          if (selectedDrawings.length >= MAX_DRAWINGS) return;

          // 첫 선택
          if (selectedDrawings.length === 0) {
            set({
              selectedDrawings: [drawing],
            });
            return;
          }

          // 그룹 다르면 차단
          if (!canAdd(drawing, selectedDrawings)) return;

          set({
            selectedDrawings: [...selectedDrawings, drawing],
          });
        },

        removeDrawing: (id) => {
          const { selectedDrawings } = get();

          const newSelected = selectedDrawings.filter((d) => d.id !== id);

          set({
            selectedDrawings: newSelected,
          });
        },

        toggleDrawing: (drawing) => {
          const { selectedDrawings } = get();

          const isIncluded = selectedDrawings.some((d) => d.id === drawing.id);

          if (isIncluded) {
            get().removeDrawing(drawing.id);
          } else {
            get().addDrawing(drawing);
          }
        },
      }),
      {
        name: "drawing-storage",
      },
    ),
  ),
);
