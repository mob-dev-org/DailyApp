/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Colors from '@/constants/Colors';
import { BottomTabsParamList } from '@/navigation/types';
import TabOneScreen from '@/screens/TabOne';
import TabThreeScreen from '@/screens/TabThree';
import TabTwoScreen from '@/screens/TabTwo';
import { useAppSelector } from '@/store/hooks';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<BottomTabsParamList>();

function BottomTabNavigator() {
    const { t } = useTranslation();

    const theme = useAppSelector((state) => state.appSettings.theme);

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{
                tabBarActiveTintColor: Colors[theme].tint,
                headerShown: false,
            }}>
            <BottomTab.Screen
                name={'TabOne'}
                component={TabOneScreen}
                // options={({ navigation }: BottomTabsScreenProps<'TabOne'>) => ({
                //     title: 'Tab One',
                //     tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                //     headerRight: () => (
                //         <Pressable
                //             onPress={() => navigation.navigate('Modal')}
                //             style={({ pressed }) => ({
                //                 opacity: pressed ? 0.5 : 1,
                //             })}>
                //             <FontAwesome
                //                 name="info-circle"
                //                 size={25}
                //                 color={Colors[theme].text}
                //                 style={{ marginRight: 15 }}
                //             />
                //         </Pressable>
                //     ),
                // })}
                options={{
                    title: t('navigation:tabOne') ?? 'Tab One',
                }}
            />
            <BottomTab.Screen
                name="TabTwo"
                component={TabTwoScreen}
                options={{
                    title: t('navigation:tabTwo') ?? 'Tab Two',
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                }}
            />

            <BottomTab.Screen
                name="TabThree"
                component={TabThreeScreen}
                options={{
                    title: t('navigation:TabThree') ?? 'Tab Three',
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
