/** @format */

import { styled } from "@/theme";
import { ligten } from "@/theme/styled";

export default styled(({ theme }) => ({
  whapperDashboard: {
    backgroundColor: theme.pallet.primary.background,
    height: "100%",
  },
  whapperHeaderDashboard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  whapperGreetings: {
    flex: 2,
    paddingHorizontal: 15,
  },
  whapperTodayTaskPercent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 15,
    marginBottom: 20,
    width: "100%",
    height: 170,
  },
  containerTodayTaskPercent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "95%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: ligten(theme.pallet.primary.primary, 85),
  },
  actionsTodayTaskPercent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    width: "50%",
  },
  whapperTasksGroups: {},
  flatListTaksGroups: {
    paddingHorizontal: 20,
    height: "55%",
  },
  containerTaskGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  infoTaskGroup: {
    display: "flex",
    flexDirection: "row",
  },
  iconTaskGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
  },
  textTaskGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));
