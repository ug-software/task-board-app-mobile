import { eq } from "drizzle-orm";
import db, { projectSchema } from "../database";
import IProject from "../interfaces/project";

export default class Project {
    static insert = async (project: IProject) => {
        return await db.insert(projectSchema).values({
            ...project,
            created_at: project.created_at.toString(),
            updated_at: project.updated_at.toString()
        });
    };

    static updatePerId = async (id: number, project: Partial<IProject>) => {
        if(!project.created_at){
            project.created_at = new Date();
        }

        if(!project.updated_at){
            project.updated_at = new Date();
        }

        await db.update(projectSchema).set({
            ...project,
            created_at: project.created_at.toString(),
            updated_at: project.updated_at.toString()
        }).where(eq(projectSchema.id, id));
    }

    static findAll = async () => {
        return await db.select().from(projectSchema);
    };

    static findPerId = async (id: number) => {
        return (await db.select().from(projectSchema).where(eq(projectSchema.id, id))).find(x => x.id === id);
    };

    static deletePerId = async (id: number) => {
        return await db.delete(projectSchema).where(eq(projectSchema.id, id))
    }
}