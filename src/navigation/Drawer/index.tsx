import { createDrawerNavigator } from '@react-navigation/drawer';

import TabThreeScreen from '@/screens/ToDo';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="ToDoApp" component={TabThreeScreen} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;
