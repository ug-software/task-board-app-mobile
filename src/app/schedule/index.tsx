/** @format */

import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, FlatList, Task, Text } from "react-native";
import {
  Button,
  Card,
  Chip,
  Drag,
  GrowingViewer,
  Icon,
  IconButton,
  Typograph,
  Calendary,
  Alert,
  DragDivider
} from "@/src/components";
import DateButtom from "./components/date-button";
import styleSheet from "./styles";
import tasksList from "@/src/mock/task-list";
import { DateTime, formatInHours, getDaysTheMouth } from "@/src/utils/date";
import { lighten } from "@/src/theme/styled";
import { mouths } from "@/src/constants/calendary";
import { useCalendary, useLoading, useProject, useRouter, useTasks } from "@/src/hooks";
import { TasksWithProjects } from "@/src/interfaces/task";
import { icons, status as Status } from "@/src/constants";



const filters = ["Todos", "A fazer", "Em progresso", "Inativo", "Concluido"];

export default () => {
  const { redirect } = useRouter();
  const styles = styleSheet({});
  const flatListRef = useRef<FlatList>(null);
  const [isFullCalendary, setIsFullCalendary] = useState<boolean>(false);

  const [tasks, setTasks] = useState<TasksWithProjects[]>([]);
  const [filterTasks, setFilterTasks] = useState<TasksWithProjects[]>([]);
  const { calendary, handleChangeCalendary, handleSetDateCurrent, handleChangeDate } = useCalendary();
  const { getAllTasksPerDate } = useTasks();
  const loader = useLoading();

  const handleChangeFullCalendary = (direction: "up" | "down") => {    
    if(direction === "up"){
      setIsFullCalendary(false);
    }else {
      setIsFullCalendary(true);
    }
  }

  const handleFilterPerStatus = loader.action(async (filter: string) => {
    if(filter === "Todos"){
      setFilterTasks(tasks);
      return Promise.resolve();  
    }

    //@ts-ignore
    var status = Object.keys(Status).find(x => Status[x].label === filter);
    var fill = tasks.filter(task => task.status === status);

    setFilterTasks(fill);
    return Promise.resolve();
  })

  // Rolando para o dia 10 após a montagem do componente
  useEffect(() => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({
        index: calendary.day.getDate() - 1,
        animated: true,
      });
    }
  }, []);
  
  //obtendo tasks
  useEffect(() => {
    (async () => {
      var tasks = await getAllTasksPerDate(calendary.day);      
      if(Array.isArray(tasks)){
        setTasks(tasks);
        setFilterTasks(tasks);
      }
    })();
  }, [calendary.day]);  

  return (
    <View style={styles.whapperScredule}>
      <View style={styles.mouthAndYearInfo}>
        <View style={styles.mouthAndYear}>
          <Typograph variant='h3' fontWeight='500'>
            {
              //@ts-ignore
              mouths[calendary.month].full
            }
          </Typograph>
          <Typograph variant='subtitle' fontWeight='500'>
            {calendary.year}
          </Typograph>
        </View>
        <View style={styles.actionsScredule}>
          <IconButton
              onPress={() => setIsFullCalendary(state => !state)}
              id='button-return-page'
              variant='outlined'>
              <Icon
                size={28}
                type='MaterialCommunityIcons'
                name='calendar-month-outline'
              />  
          </IconButton>
          <IconButton
            onPress={handleSetDateCurrent}
            id='button-return-page'
            variant='outlined'>
            <Icon
              size={28}
              type='MaterialCommunityIcons'
              name='calendar-outline'
            />
          </IconButton>
          <IconButton
            //@ts-ignore
            onPress={redirect({ pathname: "/schedule/add" })} 
            variant='contained'
          >
            <Icon type='MaterialCommunityIcons' name='plus' />
          </IconButton>
        </View>
      </View>
      <View>
        {!isFullCalendary ? (
            <FlatList
              horizontal
              ref={flatListRef}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center" }}
              data={calendary.dates}
              keyExtractor={(item, index) => index.toString()}
              getItemLayout={(data, index) => ({
                length: 40,
                offset: 63 * index,
                index,
              })}
              renderItem={({ index, item }) => (
                <DateButtom
                  isActive={item.year === calendary.day.getFullYear() && item.month === calendary.day.getMonth() && item.day === calendary.day.getDate()}
                  onPress={() => handleChangeDate(new Date(item.year, item.month, item.day))}
                  key={index}
                  day={item.day}
                  year={item.year}
                  month={item.month}
                  date={item.dayOfTheWeek.abbreviated}
                />
              )}
            />
          ) : (
            <Drag
              width='100%'
              onDragPress={handleChangeCalendary}
            >
            <Calendary currentDate={calendary.day} month={calendary.month} year={calendary.year} onSelectDate={handleChangeDate} />
          </Drag>
        )}
      </View>
      <DragDivider onDragRelease={handleChangeFullCalendary}/>
      {
        tasks.length > 0 && (
          <SafeAreaView id='dates' style={styles.whapperFilters}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filters}
              renderItem={({ index, item }) => (
                <Button onPress={() => handleFilterPerStatus(item)} size='small' ml={5} variant='text'>
                  {item}
                </Button>
              )}
            />
          </SafeAreaView>
        )
      }
      <View id='tasks' style={styles.containerTasks}>
        {filterTasks.length === 0 ? (
          <Alert label="Não há tarefas a serem exibidas" severity="info" variant="container"/>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterTasks}
            renderItem={({ index, item }) => (
              <Card style={styles.whapperTask} key={index}>
                <View style={styles.whapperTaskInfoGroup}>
                  <Typograph variant='h6'>{item.project!.name}</Typograph>
                  <View
                    style={[
                      { backgroundColor: lighten(item.project!.color, 85) },
                      styles.whapperIconTaskGroup,
                    ]}>
                    <Icon
                      //@ts-ignore
                      name={icons[item.project!.icon].name}
                      //@ts-ignore
                      type={icons[item.project!.icon].package}
                      color={item.project!.color}
                    />
                  </View>
                </View>
                <Typograph pl={5} pr={5} pb={8} variant='h4' fontWeight={500}>
                  {item.name}
                </Typograph>
                <View style={styles.whapperTaskInfoStatus}>
                  <View style={styles.whapperTaskIconClock}>
                    <Icon
                      type='AntDesign'
                      name='clockcircle'
                      style={styles.taskIconClock}
                    />
                    <Typograph pl={5} color='primary' variant='h6'>
                      {formatInHours(item.date)}
                    </Typograph>
                  </View>
                  {/* @ts-ignore */}
                  <Chip color={Status[item.status].color}>{Status[item.status].label}</Chip>
                </View>
              </Card>
            )}
          />
        )}
        <View style={styles.whapperAction}></View>
      </View>
    </View>
  );
};
