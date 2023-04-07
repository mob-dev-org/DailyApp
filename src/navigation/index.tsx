/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { useEffect } from 'react';

import LinkingConfiguration from './LinkingConfiguration';
import StackNavigator from './StackNav';

import { initLanguageDetector } from '@/languages';
import {
    // useAppDispatch,
    useAppSelector,
} from '@/store/hooks';

// import { setTheme } from '@/store/theme/slice';

export default function Navigation() {
    const { theme, language } = useAppSelector((state) => state.appSettings);

    useEffect(() => {
        i18next.changeLanguage(language).finally(() => {
            console.log('Language changed');
        });
    }, [language]);

    initLanguageDetector(getLocales()[0].languageTag).finally(() => {
        console.log('Language detector initialized');
    });
    // const dispatch = useAppDispatch();

    // React.useEffect(() => {
    //     // Set initial theme value based on system theme, and then user can take over the
    //     if (!theme) dispatch(setTheme(colorScheme));
    // }, [colorScheme, theme, dispatch]);

    return (
        <NavigationContainer linking={LinkingConfiguration} theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <StackNavigator />
        </NavigationContainer>
    );
}
