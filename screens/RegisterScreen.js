import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const register = () => {
    if (email === '' || password === '' || phone === '') {
      Alert.alert('Invalid', 'Please fill all the details', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]);
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('user credential', userCredential);
        const user = userCredential._tokenResponse.email;
        console.log(user);
        const myUserUid = auth.currentUser.uid;
        setDoc(
          doc(db, 'users', `${myUserUid}`),

          {
            email: user,
            phone: phone
          }
          );
          navigation.navigate('Home')
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100
          }}
        >
          <Text style={{ fontSize: 20, color: '#662d91', fontWeight: 'bold' }}>
            Register{' '}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: '600' }}>
            Create a new account{' '}
          </Text>
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                value={email}
                onChangeText={(val) => setEmail(val)}
                placeholderTextColor={'#000'}
                placeholder="Email"
                style={{
                  fontSize: email ? 15 : 15,
                  marginLeft: 13,
                  height: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  width: 300,
                  marginVertical: 10
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                value={password}
                secureTextEntry={true}
                onChangeText={(val) => setPassword(val)}
                placeholderTextColor={'#000'}
                placeholder="Password"
                style={{
                  fontSize: password ? 15 : 15,
                  marginVertical: 10,
                  marginLeft: 13,
                  height: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  width: 300,
                  marginVertical: 15
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="phone" size={24} color="black" />
              <TextInput
                value={phone}
                onChangeText={(val) => setPhone(val)}
                placeholderTextColor={'#000'}
                placeholder="Phone"
                style={{
                  fontSize: password ? 15 : 15,
                  marginVertical: 10,
                  marginLeft: 13,
                  height: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  width: 300,
                  marginVertical: 15
                }}
              />
            </View>
          </View>
          <View>
            <Pressable
              onPress={register}
              style={{
                width: 200,
                backgroundColor: '#318CE7',
                borderRadius: 7,
                padding: 15,
                marginTop: 50,
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 18, textAlign: 'center' }}
              >
                Register
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  color: 'gray',
                  fontWeight: '500'
                }}
              >
                Already have an account?
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
