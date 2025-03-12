import React from "react"
import { Pressable, PressableProps } from "react-native"
import styleSheet from "./styles";

interface ItemListProps extends PressableProps {
};
export const ListItem = ({ children, ...props } : ItemListProps) => {
    const style = styleSheet();
    return(
        <Pressable {...props} style={style.whapperListItem}>
            {children}
        </Pressable>
    )
}