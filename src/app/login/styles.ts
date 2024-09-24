/** @format */

import styled from "@/src/theme/styled";

const createStyles = styled(() => ({
  whapperLoginView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  containerLoginView: {
    width: "100%",
    marginBottom: 55,
    padding: 20,
  },
  headerLoginView: {
    width: "100%",
    marginTop: 40,
    padding: 20,
  },
  backgroundInitial: {
    position: "absolute",
    objectFit: "cover",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
}));

export default createStyles;
