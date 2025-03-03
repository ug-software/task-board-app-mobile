import { Avatar, Icon, ListItem, Typograph } from "@/src/components";
import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import styleSheet from "./styles"
import { User } from "@/src/interfaces/user";
import { useUser } from "@/src/hooks";

const options = [
    {
        label: "Editar perfil",
        icon: <Icon size={25} type="FontAwesome5" name="user-circle"/>
    },
    {
        label: "Notificação",
        icon: <Icon size={25} type='Feather' name='bell'/>
    },
    {
        label: "Relatar um problema",
        icon: <Icon size={25} type="MaterialCommunityIcons" name="comment-question-outline"/>
    },
    {
        label: "Sair",
        icon: <Icon size={25} type="MaterialIcons" name="logout"/>
    },
]

export default () => {
    const style = styleSheet();
    const [user, setUser] = useState<User | undefined>(undefined);
    const { handleGetCurrentUser } = useUser();

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
                    renderItem={({item, index}) => (
                        <ListItem>
                            {item.icon}
                            <Typograph style={style.textOption} variant="h4">{item.label}</Typograph>
                        </ListItem>
                    )}
                />
            </View>
        </View>
    );
}