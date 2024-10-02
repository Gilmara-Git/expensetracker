import { View, Text, TextInput, TextInputProps, Pressable, PressableProps  } from "react-native";
import { styles } from "./styles";
import themes from "../../theme/themes";
import { Ionicons } from "@expo/vector-icons";

type InputProps = TextInputProps & PressableProps &{
  label: string;
  multiline: boolean;
  passwordField?: boolean;
  errorMessage: string | undefined;
  shouldReviewPassword?: () => void;
  showPassword?: boolean;
};

export const Input = ({
  errorMessage,
  multiline,
  label,
  passwordField,
  shouldReviewPassword,
  showPassword,
  ...rest
}: InputProps) => {
  const nonMultiline = !multiline;
  const containsError = !!errorMessage;


  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          textContentType='none'
          style={[
            styles.input,
            multiline && styles.multiline,
            nonMultiline && styles.nonMultiline,
            containsError && styles.textInputErrorBorder,
          ]}
          {...rest}
          placeholderTextColor={themes.colors.light_purple}
          />
          {passwordField && (
            <Pressable onPress={shouldReviewPassword} style={styles.eyeBox}>
              { showPassword ? (
                <Ionicons
                  name="eye-outline"
                  size={20}
                  color={themes.colors.purple_1}
                  />
                 
              ) : (
               
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color={themes.colors.purple_1}

                  />
                
              )}
            </Pressable>
          )}
      </View>
      <View style={styles.errorMessage}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
  );
};
