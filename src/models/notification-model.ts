import { eq, between } from "drizzle-orm";
import db, { notificationSchema } from "../database";
import INotification from "@/src/interfaces/notification";

export default class Notification {
    static insert = async (notification: Omit<INotification, "id" | "project" | "task">) => {
        if(!notification.status){
            notification.status = "created";
        }

        if(!notification.created_at){
            notification.created_at = new Date();
        }

        return await db.insert(notificationSchema).values({
            ...notification,
            created_at: notification.created_at.toString()
        });
    };

    static findAllPerStatusCreated = async () => {
        return await db.select().from(notificationSchema).where(eq(notificationSchema.status, "created"));
    };

    static findAllPerDate = async (date: Date) => {
        var intialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        var finalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

        return await db.select().from(notificationSchema).where(between(notificationSchema.created_at, intialDate.toString(), finalDate.toString()));
    }

    static changeStatusNotification = async (id: number, status: string) => {
        return await db.update(notificationSchema).set({
          status: status
        }).where(eq(notificationSchema.id, id));
    };
}