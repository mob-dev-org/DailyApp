// import {
//     BottomSheetBackdrop,
//     BottomSheetBackdropProps,
//     BottomSheetModal,
//     BottomSheetModalProps,
// } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
// import { BackHandler, BackHandlerStatic, Keyboard, NativeEventSubscription, Platform } from 'react-native';

// const CustomBackdrop = (props: BottomSheetBackdropProps) => {
//     return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.3} />;
// };

// export type BottomSheetProps = {
//     children?: React.ReactElement;
//     header?: React.ReactElement;
//     snapPoints?: Array<string | number>;
// } & { onClose?: () => void };

// export type BottomSheetRef = {
//     closeModal: () => void;
//     showModal: () => void;
// };

// const BottomSheet = forwardRef<
//     BottomSheetRef | undefined,
//     (BottomSheetProps | BottomSheetModalProps) & { onClose?: () => void }
// >((props, ref) => {
//     // ref
//     const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//     useImperativeHandle(ref, () => ({
//         closeModal,
//         showModal,
//     }));

//     // -----------------------------------------------------------
//     // variables
//     const snapPoints = useMemo(() => ['60%'], []);

//     // callbacks
//     let backHandler: NativeEventSubscription;
//     const showModal = useCallback(() => {
//         backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//             closeModal();
//             return true;
//         });
//         bottomSheetModalRef.current?.present();
//     }, []);

//     const closeModal = useCallback(() => {
//         bottomSheetModalRef.current?.close();
//         backHandler.remove();
//     }, []);

//     // -----------------------------------------------------------
//     const [keyboardBottomInset, setKeyboardBottomInset] = React.useState(0);

//     useEffect(() => {
//         let unmounted = false; // FLAG TO CHECK COMPONENT UNMOUNT
//         // BUG FIXED BOTTOMSHEET FOR ABSOLUTE VIEW WHEN KEYBOARD SHOW
//         const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
//             setKeyboardBottomInset(0.1);
//         });
//         const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardBottomInset(0);
//         });

//         if (!unmounted) {
//             //
//         }

//         // CLEAR FUNCTION COMPONENT UNMOUNT
//         return () => {
//             unmounted = true;
//             showSubscription.remove();
//             hideSubscription.remove();
//         };
//     }, []);

//     return (
//         <BottomSheetModal
//             {...(Platform.OS === 'android'
//                 ? {
//                       keyboardBehavior: 'extend',
//                       keyboardBlurBehavior: 'restore',
//                       bottomInset: keyboardBottomInset,
//                   }
//                 : {})}
//             enablePanDownToClose
//             snapPoints={snapPoints}
//             backdropComponent={CustomBackdrop}
//             onChange={(index) => {
//                 // console.log('index', index);
//                 if (index === -1) props.onClose && props.onClose();
//             }}
//             {...props}
//             ref={bottomSheetModalRef}>
//             {props.children}
//         </BottomSheetModal>
//     );
// });

// export default BottomSheet;
