/** @format */

import { useState } from "react";
import { router } from "expo-router";

export default () => {
  const [layout, setLayout] = useState({
    tollbar: false,
    headerShow: false,
    barAppShow: false,
    history: [],
  });

  const handleChangeLayout = (headerShow: boolean, barAppShow: boolean, tollbar = true) => {
    setLayout(state => ({
      ...state,
      tollbar,
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
    //@ts-ignore
    setLayout(state => {
      var last = state.history[state.history.length - 1] as any;
      
      if(last !== undefined && last.pathname === href.pathname){
        return state;
      }

      return { ...state, history: [...state.history, href] }
    });
  }

  const handleChangeToolbar = (isView: boolean) => {
    setLayout(state => ({
      ...state,
      tollbar: isView
    }));
  }

  return { ...layout, handleChangeLayout, handleBack, handleChangeBack, handleChangeToolbar };
};
