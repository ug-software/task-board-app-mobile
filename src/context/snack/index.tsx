/** @format */

import React, { createContext, ReactNode } from "react";
import initialValues from "./initial-values";

export interface Message {
    phase: string | null;
    variant: "outlined" | "container" | "filled";
    severity: "success" | "error" | "warning" | "info";
}

export interface ContextSnack {
  open: boolean;
  state: Message;
  schedule:(props: Message) => void
}

const initialValuesContext: ContextSnack = {
    open: false,
    state: {
        phase: null,
        severity: "success",
        variant: "container"
    },
    schedule: () => {}
};

export const SnackContext =
  createContext<ContextSnack>(initialValuesContext);

export default ({ children }: { children: ReactNode }) => {
  const values = initialValues();  
  return (
    <SnackContext.Provider value={values}>{children}</SnackContext.Provider>
  );
};
