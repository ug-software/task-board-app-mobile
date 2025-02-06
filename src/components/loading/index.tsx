import React, { useContext } from "react"
import { ActivityIndicator, View } from "react-native"
import styleSheet from "./styles";
import { LoadingContext } from "@/src/context/loading";
import { useTheme } from "@/src/hooks";

export default () => {
    const styles = styleSheet();
    const theme = useTheme();

    const { isLoading } = useContext(LoadingContext);
    
    return isLoading &&  (
        <View style={styles.whapperLoaddingComponent}>
            <ActivityIndicator size={50} color={theme.primary.main} />
        </View>
    );
}