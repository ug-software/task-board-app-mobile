/** @format */

import { styled } from "@/src/theme";
import { darken } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
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
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    minHeight: 55,
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
  menuDialogWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10
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
}));
