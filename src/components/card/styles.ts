/** @format */

import { styled } from "@/src/theme";
import { darken } from "@/src/theme/styled";

export default styled(({ theme }) => ({
  whapperCard: {
    width: "100%",
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darken(theme.pallet.primary.background, 5),
    backgroundColor: theme.pallet.primary.background,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: darken(theme.pallet.primary.background, 20),
    marginBottom: 10,
  },
}));
