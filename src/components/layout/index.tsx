/** @format */

import { AppBar, TollbarApp, Layout } from "./components";
import { useLayout, useRouter, useUser } from "@/src/hooks";
import IconButton from "../icon-button";
import SnackProvider from "../snack";
import { View } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import styleSheet from "./styles";
import Tollbar from "../tollbar";
import Loading from "../loading";
import Dialog from "../dialog";
import Avatar from "../avatar";
import Icon from "../icon";
import React from "react";
import { User } from "@/src/interfaces/user";

export interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { handleGetCurrentUser } = useUser();
  const { barAppShow, headerShow, handleBack, tollbar } = useLayout();
  const style = styleSheet({...props, layoutOn: false});
  const { redirect } = useRouter();  

  useEffect(() => {
    (async () => {
      var user = await handleGetCurrentUser();
      setUser(user);
    })()
  }, [])

  return (
    <View style={style.whapperLayout}>
      <Dialog>
        <Loading/>
        <SnackProvider/>
        {tollbar && <Tollbar />}
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
            {user ? 
              user.img !== "" ? (
                <Avatar
                  onPress={redirect("/profile")}
                  size='small'
                  img={{
                    uri: user.img,
                  }}
                /> 
              ) : (
                <Avatar
                  onPress={redirect("/profile")}
                  size='small'
                >{user.name[0]}</Avatar>
              ) : 
              null 
            }
          </TollbarApp>
        )}
        {props.children}
        {barAppShow && <AppBar />}
      </Dialog>
    </View>
  );
};

export { TollbarApp, Layout };
