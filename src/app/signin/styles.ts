/** @format */

import styled, { darken, lighten } from "@/src/theme/styled";

const styleSheet = styled()(({ theme }) => ({
  whapperSiginView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    backgroundColor: theme.pallet.primary.background,
    padding: 20,
  },
  headerSiginView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    //padding: 20,
  },
  textSiginHeader: {
    width: "75%",
    textAlign: "center",
    fontSize: 21,
    fontWeight: 700,
  },
  containerSiginView: {
    width: "100%",
    marginBottom: 55,
  },
  backgroundInitial: {
    position: "absolute",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  avatar: { 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRadius: 100,
    borderColor: lighten(theme.pallet.primary.main, 60)
  }
}));

export default styleSheet;
