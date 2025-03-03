/** @format */

import React, { createContext, ReactNode } from "react";
import initialValues from "./initial-values";

export interface ContextNotification {
  notifications: number,
  sum: () => void,
  decrease: () => void,
  set: (value: number) => void
}

const initialValuesContext: ContextNotification = {
  notifications: 0,
  sum: () => {},
  decrease: () => {},
  set: (value: number) => {}
};

export const NotificationContext =
  createContext<ContextNotification>(initialValuesContext);

export default ({ children }: { children: ReactNode }) => {
  const values = initialValues();  
  return (
    <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>
  );
};
