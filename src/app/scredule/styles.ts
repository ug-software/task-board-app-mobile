/** @format */

import { styled } from "@/src/theme";
import { ligten } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
  whapperScredule: {
    backgroundColor: theme.pallet.primary.background,
    height: "100%",
    paddingTop: 10,
    //paddingHorizontal: 10
  },
  mouthAndYearInfo: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingHorizontal: 20,
  },
  mouthAndYear: {
    display: "flex",
    alignItems: "stretch",
    //paddingLeft: 10,
  },
  actionsScredule: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  whapperFilters: {
    marginTop: 10,
  },
  whapperAction: {
    position: "absolute",
    bottom: 290,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    //padding: 10,
  },
  containerTasks: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    //paddingVertical: 10,
  },
  whapperTask: {
    //paddingHorizontal: 10,
    //paddingVertical: 10,
  },
  whapperTaskInfoGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    //paddingHorizontal: 5,
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
    //paddingHorizontal: 5,
    flexDirection: "row",
  },
  whapperTaskIconClock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  taskIconClock: {
    fontSize: 14,
    //paddingRight: 5,
    color: theme.pallet.primary.primary,
  },
}));
