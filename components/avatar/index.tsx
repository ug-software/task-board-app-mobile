/** @format */

import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import createStyles from "./styles";

export interface AvatarProps {
  img?: ImageSourcePropType;
  children?: string;
  size: "small" | "medium" | "large";
}

export default ({ children, size, img }: AvatarProps) => {
  const { whapperAvatar, imageAvatar } = createStyles({ size });
  if (img !== undefined) {
    return (
      <View style={whapperAvatar}>
        <Image
          source={img}
          //@ts-ignore
          style={imageAvatar}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};
