// import React, { FunctionComponent } from 'react';
// import { Text as RNText, TextStyle } from 'react-native';

// import { GarbageType } from '../../../api/zgApi.schemas';
// import { themeColor as themeColors } from '../../../const/variables';
// import styles from './styles';

// export type TextColors =
//     | 'black'
//     | 'white'
//     | 'blueGray'
//     | 'gray'
//     | 'gray2'
//     | 'lightGray'
//     | 'green'
//     | 'red'
//     | 'blue'
//     | 'lightBlue'
//     | 'lightGrayWithOpacity';

// export type TextProps = {
//     size?: 8 | 11 | 12 | 13 | 14 | 16 | 18 | 20 | 24 | 32;
//     color?: TextColors;
//     // TODO: add more weights with numbers in name
//     weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
//     uppercase?: boolean;
//     themeColor?: GarbageType;
//     center?: boolean;
//     lineHeight?: number;
//     letterSpacing?: number;
//     numberOfLines?: number;
//     style?: TextStyle;
// };

// const Text: FunctionComponent<TextProps> = ({
//     children,
//     color = 'black',
//     size = 16,
//     weight = 'regular',
//     uppercase,
//     themeColor,
//     center,
//     lineHeight,
//     numberOfLines,
//     style,
//     letterSpacing,
// }) => {
//     return (
//         <RNText
//             numberOfLines={numberOfLines}
//             style={[
//                 {
//                     ...style,
//                     fontSize: size,
//                     textAlignVertical: 'center',
//                     includeFontPadding: false,
//                 },
//                 styles[weight],
//                 styles[color],
//                 themeColor && { color: themeColors[themeColor] },
//                 uppercase && styles.uppercase,
//                 center && { textAlign: 'center' },
//                 !!lineHeight && { lineHeight },
//                 !!letterSpacing && { letterSpacing },
//             ]}>
//             {children}
//         </RNText>
//     );
// };

// export default Text;
