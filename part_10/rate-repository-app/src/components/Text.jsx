import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  textMargin: {
    marginRight: theme.textMarginRight.small,
  },
  textPadding: {
    paddingBottom: theme.textPaddingBottom.medium,
    paddingLeft: theme.textPaddingLeft.medium,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  textRightMargin,
  textBottomPadding,
  textLeftPadding,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    textRightMargin === "small" && styles.textMargin,
    textBottomPadding === "medium" && styles.textPadding,
    textLeftPadding === "medium" && styles.textPadding,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
