/** @format */

import { styled } from "@/src/theme";
import { darken } from "@/src/theme/styled";

export default styled(({ theme }) => ({
  whapperCalendary: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    flexDirection: "row",
    height: "100%",
  },
  headerWeek: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  week: {
    isplay: "flex",
    flexDirection: "row",
    width: "100%",
    height: 60,
  },
  day: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 60,
  },
  isCurrent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "80%",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.pallet.primary.primary,
  },
  fontColor: {
    color: darken(theme.pallet.primary.background, 40),
  },
}));
