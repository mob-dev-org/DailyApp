import React from 'react';
import { Text } from 'react-native';

//copy past

export const CurrentDateTime: React.FC = () => {
    const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <Text>{currentDateTime.toLocaleString()}</Text>;
};

export default CurrentDateTime;
