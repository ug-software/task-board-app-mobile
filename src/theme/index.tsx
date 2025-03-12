/** @format */
import React from "react";
import { ReactNode } from "react";
import ContextTheme from "./context";
import { Theme } from "./interfaces";
import styled from "./styled";
import * as constant from "./constants";

interface IContextProvider {
  children: ReactNode;
  theme: Theme;
}

export default ({ children, theme }: IContextProvider) => {
  return (
    <ContextTheme.Provider value={theme}>{children}</ContextTheme.Provider>
  );
};

export { ContextTheme, styled, constant };
