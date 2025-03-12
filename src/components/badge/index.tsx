import React, { ReactNode } from "react";
import { View } from "react-native";
import Typograph from "../typograph";
import createStyleSheet from "./styles";

interface BadgeProps {
    children: ReactNode,
    badgeContent: number
}
export default ({ badgeContent, children }: BadgeProps) => {
    const styles = createStyleSheet();

    if(badgeContent > 9){
        return(
            <View style={styles.wrapperBadge}>
                <Typograph variant="h6" style={styles.contentBadge}>+9</Typograph>
                {children}
            </View>
        )        
    }

    return(
        <View style={styles.wrapperBadge}>
            <Typograph variant="h6" style={styles.contentBadge}>{badgeContent}</Typograph>
            {children}
        </View>
    )
}