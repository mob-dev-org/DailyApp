import { createDrawerNavigator } from '@react-navigation/drawer';

import TabTwoScreen from '@/screens/TabTwo';
import ToDoScreen from '@/screens/ToDo';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="ToDo" component={ToDoScreen} />
            <Drawer.Screen name="TabTwo" component={TabTwoScreen} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;
