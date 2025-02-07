/** @format */

import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import {
  Button,
  Card,
  Chip,
  Drag,
  GrowingViewer,
  Icon,
  IconButton,
  Typograph,
  Calendary
} from "@/src/components";
import DateButtom from "./components/date-button";
import styleSheet from "./styles";
import tasksList from "@/src/mock/task-list";
import { DateTime, formatInHours, getDaysTheMouth } from "@/src/utils/date";
import { lighten } from "@/src/theme/styled";
import { mouths } from "@/src/constants/calendary";
import { useCalendary, useRouter } from "@/src/hooks";



const filters = ["Todos", "A fazer", "Em progresso", "Inativos", "Concluidos"];

export default () => {
  const { redirect } = useRouter();
  const styles = styleSheet({});
  const flatListRef = useRef<FlatList>(null);
  const { calendary, currentDay, handleChangeCalendary, handleSetDateCurrent } = useCalendary();

  useEffect(() => {
    // Rolando para o dia 10 após a montagem do componente
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({
        index: calendary.day.getDate() - 1,
        animated: true,
      });
    }
  }, []);

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
      <GrowingViewer
        durationAnimation={0}
        maxHeight={425}
        minHeight={125}
        id='dates'>
        {(Open, Close) => (
          <>
            <Close durationAnimation={100}>
              <FlatList
                ref={flatListRef}
                getItemLayout={(item, index) => ({
                  length: 75,
                  offset: 50,
                  index,
                })}
                contentContainerStyle={{ alignItems: "center" }}
                data={calendary.dates}
                renderItem={({ index, item }) => (
                  <DateButtom
                    key={index}
                    day={item.day}
                    year={item.year}
                    month={item.month}
                    date={item.dayOfTheWeek.abbreviated}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </Close>
            <Open durationAnimation={100}>
              <Drag
                height='100%'
                width='100%'
                onDragPress={handleChangeCalendary}>
                <Calendary month={calendary.month} year={calendary.year} />
              </Drag>
            </Open>
          </>
        )}
      </GrowingViewer>
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
      <SafeAreaView id='tasks' style={styles.containerTasks}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={tasksList}
          renderItem={({ index, item }) => (
            <Card style={styles.whapperTask} key={index}>
              <View style={styles.whapperTaskInfoGroup}>
                <Typograph variant='h6'>{item.group}</Typograph>
                <View
                  style={[
                    { backgroundColor: lighten(item.icon.color, 85) },
                    styles.whapperIconTaskGroup,
                  ]}>
                  <Icon
                    //@ts-ignore
                    name={item.icon.name}
                    //@ts-ignore
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
                  <Typograph pl={5} color='primary' variant='h6'>
                    {formatInHours(item.date)}
                  </Typograph>
                </View>
                <Chip color={item.status.color}>{item.status.value}</Chip>
              </View>
            </Card>
          )}
        />
        <View style={styles.whapperAction}></View>
      </SafeAreaView>
    </View>
  );
};
