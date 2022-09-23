import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import theme from '../styles/theme';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Toast from 'react-native-simple-toast';

const Login = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [userDataFacebook, setUserDataFacebook] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '900119281766-9dst988u81g1h3c8ovbkaddvo3i5be7k.apps.googleusercontent.com',
    });
  }, []);

  // GOOGLE SIGN IN

  const googleSignIn = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    //navigation
    navigation.navigate('Detail');

    //Google Toast Message
    Toast.show('Google SignIn Successful!');

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  // FACEBOOK LOGIN

  const facebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    //navigation
    navigation.navigate('Detail');

    //Facebook Toast Message
    Toast.show('Facebook SignIn Successful!');

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  const year = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AuthKit</Text>
      <Pressable
        onPress={() =>
          googleSignIn()
            .then(res => {
              console.log('Google Data:', res.user);
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
      <Pressable
        onPress={() =>
          facebookLogin()
            .then(res => {
              console.log('Facebook Data:', res.user);
              setUserDataFacebook(res.user);
            })
            .catch(error => console.log(error))
        }>
        <Text style={styles.FBtn}>Facebook SignIn</Text>
      </Pressable>
      <View style={styles.space}>
        <Text style={styles.data}>
          UID:
          <Text> {userDataFacebook.uid}</Text>
        </Text>
        <Text style={styles.data}>
          Name:
          <Text> {userDataFacebook.displayName}</Text>
        </Text>
        <Text style={styles.data}>
          Provider ID:
          <Text> {userDataFacebook.providerId}</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.dev}>Developed by Abhinav Anand.</Text>
        <Text style={styles.dev}>Copyright © {year}.</Text>
        <Text style={styles.dev}>AuthKit Inc. All Rights Reserved.</Text>
      </View>
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
  title: {
    position: 'absolute',
    top: theme.spacing.none,
    color: theme.colors.black,
    fontSize: theme.spacing.xl,
    left: theme.spacing.m,
    fontWeight: 'bold',
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
    color: theme.colors.black,
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.none,
    alignItems: 'center',
  },
  dev: {
    fontSize: theme.spacing.bm,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  FBtn: {
    paddingHorizontal: theme.spacing.mll,
    paddingVertical: theme.spacing.sl,
    borderRadius: theme.spacing.sl,
    backgroundColor: theme.colors.FBColor,
    color: theme.colors.white,
    fontWeight: 'bold',
    marginTop: theme.spacing.sl,
  },
});

export default Login;
