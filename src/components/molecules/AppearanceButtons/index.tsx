// import { useTranslation } from 'react-i18next';
// import { StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';
// import { View } from '@/components/atoms/Themed';
// import { Theme, setLanguage, setTheme } from '@/store/appSettings/slice';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { resetTasks } from '@/store/toDo/slice';
// type ButtonsProps = {
//     resetState: () => void;
//     handleThemeChange: () => void;
//     changeLanguage: () => void;
// };
// export default function MainButtons({ resetState, handleThemeChange, changeLanguage }: ButtonsProps) {
//     const dispatch = useAppDispatch();
//     const { t } = useTranslation();
//     const { theme, language } = useAppSelector((state) => state.appSettings);
//     const toggleThemeChange = () => {
//         changeTheme(theme === 'dark' ? 'light' : 'dark');
//     };
//     const changeTheme = (theme: Theme) => dispatch(setTheme(theme));
//     const toggleResetState = () => {
//         dispatch(resetTasks());
//     };
//     const toggleLanguage = () => {
//         console.log('Changing language', language);
//         dispatch(setLanguage(language === 'en-US' ? 'bs-BA' : 'en-US'));
//     };
//     return (
//         <View style={styles.rowItems}>
//             <Button onPress={resetState}>{t('Reset state')}</Button>
//             <Button onPress={handleThemeChange}>{t('Theme')}</Button>
//             <Button onPress={changeLanguage}>{t('Language')}</Button>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     rowItems: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
// });
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { View } from '@/components/atoms/Themed';
import { Theme, setLanguage, setTheme } from '@/store/appSettings/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetToDoState } from '@/store/toDo/slice';

export default function MainButtons() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { theme, language } = useAppSelector((state) => state.appSettings);

    const toggleThemeChange = () => {
        changeTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const dispatchResetState = () => {
        dispatch(resetToDoState());
    };

    const changeTheme = (theme: Theme) => {
        dispatch(setTheme(theme));
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en-US' ? 'bs-BA' : 'en-US';
        console.log('Changing language', newLanguage);
        dispatch(setLanguage(newLanguage));
    };

    return (
        <View style={styles.rowItems}>
            <Button onPress={dispatchResetState}>{t('Reset state')}</Button>
            <Button onPress={toggleThemeChange}>{t('Theme')}</Button>
            <Button onPress={toggleLanguage}>{t('Language')}</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    rowItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
});
