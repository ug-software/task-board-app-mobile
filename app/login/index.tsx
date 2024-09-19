/** @format */

import React from "react";
import createStyles from "./styles";
import { View, Image } from "react-native";
import { useRouter } from "@/hooks";
import { Button, Icon, IconButton, TextField } from "@/components";

export default () => {
  const {
    whapperLoginView,
    containerLoginView,
    headerLoginView,
    backgroundInitial,
  } = createStyles({});
  const { redirect } = useRouter();

  return (
    <View style={whapperLoginView}>
      <Image
        source={require("../../assets/images/background-colors-circles.png")}
        //@ts-ignore
        style={backgroundInitial}
      />
      <View style={headerLoginView}>
        <IconButton variant='outlined' onPress={redirect("/")}>
          <Icon type='MaterialCommunityIcons' name='arrow-left-thick' />
        </IconButton>
      </View>
      <View style={containerLoginView}>
        <TextField
          style={{ marginBottom: 10 }}
          label='E-mail'
          variant='filed'
        />
        <TextField
          style={{ marginBottom: 20 }}
          label='Password'
          variant='filed'
        />
        <Button fullWidth variant='contained' onPress={redirect("/")}>
          Login
        </Button>
      </View>
    </View>
  );
};
