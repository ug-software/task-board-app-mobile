/** @format */

import { styled } from "@/src/theme";
import { darken, ligten } from "@/src/theme/styled";
import { ChipProps } from ".";

export default styled<Omit<ChipProps, "children">>(({ theme, color }) => ({
  whapperChip: {
    backgroundColor: !color
      ? ligten(theme.pallet.primary.primary, 85)
      : ligten(color, 85),
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 50,
    color: color ? darken(color, 40) : theme.pallet.primary.primary,
  },
}));
