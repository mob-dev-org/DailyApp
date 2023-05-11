import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { View } from '@/components/atoms/Themed';

type ButtonsProps = {
    resetState: () => void;
    handleThemeChange: () => void;
    changeLanguage: () => void;
};
export default function MainButtons({ resetState, handleThemeChange, changeLanguage }: ButtonsProps) {
    const { t } = useTranslation();

    return (
        <View style={styles.rowItems}>
            <Button onPress={resetState}>{t('Reset state')}</Button>
            <Button onPress={handleThemeChange}>{t('Theme')}</Button>
            <Button onPress={changeLanguage}>{t('Language')}</Button>
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
