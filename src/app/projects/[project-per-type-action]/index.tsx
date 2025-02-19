/** @format */

import { Button, Card, Icon, IconButton, TextField, Typograph } from "@/src/components";
import BottomSheet from "@/src/components/button/sheet";
import { IconProps } from "@/src/components/icon";
import { FlatList, Pressable, Text, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styleSheetColor, styleSheetIcon, styleSheetPageProject } from "./styles"
import { colors, icons } from "@/src/constants";
import { useForm, useProject } from "@/src/hooks";
import Project from "@/src/interfaces/project";
import { useLocalSearchParams } from "expo-router";

interface CardIconProjectProps extends IconProps<any> {
  open: boolean,
  color: string | undefined,
  helperText: string | undefined,
  handleChangeIcon: (icon: string) => void,
  handleChangeModal: () => void
}
const CardIcon = ({ name, type, open, color, helperText, handleChangeIcon, handleChangeModal, ...props } : CardIconProjectProps) => {
  const styles = styleSheetIcon({ color });  

  if(helperText !== "" && helperText !== undefined){
    styles.wrapperIcon.borderColor = "red";
  }

  return(
    <>
      <Pressable style={styles.wrapperIcon} onPress={handleChangeModal}>
        <View style={styles.containerIcon}>
          {
            type ? (
              <Icon color={color} size={3 * 16} name={name} type={type} {...props}/>
            ) : (
              //@ts-ignore
              <Icon color={helperText && "red"} name="edit" type="MaterialIcons" />
            )
          }
        </View>
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
  handleChangeModal: () => void,
  helperText: string | undefined,
}
const CardColor = ({color, open, helperText, handleChangeColor, handleChangeModal} : CardColorProjectProps) => {
  const styles = styleSheetColor();
  return(
    <>
    <Pressable onPress={handleChangeModal}>
      <View style={[styles.whapperColor, { backgroundColor: color }]}>
        {/* @ts-ignore */}
        <Icon color={helperText && "red"} name="edit" type="MaterialIcons" />
      </View>
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
      icon: undefined,
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
        <View style={[{backgroundColor: values.color}, styles.wrapperColorContainer]}>
          <CardColor 
            helperText={errors?.color}
            open={modalOpen.color} 
            color={values.color ? values.color : "#FFFF"}
            handleChangeColor={handleChangeColor} 
            handleChangeModal={handleChangeModal("color")} 
          />
          <CardIcon
            helperText={errors?.icon}
            color={values.color}
            open={modalOpen.icon}
            //@ts-ignore
            name={values.icon ? icons[values.icon].name : null} 
            type={values.icon ? icons[values.icon].package : null}
            handleChangeIcon={handleChangeIcon} 
            handleChangeModal={handleChangeModal("icon")} 
          />
        </View>
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
      </View>
      <Button variant="contained" onPress={handleSubmit}>Salvar</Button>
    </ScrollView>
  );
};
