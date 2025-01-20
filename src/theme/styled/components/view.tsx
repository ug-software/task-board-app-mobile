import React from "react";
import { View, ViewProps } from "react-native";

export default ({children, ...props} : ViewProps) => {
    return <View {...props}>{children}</View>
}