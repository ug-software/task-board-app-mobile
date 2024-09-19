/** @format */

import styled from "@/theme/styled";

const createStyles = styled(() => ({
  whapperSiginView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  headerSiginView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 45,
    padding: 20,
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
    padding: 20,
  },
  backgroundInitial: {
    position: "absolute",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
}));

export default createStyles;
