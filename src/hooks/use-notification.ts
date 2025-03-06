import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../context/notification';
import * as Notifications from 'expo-notifications';
import { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { status } from '../constants';
import useSnack from './use-snack';
import Notification from '../models/notification-model';
import Task from '../models/task-model';
import useProject from './use-project';
import useLoading from './use-loading';

/* this hook have two functions, notifications for sistem and notification the past tasks days past go */

export default () => {
  const { findProjectPerId } = useProject();
  const { decrease, notifications, set, sum } = useContext(NotificationContext);
  const loader = useLoading();
  const snack = useSnack();

  const getAllNotifications = loader.action(async () => {
    var notifications = await Notification.findAllPerStatusCreated();

    return await Promise.all(notifications.map(async (notification) => {
      return {
        ...notification,
        task: await Task.findPerId(notification.task_id),
        project: await findProjectPerId(notification.project_id),
        created_at: notification.created_at ? new Date(notification.created_at) : new Date()
      };
    }));;
  });

  const updateNotifications = async () => {
    var today = new Date();
     var notifications = await Notification.findAllPerDate(today);
    if(notifications.length > 0){
      // a complete task, as you have already gone through this flow on the current day 
      return (await Notification.findAllPerStatusCreated()).length;
    }
    
    var initialDate = new Date(today.getFullYear(), today.getMonth(), 0);
    var finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

    var tasks = await Task.findAllBetweenDates(initialDate, finalDate);    
    if(Array.isArray(tasks)){
      
      await Promise.all(tasks.filter(x => x.status === status.created.name || x.status === status.inprogress.name).map(async task => {
        return await Notification.insert({
          project_id: task.project_id,
          task_id: task.id ? task.id : 0,
          status: "created",
          created_at: today
        });
      }));
    }

    return (await Notification.findAllPerStatusCreated()).length;
  }

  const handleChangeStatusNotification = async (id: number) => {
    return await Notification.changeStatusNotification(id, "created");
  }

  const handleGetAutorizationForNotification = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
  
    return finalStatus
  };

  const schedule = async(notification: Notifications.NotificationRequestInput) => {
      if(await handleGetAutorizationForNotification() !== "granted") return;  
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      await Notifications.scheduleNotificationAsync(notification);
  };

  const changePermissionNotification = loader.action(async () => {
    const value = await AsyncStorage.getItem('NOTIFICATION_PERMISSION');

    if(value === null || value === 'false'){
      await AsyncStorage.removeItem('NOTIFICATION_PERMISSION');
      await AsyncStorage.setItem('NOTIFICATION_PERMISSION', 'true');
      await handleGetAutorizationForNotification();

      snack.schedule({
        phase: "Permissão concedida com sucesso.",
        severity: "info",
        variant: "container"
      });
    }else{

      await AsyncStorage.removeItem('NOTIFICATION_PERMISSION');
      await AsyncStorage.setItem('NOTIFICATION_PERMISSION', 'false');
      snack.schedule({
        phase: "Permissão negada com sucesso.",
        severity: "info",
        variant: "container"
      });
    }
  })

  useEffect(() => {
      Notifications.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
        },
      });
    }, []);

  return {
    sum,
    set,
    decrease,
    schedule,
    notifications,
    updateNotifications,
    getAllNotifications,
    handleChangeStatusNotification,
    handleGetAutorizationForNotification,
    changePermissionNotification
  }
}