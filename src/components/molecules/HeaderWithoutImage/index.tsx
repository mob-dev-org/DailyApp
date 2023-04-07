// import { useNavigation } from '@react-navigation/native';
// import React, { FC } from 'react';
// import { TouchableOpacity, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { shadow } from '../../../const/variables';
// import Text from '../../atoms/Text';
// import AppIcon, { AppIconNames } from '../../atoms/icons/AppIcon';
// import Text from '../../atoms/Text';

// import styles from './styles';

// export type HeaderWithoutImageProps = {
//     icon?: AppIconNames;
//     header: string;
//     testID?: string;
//     rightItem?: () => JSX.Element;
// };

// const HeaderWithoutImage: FC<HeaderWithoutImageProps> = ({ icon, header, rightItem, children, ...props }) => {
//     const navigation = useNavigation();
//     const {top} = useSafeAreaInsets();

//     return (
//         <View style={[styles.container, {paddingTop: top}, shadow]}>
//             <View style={styles.headerContainer}>
//                 {icon && <AppIcon name={icon} color="black" style={{ marginRight: 12 }} />}
//                 <Text style={styles.header} size={20}>
//                     {header}
//                 </Text>
//             </View>
//             {rightItem ? (
//                 rightItem()
//             ) : (
//                 <TouchableOpacity
//                     onPress={() => navigation.goBack()}
//                     hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
//                     <AppIcon name="x" size={24} color="black" />
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

// export default HeaderWithoutImage;
