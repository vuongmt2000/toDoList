import React from 'react';
import {View,Dimensions, Text} from 'react-native'
import Modal from 'react-native-modal';
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

function AddTask(props) {
    return (
        <View style = {{flex :1}}> 
            <Modal visible = {true}
            style = {{height : height*0.5,backgroundColor :"red", width : width}}>
                 <View style={{ flex: 1 }}>
                 <Text>I am the modal content!</Text>
                 </View>
            </Modal>
        </View>
    );
}

export default AddTask;