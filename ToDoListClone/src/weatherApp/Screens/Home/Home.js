/* Libraries */
import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import {NeuView} from 'react-native-neu-element';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import PagerView from 'react-native-pager-view';
import {UserContext} from '../../../weatherApp/UserContext';
import {
  PagerTabIndicator,
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerDotIndicator,
  ViewPager,
  initialPage,
} from '@shankarmorwal/rn-viewpager';
const {width, height} = Dimensions.get('screen');

// ICONS IMPORT
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';

// THEME IMPORT
import * as theme from '../../Constants/theme';
import {ImageBackground} from 'react-native';

const MyHome = (props, {navigation, route}) => {
  const lat = props.lat;
  const lon = props.lon;
  const dataLocal = props.dataLocal;
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data_hours, setData_hours] = useState([]);
  const [data_day, setData_day] = useState([]);
  const [data_current, setData_current] = useState([
    {
      dt: 1617317724,
      sunrise: 1617317340,
      sunset: 1617361872,
      temp: 298.15,
      feels_like: 299.16,
      pressure: 1006,
      humidity: 94,
      dew_point: 297.12,
      uvi: 0,
      clouds: 75,
      visibility: 3800,
      wind_speed: 2.57,
      wind_deg: 120,
      weather: [
        {
          id: 701,
          main: 'Mist',
          description: 'sương mờ',
          icon: '50d',
        },
        {
          id: 300,
          main: 'Drizzle',
          description: 'ánh sáng cường độ mưa phùn',
          icon: '09d',
        },
      ],
    },
  ]);
  const [color_1, setColor_1] = useState('#f7f7f7');
  const [text_color1, setText_color1] = useState('white');
  const [currentTab, setCurrentTab] = useState(0);
  const [nameLocal, setNameLocal] = useState([]);
  const [image_back, setImage_back] = useState('../../../assets/a.jpg');
  const [data, setData] = useState({
    coord: {lon: 105.855, lat: 21.0095},
    weather: [{id: 701, main: 'Mist', description: 'mist', icon: '50d'}],
    base: 'stations',
    main: {
      temp: 302.15,
      feels_like: 307.68,
      temp_min: 302.15,
      temp_max: 302.15,
      pressure: 1000,
      humidity: 0,
      dew_point: 0,
      uvi: 0,
      wind_speed: 0,
      wind_deg: 0,
    },
    visibility: 4400,
    wind: {speed: 3.09, deg: 90},
    clouds: {all: 75},
    dt: 1617179843,
    sys: {
      type: 1,
      id: 9308,
      country: 'VN',
      sunrise: 1617144644,
      sunset: 1617189034,
    },
    timezone: 25200,
    id: 1581130,
    name: '',
    cod: 200,
  });

  useEffect(() => {
    if (lat && lon) {
      var config = {
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=vi&appid=d604075651abf4a63c95286fedf54068`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          setData(response.data);
          setNameLocal(...nameLocal, response.data.name);
        })
        .catch(function (error) {
          console.log(error);
        });

      // get data of hourly
      var config2 = {
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=vi&appid=d604075651abf4a63c95286fedf54068`,
        headers: {},
      };

      axios(config2)
        .then(function (response) {
          setData_hours(response.data.hourly);
          setData_current(response.data.current);
          setData_day(response.data.daily);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [lon, lat, loading]);

  function time_String(date) {
    const hour = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);

    return `${hour}:${minutes}`;
  }
  function date_String(date) {
    const day = `${date.getDay() == 0 ? 'CN' : 'Th' + (date.getDay() + 1)}`;
    const date_ = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    return `${day}, Ng ${date_} thg ${month}`;
  }
  const [time_clock, setTime_clock] = useState('');
  const [dateToString, setDateToString] = useState('');
  useEffect(() => {
    const time_now = setInterval(() => {
      const now = new Date();
      const timeToString = time_String(now);
      const dateToString = date_String(now);
      setDateToString(dateToString);
      setTime_clock(timeToString);
    }, 1000);
    return () => {
      // cleanup
      clearInterval(time_now);
    };
  }, []);

  function image_weather() {
    if (data.weather[0].main == 'Clouds') {
      return require('../../../assets/cloud.png');
    } else if (data.weather[0].main == 'Drizzle') {
      return require('../../../assets/cloudy_rain.png');
    } else {
      return require('../../../assets/sun.png');
    }
  }
  function image_weather1(a) {
    if (a == 'Clouds') {
      return require('../../../assets/cloud.png');
    } else if (a == 'Drizzle') {
      return require('../../../assets/cloudy_rain.png');
    } else if (a == 'Rain') {
      return require('../../../assets/rainnig.png');
    } else {
      return require('../../../assets/sun.png');
    }
  }
  // render Item
  var k = 0;
  const v = new Date();
  const RenderItem = ({item}) => {
    k++;
    var timestemp = new Date(item.dt * 1000);
    return (
      <View>
        {5 <= 12 ? (
          <View style={{alignItems: 'center', marginLeft: 10, marginRight: 10}}>
            <Text style={{color: 'white'}}>
              {('0' + timestemp.getHours()).slice(-2)}:00
            </Text>
            <Image
              style={{width: 45, height: 45, marginTop: 5}}
              source={image_weather1(item.weather[0].main)}
            />
            <View
              style={{flexDirection: 'row', marginBottom: 5, marginTop: 10}}>
              <Image
                style={{width: 14, height: 14}}
                source={require('../../../assets/rainy.png')}
              />
              <Text
                style={{
                  color: '#faac25',
                  alignItems: 'center',
                  fontSize: 12,
                  marginLeft: 2,
                }}>
                {Math.floor(item.pop * 100)}%
              </Text>
            </View>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {Math.floor(item.temp - 273)}°
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  };
  var m = 0;
  const RenderItem1 = ({item}) => {
    var timestemp1 = new Date(item.dt * 1000);
    m++;
    function time_day() {
      let a = timestemp1.getDay();
      let b = [
        'Chủ nhật',
        'Thứ hai',
        'Thứ ba',
        'Thứ tư',
        'Thứ năm',
        'Thứ sáu',
        'Thứ bảy',
      ];
      return b[a];
    }
    return (
      <View>
        {m <= 7 ? (
          <View style={{flexDirection: 'row', margin: 10}}>
            <View
              style={{
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>{time_day()}</Text>
            </View>
            <View
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 40, width: 40}}
                source={image_weather1(item.weather[0].main)}
              />
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image
                  style={{width: 14, height: 14}}
                  source={require('../../../assets/rainy.png')}
                />
                <Text
                  style={{
                    color: '#faac25',
                    alignItems: 'center',
                    fontSize: 12,
                    marginLeft: 2,
                  }}>
                  {Math.floor(item.pop * 100)}%
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color_1}}>
                {Math.floor(item.temp.min - 273)}° ~{' '}
                {Math.ceil(item.temp.max - 273)}°
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  };
  function add_local(navigation) {
    props.navigation.toggleDrawer();
  }

  function showDetail(navigation) {
    console.log(props);
    props.navigation.navigate('DetailHours', {
      data: data_hours,
      date_string: dateToString,
    });
  }
  function showDetailDaily(navigation) {
    props.navigation.navigate('DetailDaily', {
      data: data_day,
    });
  }
  function onLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      backgroundColor={'#7097da'}
      style={{flex: 1, width: width}}>
      <View>
        {loading ? <ActivityIndicator size="large" color="white" /> : <View />}
        <View
          style={{
            width: 330,
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#7097da',
            alignSelf: 'center',
          }}>
          <View
            color={theme.colors.bgCol}
            height={30}
            width={30}
            borderRadius={30}>
            <TouchableOpacity onPress={() => add_local(navigation)}>
              <Feather name={'menu'} size={25} color={'white'} />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 20, color: 'white'}}>{data.name}</Text>
          <View
            color={theme.colors.bgCol}
            height={30}
            width={30}
            borderRadius={30}>
            <TouchableOpacity onPress={onLoading}>
              <Feather
                name={'map-pin'}
                size={25}
                color={'white'}
                style={{marginLeft: 0}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SECTION 1 */}
      <View style={{alignSelf: 'center'}}>
        <View
          color={theme.colors.bgCol}
          height={180}
          width={330}
          borderRadius={5}
          concave>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              backgroundColor: '#3e5f8a',
              borderRadius: 5,
            }}>
            <View style={{height: 120, width: 330, flexDirection: 'row'}}>
              {/* view ngày tháng năm giờ */}
              <View
                style={{
                  width: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: text_color1, fontSize: 12}}>
                  {dateToString}
                </Text>
                <Text style={{fontSize: 25, color: text_color1, marginTop: 5}}>
                  {time_clock}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '25%',
                }}>
                <Text style={{fontSize: 50, color: text_color1}}>
                  {Math.floor(data.main.temp - 273)}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: -20,
                    color: text_color1,
                  }}>
                  °C
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '35%',
                }}>
                <Image
                  style={{
                    height: 55,
                    width: 55,
                    borderRadius: 40,
                    marginTop: 10,
                  }}
                  source={image_weather()}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{marginTop: 3, color: text_color1, fontSize: 12}}>
                    {data.weather[0].description}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{color: text_color1}}>
                Cao: {Math.ceil(data.main.temp_max - 273)}° ~ Thấp:{' '}
                {Math.floor(data.main.temp_min - 273)}°
              </Text>
              <Text style={{marginTop: 10, color: text_color1}}>
                Gió: {data.wind.speed}km/h
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 200,
          width: 330,
          alignSelf: 'center',
          borderRadius: 5,
          marginTop: 10,
          backgroundColor: '#3e5f8a',
        }}>
        <View
          style={{
            height: 40,
            width: 330,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Image
            style={{height: 20, width: 20}}
            source={require('../../../assets/rainy.png')}
          />
          <Text
            style={{
              fontSize: 12,
              fontStyle: 'italic',
              marginLeft: 5,
              color: 'white',
            }}>
            khả năng mưa
          </Text>
          <Image
            style={{height: 20, width: 20, marginLeft: 20}}
            source={require('../../../assets/rainy.png')}
          />
          <Text
            style={{
              fontSize: 12,
              fontStyle: 'italic',
              marginLeft: 5,
              color: 'white',
            }}>
            khả năng tuyết
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data_hours.map((item, index) => (
            <RenderItem item={item} key={item.id + '_' + index} />
          ))}
        </ScrollView>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginBottom: 5,
            marginRight: 10,
          }}>
          <TouchableOpacity onPress={() => showDetail(navigation)}>
            <Text style={{color: '#faac25', textDecorationLine: 'underline'}}>
              Hơn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: 330,
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#3e5f8a',
          borderRadius: 5,
        }}>
        {data_day.map((item, index) => (
          <RenderItem1 item={item} key={item.id + '_' + index} />
        ))}
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginBottom: 5,
            marginRight: 10,
          }}>
          <Text
            style={{color: '#faac25', textDecorationLine: 'underline'}}
            onPress={() => showDetailDaily(navigation)}>
            Hơn
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 330,
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#3e5f8a',
          flexDirection: 'row',
          marginBottom: 10,
          borderRadius: 5,
        }}>
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 50, height: 50}} source={image_weather()} />
        </View>
        <View style={{width: '70%'}}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              flexDirection: 'row',
            }}>
            <Text style={{color: color_1}}>Độ ẩm</Text>
            <Text style={{color: color_1}}>{data_current.humidity}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              flexDirection: 'row',
            }}>
            <Text style={{color: color_1}}>Điểm sương</Text>
            <Text style={{color: color_1}}>
              {Math.floor(data_current.dew_point - 273)}°C
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              flexDirection: 'row',
            }}>
            <Text style={{color: color_1}}>Mây che phủ</Text>
            <Text style={{color: color_1}}>{data_current.clouds}%</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              flexDirection: 'row',
            }}>
            <Text style={{color: color_1}}>Tầm nhìn</Text>
            <Text style={{color: color_1}}>
              {data_current.visibility / 1000}km
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              flexDirection: 'row',
            }}>
            <Text style={{color: color_1}}>Chỉ số UV</Text>
            <Text style={{color: color_1}}>{data_current.uvi}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
              marginBottom: 10,
              flexDirection: 'row',
            }}>
            <Text style={{color: color_1}}>Sức ép</Text>
            <Text style={{color: color_1}}>{data_current.pressure}mb</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
