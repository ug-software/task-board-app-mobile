import React, { useContext } from "react";
import { SnackContext } from "@/src/context/snack";
import { View } from "react-native";
import Alert from "../alert";
import styleSheet from "./styles";

export default () => {
    const { open, state } = useContext(SnackContext);
    const styles = styleSheet();
    
    return open && (
        <View style={styles.whapperSnackProvider}>
            <Alert label={state.phase !== null ? state.phase : ""} severity={state.severity} variant={state.variant} />
        </View>
    );
}