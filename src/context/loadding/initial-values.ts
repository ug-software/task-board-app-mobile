/** @format */

import { useState } from "react";

export default () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return { isLoading, showLoading, hideLoading };
};
