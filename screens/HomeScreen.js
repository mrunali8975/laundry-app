import {
  View,
  Text,
  Alert,
  Pressable,
  Image,
  TextInput,
  SafeAreaView
    ,
ScrollView} from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
const HomeScreen = ({navigation}) => {
  const [displayAddress, setDisplayCurrentAddress] = useState(
    'We are loading your locations'
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        'Location services not enabled',
        'Please enable the location services',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'allow the app to use the  location services',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
    };
    
    const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const [items,setItems]=useState([])
  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev)=> curr + prev, 0);
    const dispatch = useDispatch();
   useEffect(() => {
   
       if (product.length > 0) return;
     const fetchProduct = async () => {
       const colRef = collection(db, "types");
       const docsSnap = await getDocs(colRef);
       docsSnap.forEach((doc) => {
         items.push(doc.data())
       })
       items.map((service) => {
         dispatch(getProducts(service));
       })
          
       }
       fetchProduct();
    
   }, [])
    const services = [
        {
          id: "0",
          image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
          name: "shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
          name: "T-shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
          name: "dresses",
          quantity: 0,
          price: 10,
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
          name: "jeans",
          quantity: 0,
          price: 10,
        },
        {
          id: "14",
          image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
          name: "Sweater",
          quantity: 0,
          price: 10,
        },
        {
          id: "15",
          image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
          name: "shorts",
          quantity: 0,
          price: 10,
        },
        {
          id: "16",
          image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
          name: "Sleeveless",
          quantity: 0,
          price: 10,
        },
      ];
  return (
    <>
   <ScrollView style={{ flex: 1, backgroundColor: '#F0F0F0' ,marginTop:50}}>
      {/* location and profile */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Home</Text>
          <Text>{displayAddress}</Text>
        </View>
        <Pressable style={{ marginLeft: 'auto', marginRight: 7 }} onPress={()=>navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://picsum.photos/id/237/200/300' }}
            style={{ width: 40, height: 40, borderRadius: 25 }}
          />
        </Pressable>
      </View>
      {/* Search bar */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 0.8,
          borderColor: '#C0C0C0',
          borderRadius: 7
        }}
      >
        <TextInput placeholder="Search for item or more" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>
      {/* Image carouse */}
      <Carousel />
      {/* services */}
          <Services />
          {/* Render all the Products */}
          {
              product.map((service, index) => (
                  <DressItem item={service} index={index}  />
              ))
          }
      </ScrollView>
      {
        total === 0 ? (null) :
      
          <Pressable style={{
            backgroundColor: '#088F8F', marginBottom: 40, margin: 15, borderRadius: 7, flexDirection: 'row', alignItems: 'center', padding: 10,
            justifyContent: 'space-between'
          }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>{cart.length} items | ${ total }</Text>
              <Text style={{fontSize:14,fontWeight:'400',color:'white'}}>Extra charges might apply  </Text>

            </View>
            <Pressable onPress={()=>navigation.navigate('PickUp')}>
              <Text style={{fontSize:17,fontWeight:'600',color:'white'}}>Proceed to pickup</Text>
            </Pressable>
          </Pressable>
      }
    </>
 
  );
};

export default HomeScreen;
