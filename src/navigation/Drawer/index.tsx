import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from '../BottomTabsNav';

import ToDoScreen from '@/screens/ToDo';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="To-Do" component={ToDoScreen} />
            <Drawer.Screen name="Termin" component={BottomTabNavigator} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;
