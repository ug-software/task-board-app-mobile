/** @format */

import React, { ReactNode } from "react";
import {
  ImageStyle,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import styleSheet from "./styles";
import { Icon } from "@/src/components";
import { useRouter } from "@/src/hooks";
import { Href } from "expo-router";

type IconButtonAppBar = (props: {
  style: ViewStyle | TextStyle | ImageStyle;
}) => ReactNode;
interface AppBarButtomProps {
  label: string;
  href: Href;
  Icon: IconButtonAppBar;
}

export const appBar: AppBarButtomProps[] = [
  {
    href: "/dashboard",
    label: "Inicio",
    Icon: (props: { style: ViewStyle | TextStyle | ImageStyle }) => {
      return <Icon {...props} name='home' type='AntDesign' />;
    },
  },
  {
    href: "/scredule",
    label: "Agenda",
    Icon: (props: { style: ViewStyle | TextStyle | ImageStyle }) => {
      return <Icon {...props} name='calendar' type='Feather' />;
    },
  },
  {
    href: "/projects",
    label: "Projetos",
    Icon: (props: { style: ViewStyle | TextStyle | ImageStyle }) => {
      return <Icon {...props} name='folder-open-o' type='FontAwesome' />;
    },
  },
  {
    href: "/profile",
    label: "Perfil",
    Icon: (props: { style: ViewStyle | TextStyle | ImageStyle }) => {
      return <Icon {...props} name='user-circle' type='FontAwesome5' />;
    },
  },
];

const AppBarButtom = ({
  label,
  href,
  Icon,
  isActive,
}: AppBarButtomProps & { isActive: boolean }) => {
  const { buttonAppBar, iconButtonAppBar, textButtonAppBar } = styleSheet({
    isActive,
  });
  const { redirect } = useRouter();
  return (
    <Pressable onPress={redirect(href)} style={buttonAppBar}>
      <Icon style={iconButtonAppBar} />
      <Text style={textButtonAppBar}>{label}</Text>
    </Pressable>
  );
};

export default () => {
  const { whapperAppBar } = styleSheet({});
  const { isMatch } = useRouter();
  return (
    <View style={whapperAppBar}>
      {appBar.map((props, index) => (
        <AppBarButtom
          key={index}
          isActive={isMatch(props.href.toString())}
          {...props}
        />
      ))}
    </View>
  );
};
