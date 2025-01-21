/** @format */

import { Button, Card, Icon, TextField, Typograph , } from "@/src/components";
import BottomSheet from "@/src/components/button/sheet";
import { IconProps } from "@/src/components/icon";
import { FlatList, Pressable, SafeAreaView, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { styleSheetColor, styleSheetIcon, styleSheetPageProject } from "./styles"
import { colors, icons } from "@/src/constants";

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
  const [project, setProject] = useState({
    name: "",
    description: "",
    icon: "#ICO0001",
    color: "#FFFF"
  });
  const [modalOpen, setModalOpen] = useState({
    color: false,
    icon: false
  });
  const styles = styleSheetPageProject();

  const handleChangeModal = (modal: "color" | "icon") => {
    return () => setModalOpen(state => ({...state, [modal]: !state[modal] }))
  };

  const handleChangeColor = (color: string) => {
    setProject(state => ({...state, color}))
    setModalOpen(state => ({...state, color: false}));
  };

  const handleChangeIcon = (icon: string) => {    
    setProject(state => ({...state, icon}));
    setModalOpen(state => ({...state, icon: false}));
  };

  return(
    <ScrollView contentContainerStyle={styles.whapperPageProject}>
      <View>
        <Typograph pb={20} pt={10} fontWeight={"500"} variant="h3">Adicionar Projeto:</Typograph>
        <View style={styles.containerTextField}>
          <TextField name="name" fullWidth variant="filed" label="Nome do projeto:*" onChangeText={(text) => setProject(state => ({...state, name: text}))} />
        </View>
        <View style={styles.containerTextField}>
          <TextField name="description" multiline numberOfLines={10} fullWidth variant="filed" label="Descrição:*" onChangeText={(text) => setProject(state => ({...state, description: text}))} />
        </View>
        <View style={styles.containerColorAndIcon}>
          <View style={styles.whapperColorAndIcon}>
            <Typograph variant="h6">Selecione o Icone:</Typograph>
              <CardIcon handleChangeModal={handleChangeModal("icon")} handleChangeIcon={handleChangeIcon} open={modalOpen.icon} name={icons[project.icon].name} type={icons[project.icon].package}/>
              <Typograph variant="paragraph">Icone Selecionado</Typograph>
          </View>
          <View style={styles.whapperColorAndIcon}>
            <Typograph variant="h6">Selecione a Cor:</Typograph>
              <CardColor handleChangeModal={handleChangeModal("color")} handleChangeColor={handleChangeColor} open={modalOpen.color} color={project.color}/>
              <Typograph variant="paragraph">Cor Selecionada</Typograph>
          </View>
        </View>
      </View>
      <Button variant="contained">Salvar</Button>
    </ScrollView>
  );
};
