/** @format */

import { useContext } from "react";
import { LayoutContext } from "../context/layout";

export default () => {
  const { barAppShow, handleChangeLayout, headerShow, handleBack, handleChangeBack } =  useContext(LayoutContext);
  return { barAppShow, handleChangeLayout, headerShow, handleChangeBack, handleBack };
};
