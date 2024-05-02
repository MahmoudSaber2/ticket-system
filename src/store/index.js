import { create } from "zustand";

export const useLoginStore = create((set) => ({}));

export const useCurrentPageName = create((set) => ({
    currentPageName: "Pannello",
    setCurrentPageName: (pageName) => set((state) => ({ ...state, currentPageName: pageName })),
}));
