import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as theme from '../Constants/theme';

function DetailDaily({navigation, route}) {
    const {data} = route.params;
    function go_back(navigation){
        navigation.goBack();
    }
    function formatHours(a){
            let timestamp = new Date(a*1000);
            if(timestamp.getDay()== 0){
                return "CN, thg"+('0' + timestamp.getMonth()).slice(-2)+ " "+ ('0' + timestamp.getDate()).slice(-2) ;
            }
            else {
                return "Th "+timestamp.getDay()+", thg"+('0' + timestamp.getMonth()).slice(-2)+ " "+ ('0' + timestamp.getDate()).slice(-2) ;
            }
    }
    function image_weather1(a){
        if(a == "Clouds"){
            return require("../../assets/cloud.png");
        }
        else if(a == "Drizzle"){
            return require("../../assets/cloudy_rain.png");
        }
        else if(a =="Rain"){
            return require("../../assets/rainnig.png");
        }
        else {
            return require("../../assets/sun.png");
        }
    }
    const RenderItem = ({item})=>{
        return(
            <View style ={{marginBottom :10, borderRadius: 5, backgroundColor :"#3e5f8a", alignSelf: "center", width: 350}}>
               <View style = {{flexDirection: "row",justifyContent: "space-between", alignItems:"center", width: 330,alignSelf:"center"}}>
                    <Text style ={{color:"white"}}>{formatHours(item.dt)}</Text>
                    <View style ={{flexDirection :"row", alignItems: "center"}}>
                        <Text style= {{marginRight:10, color: "white", fontSize:24}}>{Math.ceil(item.temp.max-273)}°~{Math.floor(item.temp.min-273)}°</Text>
                        <Image  style = {{width: 45, height: 45, marginTop:5}} source = {image_weather1(item.weather[0].main)}/>
                    </View>
                </View>
                <View style ={{borderTopColor: "white", borderTopWidth:0.5, alignItems:"center", width: 330,alignSelf:"center" ,marginBottom:15,marginTop:10}}>
                    <View style={{justifyContent: "center", alignItems :"center"}}>
                        <Text style ={{color:"white", fontSize: 16,fontStyle :"italic"}}>{item.weather[0].description}</Text>
                    </View>
                    <View style = {{flexDirection: "row"}}>
                        <View style ={{width: "60%"}}>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Độ ẩm  {Math.floor(item.humidity)}%</Text>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Điểm sương  {Math.floor(item.dew_point-273)}</Text>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Khả năng mưa  {Math.floor(item.pop*100)}%</Text>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Sức ép  {item.pressure} mb</Text>
                        </View>
                        <View style ={{width: "40%"}}>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Tốc độ gió  {Math.floor(item.wind_speed)} Km/h</Text>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Tầm nhìn {Math.floor(item.visibility/1000)} Km</Text>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Chỉ số UV {Math.floor(item.uvi)}</Text>
                            <Text style ={{color:"#c7c5c5",marginTop:5}}>Mây che phủ {Math.floor(item.clouds)}%</Text>
                        </View>
                    </View>
                </View> 
            </View>
        )
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
                        <Text style={{ fontSize: 20, color:"white", marginLeft: 95}}>7 ngày tới</Text>
                    </View>
                    </View>
                    {data.map((item, index) => (
                            <RenderItem item={item} key={item.id + '_' + index} />
                                ))}
        </ScrollView>
    );
}

export default DetailDaily;