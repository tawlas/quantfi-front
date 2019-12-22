import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { Container } from 'native-base';
import { connect } from 'react-redux';
// AWS Amplify
import Auth from '@aws-amplify/auth';
import { Storage } from 'aws-amplify';
import { S3Album } from 'aws-amplify-react-native';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  title: string;
}

class UploadButton extends React.Component<ComponentProps> {
  state = {
    hasCameraPermission: null,
    image: null,
    blob: null,
    options: null
  };

  onChangeText(key: string, value: string) {
    this.setState({ [key]: value });
  }

  handleChoosePhoto = async (access = 'private') => {
    // const { email } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
    // TODO continue logic

    if (this.state.hasCameraPermission === false) {
      return Alert.alert(
        "L'accès à la galerie a été refusé. Veuillez l'autoriser pour continuer."
      );
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      // let result = await DocumentPicker.getDocumentAsync();
      if (result.cancelled) {
        Alert.alert('Téléversement annulé. Veuillez réessayer encore.');
        return;
      }
      console.log('result', result);
      const fileUri = result.uri;

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', fileUri, true);
        xhr.send(null);
      });
      const { name, type } = blob._data;
      const options = {
        level: access,
        contentType: type
      };
      this.setState({ blob, options });
      // const key = email;
      // try {
      //   const result = await Storage.put(key, blob, options);
      //   return {
      //     access,
      //     key: result.key
      //   };
      // } catch (err) {
      //   throw err;
      // }
    } catch (err) {
      Alert.alert('Erreur: Veuillez ressayer encore');
      return;
    }
  };

  async storeImage(blob, options) {
    // const { email } = this.props;
    const email = 'wattalassane@gmail.com';
    const key = email;
    try {
      const result = await Storage.put(key, blob, options);
      return {
        key: result.key
      };
    } catch (err) {
      throw err;
    }
  }

  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log('Sign out complete');
        this.props.navigation.navigate('AuthLoading');
      })
      .catch(err => console.log('Error while signing out!', err));
  };

  async onClickNext() {
    const { blob, options } = this.state;
    await this.storeImage(blob, options);
    Alert.alert('Compte crée avec succès. Veuillez vous connecter à présent');
    // this.props.navigation.navigate('SignUp3', {});
  }

  render() {
    const { blob } = this.state;
    // <PhotoPicker onPick={data => console.log(data)} />;
    const nextEnabled = blob !== null;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.handleChoosePhoto()}
        >
          <Text style={styles.buttonText}>{this.props.title}</Text>
        </TouchableOpacity>
        {blob ? (
          <Text style={{ marginBottom: 10 }}>{blob._data.name}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1671B3'
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 370,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  itemStyle: {
    marginBottom: 10,
    borderColor: '#1671B3'
  },
  iconStyle: {
    color: '#1671B3',
    fontSize: 28,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#1671B3',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3
    // borderColor: '#1671B3'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 600,
    bottom: 270,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#1671B3',
    borderTopColor: '#1671B3',
    borderTopWidth: 1,
    padding: 12
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#1671B3'
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(UploadButton);
