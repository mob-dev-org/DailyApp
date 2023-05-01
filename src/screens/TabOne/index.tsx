import { useTranslation } from 'react-i18next';
import { Button, StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';
import AppIcon from '@/components/atoms/icons/AppIcon';
import { BottomTabsScreenProps } from '@/navigation/types';
import { Theme, setLanguage, setTheme } from '@/store/appSettings/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetTeamA } from '@/store/teamA/slice';
import { resetTeamB } from '@/store/teamB/slice';

export default function TabOneScreen({ navigation }: BottomTabsScreenProps<'TabOne'>) {
    navigation;

    const logout = () => {
        dispatch(resetTeamB());
        dispatch(resetTeamA());
    };

    const { theme, language } = useAppSelector((state) => state.appSettings);
    const dispatch = useAppDispatch();
    const changeTheme = (theme: Theme) => dispatch(setTheme(theme));
    const changeLanguage = () => {
        console.log('Changing language', language);
        dispatch(setLanguage(language === 'en-US' ? 'bs-BA' : 'en-US'));
    };
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('homeScreen')}</Text>
            <Button title="Change theme" onPress={() => changeTheme(theme === 'dark' ? 'light' : 'dark')} />
            <Button title="Toggle language" onPress={changeLanguage} />
            <Button title="Reset state" onPress={logout} />

            <AppIcon name="account" />
            <Text>{i18n.language}</Text>
            <Text>{i18n.languages}</Text>
            <Text>{t('common:languageName')}</Text>
            <Text>{t('common:hello')}</Text>
            <Text>{t('languageName')}</Text>
            <Text>{t('navigation:tabOne')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
