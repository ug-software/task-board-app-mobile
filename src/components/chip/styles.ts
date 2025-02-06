/** @format */

import { styled } from "@/src/theme";
import { darken, lighten } from "@/src/theme/styled";
import { ChipProps } from ".";

export default styled<Omit<ChipProps, "children">>()(({ theme, color }) => ({
  whapperChip: {
    backgroundColor: !color
      ? lighten(theme.pallet.primary.primary, 85)
      : lighten(color, 85),
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 50,
    color: color ? darken(color, 40) : theme.pallet.primary.primary,
  },
}));
