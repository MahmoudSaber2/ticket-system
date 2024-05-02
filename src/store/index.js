import { create } from "zustand";

export const useLoginStore = create((set) => ({}));

export const useCurrentPageName = create((set) => ({
    currentPageName: "Pannello",
    setCurrentPageName: (pageName) => set((state) => ({ ...state, currentPageName: pageName })),
}));

export const useFilter = create((set) => ({
    filterData: {},
    setFilterData: (data) => set((state) => ({ ...state, filterData: data })),
}));

export const useTable = create((set) => ({
    pagenation: {},
    detailsId: null,

    setPagenation: (data) => set((state) => ({ ...state, pagenation: data })),
    setDetailsId: (data) => set((state) => ({ ...state, detailsId: data })),
}));
