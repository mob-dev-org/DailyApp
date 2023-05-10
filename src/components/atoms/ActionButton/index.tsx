import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ActionButton = {
    text: string;
    onPress: () => void;
};

const TaskActionButton = (props: ActionButton) => {
    const { onPress, text } = props;
    const { t } = useTranslation();

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>{t(text)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    actionIconText: {
        fontSize: 12,
    },
    actionIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccfc',
        marginHorizontal: 4,
        paddingHorizontal: 8,
        borderRadius: 3,
        borderWidth: 1,
    },
});

export default TaskActionButton;
