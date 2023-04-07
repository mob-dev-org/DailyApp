// ------------------ Simple Icons ------------------
// import Clock from 'assets/icons/app_icons/clock.svg';
// import Barcode from 'assets/icons/app_icons/barcode.svg';
// ------------------ Chevron icons ------------------
// import ChevronDown from 'assets/icons/chevron_icon/chevron-down.svg';
import { useTheme } from '@react-navigation/native';
import { FC, memo } from 'react';
import { ColorValue, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import Account from '@/assets/icons/account.svg';

// ------------------ Icons ------------------

export type AppIconNames = 'account';

const components: { [key in AppIconNames]: React.FC<SvgProps> } = {
    account: Account,
};

export type AppIconProps = {
    name: AppIconNames;
    size?: number;
    color?: ColorValue;
    style?: ViewStyle;
};

const AppIcon: FC<AppIconProps> = ({ name, size, ...props }) => {
    const { colors } = useTheme();
    props.color = props?.color ?? colors.text;

    const IconFactory = components[name];
    return <IconFactory testID={`${name}Icon`} width={size} height={size} {...props} />;
};

AppIcon.defaultProps = {
    size: 24,
};

export default memo(AppIcon);
