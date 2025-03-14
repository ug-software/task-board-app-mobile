/** @format */

import { styled } from "@/src/theme";
import { darken } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
  whapperScredule: {
    backgroundColor: theme.pallet.primary.background,
    height: "100%",
    paddingTop: 10,
    paddingHorizontal: 10
  },
  mouthAndYearInfo: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  mouthAndYear: {
    display: "flex",
    alignItems: "stretch",
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
  },
  containerTasks: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingTop: 10,
    paddingBottom: 225
  },
  whapperTask: {
    padding: 10
  },
  whapperTaskInfoGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: theme.pallet.primary.primary,
  },
  menuDialogWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
  },
  menuDialogItem: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 10,
    //width: 50,
  },
  menuDialogContainer: {
    borderColor: darken(theme.pallet.primary.background, 10),
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 15,
    marginBottom: 5
  },
  menuDialogIcon: {
    color: darken(theme.pallet.primary.background, 80),
  },
  containerTextField: {
    marginBottom: 15,
    paddingHorizontal: 15,
    width: "100%"
  },
}));
