import INotification from "@/src/interfaces/notification";
import { between, eq } from "drizzle-orm";
import db, { NotificationSchema } from "../database";

export default class Notification {
  static insert = async (
    notification: Omit<INotification, "id" | "project" | "task">
  ) => {
    if (!notification.status) {
      notification.status = "created";
    }

    if (!notification.created_at) {
      notification.created_at = new Date();
    }

    return await db.insert(NotificationSchema).values({
      ...notification,
      created_at: notification.created_at.toString(),
    });
  };

  static findAllPerStatusCreated = async () => {
    return await db
      .select()
      .from(NotificationSchema)
      .where(eq(NotificationSchema.status, "created"));
  };

  static findAllPerDate = async (date: Date) => {
    let intialDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    );
    let finalDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59
    );

    return await db
      .select()
      .from(NotificationSchema)
      .where(
        between(
          NotificationSchema.created_at,
          intialDate.toString(),
          finalDate.toString()
        )
      );
  };

  static changeStatusNotification = async (id: number, status: string) => {
    return await db
      .update(NotificationSchema)
      .set({
        status: status,
      })
      .where(eq(NotificationSchema.id, id));
  };
}
