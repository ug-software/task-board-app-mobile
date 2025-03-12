/** @format */

import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, FlatList, Pressable } from "react-native";
import {
  Button,
  Card,
  Chip,
  Drag,
  Icon,
  IconButton,
  Typograph,
  Calendary,
  Alert,
  DragDivider,
  SelectField,
  Option
} from "@/src/components";
import ButtonSheet from "@/src/components/button/sheet";
import DateButtom from "./components/date-button";
import styleSheet from "./styles";
import { formatInHours } from "@/src/utils/date";
import { lighten } from "@/src/theme/styled";
import { mouths } from "@/src/constants/calendary";
import { useCalendary, useLoading, useRouter, useTasks } from "@/src/hooks";
import Tasks, { TasksWithProjects } from "@/src/interfaces/task";
import { icons, status as Status } from "@/src/constants";
import { StatusOption } from "./[schedule-per-type-action]";

const filters = ["Todos", "A fazer", "Em progresso", "Inativo", "Concluido"];

interface StateSchedulePage {
  open: boolean,
  type: null | string,
  item: undefined | Tasks,
}

export default () => {
  const loader = useLoading();
  const styles = styleSheet({});
  const { redirect } = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [tasks, setTasks] = useState<TasksWithProjects[]>([]);
  const { getAllTasksPerDate, handleChangeStatusPerId, handleDeleteTasksPerId } = useTasks();
  const [isFullCalendary, setIsFullCalendary] = useState<boolean>(false);
  const [filterTasks, setFilterTasks] = useState<TasksWithProjects[]>([]);
  const { calendary, handleChangeCalendary, handleSetDateCurrent, handleChangeDate } = useCalendary();
  const [action, setAction] = useState<StateSchedulePage>({
    open: false,
    type: null,
    item: undefined,
  });

  const handleChangeFullCalendary = (direction: "up" | "down") => {    
    if(direction === "up"){
      setIsFullCalendary(false);
    }else {
      setIsFullCalendary(true);
    }
  };

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
  });

  const handleSelectTask = (item: Tasks) => {
    setAction(state => ({
      ...state,
      open: true,
      item
    }));
  };

  const handleChangeStatus = async (id: number, status: string) => {
    var isSuccess = await handleChangeStatusPerId(id, status);

    if(isSuccess){
      setAction(state => ({...state, open: false}));
      var tasks = await getAllTasksPerDate(calendary.day);      
      if(Array.isArray(tasks)){
        setTasks(tasks);
        setFilterTasks(tasks);
      }
    }
  };

  const handleConfirmDelection = (id: number) => {
    handleDeleteTasksPerId(id, async () => {
      setAction(state => ({
        ...state,
        open: false
      }));

      var tasks = await getAllTasksPerDate(calendary.day);
      if(Array.isArray(tasks)){
        setTasks(tasks);
        setFilterTasks(tasks);
      }
    });
  }

  //scroll to current day
  useEffect(() => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({
        index: calendary.day.getDate() - 1,
        animated: true,
      });
    }
  }, []);
  
  //get tasks
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
                <Button key={index} onPress={() => handleFilterPerStatus(item)} size='small' ml={5} variant='text'>
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
              <Pressable onPress={() => handleSelectTask(item)}>
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
                        {formatInHours(item.date_marked)}
                      </Typograph>
                    </View>
                    {/* @ts-ignore */}
                    <Chip color={Status[item.status].color}>{Status[item.status].label}</Chip>
                  </View>
                </Card>
              </Pressable>
            )}
          />
        )}
        <View style={styles.whapperAction}></View>
      </View>
      <ButtonSheet
        onRequestClose={() => setAction((state) => ({ ...state, open: false }))}
        open={action.open}
        height={250}>
          <View style={styles.containerTextField}>
            <SelectField
              label="Alterar status: "
              name="status"
              //@ts-ignore
              onChangeText={(status) => handleChangeStatus(action.item!.id, status)}
              //@ts-ignore
              value={action.item ? Status[action.item.status].label : null}
              fullWidth
            >
              {
                  Object.keys(Status).map((sts, index) => (
                      <Option key={index} value={sts}>
                          <StatusOption
                              //@ts-ignore
                              label={Status[sts].label}
                              //@ts-ignore
                              color={Status[sts].color}
                              key={index}
                          />
                      </Option>
                  ))
              }
            </SelectField>
          </View>
          <View style={styles.menuDialogWrapper}>
            {/*@ts-ignore*/}
            <Pressable onPress={redirect({ pathname: `/schedule/edit?id=${action.item?.id}` })} style={styles.menuDialogItem}>
              <View style={styles.menuDialogContainer}>
                <Icon
                    style={styles.menuDialogIcon}
                    type='MaterialIcons'
                    //@ts-ignore
                    name='mode-edit'
                    size={25}
                  />
              </View>
              <Typograph variant='h6' fontWeight={500}>
                Editar
              </Typograph>
            </Pressable>
            <Pressable
              //@ts-ignore
              onPress={() => handleConfirmDelection(action.item?.id)} 
              style={styles.menuDialogItem}
            >
              <View style={styles.menuDialogContainer}>
                <Icon
                    style={styles.menuDialogIcon}
                    type='MaterialIcons'
                    //@ts-ignore
                    name='delete'
                    size={25}
                  />
              </View>
              <Typograph variant='h6' fontWeight={500}>
                Deletar
              </Typograph>
            </Pressable>
          </View>
      </ButtonSheet>
    </View>
  );
};
