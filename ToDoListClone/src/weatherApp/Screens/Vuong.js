import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import Home from '../Screens/Home/Home'
import Geolocation from '@react-native-community/geolocation';
const local = [];
                
const Vuong = ({navigation, route}, props) => {
    //  const {lat, lon} = route.params;
    //  local.push({"lat": lat, "log": lon});
    const [load, setLoad] = useState(0);
    // const[lat, setLat] = useState(null);
    // const[lon, setLon] = useState(null);
    // useEffect( async ()=>{
    //     Geolocation.getCurrentPosition(info => {
    //         let lat = info.coords.latitude
    //         let lon= info.coords.longitude
    //         local.push({"lat": lat, "lon": lon}); 
    //       })
    //         console.log(lat + lon);
    // },[])

    // function chay(){
    //     for(let k = 1; k <= data.length; k++){
    //         return (
    //             <View key = {k.toString()}>
    //                  <Home lat = {local[k].lat} lon = {local[k].lon}/>
    //             </View>
               
    //         )
    //     }
    // }
  return (
    <PagerView style={styles.pagerView} initialPage={load}>
        <View key ="1">
           <Home lat = {20.981720899999996} lon = {105.83995939999998}/>
        </View>
        {/* <View key ="1">
           <Home lat = {lat} lon = {lon}/>
        </View> */}
    </PagerView>
  )
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default Vuong;