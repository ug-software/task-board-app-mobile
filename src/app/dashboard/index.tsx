/** @format */

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CircularProgress,
  Icon,
  IconButton,
  Typograph,
} from "@/src/components";
import { FlatList, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import styleSheet from "./styles";
import { lighten } from "@/src/theme/styled";
import { useLayout, useNotification, useProject, useRouter, useTasks, useUser } from "@/src/hooks";
import { ProjectsAndPercentTaskCompleted } from "@/src/hooks/use-project";
import { icons } from "@/src/constants";
import { User } from "@/src/interfaces/user";

export default () => {
  const styles = styleSheet();
  const { handleGetCurrentUser } = useUser();
  const { redirect } = useRouter();
  const { handleChangeToolbar } = useLayout();
  const { getPercentTasksCompletedPerDate } = useTasks();
  const [tasksPercent, setTasksPercent] = useState<number>(0);
  const { getProjectsAndTasksPercentFinishPerDay } = useProject();
  const { updateNotifications, ...notification } = useNotification();
  const [projects, setProjects] = useState<ProjectsAndPercentTaskCompleted[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    handleChangeToolbar(true);
    (async () => {
      var user = await handleGetCurrentUser();
      setUser(user);

      var projects = await getProjectsAndTasksPercentFinishPerDay(new Date());

      if(Array.isArray(projects)){
        setProjects(projects);
      }

      var percentTasks = await getPercentTasksCompletedPerDate(new Date());
      setTasksPercent(percentTasks);

      var notificationsQnt = await updateNotifications();
      if(notificationsQnt){
        notification.set(notificationsQnt);
      }
    })();
  }, [])

  return (
    <View style={styles.whapperDashboard}>
      <View style={styles.whapperHeaderDashboard}>
        {user ? 
          user.img !== "" ? (
            <Avatar
              size='large'
              img={{
                uri: user.img,
              }}
            /> 
          ) : (
            <Avatar
              size='large'
            >{user.name[0]}</Avatar>
          ) : 
          null 
        }
        <View style={styles.whapperGreetings}>
          <Typograph variant='h5'>Olá!</Typograph>
          <Typograph variant='h3' fontWeight='600'>
            {user ? user?.name : ""}
          </Typograph>
        </View>
        <View>
          <Badge badgeContent={notification.notifications}>
            <IconButton onPress={redirect("/notifications")} variant='outlined'>
              <Icon type='Feather' name='bell' />
            </IconButton>
          </Badge>
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
        {
          projects.length === 0 ? (
            <View style={{ paddingHorizontal: 15 }}>
              <Alert label="Não há projetos com tarefas registradas pro dia atual." severity="info" variant="container" />
            </View>
          ) : (
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
          )
        }
      </SafeAreaView>
    </View>
  );
};
