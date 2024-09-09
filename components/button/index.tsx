/** @format */

import React from "react";
import Contained from "./contained";
import { IButtonProps } from "./interface";

export default ({ variant, ...props }: IButtonProps) => {
  return <Contained {...props} />;
};
