import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Screens/Home'
import App from './Screens/App'
import Add_local from './Screens/Add_local'
import DetailHours from './Screens/DetailHours'
import DetailDaily from './Screens/DetailDaily'
import AddLocal from './Screens/Home/AddLocal'
import Vuong from '../weatherApp/Screens/Vuong'
import  CustomDrawer from './Screens/Home/CustomDrawer'
import  DataContextProvider from './UserContext'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack(){
  return(
     <Stack.Navigator initialRouteName="Home">
       
         <Stack.Screen name= "Vuong" component={Vuong}  options = {{headerShown : false}} />
         
        <Stack.Screen name="Home" component={Home}  options = {{headerShown : false}} />
        <Stack.Screen name="Add" component={Add_local} options = {{headerShown : false}}/>
        <Stack.Screen name="DetailHours" component={DetailHours} options = {{headerShown : false}}/>
        <Stack.Screen name="DetailDaily" component={DetailDaily} options = {{headerShown : false}}/>
        <Stack.Screen name="Add_" component={AddLocal}  options = {{headerShown : false}} />
        </Stack.Navigator>
  )
  
}
function Index() {
    return (
      <NavigationContainer >
        <DataContextProvider>
        <Drawer.Navigator drawerContent = {props => <CustomDrawer { ... props}/>}
        initialRouteName= "Home">
             <Drawer.Screen name="Home" component={HomeStack} options={{ drawerLabel: 'Hà Nội' }} />       
        </Drawer.Navigator>
        </DataContextProvider>
      </NavigationContainer>
    );
}

export default Index;