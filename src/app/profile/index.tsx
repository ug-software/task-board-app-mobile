import { Avatar, Icon, ListItem, Typograph } from "@/src/components";
import React from "react"
import { FlatList, Text, View } from "react-native"
import styleSheet from "./styles"

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
    return(
        <View style={style.whapperPageProfile}>
            <View style={style.whapperUserInfo}>
                <Avatar
                    size="extra-large"
                    img={{
                        uri: "https://media.istockphoto.com/id/950688808/pt/foto/enjoying-cocktail-at-the-pool.jpg?s=1024x1024&w=is&k=20&c=tF1c_z6KUZwkSgvvRA2r0vxDbc0ac27sFeu0XdMkvq4=",
                      }}
                />
                <Typograph pt={20} variant="h3" fontWeight={500}>Juliana Campos</Typograph>
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