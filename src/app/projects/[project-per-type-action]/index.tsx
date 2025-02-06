/** @format */

import { Button, Card, Icon, TextField, Typograph , } from "@/src/components";
import BottomSheet from "@/src/components/button/sheet";
import { IconProps } from "@/src/components/icon";
import { FlatList, Pressable, SafeAreaView, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styleSheetColor, styleSheetIcon, styleSheetPageProject } from "./styles"
import { colors, icons } from "@/src/constants";
import { useForm, useProject } from "@/src/hooks";
import Project from "@/src/interfaces/project";
import { useLocalSearchParams } from "expo-router";

interface CardIconProjectProps extends IconProps<any> {
  open: boolean,
  handleChangeIcon: (icon: string) => void,
  handleChangeModal: () => void
}
const CardIcon = ({ name, type, open, handleChangeIcon, handleChangeModal, ...props } : CardIconProjectProps) => {
  const styles = styleSheetIcon();
  return(
    <>
      <Pressable onPress={handleChangeModal}>
        <Card style={styles.whapperIcon}>
          <Icon size={3 * 16} name={name} type={type} {...props}/>
        </Card>
      </Pressable>
      <BottomSheet onRequestClose={handleChangeModal} height={500}  open={open}>
        <FlatList 
          data={Object.keys(icons)}
          columnWrapperStyle={{display: "flex", justifyContent: "space-around", marginBottom: 35}}
          numColumns={4}
          renderItem={({index, item}) => (
            <Pressable onPress={() => handleChangeIcon(item)}>
              <Card key={index} style={styles.whapperIcon}>
                {/*@ts-ignore*/}
                <Icon size={3 * 16} name={icons[item].name} type={icons[item].package} />
              </Card>
            </Pressable>
          )}
        />
      </BottomSheet>
    </>
  );
};

interface CardColorProjectProps {
  color: string,
  open: boolean,
  handleChangeColor: (color: string) => void,
  handleChangeModal: () => void
}
const CardColor = ({color, open, handleChangeColor, handleChangeModal} : CardColorProjectProps) => {
  const styles = styleSheetColor();
  return(
    <>
    <Pressable onPress={handleChangeModal}>
      <Card style={[styles.whapperColor, { backgroundColor: color }]}>
        <View/>
      </Card>
    </Pressable>
      <BottomSheet onRequestClose={handleChangeModal} height={500}  open={open}>
        <FlatList 
          data={Object.keys(colors)}
          columnWrapperStyle={{display: "flex", justifyContent: "space-around", marginBottom: 35}}
          numColumns={4}
          renderItem={({index, item}) => (
            <Pressable onPress={() => handleChangeColor(item)}>
              <Card key={index} style={[styles.whapperColor, { backgroundColor: item }]}>
                <View/>
              </Card>
              <Typograph style={{textAlign: "center"}} variant="subtitle">{colors[item]}</Typograph>
            </Pressable>
          )}
        />
      </BottomSheet>
    </>
  )
};

export default () => {
  const styles = styleSheetPageProject();
  const params = useLocalSearchParams();  
  const { handleSaveNewProject, handleUpdateProject, handleValidationProject, findProjectPerId } = useProject();
  const handleSubmitProject = params['project-per-type-action'] === 'edit' ? handleUpdateProject : handleSaveNewProject;

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues
  } = useForm<Partial<Project>>({
    initialValues: {
      name: "",
      description: "",
      icon: "#ICO0001",
      color: "#FFFF"
    },
    onSubmit: handleSubmitProject,
    onValidation: handleValidationProject
  });
  const [modalOpen, setModalOpen] = useState({
    color: false,
    icon: false
  });

  const handleChangeModal = (modal: "color" | "icon") => {
    return () => setModalOpen(state => ({...state, [modal]: !state[modal] }))
  };

  const handleChangeColor = (color: string) => {
    handleChange({name: "color", value: color })
    setModalOpen(state => ({...state, color: false}));
  };

  const handleChangeIcon = (icon: string) => {    
    handleChange({ name: "icon", value: icon });
    setModalOpen(state => ({...state, icon: false}));
  };

  useEffect(() => {
    if(params['project-per-type-action'] === 'edit'){
      var id = params['id'];
      
      (async () => {
        if(typeof id !== "string") return;

        const projectPerId = await findProjectPerId(Number.parseInt(id));
        
        if(projectPerId !== null){
          setValues(projectPerId);
        }
      })();
    }    
  }, []);

  return(
    <ScrollView contentContainerStyle={styles.whapperPageProject}>
      <View>
        <Typograph pb={20} pt={10} fontWeight={"500"} variant="h3">Adicionar Projeto:</Typograph>
        <View style={styles.containerTextField}>
          <TextField 
            fullWidth 
            name="name" 
            variant="filed" 
            label="Nome do projeto:*"
            value={values.name}
            onChangeText={(text) => handleChange({ name: "name", value: text })}
            error={Boolean(errors?.name)}
            helperText={errors?.name}
          />
        </View>
        <View style={styles.containerTextField}>
          <TextField 
            multiline 
            fullWidth 
            name="description" 
            numberOfLines={10} 
            variant="filed" 
            label="Descrição:*"
            value={values.description}
            onChangeText={(text) => handleChange({ name: "description", value: text })}
            error={Boolean(errors?.description)}
            helperText={errors?.description}
          />
        </View>
        <View style={styles.containerColorAndIcon}>
          <View style={styles.whapperColorAndIcon}>
            <Typograph variant="h6">Selecione o Icone:</Typograph>
            
              <CardIcon 
                open={modalOpen.icon}
                //@ts-ignore
                name={values.icon ? icons[values.icon].name : "customerservice"} 
                type={values.icon ? icons[values.icon].package : "AntDesign"}
                handleChangeIcon={handleChangeIcon} 
                handleChangeModal={handleChangeModal("icon")} 
              />
              <Typograph variant="paragraph">Icone Selecionado</Typograph>
          </View>
          <View style={styles.whapperColorAndIcon}>
            <Typograph variant="h6">Selecione a Cor:</Typograph>
              <CardColor 
                open={modalOpen.color} 
                color={values.color ? values.color : "#FFFF"}
                handleChangeColor={handleChangeColor} 
                handleChangeModal={handleChangeModal("color")} 
              />
              <Typograph variant="paragraph">Cor Selecionada</Typograph>
          </View>
        </View>
      </View>
      <Button variant="contained" onPress={handleSubmit}>Salvar</Button>
    </ScrollView>
  );
};
