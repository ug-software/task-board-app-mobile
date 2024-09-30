/** @format */

import React from "react";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import createStyles from "./styles";
import Typograph from "../typograph";

export interface ChipProps {
  children: ReactNode;
  color?: string;
}

export default ({ children, ...props }: ChipProps) => {
  const styles = createStyles(props);

  if (typeof children === "string") {
    return (
      <Typograph
        color={props.color}
        variant='paragraph'
        style={styles.whapperChip}>
        {children}
      </Typograph>
    );
  }

  return <View style={styles.whapperChip}>{children}</View>;
};
