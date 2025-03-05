import * as Notifications from 'expo-notifications';
import { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import useTasks from './use-tasks';
import useSqlite from './use-sqlite';
import { notificationSchema } from '../database';
import { between, eq } from 'drizzle-orm';
import { NotificationContext } from '../context/notification';
import { status } from '../constants';
import useLoading from './use-loading';
import useProject from './use-project';

/* this hook have two functions, notifications for sistem and notification the past tasks days past go */

export default () => {
  const db = useSqlite();
  const { getAllTasksBetweenDates, findTaskPerId } = useTasks();
  const { findProjectPerId } = useProject();
  const { decrease, notifications, set, sum } = useContext(NotificationContext);
  const loader = useLoading();

  const getAllNotifications = loader.action(async () => {
    var notifications = await db.select().from(notificationSchema).where(eq(notificationSchema.status, "created"));

    return await Promise.all(notifications.map(async (notification) => {
      return {
        ...notification,
        task: await findTaskPerId(notification.task_id),
        project: await findProjectPerId(notification.project_id),
        created_at: notification.created_at ? new Date(notification.created_at) : new Date()
      };
    }));;
  });

  const updateNotifications = async () => {
    var today = new Date();
    var intialDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    var finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    var notifications = await db.select().from(notificationSchema).where(between(notificationSchema.created_at, intialDate.toString(), finalDate.toString()));
    if(notifications.length > 0){
      // a complete task, as you have already gone through this flow on the current day 
      return (await db.select().from(notificationSchema)).length;
    }
    
    var initialDate = new Date(today.getFullYear(), today.getMonth(), 0);
    finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

    var tasks = await getAllTasksBetweenDates(initialDate, finalDate);    
    if(Array.isArray(tasks)){
      
      await Promise.all(tasks.filter(x => x.status === status.created.name || x.status === status.inprogress.name).map(async task => {
        return await db.insert(notificationSchema).values({
          project_id: task.project_id,
          task_id: task.id ? task.id : 0,
          status: "created",
          created_at: today.toString()
        });
      }));
    }

    return (await db.select().from(notificationSchema)).length;
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
    schedule,
    handleGetAutorizationForNotification,
    updateNotifications,
    decrease,
    notifications,
    set,
    sum,
    getAllNotifications
  }
}