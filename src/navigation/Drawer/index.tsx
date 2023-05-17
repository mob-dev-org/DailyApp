import { createDrawerNavigator } from '@react-navigation/drawer';

import ToDoScreen from '@/screens/ToDo';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="ToDoApp" component={ToDoScreen} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;
