import { useRouter } from "expo-router";
import { userSchema } from "../database";
import { User } from "../interfaces/user";
import useLoading from "./use-loading";
import useSnack from "./use-snack";
import useSqlite from "./use-sqlite";

export default () => {
    const loader = useLoading();
    const message = useSnack();
    const db = useSqlite();
    const router = useRouter();

    const handleGetCurrentUser = async () => {
        var user = await db.select().from(userSchema);
                
        return user[0];
    }

    const handleSaveUser = loader.action(async (values: Partial<User>) => {
        try {
            //deleta todos os usuarios e cria somente um...
            await db.delete(userSchema);

            var user = values as User;
            var isSuccess = await db.insert(userSchema).values(user);

            if(isSuccess){
                message.schedule({
                    phase: "Sucesso ao criar usuario.",
                    severity: "success",
                    variant: "container"
                });

                return router.navigate("/dashboard");
            }
        }catch(err) {
            var error = err as Error;
            console.error(err);
            

            message.schedule({
                phase: "Não foi possivel criar usuario nesse momento, tente novamente mais tarde. " + error.message,
                severity: "error",
                variant: "container"
            });
        }
    });

    const handleValidationUser = (values: Partial<User>) => {
        var errors = {
            name: "",
            email: "",
            description: "",
        };        
        
        if(values.description === undefined || values.description === null || values.description === ""){
            errors["description"] = "Campo 'Descrição' é de preechimento obrigatório.";
        }

        if(values.name === undefined || values.name === null || values.name === ""){
            errors["name"] = "Campo 'Nome' é de preechimento obrigatório.";
        }

        if(values.email === undefined || values.email === null || values.email === ""){
            errors["email"] = "Campo 'E-mail' é de preechimento obrigatório.";
        }

        return errors;
    };

    return { handleValidationUser, handleSaveUser, handleGetCurrentUser }
}