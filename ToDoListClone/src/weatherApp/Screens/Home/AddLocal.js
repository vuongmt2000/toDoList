import React, {useState, useEffect, useCallback} from 'react';
import { View, Text , TextInput, TouchableOpacity,Keyboard} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
function AddLocal(props, {navigation}) {
    const [name, setName] = useState(null);
    const [a, setA] = useState(0);
    const [name_state, setName_state] = useState(null);
    const[lat, setLat] = useState(null);
    const[lon, setLon] = useState(null);

    function go_back(navigation){
        props.navigation.goBack();
    }
    function onClick_huy(){
        props.navigation.goBack();
    }
    // console.log(props.navigation)

    const call_aPI = 
        () => {
            // console.log("aaaaa");
            var config = {
                method: 'get',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=vi&appid=d604075651abf4a63c95286fedf54068`,
                headers: {},
              };
          
              axios(config)
                .then(function (response) {
                 console.log(response.data.coord.lat+"      "+response.data.coord.lon +"     55555");
                 props.navigation.navigate("Home",{
                    lll:"lll",
                    lat: response.data.coord.lat,
                    lon: response.data.coord.lon,
                    name: response.data.name,
                });
                })
                .catch(function (error) {
                  console.log(error);
                  setName_state("Thành phố không tồn tại!");
                }); 
        }
    function onClick_OK(navigation){
        if(name){
            setA(a+1);
            call_aPI()
           }
        else{
            setName_state("Nhập tên tỉnh, thành phố?");
        }
    }
    return (
        <View style = {{flex: 1, backgroundColor :"#75a1ff"}}>
            <View style = {{flexDirection : "row", marginTop:10, alignItems:"center"}}>
                <TouchableOpacity style = {{marginLeft:15}} onPress = {()=>go_back(navigation)}>
                    <Feather name={'chevron-left'} size={30} color={"white"} />
                </TouchableOpacity>  
                <TextInput  value = {name}
                autoFocus
                // onFocus = {() => Keyboard.dismiss()}
            onSubmitEditing = {()=>onClick_OK(navigation)}
            
            onChangeText ={setName}
            placeholder= "Tên tỉnh, thành phố"
            placeholderTextColor="#dedede"
           style = {{ height :60, width : "80%", alignSelf: "center",  paddingLeft:10,borderBottomColor:'white', color:"#dedede", fontSize:18}}/>
            </View>
           
          
           {/* <TextInput placeholder = "Tên quốc gia"
             style = {{marginTop: 30,height :50, width : "90%", alignSelf: "center", borderRadius:5, borderWidth:1, paddingLeft:10}}/> */}
           {/* <View style = {{flexDirection : "row", marginTop:10, justifyContent: "flex-end"}}>
                <TouchableOpacity onPress={onClick_huy}
                style = {{width: 120, height: 40, borderRadius:5, backgroundColor:"#912700", justifyContent :"center", alignItems :"center", marginRight: "5%"}}>
                    <Text style = {{color :"white"}}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress ={()=>onClick_OK(navigation)}
                style = {{width: 120, height: 40, borderRadius:5, justifyContent :"center", alignItems :"center", backgroundColor:"#012285", marginRight: "5%"}}>
                    <Text style = {{color :"white"}}>OK</Text>
                </TouchableOpacity>
           </View> */}
           <View style = {{justifyContent: "center", alignItems :"center", marginTop: 50}}>
                <Text style={{color:"#8f0000", fontSize: 20}}>{name_state}</Text>
           </View>
        </View>
    );
}

export default AddLocal;