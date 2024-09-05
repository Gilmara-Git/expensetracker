import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title?: string;
  icon?: ReactNode;
};

export const Button = ({ title, icon, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      {icon ? icon : <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
};
