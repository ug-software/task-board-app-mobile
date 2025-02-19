/** @format */

import React, { createContext, ReactNode } from "react";
import initialValues from "./initial-values";
import { Href } from "expo-router";

export interface ContextLayout {
  headerShow: boolean;
  barAppShow: boolean;
  history: Href<string | object>[]
  handleChangeLayout: (headerShow: boolean, barAppShow: boolean) => void;
  handleChangeBack: (href: Href<string | object>) => void
  handleBack: () => void
}

const initialValuesContext: ContextLayout = {
  headerShow: false,
  barAppShow: false,
  history: [],
  handleChangeLayout: function (headerShow, barAppShow) {
    this.headerShow = headerShow;
    this.barAppShow = barAppShow;
  },
  handleChangeBack: (href: Href<string | object>) => {},
  handleBack: () => {}
};

export const LayoutContext = createContext<ContextLayout>(initialValuesContext);

export default ({ children }: { children: ReactNode }) => {
  const values = initialValues();
  return (
    //@ts-ignore
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};
