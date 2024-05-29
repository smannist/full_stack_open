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
  colorYellow: {
    color: theme.colors.yellow,
  },
  colorRed: {
    color: theme.colors.red,
  },
  colorError: {
    color: theme.colors.error,
  },
  colorDimmed: {
    color: theme.colors.dimmed,
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
    color === "yellow" && styles.colorYellow,
    color === "red" && styles.colorRed,
    color === "error" && styles.colorError,
    color === "dimmed" && styles.colorDimmed,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    textRightMargin === "small" && styles.textMargin,
    textBottomPadding === "medium" && styles.textPadding,
    textLeftPadding === "medium" && styles.textPadding,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
