/** @format */

import { styled } from "@/src/theme";

export default styled(({ theme }) => ({
  whapperProjects: {
    backgroundColor: theme.pallet.primary.background,
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
  },
  headerProjects: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  containerProjects: {
    height: "100%",
    width: "100%",
    marginTop: 20,
  },
  containerProject: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: "100%",
  },
  infoProject: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoNameProject: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconProject: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 50,
    width: 50,
    marginRight: 10,
  },
  menuDialogItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    width: 120,
  },
  menuDialogIcon: {
    color: theme.pallet.primary.primary,
    marginRight: 10,
  },
}));
