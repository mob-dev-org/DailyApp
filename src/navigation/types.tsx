/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackNavParamList = {
    Root: NavigatorScreenParams<BottomTabsParamList> | undefined;
    Modal: undefined;
    NotFound: undefined;
};

export type StackNavScreenProps<Screen extends keyof StackNavParamList> = NativeStackScreenProps<
    StackNavParamList,
    Screen
>;

export type BottomTabsParamList = {
    TabOne: undefined;
    TabTwo: undefined;
    TabThree: undefined;
};

export type BottomTabsScreenProps<Screen extends keyof BottomTabsParamList> = CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, Screen>,
    NativeStackScreenProps<StackNavParamList>
>;
