import { Alert } from 'react-native';

type AlertMessageProps = {
    title: string;
    message: string;
    onPress: () => void;
    buttonText: string;
    buttonStyle: 'destructive' | 'default' | 'cancel';
};

const alertMessage = (props: AlertMessageProps) => {
    const { title, message, onPress, buttonText, buttonStyle } = props;

    return Alert.alert(title, message, [
        {
            text: buttonText,
            onPress,
            style: buttonStyle,
        },
        {
            text: 'Cancel',
            style: 'default',
        },
    ]);
};

export default alertMessage;
