import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Picker,
} from 'react-native';
import FloatingButton from '../components/FloatingButton';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
function Home({navigation}) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isModalVisible, setInModalVisible] = useState(false);
  const [isModalVisible1, setInModalVisible1] = useState(false);
  const [input_text, setInput_text] = useState(null);
  const [input_text1, setInput_text1] = useState(null);
  const [input_text2, setInput_text2] = useState(null);
  const [id, setId] = useState(null);
  const [dataComplete, setDataComplete] = useState([]);
  const [isComplete1, setIsComplete1] = useState(false);
  const [i, setI] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [chooseDate1, setChooseDate1] = useState(null);

  // const [date, setDate] = useState("set due date");
  var v = 0;
  var today = new Date();
  var chone = moment(today).format('DD/MM/YYYY');
  const [chooseDate, setChooseDate] = useState(chone);
  // useEffect(() => {
  //     effect
  //     return () => {
  //         cleanup
  //     }
  // }, [input]);
  useEffect(() => {
    var l = 0;
    for (let a = 0; a < data.length; a++) {
      if (data[a].isComplete) {
        l = l + 1;
      }
    }
    setI(l);
  }, [data]);
  const onDelete_ = item => {
    let a = [...data]; //tạo một mảng sao chép
    let index = item.id;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === index) {
        a.splice(i, 1);
      }
    }
    setData(a);

    console.log(item.id);
  };
  function add_TodoList() {
    setInModalVisible(true);
  }
  function onChangeScreen2(navigation) {
    navigation.navigate('Complete');
  }
  function onChangeScreen1(navigation) {
    navigation.navigate('Home');
  }

  function them() {
    if (input_text) {
      setInModalVisible(false);
      let obj = {
        id: data.length,
        isComplete: false,
        title: input_text,
        date_: chooseDate,
      };
      console.log(obj.date_);
      setData(x => [...x, obj]);
      //   data.push(obj);]
      setInput_text(null);
      setChooseDate(chone);
    } else {
      alert('bạn cần nhập hoạt động vào :))');
    }
  }

  function huy() {
    setInModalVisible(false);
  }
  function huy1() {
    setInModalVisible1(false);
  }
  const complete_ = item => {
    setInModalVisible1(true);
    setInput_text2(item.title);
    setId(item.id);
    setChooseDate1(item.date_);
  };
  function sua() {
    setInModalVisible1(false);
    if (input_text2) {
      setData(x => {
        let index = x.findIndex(y => y.id === id);
        if (index !== -1)
          x[index] = {
            id,
            title: input_text2,
            isComplete: false,
            date_: chooseDate1,
          };
        return [...x];
      });
    }
  }
  const complete_1 = item => {
    setData(x => {
      let index = x.findIndex(y => y.title === item.title);
      if (index !== -1)
        x[index] = {
          id: item.id,
          title: item.title,
          isComplete: true,
          date_: item.date_,
        };
      return [...x];
    });
  };
  const complete_2 = item => {
    setData(x => {
      let index = x.findIndex(y => y.title === item.title);
      if (index !== -1)
        x[index] = {
          id: item.id,
          title: item.title,
          isComplete: false,
          date_: item.date_,
        };
      return [...x];
    });
  };
  function onComplete_() {
    setIsComplete1(!isComplete1);
  }

  //set ngày
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setChooseDate(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };
  const RenderItem = ({item}) => (
    <View>
      {!item.isComplete ? (
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            width: width * 0.95,
            alignSelf: 'center',
            borderRadius: 5,
            marginTop: 3,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => complete_1(item)}
            onLongPress={() => complete_(item)}
            style={{
              width: 0.8 * width,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                marginLeft: 10,
                width: 26,
                height: 26,
                borderWidth: 1,
                borderRadius: 26,
              }}
            />
            <View style={{marginLeft: 30}}>
              <Text
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  color: '#006400',
                  fontSize: 16,
                  alignItems: 'center',
                  width: width * 0.65,
                }}>
                {item.title}
              </Text>
              {item.date_ ? (
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/date.png')}
                    style={{width: 18, height: 18, alignItems: 'center'}}
                  />
                  <Text
                    style={{
                      marginBottom: 10,
                      color: '#006400',
                      fontSize: 14,
                      alignItems: 'center',
                      marginLeft: 5,
                    }}>
                    {item.date_}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete_(item)}
            style={{
              width: 25,
              height: 26,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 25, height: 26}}
              source={require('../assets/delete.png')}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );

  const RenderItem1 = ({item}) => (
    <View>
      {item.isComplete ? (
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            width: width * 0.95,
            alignSelf: 'center',
            borderRadius: 5,
            marginTop: 3,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => complete_2(item)}
            // onLongPress={() => complete_(item)}
            style={{
              width: 0.8 * width,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{marginLeft: 10, width: 26, height: 26, borderRadius: 26}}
              source={require('../assets/icon.png')}
            />
            <View style={{marginLeft: 30}}>
              <Text
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  color: '#006400',
                  fontSize: 16,
                  alignItems: 'center',
                  width: width * 0.65,
                  textDecorationLine: 'line-through',
                   textDecorationStyle: 'solid'
                }}>
                {item.title}
              </Text>
              {item.date_ ? (
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/date.png')}
                    style={{width: 18, height: 18}}
                  />
                  <Text
                    style={{
                      marginBottom: 10,
                      color: '#006400',
                      fontSize: 14,
                      alignItems: 'center',
                      marginLeft: 5,
                    }}>
                    {item.date_}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete_(item)}
            style={{
              width: 25,
              height: 26,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 25, height: 26}}
              source={require('../assets/delete.png')}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: '#add8e6'}}>
        <Header />
        {/* <FloatingButton /> */}

        {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => onChangeScreen1(navigation)}
          style={{
            height: 40,
            width: 80,
            borderWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>ToDo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeScreen2(navigation)}
          style={{
            height: 40,
            width: 80,
            borderWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Complete</Text>
        </TouchableOpacity>
      </View> */}
        {data.length === i ? (
          <View />
        ) : (
          // <FlatList
          //   data={data}
          //   renderItem={renderItem}
          //   keyExtractor={item => item.id}
          // />
          <View>
            {data.map((item, index) => (
              <RenderItem item={item} key={item.id + '_' + index} />
            ))}
          </View>
        )}
        {i === 0 ? (
          <View />
        ) : (
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={onComplete_}>
              {isComplete1 ? (
                <Image
                  style={{width: 16, height: 16, marginLeft: 20}}
                  source={require('../assets/arrow_down.png')}
                />
              ) : (
                <Image
                  style={{width: 16, height: 16, marginLeft: 20}}
                  source={require('../assets/arrow_right.png')}
                />
              )}
              <Text
                style={{
                  marginLeft: 20,
                  color: '#4b0082',
                  fontweight: 'bold',
                  fontSize: 16,
                }}>
                Completed
              </Text>
              <Text
                style={{
                  marginLeft: 16,
                  color: '#4b0082',
                  fontweight: 'bold',
                  fontSize: 16,
                  alignItems:"center"
                }}>
                {i}
              </Text>
            </TouchableOpacity>
            {isComplete1 ? (
              // <FlatList
              //   data={data}
              //   renderItem={renderItem1}
              //   keyExtractor={item => item.id}
              // />
              <View>
                {data.map((item, index) => (
                  <RenderItem1 item={item} key={item.id + '_' + index} />
                ))}
              </View>
            ) : (
              <View />
            )}
          </View>
        )}
        {/* <ScrollView  >
      {data.map((item, index) => (
        <RenderItem item={item} key={item.id + '_' + index} />
      ))}
</ScrollView> */}

        <Modal
          isVisible={isModalVisible}
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View
            style={{
              height: height * 0.48,
              width: width,
              backgroundColor: '#deb887',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 20,
                color: '#000080',
                fontWeight: 'bold',
              }}>
              Thêm hoạt động
            </Text>
            <TextInput
              value={input_text}
              onChangeText={setInput_text}
              placeholder="Nhập hoạt động"
              style={{
                height: 50,
                width: 260,
                borderWidth: 1,
                marginTop: 30,
                padding: 10,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={showDatePicker}
                style={{flexDirection: 'row'}}>
                <Image
                  style={{width: 26, height: 26}}
                  source={require('../assets/calendarHistory.png')}
                />
                {chooseDate ? (
                  <Text>{chooseDate}</Text>
                ) : (
                  <Text>Set due date</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', marginLeft: 20}}>
                <Image
                  style={{width: 26, height: 26}}
                  source={require('../assets/bell.png')}
                />
                <Text>Remind me</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', marginLeft: 20}}>
                <Image
                  style={{width: 26, height: 26}}
                  source={require('../assets/2direction.png')}
                />
                <Text>Repeat</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <TouchableOpacity
                onPress={huy}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 80,
                  backgroundColor: '#8b0000',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={them}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 80,
                  backgroundColor: '#1e90ff',
                  marginLeft: 30,
                  borderRadius: 10,
                }}>
                <Text>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={isModalVisible1}
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View
            style={{
              height: height * 0.48,
              width: width,
              backgroundColor: '#deb887',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 20,
                color: '#000080',
                fontWeight: 'bold',
              }}>
              Sửa hoạt động
            </Text>
            <TextInput
              value={input_text2}
              onChangeText={setInput_text2}
              style={{
                height: 50,
                width: 260,
                borderWidth: 1,
                marginTop: 30,
                padding: 10,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={showDatePicker}
                style={{flexDirection: 'row'}}>
                <Image
                  style={{width: 26, height: 26}}
                  source={require('../assets/calendarHistory.png')}
                />
                {chooseDate ? (
                  <Text>{chooseDate}</Text>
                ) : (
                  <Text>Set due date</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', marginLeft: 20}}>
                <Image
                  style={{width: 26, height: 26}}
                  source={require('../assets/bell.png')}
                />
                <Text>Remind me</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', marginLeft: 20}}>
                <Image
                  style={{width: 26, height: 26}}
                  source={require('../assets/2direction.png')}
                />
                <Text>Repeat</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <TouchableOpacity
                onPress={huy1}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 80,
                  backgroundColor: '#8b0000',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={sua}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 80,
                  backgroundColor: '#1e90ff',
                  marginLeft: 30,
                  borderRadius: 10,
                }}>
                <Text>Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* mở lịch */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          value={chooseDate}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => add_TodoList(navigation)}
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          marginTop: height * 0.78,
          marginLeft: width * 0.78,
        }}>
        <Image
          style={{width: 80, height: 80}}
          source={require('../assets/add.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Home;
