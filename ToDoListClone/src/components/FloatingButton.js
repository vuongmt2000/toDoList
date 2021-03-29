import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

function FloatingButton({navigation}) {


    function onChangeScreen2(navigation){
        navigation.navigate('Complete');
    }
    function onChangeScreen1(navigation){
        navigation.navigate('Home');
    }
    return (
       <View style = {{flexDirection : "row", justifyContent : "center", alignItems : "center", marginTop : 20}}>
        <TouchableOpacity onPress={()=>onChangeScreen1(navigation)}
        style = {{height: 40, width :80, borderWidth  :0.5 ,justifyContent : "center", alignItems : "center",}}>
            <Text>ToDo</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>onChangeScreen2(navigation)}
        style = {{height: 40, width :80, borderWidth :0.5, justifyContent : "center", alignItems : "center",}}>
            <Text>Complete</Text>
        </TouchableOpacity>
       </View>
    );
}

export default FloatingButton;