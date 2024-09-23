/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { TollbarApp } from "@/components/layout";
import { Icon, IconButton, Typograph } from "@/components";
import { createStyles, stylesButtonDate } from "./styles";

const days = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

const initialDates = [
  new Date(2024, 8, 16),
  new Date(2024, 8, 17),
  new Date(2024, 8, 18),
  new Date(2024, 8, 19),
  new Date(2024, 8, 20),
  new Date(2024, 8, 21),
  new Date(2024, 8, 22),
];

interface DateButtomProps {
  date: number;
  day: number;
  mounth: number;
}

const DateButtom = ({ date, day, mounth }: DateButtomProps) => {
  const today = new Date();
  const isActiveDate = today.getDate() === date && today.getMonth() === mounth;
  const styles = stylesButtonDate({
    isActiveDate,
  });

  return (
    <Pressable style={styles.whapperDateButtom}>
      <Typograph
        style={styles.textColor}
        fontSize={25}
        variant='h4'
        fontWeight={isActiveDate ? "600" : "400"}>
        {date}
      </Typograph>
      <Typograph
        style={styles.textColor}
        variant='h5'
        fontWeight={isActiveDate ? "600" : "400"}>
        {days[day]}
      </Typograph>
    </Pressable>
  );
};

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
        <IconButton variant='outlined'>
          <Icon size={28} type='MaterialCommunityIcons' name='arrow-left' />
        </IconButton>
        <Typograph variant='h3' fontWeight='500'>
          Setembro
        </Typograph>
        <IconButton variant='outlined'>
          <Icon size={28} type='MaterialCommunityIcons' name='calendar' />
        </IconButton>
      </TollbarApp>
      <SafeAreaView>
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
    </View>
  );
};
