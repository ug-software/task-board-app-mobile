/** @format */

import { Button } from "@/components";
import IconComponent from "@/components/icon";
import React from "react";
import { Text, View } from "react-native";

export default () => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}>
      <Button
        variant='contained'
        startIcon={<IconComponent type='AntDesign' name='addfile' />}>
        Hello word
      </Button>
    </View>
  );
};
