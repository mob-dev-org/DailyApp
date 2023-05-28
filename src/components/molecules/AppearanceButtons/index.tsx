import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { View } from '@/components/atoms/Themed';
import { Theme, setLanguage, setTheme } from '@/store/appSettings/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetToDoState } from '@/store/toDo/slice';
import { resetProjectState } from '@/store/toDoProjects/slice';

export default function MainButtons() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { theme, language } = useAppSelector((state) => state.appSettings);

    const toggleThemeChange = () => {
        changeTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const dispatchResetState = () => {
        dispatch(resetToDoState());
        dispatch(resetProjectState());
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
