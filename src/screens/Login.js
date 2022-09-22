import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import theme from '../styles/theme';

const Login = ({navigation}) => {
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

    //navigation
    navigation.navigate('Detail');

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
      <Text style={styles.dev}>Developed by Abhinav Anand</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gold,
  },
  btnBox: {
    paddingHorizontal: theme.spacing.mll,
    backgroundColor: theme.colors.coral,
    paddingVertical: theme.spacing.sl,
    borderRadius: theme.spacing.sl,
    color: theme.colors.white,
    fontWeight: 'bold',
    marginTop: theme.spacing.sl,
  },
  space: {
    marginTop: theme.spacing.sl,
  },
  data: {
    fontSize: theme.spacing.bm,
    fontWeight: 'bold',
  },
  dev: {
    position: 'absolute',
    fontSize: theme.spacing.bm,
    fontWeight: 'bold',
    bottom: theme.spacing.none,
  },
});

export default Login;
