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
  Alert,
  Modal,
  FlatList,
  Animated,
  Button
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { Container, Item, Input, Icon } from 'native-base';
import { connect } from 'react-redux';
// AWS Amplify
import Auth from '@aws-amplify/auth';
import { Storage } from 'aws-amplify';
import { S3Album } from 'aws-amplify-react-native';

import * as actions from '../actions';
import data from '../countriesData';
const logo = require('../images/logo.png');

// Default render of country flag
const defaultFlag = data.filter(obj => obj.name === 'France')[0].flag;

class SignUpScreen extends React.Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phoneNumber: '',
    given_name: '',
    family_name: '',
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(1),
    isHidden: false,
    flag: defaultFlag,
    modalVisible: false,
    authCode: '',
    codeSent: false,
    hasCameraPermission: null,
    image: null
  };

  onChangeText(key: string, value: string) {
    this.setState({ [key]: value });
  }

  // Functions for Phone Input
  showModal() {
    this.setState({ modalVisible: true });
    console.log('Shown');
  }
  hideModal() {
    this.setState({ modalVisible: false });
    // Refocus on phone Input after modal is closed
    this.refs.FourthInput._root.focus();
    console.log('Hidden');
  }
  async getCountry(country) {
    // Get the country flag and phone code from users selection
    const countryData = await data;
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code;
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag;
      // Set data from user choice of country
      this.setState({ phoneNumber: countryCode, flag: countryFlag });
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }
  // Sign up user with AWS Amplify Auth
  async signUp() {
    const {
      password,
      email,
      phoneNumber,
      passwordConfirm,
      given_name,
      family_name
    } = this.state;
    const username = email;
    // const family_name = 'watt';
    // const given_name = 'alassane';

    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber;
    if (password !== passwordConfirm) {
      Alert.alert(
        "Veuillez rentrer deux mots de passe identiques s'il vous plait"
      );
      return;
    }
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number, given_name, family_name }
      });
      console.log('sign up successful!');
      this.setState({ codeSent: true });
      Alert.alert('Enter the confirmation code you received.');
    } catch (err) {
      if (!err.message) {
        console.log('Error when signing up: ', err);
        Alert.alert('Error when signing up: ', err);
      } else {
        console.log('Error when signing up: ', err.message);
        Alert.alert('Error when signing up: ', err.message);
      }
    }
  }

  async signUpIn() {
    const { email, password } = this.state;
    await Auth.signIn(email, password)
      .then(user => {
        console.log(user);
        this.setState({ user });
      })
      .catch(async err => {
        if (!err.message) {
          console.log('Error when signing in: ', err);
          Alert.alert('Error when signing in: ', err);
        } else {
          console.log('Error when signing in: ', err.message);
          Alert.alert('Error when signing in: ', err.message);
        }
      });
  }

  // Confirm users and redirect them to the SignIn page
  // confirmSignUp() {
  //   const { email, password } = this.state;
  //   this.signUpIn();
  //   this.props.navigation.navigate('SignUp2', { email, password });
  // }

  async confirmSignUp() {
    const { email, authCode, password } = this.state;
    const username = email;
    await Auth.confirmSignUp(username, authCode)
      .then(() => {
        // this.props.navigation.navigate('SignIn');
        // this.props.navigation.navigate('SignUp2');
        console.log('Confirm sign up successful');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when entering confirmation code: ', err);
          Alert.alert('Error when entering confirmation code: ', err);
        } else {
          console.log('Error when entering confirmation code: ', err.message);
          Alert.alert('Error when entering confirmation code: ', err.message);
        }
      });
    await this.signUpIn()
      .then(() => {
        this.props.navigation.navigate('SignUp2', { email, password });
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when entering confirmation code: ', err);
          Alert.alert('Error when entering confirmation code: ', err);
        } else {
          console.log('Error when entering confirmation code: ', err.message);
          Alert.alert('Error when entering confirmation code: ', err.message);
        }
      });
  }

  // Resend code if not received already
  async resendSignUp() {
    const { email } = this.state;
    const username = email;
    await Auth.resendSignUp(username)
      .then(() => console.log('Confirmation code resent successfully'))
      .catch(err => {
        if (!err.message) {
          console.log('Error requesting new confirmation code: ', err);
          Alert.alert('Error requesting new confirmation code: ', err);
        } else {
          console.log('Error requesting new confirmation code: ', err.message);
          Alert.alert('Error requesting new confirmation code: ', err.message);
        }
      });
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: true });
  }
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }

  handleChoosePhoto = async (awsKey = 'mon-doc', access = 'public') => {
    const { email } = this.state;
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
      // aspect: [4, 3]
    });
    // let result = await DocumentPicker.getDocumentAsync();

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
    const key = awsKey;
    try {
      const result = await Storage.put(key, blob, options);
      return {
        access,
        key: result.key
      };
    } catch (err) {
      throw err;
    }
  };

  render() {
    let {
      fadeOut,
      fadeIn,
      isHidden,
      flag,
      email,
      passwordConfirm,
      password,
      authCode
    } = this.state;
    const countryData = data;
    const sendCodeEnabled =
      email !== '' && password !== '' && passwordConfirm !== '';
    const createAccountEnabled = sendCodeEnabled && authCode !== '';

    // <PhotoPicker onPick={data => console.log(data)} />;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              {/* App Logo */}
              {/* <View style={styles.logoContainer}>
                {isHidden ? (
                  <Animated.Image
                    source={logo}
                    style={{ opacity: fadeIn, width: 110.46, height: 117 }}
                  />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{ opacity: fadeOut, width: 110.46, height: 117 }}
                  />
                )}
              </View> */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* email section */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="mail" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#adb4bc"
                      keyboardType={'email-address'}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="ThirdInput"
                      onSubmitEditing={event => {
                        this.refs.FourthInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText('email', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/*  password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Mot de Passe"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      // ref={c => this.SecondInput = c}
                      ref="FourthInput"
                      onSubmitEditing={event => {
                        this.refs.FifthInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('password', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/*  confirm password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmer le mot de passe"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      // ref={c => this.SecondInput = c}
                      ref="FifthInput"
                      onSubmitEditing={event => {
                        this.refs.SixthInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('passwordConfirm', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {this.state.codeSent === true ? (
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() => this.resendSignUp()}
                      disabled={!sendCodeEnabled}
                    >
                      <Text style={styles.buttonText}>Renvoyer le code</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() => this.signUp()}
                      disabled={!sendCodeEnabled}
                    >
                      <Text style={styles.buttonText}>
                        Recevoir le code de confirmation
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Code de confirmation"
                      placeholderTextColor="#adb4bc"
                      keyboardType={'numeric'}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      onChangeText={value =>
                        this.onChangeText('authCode', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.confirmSignUp()}
                    disabled={!createAccountEnabled}
                  >
                    <Text style={styles.buttonText}>Créer mon compte</Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
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

export default connect(mapStateToProps, actions)(SignUpScreen);
