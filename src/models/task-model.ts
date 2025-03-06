import db, { taskSchema } from "@/src/database"
import Tasks from "../interfaces/task"
import { eq, between, asc } from "drizzle-orm"

export default class Task {
    static findAll = async () => {
        return await db.select().from(taskSchema);
    };

    static findPerId = async (id: number) => {
        return (await db.select().from(taskSchema).where(eq(taskSchema.id, id))).find(x => x.id === id);
    };

    static findAllPerDate = async (date: Date) => {
        var intialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        var finalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        return await db.select().from(taskSchema).where(between(taskSchema.date_marked, intialDate.toString(), finalDate.toString())).orderBy(asc(taskSchema.date_marked));
    };

    static findAllBetweenDates = async (initialDate: Date, finalDate: Date) => {
        initialDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), 0, 0, 0);
        finalDate = new Date(finalDate.getFullYear(), finalDate.getMonth(), finalDate.getDate(), 23, 59, 59);
        
        return await db.select().from(taskSchema).where(between(taskSchema.date_marked, initialDate.toString(), finalDate.toString())).orderBy(asc(taskSchema.date_marked));
    };

    static insert = async (task: Tasks) => {
        if(!task.date_marked){
            throw new Error("Campo date_marked é de preenchimento obrigatório.");
        }

        if(!task.created_at){
            task.created_at = new Date();
        }

        if(!task.updated_at){
            task.updated_at = new Date();
        }

        return await db.insert(taskSchema).values({
            ...task,
            date_marked: task.date_marked.toString(),
            created_at: task.created_at.toString(),
            updated_at: task.updated_at.toString(),
        });
    };

    static updatePerId = async (id: number, task: Partial<Tasks>) => {
        if(!task.created_at){
            throw new Error("Campo created_at é de preenchimento obrigatório.");
        }

        if(!task.date_marked){
            throw new Error("Campo date_marked é de preenchimento obrigatório.");
        }

        return await db.update(taskSchema).set({
            ...task,
            created_at: task.created_at.toString(),
            updated_at: new Date().toString(),
            date_marked: task.date_marked.toString(),
        }).where(eq(taskSchema.id, id));
    };

    static changeStatusPerId = async (id: number, status: string) => {
        return  await db.update(taskSchema).set({ status }).where(eq(taskSchema.id, id));
    };

    static deletePerId = async (id: number) => {
        return db.delete(taskSchema).where(eq(taskSchema.id, id));
    };

    static deleteAllPerProjectId = async (id: number) => {
        return await db.delete(taskSchema).where(eq(taskSchema.project_id, id));
    };
}
