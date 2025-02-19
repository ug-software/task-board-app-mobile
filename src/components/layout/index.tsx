/** @format */

import React from "react";
import { ReactNode } from "react";
import { View } from "react-native";
import { AppBar, TollbarApp, Layout } from "./components";
import styleSheet from "./styles";
import Avatar from "../avatar";
import Icon from "../icon";
import IconButton from "../icon-button";
import Tollbar from "../tollbar";
import { useLayout, useRouter } from "@/src/hooks";
import SnackProvider from "../snack";
import Loading from "../loading";
import { router } from "expo-router";

export interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  const { barAppShow, headerShow, handleBack } = useLayout();
  const style = styleSheet({...props, layoutOn: false});
  const { redirect } = useRouter();  

  return (
    <View style={style.whapperLayout}>
      <Loading/>
      <SnackProvider/>
      <Tollbar />
      {headerShow && (
        <TollbarApp
          pl={10}
          pr={20}
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'>
          <IconButton onPress={handleBack} id='button-return-page' variant='outlined'>
            <Icon size={28} type='MaterialCommunityIcons' name='arrow-left' />
          </IconButton>
          <Avatar
            //@ts-ignore
            onPress={redirect("profile")}
            size='small'
            img={{
              uri: "https://media.istockphoto.com/id/950688808/pt/foto/enjoying-cocktail-at-the-pool.jpg?s=1024x1024&w=is&k=20&c=tF1c_z6KUZwkSgvvRA2r0vxDbc0ac27sFeu0XdMkvq4=",
            }}
          />
        </TollbarApp>
      )}
      {props.children}
      {barAppShow && <AppBar />}
    </View>
  );
};
export { TollbarApp, Layout };
