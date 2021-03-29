import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home'
import AddStack from './Screens/AddTask'
import Complete from './Screens/Complete';
const Stack = createStackNavigator();
function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  options = {{headerShown : false}} />
        <Stack.Screen name="Add" component={AddStack} options = {{headerShown : false}}/>
        <Stack.Screen name="Complete" component={Complete} options = {{headerShown : false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;