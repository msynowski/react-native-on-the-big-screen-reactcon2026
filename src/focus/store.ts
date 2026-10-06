import type { RefObject } from 'react';
import type { ImageSourcePropType, View } from 'react-native';
import { create } from 'zustand';

export type FocusableModel = {
  id: string;
  title: string;
  image: ImageSourcePropType;
};

export type FocusableEntry = {
  ref: RefObject<View | null>;
  nodeHandle: number | null;
  model: FocusableModel;
};

type FocusStore = {
  focusables: Record<string, FocusableEntry>;
  focusedId: string | null;
  register: (entry: FocusableEntry) => void;
  unregister: (id: string) => void;
  setFocused: (id: string) => void;
};

export const useFocusStore = create<FocusStore>((set) => ({
  focusables: {},
  focusedId: null,

  register: (entry) =>
    set((state) => ({
      focusables: { ...state.focusables, [entry.model.id]: entry },
    })),

  unregister: (id) =>
    set((state) => {
      const { [id]: _removed, ...focusables } = state.focusables;
      return { focusables };
    }),

  setFocused: (id) => set({ focusedId: id }),
}));

export const useFocusedModel = () =>
  useFocusStore((state) =>
    state.focusedId ? state.focusables[state.focusedId]?.model : undefined,
  );