// END RENDERING FUNCTIONS

const styles = StyleSheet.create({
  addnInfoTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
});

const Home = (props, {navigation, route}) => {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  var data_local = [];
  const [dataLocal, setDataLocal] = useState(data_local);
  const [load, setLoad] = useState(0);
  const {setDataContext1} = useContext(UserContext);
  const {local} = useContext(UserContext);
  const name = [];
  const [load1, setLoad1] = useState(0);
  const [entries, setEntries] = useState(null);
  const [index_drawer, setIndex_drawer] = useState(0);
  const [activeSlide, setActiveSlide] = useState(null);
//   console.log('hhh' + JSON.stringify(props));

//   console.log('hhh' + JSON.stringify(navigation));
//   console.log('hhh' + JSON.stringify(route));

  useEffect (()=>{
      console.log("have local"+local);
    setLoad(local);
    viewPageRef?.current?.setPage(local);
}, [local])

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log(`info`, info);
      setDataLocal(x => [
        ...x,
        {lat: info.coords.latitude, lon: info.coords.longitude, name: 'Hà nội'},
      ]);
    });
  }, []);

  useEffect(() => {
    console.log("send data : "+JSON.stringify(props));
    if (props.route.params?.lat) {
      console.log('aaa' + JSON.stringify(props.route.params));
      const {lat, lon, name} = props.route.params;
      setDataLocal(x => [...x, {lat: lat, lon: lon, name: name}]);
    }
  }, [props]);

  useEffect(() => {
    const lastPage = dataLocal.length - 1;
    setLoad(lastPage);
    setDataContext1(dataLocal);
    setTimeout(() => {
      viewPageRef?.current?.setPage(lastPage);
      console.log('data local change, set page =', lastPage);
    }, 0);
  }, [dataLocal]);

  const RenderItem_local = ({item, index}) => {
    return (
      <View style={{flex: 1}} key={`item_{index}`}>
        <MyHome
          lat={item.lat}
          lon={item.lon}
          navigation={props.navigation}
          dataLocal={dataLocal}
        />
      </View>
    );
  };
  function add_local(navigation) {
    // navigation.toggleDrawer();
    props.navigation.navigate('Add', {data: name});
  }

  console.log(`load`, load);
  const viewPageRef = useRef(null);

  return (
    <View style={{flex: 1}}>
      <IndicatorViewPager
        ref={viewPageRef}
        initialPage={load}
        style={{flex: 1}}
        indicator={
          <PagerDotIndicator
            dotStyle={{marginBottom: 560}}
            selectedDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 20,
              marginBottom: 560,
            }}
            pageCount={dataLocal.length}
          />
        }>
        {dataLocal.map((item, index) => (
          <RenderItem_local item={item} index={index} key={`page_${index}`} />
        ))}
      </IndicatorViewPager>
    </View>
  );
};

export default Home;
