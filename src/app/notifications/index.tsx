import { Alert, Card, Icon } from "@/src/components";
import { icons } from "@/src/constants";
import { useNotification } from "@/src/hooks";
import Notification from "@/src/interfaces/notification";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, FlatList, Pressable, Animated } from "react-native";
import createStyleSheet from "./styles";
import { lighten } from "@/src/theme/styled";

const CardNotification = ({ handlePress, ...item }: Notification & { handlePress : (id: number) => void }) => {
    const styles = createStyleSheet();
    const [ height ] = useState(new Animated.Value(95));

    const onPress = () => {
        Animated.timing(height, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
        }).start();

        setTimeout(() => handlePress(item.id), 500);
    }

    return(
        <Animated.View style={{ height: height }}>
            <Pressable onPress={onPress}>
                <Card style={styles.cardNotification}>
                    {/*@ts-ignore*/}
                    <View  style={[{backgroundColor: lighten(item.project?.color, 80)}, styles.cardIconNotification]}>
                        {/*@ts-ignore*/}
                        <Icon size={30} name={icons[item.project?.icon].name} type={icons[item.project?.icon].package} color={item.project?.color} />
                    </View>
                    <Text style={styles.cardTextNotification}>A tarefa {item.task?.name}, do projeto {item.project?.name} está atrasada.</Text>
                </Card>
            </Pressable>
        </Animated.View>
    );
}

export default () => {
    const styles = createStyleSheet();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { getAllNotifications, handleChangeStatusNotification } = useNotification();

    const handleCheckedStatus = (id: number) => {
        handleChangeStatusNotification(id);
        setNotifications(state => state.filter(x => x.id !== id));
    }

    useEffect(() => {
        (async () => {
            var notifications = await getAllNotifications();
            setNotifications(notifications);
        })()
    }, []);

    return(
        <SafeAreaView style={styles.wrapperNotifications}>
            {notifications.length === 0 ? (
                <Alert label="Não há notificações" severity="info" variant="container"/>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={({item, index}) => <CardNotification handlePress={handleCheckedStatus} key={index} {...item} />}
                />
            )}
        </SafeAreaView>
    );
}