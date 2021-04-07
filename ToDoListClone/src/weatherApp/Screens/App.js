import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home'
import Add_local from './Add_local'
import DetailHours from './DetailHours'
import DetailDaily from './DetailDaily'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function App() {
    return (
      <NavigationContainer>
       
        {/* <Drawer.Navigator>
             <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Thêm vị trí" component={Add_local} />
       </Drawer.Navigator> */}
     <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  options = {{headerShown : false}} />
        <Stack.Screen name="Add" component={Add_local} options = {{headerShown : false}}/>
        <Stack.Screen name="DetailHours" component={DetailHours} options = {{headerShown : false}}/>
        <Stack.Screen name="DetailDaily" component={DetailDaily} options = {{headerShown : false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;