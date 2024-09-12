import { View, Text, TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import themes from "../../theme/themes";

type InputProps = TextInputProps & {
  label: string;
  multiline: boolean;

  errorMessage: string | undefined;
};

export const Input = ({
  errorMessage,
  multiline,
  label,
  ...rest
}: InputProps) => {
  const nonMultiline = !multiline;

  const containsError = !!errorMessage;


  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          nonMultiline && styles.nonMultiline ,
          containsError && styles.textInputErrorBorder
        ]}
        {...rest}
        placeholderTextColor={themes.colors.light_purple}
      />
      <View style={styles.errorMessage}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
  );
};
