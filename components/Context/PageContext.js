"use client";

import { useContext, createContext } from "react";

export const PageContext = createContext(null);

export const usePageContext = () => {
  return useContext(PageContext);
};
