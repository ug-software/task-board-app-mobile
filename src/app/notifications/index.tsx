import { useNotification } from "@/src/hooks";
import Notification from "@/src/interfaces/notification";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default () => {
    var [notifications, setNotifications] = useState<Notification[]>([]);
    const { getAllNotifications } = useNotification();

    useEffect(() => {
        (async () => {
            var notifications = await getAllNotifications();
            setNotifications(notifications);
        })()
    }, [])

    return(
        <View>
            <Text>Notificações</Text>
        </View>
    );
}