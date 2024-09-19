/** @format */

import { styled } from "@/theme";
import { AvatarProps } from ".";
import { constant } from "@/theme";

export default styled<{ size: AvatarProps["size"] }>(({ size }) => ({
  whapperAvatar: {
    height: constant.avatar.size[size],
    width: constant.avatar.size[size],
    borderRadius: 50,
  },
  imageAvatar: {
    borderRadius: 50,
    height: constant.avatar.size[size],
    width: constant.avatar.size[size],
  },
}));
