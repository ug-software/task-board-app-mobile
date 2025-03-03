/** @format */

import React, { useEffect } from "react";
import { Avatar, Button, Icon, IconButton, TextField } from "@/src/components";
import { Text, View, Image, TextInput } from "react-native";
import styleSheet from "./styles";
import { useForm, useLayout, useRouter, useUser } from "@/src/hooks";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default () => {
  const {
    whapperSiginView,
    headerSiginView,
    textSiginHeader,
    containerSiginView,
    backgroundInitial,
    avatar
  } = styleSheet();
  const { redirect } = useRouter();
  const { handleValidationUser, handleSaveUser } = useUser();
  const { handleChangeToolbar } = useLayout();
  const { errors, handleChange, handleSubmit, values } = useForm({
    initialValues: {
      name: "",
      email: "",
      description: "",
      img: ""
    },
    onSubmit: handleSaveUser,
    onValidation: handleValidationUser
  });

  const selectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });

    if (!result.canceled) {      
      const { uri, mimeType } = result.assets[0];

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      handleChange({ name: "img", value: `data:${mimeType};base64, ${base64}` });
    }
  };

  useEffect(() => {
    handleChangeToolbar(false);
  }, []);

  return (
    <View style={whapperSiginView}>
      <Image
        //@ts-ignore
        style={backgroundInitial}
        source={require("@/assets/images/background-colors-circles.png")}
      />
      <View style={headerSiginView}>
        <IconButton variant='outlined' onPress={redirect("/")}>
          <Icon type='MaterialCommunityIcons' name='arrow-left' />
        </IconButton>
        <Text style={textSiginHeader}>Criar usuario</Text>
      </View>
      <View>
        <View style={{position: "relative", alignItems: "center", justifyContent: "center"}}>
          <View style={{position: "absolute", zIndex: 99}}>
            <IconButton variant="contained" onPress={selectImage}>
              {/* @ts-ignore */}
              <Icon type='MaterialIcons' name='camera-alt' />
            </IconButton>
          </View>
          {
            values.img === "" ? (
              <Avatar
                size='extra-large'
                style={avatar}
                img={require("@/assets/images/background-colors-circles.png")}
              />
            ) : (
              <Avatar
                size='extra-large'
                style={avatar}
                img={{
                  uri: values.img
                }}
              />
            )
          }
        </View>
      </View>
      <View style={containerSiginView}>
        <TextField
          variant='filed'
          fullWidth
          style={{ marginTop: 15 }}
          label='Nome Completo *'
          name="name"
          onChangeText={value => handleChange({name: "name", value})}
          error={Boolean(errors?.name)}
          helperText={errors?.name}
        />
        <TextField 
          variant='filed' 
          fullWidth style={{ marginTop: 15 }} 
          label='E-mail *'
          name="email"
          onChangeText={value => handleChange({name: "email", value})}
          error={Boolean(errors?.email)}
          helperText={errors?.email}
        />
        <TextField
          variant='filed'
          fullWidth
          style={{ marginTop: 15 }}
          multiline={true}
          numberOfLines={6}
          label='Descreva um pouco sobre você'
          name="description"
          onChangeText={value => handleChange({name: "description", value})}
          error={Boolean(errors?.description)}
          helperText={errors?.description}
        />
        <TextInput aria-label='teste' />
        <Button
          mt={30}
          fullWidth
          variant='contained'
          onPress={handleSubmit}>
          Acessar
        </Button>
      </View>
    </View>
  );
};
