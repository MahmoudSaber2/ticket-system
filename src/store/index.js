import { create } from "zustand";

export const useSessionStore = create((set) => ({
    accessToken: null,
    status: "booting",
    profile: null,
    role: null,
    roles: [],
    permissions: [],
    accountType: null,
    tenant: null,
    setAccessToken: (accessToken) => set({ accessToken }),
    setSession: (session) => set({ ...session, status: "authenticated" }),
    setStatus: (status) => set({ status, accessToken: null }),
    clearSession: (status = "unauthenticated") => set({
        accessToken: null,
        status,
        profile: null,
        role: null,
        roles: [],
        permissions: [],
        accountType: null,
        tenant: null,
    }),
}));

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
