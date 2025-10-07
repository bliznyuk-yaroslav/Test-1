import type { RootState } from "../store";
export const selectCatalogItems = (state: RootState) => state.catalog.items;

export const selectCatalogCount = (state: RootState) =>
  state.catalog.items.length;

export const selectCatalogLoading = (state: RootState) =>
  state.catalog.isLoading;
export const selectCatalogError = (state: RootState) => state.catalog.error;
