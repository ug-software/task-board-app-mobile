/** @format */

import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Icon,
  IconButton,
  Tollbar,
  Typograph,
} from "@/components";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import React from "react";
import createStyles from "./styles";
import { ligten } from "@/theme/styled";

const colors = [
  "#1E90FF",
  "#FF6F61",
  "#28A745",
  "#FFD700",
  "#800080",
  "#FF7F50",
  "#008080",
  "#800080",
  "#FF4500",
  "#A9A9A9",
];

const tasksGroup = [
  {
    name: "Office Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "office-building-outline",
      color: "#1E90FF",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "finish",
      },
    ],
  },
  {
    name: "Personal Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "bag-personal",
      color: "#FF6F61",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "open",
      },
    ],
  },
  {
    name: "Daily Study",
    icon: {
      package: "Entypo",
      name: "book",
      color: "#28A745",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "active",
      },
    ],
  },
  {
    name: "Office Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "office-building-outline",
      color: "#1E90FF",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "finish",
      },
    ],
  },
  {
    name: "Personal Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "bag-personal",
      color: "#FF6F61",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "open",
      },
    ],
  },
  {
    name: "Daily Study",
    icon: {
      package: "Entypo",
      name: "book",
      color: "#28A745",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "active",
      },
    ],
  },
  {
    name: "Office Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "office-building-outline",
      color: "#1E90FF",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "finish",
      },
    ],
  },
  {
    name: "Personal Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "bag-personal",
      color: "#FF6F61",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "open",
      },
    ],
  },
  {
    name: "Daily Study",
    icon: {
      package: "Entypo",
      name: "book",
      color: "#28A745",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "active",
      },
    ],
  },
  {
    name: "Office Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "office-building-outline",
      color: "#1E90FF",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "finish",
      },
    ],
  },
  {
    name: "Personal Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "bag-personal",
      color: "#FF6F61",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "open",
      },
    ],
  },
  {
    name: "Daily Study",
    icon: {
      package: "Entypo",
      name: "book",
      color: "#28A745",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "active",
      },
    ],
  },
  {
    name: "Office Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "office-building-outline",
      color: "#1E90FF",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "finish",
      },
    ],
  },
  {
    name: "Personal Project",
    icon: {
      package: "MaterialCommunityIcons",
      name: "bag-personal",
      color: "#FF6F61",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "open",
      },
    ],
  },
  {
    name: "Daily Study",
    icon: {
      package: "Entypo",
      name: "book",
      color: "#28A745",
    },
    tasks: [
      {
        name: "",
        description: "",
        status: "active",
      },
    ],
  },
];

export default () => {
  const styles = createStyles({});
  return (
    <View style={styles.whapperDashboard}>
      <Tollbar />
      <View style={styles.whapperHeaderDashboard}>
        <Avatar
          size='large'
          img={{
            uri: "https://media.istockphoto.com/id/950688808/pt/foto/enjoying-cocktail-at-the-pool.jpg?s=1024x1024&w=is&k=20&c=tF1c_z6KUZwkSgvvRA2r0vxDbc0ac27sFeu0XdMkvq4=",
          }}
        />
        <View style={styles.whapperGreetings}>
          <Typograph variant='h5'>Olá!</Typograph>
          <Typograph variant='h3' fontWeight='600'>
            Livia Vaccaro
          </Typograph>
        </View>
        <View>
          <IconButton variant='outlined'>
            <Icon type='Feather' name='bell' />
          </IconButton>
        </View>
      </View>
      <View style={styles.whapperTodayTaskPercent}>
        <View style={styles.containerTodayTaskPercent}>
          <View style={styles.actionsTodayTaskPercent}>
            <Typograph fontWeight='500' variant='h5' color='light'>
              Seu percentual de tarefas concluidas!
            </Typograph>
            <Button fullWidth mt={10} variant='contained'>
              Tarefas
            </Button>
          </View>
          <View>
            <CircularProgress
              size={50}
              suffix='%'
              strokeColor='default'
              strokeSize={12}
              value={60}
            />
          </View>
        </View>
      </View>
      <SafeAreaView style={styles.whapperTasksGroups}>
        <Typograph pl={20} pb={15} fontWeight={"600"} variant='h3'>
          Ultimos Projetos
        </Typograph>
        <FlatList
          style={styles.flatListTaksGroups}
          data={tasksGroup}
          renderItem={({ index, item }) => (
            <Card key={index} style={styles.containerTaskGroup}>
              <View style={styles.infoTaskGroup}>
                <View
                  style={[
                    { backgroundColor: ligten(item.icon.color, 85) },
                    styles.iconTaskGroup,
                  ]}>
                  <Icon
                    //@ts-ignore
                    type={item.icon.package}
                    //@ts-ignore
                    name={item.icon.name}
                    color={item.icon.color}
                    size={25}
                  />
                </View>
                <View style={styles.textTaskGroup}>
                  <Typograph fontWeight='500' variant='h5'>
                    {item.name}
                  </Typograph>
                  <Typograph variant='h6'>{`${item.tasks.length} Task's`}</Typograph>
                </View>
              </View>
              <CircularProgress
                suffix='%'
                size={30}
                strokeColor={item.icon.color}
                strokeSize={6}
                value={60}
              />
            </Card>
          )}
        />
      </SafeAreaView>
    </View>
  );
};
