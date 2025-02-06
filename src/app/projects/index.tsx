/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import styleSheet from "./styles";
import { Card, Icon, Typograph } from "@/src/components";
import { icons } from "@/src/constants";
import { lighten } from "@/src/theme/styled";
import IconButton from "@/src/components/icon-button";
import ButtonSheet from "@/src/components/button/sheet";
import { useProject, useRouter } from "@/src/hooks";
import Project from "@/src/interfaces/project";

interface StateProjectPage {
  open: boolean,
  type: null | string,
  item: undefined | Project,
}

export default () => {
  const styles = styleSheet();
  const { redirect } = useRouter();
  const { getAllProjects } = useProject();
  const [projects, setProjects] = useState<Project[]>([]);
  const [action, setAction] = useState<StateProjectPage>({
    open: false,
    type: null,
    item: undefined,
  });

  useEffect(() => {
    (async () => {
      var data = await getAllProjects();      
      if(data !== null){
        setProjects(data);
      }
    })()
    return;
  }, [])

  return (
    <View style={styles.whapperProjects}>
      <View style={styles.headerProjects}>
        {/*@ts-ignore*/}
        <IconButton onPress={redirect({ pathname: "/projects/add" })} variant='contained'>
          <Icon type='MaterialCommunityIcons' name='plus' />
        </IconButton>
      </View>
      <SafeAreaView style={styles.containerProjects}>
        <FlatList
          data={projects}
          renderItem={({ index, item }) => (
            <Card key={index} style={styles.containerProject}>
              <View style={styles.infoProject}>
                <View style={styles.infoNameProject}>
                  <View
                    style={[
                      { backgroundColor: lighten(item.color, 85) },
                      styles.iconProject,
                    ]}>
                    <Icon
                      //@ts-ignore
                      type={icons[item.icon].package}
                      //@ts-ignore
                      name={icons[item.icon].name}
                      color={item.color}
                      size={35}
                    />
                  </View>
                  <Typograph fontWeight='500' variant='h4'>
                    {item.name}
                  </Typograph>
                </View>
                <IconButton
                  variant='outlined'
                  onPress={() => setAction((state) => ({ ...state, open: true, item }))}
                >
                  <Icon type='MaterialCommunityIcons' name='dots-vertical' />
                </IconButton>
              </View>
              {item.description !== null && (
                <View>
                  <Typograph style={{ padding: 5 }} variant='paragraph'>
                    {item.description}
                  </Typograph>
                </View>
              )}
            </Card>
          )}
        />
      </SafeAreaView>
      <ButtonSheet
        onRequestClose={() => setAction((state) => ({ ...state, open: false }))}
        open={action.open}
        height={200}>
          {/*@ts-ignore*/}
          <Pressable onPress={redirect({ pathname: `/projects/edit?id=${action.item?.id}` })} style={styles.menuDialogItem}>
            <Icon
                style={styles.menuDialogIcon}
                type='MaterialIcons'
                //@ts-ignore
                name='mode-edit'
                size={25}
              />
            <Typograph variant='h5' fontWeight={500}>
              Editar
            </Typograph>
          </Pressable>
          <Pressable  style={styles.menuDialogItem}>
            <Icon
                style={styles.menuDialogIcon}
                type='MaterialIcons'
                //@ts-ignore
                name='delete'
                size={25}
              />
            <Typograph variant='h5' fontWeight={500}>
              Deletar
            </Typograph>
          </Pressable>
      </ButtonSheet>
    </View>
  );
};
