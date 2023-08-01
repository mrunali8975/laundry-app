import { View, Text, SafeAreaView, TextInput,Alert } from 'react-native';
import React from 'react';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
const PickUpScreen = ({navigation}) => {
  const [selectDate, setSelectedDate] = useState('');
  const [selectedTime, setselectedTime] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const [deliveryT, setDeliveryT] = useState('');
  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev)=> curr + prev, 0);

  const deliveryTime = [
    {
      id: '0',
      name: '2-3 Days'
    },
    {
      id: '1',
      name: '3-4 Days'
    },
    {
      id: '2',
      name: '4-5 Days'
    },
    {
      id: '3',
      name: '5-6 Days'
    },
    {
      id: '4',
      name: 'Tommorrow'
    }
  ];

  const times = [
    {
      id: '0',
      time: '11:00 PM'
    },
    {
      id: '1',
      time: '12:00 PM'
    },
    {
      id: '2',
      time: '1:00 PM'
    },
    {
      id: '2',
      time: '2:00 PM'
    },
    {
      id: '4',
      time: '3:00 PM'
    },
    {
      id: '5',
      time: '4:00 PM'
    }
  ];
  const proceedToCard = () =>
  {
    if (!selectDate || !selectedTime || !deliveryT)
    {
      Alert.alert('Empty or  Invalid', 'Please select all the field', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if (selectDate && selectDate && deliveryT)
    {
      navigation.replace('Cart', {
        pickUpDate:selectDate,
        selectedTime:selectedTime,
        no_Of_days:deliveryT,
    })
    }
    }
  return (
    <>
  <SafeAreaView style={{ marginTop: 60 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', marginHorizontal: 10 }}>
        enter Address
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderColor: 'grey',
          borderWidth: 0.7,
          paddingVertical: 80,
          borderRadius: 9,
          margin: 10
        }}
      />
      <Text style={{ fontWeight: '500', fontSize: 16, marginHorizontal: 10 }}>
        Pick up Date
      </Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date('2023-02-20')}
        endDate={new Date('2023-02-28')}
        initialSelectedDate={new Date('2020-08-22')}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        //   selectedItemTextStyle={styles.selectedItemTextStyle}
        //   unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        //   flatListContainerStyle={styles.flatListContainerStyle}
      />
      <Text style={{ fontWeight: '500', fontSize: 16, marginHorizontal: 10 }}>
        Select time
      </Text>
      <ScrollView horizontal>
        {times.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => setselectedTime(item.time)}
            style={
              selectedTime.includes(item.time)
                ? {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: 'red',
                    borderWidth: 0.7
                  }
                : {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: 'gray',
                    borderWidth: 0.7
                  }
            }
          >
            <Text>{item.time}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={{ fontWeight: '500', fontSize: 16, marginHorizontal: 10 }}>
        Delivery date
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deliveryTime.map((item, i) => (
          <Pressable
            key={i}
            style={
              deliveryT.includes(item.name)
                ? {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: 'red',
                    borderWidth: 0.7
                  }
                : {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: 'gray',
                    borderWidth: 0.7
                  }
            }
            onPress={() => setDeliveryT(item.name)}
          >
          
            <Text style={{color:'black'}}>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
      </SafeAreaView>
      {
        total === 0 ? (null) :
      
          <Pressable style={{
            backgroundColor: '#088F8F', marginBottom: 40, margin: 15,
            marginTop:'auto',
            borderRadius: 7, flexDirection: 'row', alignItems: 'center', padding: 10,
            justifyContent: 'space-between'
          }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>{cart.length} items | ${ total }</Text>
              <Text style={{fontSize:14,fontWeight:'400',color:'white'}}>Extra charges might apply  </Text>

            </View>
            <Pressable onPress={proceedToCard}>
              <Text style={{fontSize:17,fontWeight:'600',color:'white'}}>Proceed to Cart</Text>
            </Pressable>
          </Pressable>
      }
    </>
  
  );
};

export default PickUpScreen;
