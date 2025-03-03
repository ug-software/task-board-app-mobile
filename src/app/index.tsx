/** @format */

import { useLayout, useNotification, useRouter } from "@/src/hooks";
import { Image, Text, View } from "react-native";
import { Button } from "@/src/components";
import React, { useEffect } from "react";
import styleSheet from "./styles";

export default () => {
  const {
    textDescription,
    textTitle,
    backgroundInitial,
    imageInitial,
    containerLoginPage,
    whapperLoginPage,
  } = styleSheet();
  const { handleChangeToolbar } = useLayout();
  const { redirect } = useRouter();
  const { handleGetAutorizationForNotification } = useNotification();

  useEffect(() => {
    handleGetAutorizationForNotification();
    handleChangeToolbar(false);
  }, []);

  return (
    <View style={whapperLoginPage}>
      <Image
        source={require("@/assets/images/background-colors-circles.png")}
        //@ts-ignore
        style={backgroundInitial}
      />
      <View style={containerLoginPage}>
        <Image
          source={require("@/assets/images/background-image-initial-app.png")}
          //@ts-ignore
          style={imageInitial}
        />
        <Text style={textTitle}> Task Manager and To-Do </Text>
        <Text style={textDescription}>
          Organize e gerencie sua vida de maneira eficiente. Liste seus
          compromissos, crie lembretes e acompanhe seu progresso com facilidade.
        </Text>
        <Button
          mb={10}
          fullWidth
          variant='contained'
          onPress={redirect("/dashboard")}>
          Acessar
        </Button>
        <Button fullWidth variant='contained' onPress={redirect("/signin")}>
          Cadastrar
        </Button>
      </View>
    </View>
  );
};
