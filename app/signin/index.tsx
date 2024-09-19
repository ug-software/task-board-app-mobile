/** @format */

import { Button, Icon, IconButton, TextField } from "@/components";
import React from "react";
import { Text, View, Image, TextInput } from "react-native";
import createStyles from "./styles";
import { useRouter } from "@/hooks";

export default () => {
  const {
    whapperSiginView,
    headerSiginView,
    textSiginHeader,
    containerSiginView,
    backgroundInitial,
  } = createStyles({});
  const { redirect } = useRouter();

  return (
    <View style={whapperSiginView}>
      <Image
        //@ts-ignore
        style={backgroundInitial}
        source={require("../../assets/images/background-colors-circles.png")}
      />
      <View style={headerSiginView}>
        <IconButton variant='outlined' onPress={redirect("/")}>
          <Icon type='MaterialCommunityIcons' name='arrow-left-thick' />
        </IconButton>
        <Text style={textSiginHeader}>Criar Usuario</Text>
      </View>
      <View style={containerSiginView}>
        <TextField
          variant='filed'
          style={{ marginTop: 15 }}
          label='Nome Completo *'
        />
        <TextField variant='filed' style={{ marginTop: 15 }} label='E-mail *' />
        <TextField
          variant='filed'
          style={{ marginTop: 15 }}
          label='Password *'
        />
        <TextField
          variant='filed'
          style={{ marginTop: 15 }}
          label='Confirmar Password *'
        />
        <TextField
          variant='filed'
          style={{ marginTop: 15 }}
          multiline={true}
          numberOfLines={6}
          label='Descreva um pouco sobre você'
        />
        <TextInput aria-label='teste' />
        <Button
          mt={30}
          fullWidth
          variant='contained'
          onPress={redirect("/dashboard")}>
          Acessar
        </Button>
      </View>
    </View>
  );
};
