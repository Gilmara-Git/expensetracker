import { StyleSheet } from "react-native";
import themes from "../../theme/themes";

export const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginVertical: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  innerContainer: {
    backgroundColor: themes.colors.jetBlack,
    width: 100,
  },
  category: {
    fontFamily: themes.fonts.balsamiq_700,
    fontSize: 32,
    marginTop: 40,
  },
  form: {
    marginTop: 20,

    flex: 1,
  },
});
