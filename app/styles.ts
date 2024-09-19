/** @format */

import { styled } from "@/theme";

var createStyles = styled(() => ({
  textDescription: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: "center",
    marginBottom: 30,
  },
  textTitle: {
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 10,
  },
  backgroundInitial: {
    position: "absolute",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  imageInitial: {
    width: "100%",
    objectFit: "contain",
    marginBottom: 50,
  },
  containerLoginPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: 20,
  },
  whapperLoginPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
}));

export default createStyles;
