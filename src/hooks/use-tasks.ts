import { router } from "expo-router";
import { TimePicker } from "../components";
import { taskSchema } from "../database";
import Tasks from "../interfaces/task";
import useLoading from "./use-loading";
import useSnack from "./use-snack";
import useSqlite from "./use-sqlite";

export default () => {
    const db = useSqlite();
    const loader = useLoading();
    const message = useSnack();
    
    const handleSaveNewTask = loader.action(async (values: Partial<Tasks> & { time: TimePicker }) => {
        try {
            var date = values.date ? values.date : new Date();
            var task = {
                ...values,
                date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(values.time.hour), parseInt(values.time.minutes)),
                created_at: new Date(),
                updated_at: new Date()
            } as Tasks;
    
            await db.insert(taskSchema).values({
                ...task,
                date: task.date.toString(),
                created_at: task.created_at.toString(),
                updated_at: task.updated_at.toString(),
            });
    
            message.schedule({
                phase: "Sucesso ao adicionar Tarefa",
                severity: "success",
                variant: "container"
            });
    
            router.navigate("/schedule");
        }catch(err){
            var error = err as Error;
            message.schedule({
                phase: error.message,
                severity: "error",
                variant: "container"
            });
        }
    })

    const handleValidationTask = (values: Partial<Tasks> & { time: TimePicker }) => {
        var errors = {
            name: "",
            description: "",
            status: "",
            date: "",
            time: "",
            project_id: ""
        };        
        
        if(values.description === undefined || values.description === null || values.description === ""){
            errors["description"] = "Campo 'Descrição' é de preechimento obrigatório.";
        }

        if(values.name === undefined || values.name === null || values.name === ""){
            errors["name"] = "Campo 'Nome' é de preechimento obrigatório.";
        }

        if(values.status === undefined || values.status === null || values.status === ""){
            errors["status"] = "Campo 'Status' é de preechimento obrigatório.";
        }

        if(values.date === undefined || values.date === null){
            errors["date"] = "Campo 'Data' é de preechimento obrigatório.";
        }

        if(values.time === undefined || values.time === null){
            errors["time"] = "Campo 'Horário' é de preechimento obrigatório.";
        }

        if(values.project_id === undefined || values.project_id === null){
            errors["project_id"] = "Campo 'Projeto' é de preechimento obrigatório.";
        }

        return errors;
    }

    return { handleValidationTask, handleSaveNewTask };
}