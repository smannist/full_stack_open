import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#FFFFFF",
    primary: "#0366d6",
    error: "#D73A4A",
    yellow: "#ffbc3c",
    dimmed: "#707071",
    red: "#FF0000",
  },
  fontSizes: {
    body: 14,
    subheading: 18,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  textMarginRight: {
    small: 5,
  },
  textPaddingBottom: {
    medium: 10,
  },
  textPaddingLeft: {
    medium: 10,
  },
};

export default theme;
