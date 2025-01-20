/** @format */

import React from "react";
import { View, Text, Image, ImageSourcePropType, Pressable, PressableProps } from "react-native";
import styleSheet from "./styles";

export interface AvatarProps extends PressableProps {
  img?: ImageSourcePropType;
  children?: string;
  size: "small" | "medium" | "large" | "extra-large";
}

export default ({ children, size, img, ...props }: AvatarProps) => {
  const { whapperAvatar, imageAvatar } = styleSheet({ size });
  if (img !== undefined) {
    return (
      <Pressable style={whapperAvatar} {...props}>
        <Image
          source={img}
          //@ts-ignore
          style={imageAvatar}
        />
      </Pressable>
    );
  }

  return (
    <Pressable {...props}>
      <Text>{children}</Text>
    </Pressable>
  );
};
