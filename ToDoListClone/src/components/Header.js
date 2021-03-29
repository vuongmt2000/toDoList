import React from 'react';
import { View, Text, Dimensions } from 'react-native';
const height  = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
function Header(props) {
    return (
        <View style = {{ backgroundColor : "#00ced1", height : height*0.08,width : width, justifyContent : "center",alignItems :"center"}}>
            <Text style = {{color : "#f0f8ff" ,fontSize :20, fontWeight: "bold" }}>ToDoList</Text>
        </View>
    );
}

export default Header;