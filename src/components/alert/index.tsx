import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import styleSheet from "./styles";

export interface AlertProps {
    variant: "outlined" | "container" | "filled";
    severity: "success" | "error" | "warning" | "info";
    label: string
}

export default ({ label, severity, variant }: AlertProps) => {
    var styles = styleSheet({ severity, variant });
    let icon = null;
    
    switch (severity) {
        case "error":
            icon = <MaterialIcons name="error-outline" size={24} color="black" style={styles.iconError} />;
            break;
        case "info":
            icon = <MaterialIcons name="info-outline" size={24} color="black" style={styles.iconInfo} />;
            break;
        case "success":
            icon = <MaterialIcons name="check-circle-outline" size={24} color="black" style={styles.iconSuccess} />;
            break;
        case "warning":
            icon = <MaterialIcons name="warning-amber" size={24} color="black" style={styles.iconWarning} />;
            break;
    }

    return(
        <View style={styles.whapperAlert}>
            <View style={styles.whapperIconAlert}>
                {icon}
            </View>
            <View style={styles.whapperLabelAlert}>
                <Text style={styles.labelAlert}>
                    {label}
                </Text>
            </View>
        </View>
    );
}