import { Alert } from 'react-native';

type Alerts = {
    text?: string;
    onPress: () => void;
    style?: 'destructive' | 'default' | 'cancel' | undefined;
};

const AlertMessage = (props: Alerts) => {
    const { onPress } = props;

    return Alert.alert('Delete', 'Are you sure!?', [
        {
            text: 'DELETE',
            onPress: onPress,

            style: 'default',
        },
        {
            text: 'CANCEL',
            style: 'default',
        },
    ]);
};

export default AlertMessage;
