/** @format */

import { useLayout, useNotification, useRouter, useUser } from "@/src/hooks";
import { Image, Text, View } from "react-native";
import { Button } from "@/src/components";
import React, { useEffect, useState } from "react";
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
  const { handleGetCurrentUser } = useUser();
  const { redirect } = useRouter();
  const { handleChangeToolbar } = useLayout();
  const [ existNotUser, setExistNotUser ] = useState<boolean>(true);
  const { handleGetAutorizationForNotification } = useNotification();

  useEffect(() => {
    handleGetAutorizationForNotification();
    handleChangeToolbar(false);

    (async () => {
      var user = await handleGetCurrentUser();
      if(user){
        setExistNotUser(false);
      }
    })();
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
        {!existNotUser ? (
          <Button
            mb={10}
            fullWidth
            variant='contained'
            onPress={redirect("/dashboard")}
            disabled={existNotUser}
          >
            Acessar
          </Button>
        ) : (
          <Button 
            fullWidth 
            variant='contained' 
            onPress={redirect("/signin")}
            disabled={!existNotUser}
          >
            Cadastrar
          </Button>
        )}
      </View>
    </View>
  );
};
