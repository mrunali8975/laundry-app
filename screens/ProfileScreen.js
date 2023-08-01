import { View, Text ,SafeAreaView, Pressable} from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';

const ProfileScreen = ({navigation}) => {
    const user = auth.currentUser;
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace('Login')
        })
    }
  return (
      <SafeAreaView style={{ marginTop: 50,flex:1,justifyContent:'center',alignItems:'center' }}>
          <Pressable>
              <Text>Welcome, {user.email}</Text>
          </Pressable>
          <Pressable onPress={signOutUser}>
              <Text>signout</Text>
          </Pressable>
      
    </SafeAreaView>
  )
}

export default ProfileScreen