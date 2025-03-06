import { Avatar, Icon, ListItem, Typograph } from "@/src/components";
import React, { useEffect, useState } from "react"
import { BackHandler, FlatList, View } from "react-native"
import styleSheet from "./styles"
import { User } from "@/src/interfaces/user";
import { useNotification, useUser } from "@/src/hooks";
import { router } from "expo-router";

export default () => {
    const style = styleSheet();
    const { handleGetCurrentUser } = useUser();
    const { changePermissionNotification } = useNotification();
    const [user, setUser] = useState<User | undefined>(undefined);

    const options = [
        {
            label: "Editar perfil",
            description: "Atualize suas informações pessoais, é possível alterar dados como nome, e-mail e foto de perfil.",
            icon: <Icon size={25} type="FontAwesome5" name="user-circle"/>,
            onPress: () => router.navigate("/signin")
        },
        {
            label: "Notificação",
            description: "Ao habilitar as notificações, o app enviará alertas sobre os horários das tarefas, garantindo que você não perca nenhum compromisso importante.",
            icon: <Icon size={25} type='Feather' name='bell'/>,
            onPress: changePermissionNotification
        },
        /*{
            label: "Relatar um problema",
            description: "Envie e-mail nos informando algum ocorrido, bug ou melhoria.",
            icon: <Icon size={25} type="MaterialCommunityIcons" name="comment-question-outline"/>,
            onPress: () => router.navigate({ href: "/signin" })
        },*/
        {
            label: "Sair",
            icon: <Icon size={25} type="MaterialIcons" name="logout"/>,
            onPress: () => BackHandler.exitApp()
        },
    ]

    useEffect(() => {
        (async () => {
            var user = await handleGetCurrentUser();
            setUser(user);
        })()
    }, [])

    return(
        <View style={style.whapperPageProfile}>
            <View style={style.whapperUserInfo}>
                {user ? 
                    user.img !== "" ? (
                        <Avatar size='extra-large' img={{ uri: user.img }} /> 
                    ) : (
                        <Avatar size='extra-large'>{user.name[0]}</Avatar>
                    ) : 
                    null 
                }
                {user && <Typograph style={{textAlign: "center"}} pt={20} variant="h3" fontWeight={500}>{user.name}</Typograph>}
            </View>
            <View style={style.whapperConfigOptions}>
                <FlatList
                    style={style.whapperListOptions}
                    data={options}
                    renderItem={({item, index}) => item.description ? (
                        <ListItem onPress={item.onPress}>
                            {item.icon}
                            <View>
                                <Typograph style={style.textOption} variant="h4">{item.label}</Typograph>
                                <Typograph color="light" style={style.textOption} variant="paragraph">{item.description}</Typograph>
                            </View>
                        </ListItem>
                    ) : (
                        <ListItem onPress={item.onPress}>
                            {item.icon}
                            <Typograph style={style.textOption} variant="h4">{item.label}</Typograph>
                        </ListItem>
                    )}
                />
            </View>
        </View>
    );
}