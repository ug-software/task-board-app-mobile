/** @format */

import { useContext } from "react";
import { LayoutContext } from "../context/layout";

export default () => {
  const { barAppShow, handleChangeLayout, headerShow, handleBack, handleChangeBack, handleChangeToolbar, tollbar } =  useContext(LayoutContext);
  return { barAppShow, handleChangeLayout, headerShow, handleChangeBack, handleBack, handleChangeToolbar, tollbar };
};
