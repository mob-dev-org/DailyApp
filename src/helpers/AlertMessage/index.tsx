import { Alert } from 'react-native';

type AlertMessage = {
    title: string;
    message: string;
    onPress: () => void;
    buttonText: string;
    buttonStyle: 'destructive' | 'default' | 'cancel';
};

const alertMessages = ({ title, message, onPress, buttonText, buttonStyle }: AlertMessage) => {
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

export default alertMessages;
