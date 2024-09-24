/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from "react-native";
import { TollbarApp } from "@/src/components/layout";
import {
  Button,
  Card,
  Chip,
  Icon,
  IconButton,
  Typograph,
} from "@/src/components";
import DateButtom from "./components/date-button";
import createStyles from "./styles";
import tasksList from "@/src/mock/task-list";
import { formatInHours } from "@/src/utils/date";
import { ligten } from "@/src/theme/styled";

const initialDates = [
  new Date(2024, 8, 16),
  new Date(2024, 8, 17),
  new Date(2024, 8, 18),
  new Date(2024, 8, 19),
  new Date(2024, 8, 20),
  new Date(2024, 8, 21),
  new Date(2024, 8, 22),
];

const filters = ["Todos", "A fazer", "Em progresso", "Inativos", "Concluidos"];

export default () => {
  const styles = createStyles({});
  const flatListRef = useRef<FlatList>(null);
  const [dates, setDates] = useState<Date[]>(initialDates);
  const [observable, setObservable] = useState({
    initial: false,
    final: false,
  });

  useEffect(() => {
    // Rolando para o dia 10 após a montagem do componente
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({ index: 3, animated: true });
    }
  }, []);

  useEffect(() => {
    if (observable.initial) {
      console.log("chegou ao inicio");
      /*var firstDate = dates[0];
      var week = Array.from({ length: 7 }).map((x, index) => {
        var date = new Date(firstDate);
        return new Date(date.setDate(date.getDate() - index - 1));
      });
      setDates((state) => [...week.reverse(), ...state]);*/
    }
  }, [observable]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    // Verifica se está no início
    //var isAtStart = contentOffset.x < -1;
    console.log({
      initial: observable.initial,
    });
    if (contentOffset.x < -1) {
      setObservable((state) => ({ ...state, initial: true }));
    } else {
      setObservable((state) => ({ ...state, initial: false }));
    }

    // Verifica se está no final
    /*if (contentOffset.x + layoutMeasurement.width >= contentSize.width) {
      var lastDate = dates[-1];
      var newWeek = Array(7).map((x) => {
        return new Date(lastDate.setDate(lastDate.getDate() - x));
      });
      console.log(newWeek);
      //setDates((state) => [...newWeek, ...state]);
    }*/
  };

  return (
    <View style={styles.whapperScredule}>
      <TollbarApp
        pl={20}
        pr={20}
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'>
        <IconButton id='button-return-page' variant='outlined'>
          <Icon size={28} type='MaterialCommunityIcons' name='arrow-left' />
        </IconButton>
        <Typograph variant='h3' fontWeight='500'>
          Setembro
        </Typograph>
        <IconButton id='button-select-date' variant='outlined'>
          <Icon size={28} type='MaterialCommunityIcons' name='calendar' />
        </IconButton>
      </TollbarApp>
      <SafeAreaView id='dates'>
        <FlatList
          ref={flatListRef}
          onScroll={onScroll}
          getItemLayout={(item, index) => ({
            length: 75,
            offset: 50,
            index,
          })}
          contentContainerStyle={{ alignItems: "center" }}
          data={dates}
          renderItem={({ index, item }) => (
            <DateButtom
              key={index}
              day={item.getDay()}
              date={item.getDate()}
              mounth={item.getMonth()}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
      <SafeAreaView id='dates' style={styles.whapperFilters}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          renderItem={({ index, item }) => (
            <Button size='small' ml={5} variant='text'>
              {item}
            </Button>
          )}
        />
      </SafeAreaView>
      <SafeAreaView id='tasks' style={styles.whapperTask}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={tasksList}
          renderItem={({ index, item }) => (
            <Card style={styles.whapperTask} key={index}>
              <View style={styles.whapperTaskInfoGroup}>
                <Typograph variant='h6'>{item.group}</Typograph>
                <View
                  style={[
                    { backgroundColor: ligten(item.icon.color, 85) },
                    styles.whapperIconTaskGroup,
                  ]}>
                  <Icon
                    name={item.icon.name}
                    type={item.icon.package}
                    color={item.icon.color}
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
                  <Typograph color='primary' variant='h6'>
                    {formatInHours(item.date)}
                  </Typograph>
                </View>
                <Chip>{item.status}</Chip>
              </View>
            </Card>
          )}
        />
      </SafeAreaView>
    </View>
  );
};
