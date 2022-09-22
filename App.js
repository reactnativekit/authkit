import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '900119281766-9dst988u81g1h3c8ovbkaddvo3i5be7k.apps.googleusercontent.com',
    });
  }, []);

  const googleSignIn = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log('Sign Out Successfully!!');
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          googleSignIn()
            .then(res => {
              console.log(res.user);
              setUserData(res.user);
            })
            .catch(error => console.log(error))
        }>
        <Text style={styles.btnBox}>Google SignIn</Text>
      </Pressable>
      <View style={styles.space}>
        <Text style={styles.data}>
          UID:
          <Text> {userData.uid}</Text>
        </Text>
        <Text style={styles.data}>
          Name:
          <Text> {userData.displayName}</Text>
        </Text>
        <Text style={styles.data}>
          Email:
          <Text> {userData.email}</Text>
        </Text>
      </View>
      <Pressable onPress={signOut}>
        <Text style={styles.btnBox}>Google SignOut</Text>
      </Pressable>
      <Text style={styles.dev}>Developed by Abhinav Anand</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBox: {
    paddingHorizontal: 20,
    backgroundColor: 'coral',
    paddingVertical: 10,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  space: {
    marginTop: 10,
  },
  data: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dev: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: 'bold',
    bottom: 0,
  },
});

export default App;
