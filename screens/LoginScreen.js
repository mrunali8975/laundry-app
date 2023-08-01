import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
   
    useEffect(() => {
        setLoading(true)
      
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (!authUser)
            {
                setLoading(false)
                }
            if (authUser)
            {
                navigation.navigate('Home')
            }
        })
        return unsubscribe;
    }, [])
    
    const login = () =>
    {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log('user', userCredential)
            const user = userCredential.user;

        }).catch((error) => {
            console.log(error)
        })

    }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10
      }}
      >
          {
              !loading ?
              <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100
          }}
        >
          <Text style={{ fontSize: 20, color: '#662d91', fontWeight: 'bold' }}>
            Sign in
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: '600' }}>
            Sign in to your account
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
          </View>
          <View>
                      <Pressable
                          onPress={login}
              style={{
                width: 200,
                backgroundColor: '#318CE7',
                borderRadius: 7,
                padding: 15,
                marginTop: 50,
                marginLeft: 'auto',
                              marginRight: 'auto',
                
              }}
            >
              <Text style={{color:'white',fontSize:18,textAlign:'center'}}>Login</Text>
                      </Pressable>
                      <Pressable onPress={()=>navigation.navigate('Register')} style={{marginTop:20}}>
                          <Text style={{textAlign:'center',fontSize:17,color:'gray',fontWeight:'500'}}>Don't have a account ? Sign up</Text>
                      </Pressable>
          </View>
        </View>
                  </KeyboardAvoidingView> :
                  (
                      <View style={{alignItems:'center',justifyContent:'center',marginTop:100}}>
                          <Text>loading...</Text>
                          <ActivityIndicator color={'black'} size={30}/>
                      </View>
                  )
          }
     
    </SafeAreaView>
  );
};

export default LoginScreen;
