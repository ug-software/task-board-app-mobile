/** @format */

import { styled } from "@/src/theme";
import { AvatarProps } from ".";
import { constant } from "@/src/theme";

export default styled<{ size: AvatarProps["size"] }>()(({ size, theme }) => ({
  whapperAvatar: {
    height: constant.avatar.size[size],
    width: constant.avatar.size[size],
    borderRadius: constant.avatar.size[size],
    backgroundColor: theme.pallet.primary.main,
    alignItems: "center",
    justifyContent: "center"
  },
  imageAvatar: {
    borderRadius: constant.avatar.size[size],
    height: constant.avatar.size[size],
    width: constant.avatar.size[size],
  },
  textAvatar: {
    fontSize: size === "extra-large" ? constant.avatar.size.small : 30,
    textAlign: "center",
    fontWeight: 500,
    color: theme.pallet.primary.background
  }
}));
