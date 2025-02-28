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
} from "@/src/components";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styleSheet from "./styles";
import { lighten } from "@/src/theme/styled";
import tasksGroup from "@/src/mock/tasks-group";
import { useProject, useRouter, useTasks } from "@/src/hooks";
import { ProjectsAndPercentTaskCompleted } from "@/src/hooks/use-project";
import { icons } from "@/src/constants";

export default () => {
  const styles = styleSheet({});
  const { redirect } = useRouter();
  const { getProjectsAndTasksPercentFinishPerDay } = useProject();
  const { getPercentTasksCompletedPerDate } = useTasks();
  const [tasksPercent, setTasksPercent] = useState<number>(0);
  const [projects, setProjects] = useState<ProjectsAndPercentTaskCompleted[]>([]);

  useEffect(() => {
    (async () => {
      var projects = await getProjectsAndTasksPercentFinishPerDay(new Date());

      if(Array.isArray(projects)){
        setProjects(projects);
      }

      var percentTasks = await getPercentTasksCompletedPerDate(new Date());
      setTasksPercent(percentTasks);
    })();
  }, [])

  return (
    <View style={styles.whapperDashboard}>
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
              Seu percentual de tarefas concluidas hoje !
            </Typograph>
            <Button 
              mt={10} 
              fullWidth 
              variant='contained'
              onPress={redirect("/schedule")} 
            >
              Tarefas
            </Button>
          </View>
          <View>
            <CircularProgress
              size={50}
              suffix='%'
              strokeColor='default'
              strokeSize={12}
              value={tasksPercent}
            />
          </View>
        </View>
      </View>
      <SafeAreaView style={styles.whapperTasksGroups}>
        <Typograph pl={20} pb={15} fontWeight={"600"} variant='h3'>
          Projetos com tarefas hoje
        </Typograph>
        <FlatList
          style={styles.flatListTaksGroups}
          data={projects}
          renderItem={({ index, item }) => (
            <Card key={index} style={styles.containerTaskGroup}>
              <View style={styles.infoTaskGroup}>
                <View
                  style={[
                    { backgroundColor: lighten(item.color, 85) },
                    styles.iconTaskGroup,
                  ]}>
                  <Icon
                    //@ts-ignore
                    type={icons[item.icon].package}
                    //@ts-ignore
                    name={icons[item.icon].name}
                    color={item.color}
                    size={25}
                  />
                </View>
                <View style={styles.textTaskGroup}>
                  <Typograph fontWeight='500' variant='h5'>
                    {item.name}
                  </Typograph>
                  {/*<Typograph variant='h6'>{`${item.tasks.length} Task's`}</Typograph>*/}
                </View>
              </View>
              <CircularProgress
                suffix='%'
                size={30}
                strokeColor={item.color}
                strokeSize={6}
                value={item.percent_task_completed}
              />
            </Card>
          )}
        />
      </SafeAreaView>
    </View>
  );
};
