import { StyleSheet } from "react-native";
import { Platform } from 'react-native';
import themes from "../../theme/themes";

export const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    color: themes.colors.purple_1,
    fontFamily: themes.fonts.balsamiq_700,
    fontSize: 20,
    marginTop: 20
  },
  input: {
    padding: Platform.OS === 'android' ? 6: 12,
    backgroundColor: themes.colors.light_white,
    borderRadius: 8,
    marginVertical: 14,
    color: themes.colors.purple_1,
    fontFamily: themes.fonts.balsamiq_400,
    fontSize: 14,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  nonMultiline: {
    width: 120,
    textAlign: "center",
  },
});
