/** @format */

import { styled } from "@/src/theme";
import { AvatarProps } from ".";
import { constant } from "@/src/theme";

export default styled<{ size: AvatarProps["size"] }>()(({ size }) => ({
  whapperAvatar: {
    height: constant.avatar.size[size],
    width: constant.avatar.size[size],
    borderRadius: constant.avatar.size[size],
  },
  imageAvatar: {
    borderRadius: constant.avatar.size[size],
    height: constant.avatar.size[size],
    width: constant.avatar.size[size],
  },
}));
