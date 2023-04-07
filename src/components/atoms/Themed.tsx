/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { useTheme } from '@react-navigation/native';
import { Text as DefaultText, View as DefaultView } from 'react-native';

import useColorScheme from '@/hooks/useColorScheme';

export function useThemeColor(props: { light?: string; dark?: string }) {
    const { colors } = useTheme();
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        // return Colors[theme][colorName];
        return colors.text;
    }
}

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor });

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const { style, ...otherProps } = props;
    const { colors } = useTheme();

    const backgroundColor = colors.background;

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
