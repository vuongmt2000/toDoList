import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {UserContext} from '../../UserContext'
function CustomDrawer(props, {navigation}) {
  
     // thêm vị trí 
     function to_add(navigation){
        props.navigation.navigate("Add_");
    }
    const {setLocal} = useContext(UserContext);
        const {dataContext1} = useContext(UserContext);
        // console.log("dataConText", dataContext1);
    function chane(a, b) {
        console.log(`b`, b)
        props.navigation.navigate("Home");
        setLocal(b);
    }
    const RenderItem = ({item, index})=>{
        return(
            <View style = {{ width:"90%", marginTop:20, alignSelf:"center",borderBottomColor:"white"}}>
                 <TouchableOpacity style = {{flexDirection:"row", alignItems:"center"}} onPress = {()=>chane(item.name, index)} >
                       {index==0? <Feather name={'home'} size={20} color={"white"} />:<Feather name={'map-pin'} size={20} color={"white"} />} 
                        <Text style={{ fontSize:18, color:"#cfd0d1", marginLeft: 20}}>{item.name}</Text>
                    </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style ={{flex: 1, backgroundColor:"#7097da"}}>
            <View style = {{flexDirection:"row", width:"90%", alignSelf:"center", marginTop: 20}}>
                    <TouchableOpacity style = {{flexDirection:"row"}} onPress = {()=>to_add(navigation)}>
                        <Feather name={'plus'} size={20} color={"white"} />
                        <Text style={{ fontSize: 18, color:"#dedede", marginLeft: 20}}>Thêm vị trí</Text>
                    </TouchableOpacity>
            </View>
            {/* <View style = {{ width:"90%", alignSelf:"center", marginTop: 5}}> */}
            {dataContext1? dataContext1.map((item, index) => (
                            <RenderItem item={item} index={index} key={`item_drawer_${index}`} />
                                ))
            :<View/>}
            </View>
        // </View>
    );
}

export default CustomDrawer;