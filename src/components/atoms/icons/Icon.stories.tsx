// import { useCallback } from '@storybook/addons';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

// import AppIcon, { AppIconProps } from './AppIcon';
// import ChevronImage, { ChevronButtonImageProps } from './ChevronImage';
// import Illustration, { IllustrationProps } from './Illustration';
// import RecycleTypeIcon, { RecycleTypeIconProps } from './RecycleTypeIcon';
// import RecycleTypeImage, { RecycleTypeImageProps } from './RecycleTypeImage';

// export default {
//     title: 'Icons',
//     component: AppIcon,
//     args: {
//         size: 50,
//     },
// };

// export const AppIcons = (args: AppIconProps) => {
//     const renderIcon = useCallback((props: AppIconProps) => {
//         return (
//             <View style={styles.iconDemoContainer}>
//                 <AppIcon {...props} {...args} />
//                 <Text style={styles.iconDemoName}>{props.name}</Text>
//             </View>
//         );
//     });

//     const icons: AppIconProps[] = [
//         { name: 'info' },
//         { name: 'back' },
//         { name: 'bell' },
//         { name: 'bell-off' },
//         { name: 'calendar' },
//         { name: 'check' },
//         { name: 'close' },
//         { name: 'edit' },
//         { name: 'filter' },
//         { name: 'flash-off' },
//         { name: 'flash-on' },
//         { name: 'globe' },
//         { name: 'heart' },
//         { name: 'home' },
//         { name: 'mail' },
//         { name: 'map-pin' },
//         { name: 'map' },
//         { name: 'navigation' },
//         { name: 'news' },
//         { name: 'phone-call' },
//         { name: 'plus' },
//         { name: 'profile' },
//         { name: 'settings' },
//         { name: 'smile' },
//         { name: 'trash' },
//         { name: 'truck' },
//         { name: 'x' },
//         { name: 'map-pin-star' },
//         { name: 'center-map' },
//         { name: 'refresh' },
//         { name: 'search' },
//         { name: 'barcode' },
//         { name: 'chevron-down', style: { backgroundColor: '#000' } },
//         { name: 'chevron-up', style: { backgroundColor: '#000' } },
//     ];

//     return <ScrollView>{icons.map(renderIcon)}</ScrollView>;
// };

// export const ChevronImages = (args: ChevronButtonImageProps) => {
//     const renderIcon = useCallback((props: ChevronButtonImageProps) => {
//         return (
//             <View style={styles.iconDemoContainer}>
//                 <ChevronImage {...props} {...args} />
//                 <Text style={styles.iconDemoName}>{props.name}</Text>
//             </View>
//         );
//     });

//     const icons: ChevronButtonImageProps[] = [
//         { name: 'chevron-down' },
//         { name: 'chevron-left' },
//         { name: 'chevron-right' },
//         { name: 'chevron-up' },
//     ];

//     return <ScrollView>{icons.map(renderIcon)}</ScrollView>;
// };

// const styles = StyleSheet.create({
//     iconDemoContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 8,
//     },
//     iconDemoName: { marginLeft: 8, fontSize: 24 },
// });
