import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image, ToastAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as theme from '../Constants/theme';
function Add_local(props,{navigation, route}) {

    // const {data} = props.route.params;
    // console.log(`data`, data)
    function go_back(navigation){
        props.navigation.navigate("Home");
    }

    // thêm vị trí 
    function to_add(navigation){
        props.navigation.navigate("Add_");
    }

    function on_home(navigation){
        props.navigation.navigate("Home");
    }
    return ( 
        <ScrollView showsVerticalScrollIndicator ={false} stickyHeaderIndices ={[0]} backgroundColor= {"#7097da"}>
        {/* header */}
                <View>
                <View style={{width: '100%',height: 60, flexDirection: 'row', alignItems: 'center', backgroundColor: "#7097da"}}>
                    <View color={theme.colors.bgCol} height={30} width={30} borderRadius={30} marginLeft= {20} justifyContent = {"flex-start"}>
                        <TouchableOpacity onPress={()=>go_back(navigation)}>
                        <Feather name={'arrow-left'} size={25} color={"white"} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 20, color:"white", marginLeft: 80}}>Chỉnh sửa vị trí</Text>
                </View>
                </View>
                <View style = {{flexDirection:"row", width:"90%", alignSelf:"center"}}>
                    <TouchableOpacity style = {{flexDirection:"row"}} onPress = {()=>to_add(navigation)}>
                        <Feather name={'plus'} size={25} color={"white"} />
                        <Text style={{ fontSize: 20, color:"white", marginLeft: 20}}>Thêm vị trí</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flexDirection:"row", width:"90%", alignSelf:"center", marginTop: 20}}>
                    <TouchableOpacity style = {{flexDirection:"row"}} onPress = {()=>on_home(navigation)}>
                        <Feather name={'home'} size={25} color={"white"} />
                        <Text style={{ fontSize: 20, color:"white", marginLeft: 20}}>Hà nội</Text>
                    </TouchableOpacity>
                </View>
                <View style ={{ borderTopWidth :0.2, borderTopColor:"white", width:"90%", alignSelf:"center", marginTop:20}}>

                </View>
                {/* {data.map((item, index) => (
                        <RenderItem item={item} key={item.id + '_' + index} />
                            ))} */}
    </ScrollView>
    );
}

export default Add_local;