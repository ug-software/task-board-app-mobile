/** @format */

import React, { createContext, ReactNode } from "react";
import initialValues from "./initial-values";

export interface ContextLayout {
  headerShow: boolean;
  barAppShow: boolean;
  handleChangeLayout: (headerShow: boolean, barAppShow: boolean) => void;
}

const initialValuesContext: ContextLayout = {
  headerShow: false,
  barAppShow: false,
  handleChangeLayout: function (headerShow, barAppShow) {
    this.headerShow = headerShow;
    this.barAppShow = barAppShow;
  },
};

export const LayoutContext = createContext<ContextLayout>(initialValuesContext);

export default ({ children }: { children: ReactNode }) => {
  const values = initialValues();
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};
