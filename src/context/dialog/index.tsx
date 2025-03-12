/** @format */

import React, { createContext, ReactNode } from "react";
import initialValues, { OnProps } from "./initial-values";

export interface ContextDialog {
  open: boolean;
  title: string;
  description: string;
  confirm: Function | null;
  handleChange: () => void;
  on: (props: OnProps) => void
}

const initialValuesContext: ContextDialog = {
  open: false,
  title: "",
  description: "",
  confirm: null,
  handleChange: () => {},
  on: (props: OnProps) => {}
};

export const DialogContext =
  createContext<ContextDialog>(initialValuesContext);

export default ({ children }: { children: ReactNode }) => {
  const values = initialValues();
  return (
    <DialogContext.Provider value={values}>{children}</DialogContext.Provider>
  );
};
