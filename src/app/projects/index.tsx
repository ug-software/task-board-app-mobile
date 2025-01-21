/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import styleSheet from "./styles";
import { Card, Dialog, Icon, TextField, Typograph } from "@/src/components";
import tasksGroup from "@/src/mock/tasks-group";
import { ligten } from "@/src/theme/styled";
import IconButton from "@/src/components/icon-button";
import ButtonSheet from "@/src/components/button/sheet";
import { useRouter } from "@/src/hooks";

export default () => {
  const styles = styleSheet();
  const { redirect } = useRouter();
  const [action, setAction] = useState({
    open: false,
    isSearch: false,
    type: null,
    item: null,
  });
  return (
    <View style={styles.whapperProjects}>
      <View style={styles.headerProjects}>
        {action.isSearch && (
          <TextField
            name="project-name"
            label='Qual projeto deseja achar ?'
            variant='filed'
            style={{ width: "80%" }}
          />
        )}
        <IconButton
          onPress={() =>
            setAction((state) => ({ ...state, isSearch: !state.isSearch }))
          }
          variant='outlined'>
          <Icon
            type='Octicons'
            //@ts-ignore
            name='search'
          />
        </IconButton>
        <IconButton onPress={redirect("/projects/edit")} variant='contained'>
          <Icon type='MaterialCommunityIcons' name='plus' />
        </IconButton>
      </View>
      <SafeAreaView style={styles.containerProjects}>
        <FlatList
          data={tasksGroup}
          renderItem={({ index, item }) => (
            <Card key={index} style={styles.containerProject}>
              <View style={styles.infoProject}>
                <View style={styles.infoNameProject}>
                  <View
                    style={[
                      { backgroundColor: ligten(item.icon.color, 85) },
                      styles.iconProject,
                    ]}>
                    <Icon
                      //@ts-ignore
                      type={item.icon.package}
                      //@ts-ignore
                      name={item.icon.name}
                      color={item.icon.color}
                      size={35}
                    />
                  </View>
                  <Typograph fontWeight='500' variant='h4'>
                    {item.name}
                  </Typograph>
                </View>
                <IconButton
                  variant='outlined'
                  onPress={() =>
                    setAction((state) => ({ ...state, open: true }))
                  }>
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
        {[
          {
            name: "Editar",
            Icon: () => (
              <Icon
                style={styles.menuDialogIcon}
                type='MaterialIcons'
                //@ts-ignore
                name='mode-edit'
                size={30}
              />
            ),
          },
          {
            name: "Deletar",
            Icon: () => (
              <Icon
                style={styles.menuDialogIcon}
                type='MaterialIcons'
                //@ts-ignore
                name='delete'
                size={30}
              />
            ),
          },
        ].map(({ name, Icon }, index) => (
          <Pressable key={index} style={styles.menuDialogItem}>
            <Icon />
            <Typograph variant='h5' fontWeight={500}>
              {name}
            </Typograph>
          </Pressable>
        ))}
      </ButtonSheet>
    </View>
  );
};
