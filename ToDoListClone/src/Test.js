import React from 'react';
import {View} from 'react-native';
import Home from './weatherApp/Screens/Home';
function Test(props) {
    return (
        <View style = {{flex :1}}>
            <Home lat1 = {20.981720899999996} lon1 = {105.83995939999998}/>
        </View>
    );
}

export default Test;