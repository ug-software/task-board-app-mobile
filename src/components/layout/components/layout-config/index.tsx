/** @format */

import { useLayout } from "@/src/hooks";
import useTheme from "@/src/theme/use-theme";
import { usePathname } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import { ReactNode, useEffect } from "react";

interface LayoutConfigProps {
  showAppBar: boolean;
  showHeaderApp: boolean;
  children: ReactNode;
}

export default ({ children, showAppBar, showHeaderApp }: LayoutConfigProps) => {
  const { handleChangeLayout, handleChangeBack } = useLayout();
  const path = usePathname();
  const theme = useTheme();

  useEffect(() => {
    handleChangeLayout(showHeaderApp, showAppBar);
  }, []);

  useEffect(() => {
    //@ts-ignore
    handleChangeBack({ pathname: path })
  }, [path]);

  return (
    <>
      <ExpoStatusBar
        style='dark'
        backgroundColor={theme.pallet.primary.background}
      />
      {children}
    </>
  );
};
