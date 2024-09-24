/** @format */

import React from "react";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import createStyles from "./styles";
import Typograph from "../typograph";

interface ChipProps {
  children: ReactNode;
}

export default ({ children }: ChipProps) => {
  const styles = createStyles({});

  if (typeof children === "string") {
    return (
      <Typograph variant='paragraph' style={styles.whapperChip}>
        {children}
      </Typograph>
    );
  }

  return <View style={styles.whapperChip}>{children}</View>;
};
