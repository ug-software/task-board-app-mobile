/** @format */

import { useState } from "react";
import { Href, router } from "expo-router";

export default () => {
  const [layout, setLayout] = useState({
    headerShow: false,
    barAppShow: false,
    history: [],
  });

  const handleChangeLayout = (headerShow: boolean, barAppShow: boolean) => {
    setLayout(state => ({
      ...state,
      headerShow,
      barAppShow
    }));
  };

  const handleBack = () => {
    setLayout(state => {
      if(layout.history.length === 0) return state;
      
      var last = layout.history[layout.history.length - 2];
      state.history.pop();
      //@ts-ignore
      router.navigate(last);
      return state;
    });
  }

  const handleChangeBack = (href: any) => {
    var last = layout.history[layout.history.length - 1] as any;

    if(last !== undefined && last.pathname === href.pathname){
      return;
    }

    //@ts-ignore
    setLayout(state => ({ ...state, history: [...state.history, href] }));
  }

  return { ...layout, handleChangeLayout, handleBack, handleChangeBack };
};
