/** @format */

import React, { createContext, ReactNode } from "react";
import initialValues from "./initial-values";

export interface ContextLoading {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const initialValuesContext: ContextLoading = {
  isLoading: false,
  hideLoading: () => {},
  showLoading: () => {},
};

export const LayoutContext =
  createContext<ContextLoading>(initialValuesContext);

export default ({ children }: { children: ReactNode }) => {
  const values = initialValues();
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};
