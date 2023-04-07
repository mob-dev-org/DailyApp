// import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import React, { forwardRef } from 'react';
// import { StyleSheet, View } from 'react-native';

// import Text from '../../../atoms/Text';
// import BottomSheet, { BottomSheetProps, BottomSheetRef } from '../index';

// const BottomSheetScrollable = forwardRef<BottomSheetRef | undefined, BottomSheetProps>((props, ref) => {
//     return (
//         <BottomSheet ref={ref} {...props}>
//             <>
//                 {props.header}
//                 <BottomSheetScrollView>{props.children || renderFakeContent()}</BottomSheetScrollView>
//             </>
//         </BottomSheet>
//     );
// });

// export default BottomSheetScrollable;

// const styles = StyleSheet.create({
//     contentContainer: {
//         height: 100,
//         alignItems: 'center',
//     },
// });

// const renderFakeContent = () => {
//     return (
//         <>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text>Scrollable</Text>
//             </View>
//         </>
//     );
// };
