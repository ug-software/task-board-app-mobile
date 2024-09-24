/** @format */

import { styled } from "@/src/theme";
import { ligten } from "@/src/theme/styled";

export default styled(({ theme }) => ({
  whapperScredule: {
    backgroundColor: theme.pallet.primary.background,
    height: "100%",
  },
  whapperFilters: {
    marginTop: 10,
  },
  whapperTask: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  whapperTaskInfoGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  whapperIconTaskGroup: {
    padding: 5,
    borderRadius: 8,
  },
  whapperTaskInfoStatus: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  whapperTaskIconClock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  taskIconClock: {
    fontSize: 18,
    paddingRight: 5,
    color: theme.pallet.primary.primary,
  },
}));
