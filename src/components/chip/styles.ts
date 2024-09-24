/** @format */

import { styled } from "@/src/theme";
import { ligten } from "@/src/theme/styled";

export default styled(({ theme }) => ({
  whapperChip: {
    backgroundColor: ligten(theme.pallet.primary.primary, 85),
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 50,
    color: theme.pallet.primary.primary,
  },
}));
