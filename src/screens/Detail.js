import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import theme from '../styles/theme';
import Toast from 'react-native-simple-toast';

const Detail = ({navigation}) => {
  // GOOGLE SIGN OUT

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log('Sign Out Successfully!!');
      //navigation
      navigation.navigate('Login');
      //Google Toast Message
      Toast.show('Google SignOut Successful!');
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };

  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={signOut}>
        <Text style={styles.btnBox}>Google SignOut</Text>
      </Pressable>
      <View style={styles.space}>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <Image style={styles.imageStyle} source={{uri: cameraPhoto}} />
        <TouchableOpacity onPress={openGallery} style={styles.button}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
        <Image style={styles.imageStyle} source={{uri: galleryPhoto}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.gold,
  },
  space: {
    marginTop: theme.spacing.mll,
    alignItems: 'center',
  },
  btnBox: {
    position: 'absolute',
    paddingHorizontal: theme.spacing.mll,
    backgroundColor: theme.colors.coral,
    paddingVertical: theme.spacing.sl,
    borderRadius: theme.spacing.sl,
    color: theme.colors.white,
    fontWeight: 'bold',
    marginTop: theme.spacing.sl,
    left: theme.spacing.xxxl,
  },
  button: {
    backgroundColor: theme.colors.coral,
    paddingHorizontal: theme.spacing.xxxl,
    paddingVertical: theme.spacing.sl,
    marginTop: theme.spacing.xxxl,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: theme.spacing.ml,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: theme.spacing.mll,
    borderRadius: 5,
  },
});

export default Detail;
