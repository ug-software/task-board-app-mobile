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

export const LoadingContext =
  createContext<ContextLoading>(initialValuesContext);

export default ({ children }: { children: ReactNode }) => {
  const values = initialValues();
  return (
    <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>
  );
};
