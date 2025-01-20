/** @format */

import { useLayout } from "@/src/hooks";
import useTheme from "@/src/theme/use-theme";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import { ReactNode, useEffect } from "react";

interface LayoutConfigProps {
  showAppBar: boolean;
  showHeaderApp: boolean;
  children: ReactNode;
}

export default ({ children, showAppBar, showHeaderApp }: LayoutConfigProps) => {
  const { handleChangeLayout } = useLayout();
  const theme = useTheme();

  useEffect(() => {
    handleChangeLayout(showHeaderApp, showAppBar);
  }, []);

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
