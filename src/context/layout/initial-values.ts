/** @format */

import { useState } from "react";

export default () => {
  const [layout, setLayout] = useState({
    headerShow: false,
    barAppShow: false,
  });

  const handleChangeLayout = (headerShow: boolean, barAppShow: boolean) => {
    setLayout({
      headerShow,
      barAppShow,
    });
  };

  return { ...layout, handleChangeLayout };
};
