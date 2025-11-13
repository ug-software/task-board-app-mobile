import db, { TaskSchema } from "@/src/database";
import { asc, between, eq } from "drizzle-orm";
import Tasks from "../interfaces/task";

export default class Task {
  static findAll = async () => {
    return await db.select().from(TaskSchema);
  };

  static findPerId = async (id: number) => {
    return (
      await db.select().from(TaskSchema).where(eq(TaskSchema.id, id))
    ).find((x) => x.id === id);
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
      .from(TaskSchema)
      .where(
        between(
          TaskSchema.date_marked,
          intialDate.toString(),
          finalDate.toString()
        )
      )
      .orderBy(asc(TaskSchema.date_marked));
  };

  static findAllBetweenDates = async (initialDate: Date, finalDate: Date) => {
    initialDate = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      initialDate.getDate(),
      0,
      0,
      0
    );
    finalDate = new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      finalDate.getDate(),
      23,
      59,
      59
    );

    return await db
      .select()
      .from(TaskSchema)
      .where(
        between(
          TaskSchema.date_marked,
          initialDate.toString(),
          finalDate.toString()
        )
      )
      .orderBy(asc(TaskSchema.date_marked));
  };

  static insert = async (task: Tasks) => {
    if (!task.date_marked) {
      throw new Error("Campo date_marked é de preenchimento obrigatório.");
    }

    if (!task.created_at) {
      task.created_at = new Date();
    }

    if (!task.updated_at) {
      task.updated_at = new Date();
    }

    return await db.insert(TaskSchema).values({
      ...task,
      date_marked: task.date_marked.toString(),
      created_at: task.created_at.toString(),
      updated_at: task.updated_at.toString(),
    });
  };

  static updatePerId = async (id: number, task: Partial<Tasks>) => {
    if (!task.created_at) {
      throw new Error("Campo created_at é de preenchimento obrigatório.");
    }

    if (!task.date_marked) {
      throw new Error("Campo date_marked é de preenchimento obrigatório.");
    }

    return await db
      .update(TaskSchema)
      .set({
        ...task,
        created_at: task.created_at.toString(),
        updated_at: new Date().toString(),
        date_marked: task.date_marked.toString(),
      })
      .where(eq(TaskSchema.id, id));
  };

  static changeStatusPerId = async (id: number, status: string) => {
    return await db
      .update(TaskSchema)
      .set({ status })
      .where(eq(TaskSchema.id, id));
  };

  static deletePerId = async (id: number) => {
    return db.delete(TaskSchema).where(eq(TaskSchema.id, id));
  };

  static deleteAllPerProjectId = async (id: number) => {
    return await db.delete(TaskSchema).where(eq(TaskSchema.project_id, id));
  };
}
