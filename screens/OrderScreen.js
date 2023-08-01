import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const OrderScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex:1,marginTop:100}}>
          <AnimatedLottieView
              autoPlay
              loop={false}
              speed={0.7}
        source={require('../assets/thumbs.json')}
        style={{
          height: 360,
          width: 300,
          marginTop: 40,
          alignSelf: 'center',
          justifyContent: 'center'
        }}
          />
          <Text style={{marginTop:40, fontSize:19,fontWeight:'600',textAlign:'center'}}>
              Your order has been placed
          </Text>
          <AnimatedLottieView source={require('../assets/sparkle.json')}
              
              style={{
          height: 300,
          width: 300,
                  top: 100,
          position:'absolute',
          alignSelf: 'center',
          justifyContent: 'center'
        }}
          />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
