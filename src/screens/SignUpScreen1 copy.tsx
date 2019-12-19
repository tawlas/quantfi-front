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
    sendCodeDisabled: true,
    resendCodeDisabled: true,
    createAccountDisabled: true,
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

  // Confirm users and redirect them to the SignIn page
  async confirmSignUp() {
    const { username, authCode } = this.state;
    await Auth.confirmSignUp(username, authCode)
      .then(() => {
        this.props.navigation.navigate('SignIn');
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
  }

  // Resend code if not received already
  async resendSignUp() {
    const { username } = this.state;
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

  uploadFile = evt => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    });
  };

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
  // handleChoosePhoto = () => {
  //   const options = {};
  //   ImagePicker.launchImageLibrary(options, response => {
  //     console.log('response #########', response);
  //   });
  // };
  handleChoosePhoto = async (awsKey = 'mon-doc', access = 'public') => {
    const { email } = this.state;
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true
    //   // aspect: [4, 3]
    // });
    let result = await DocumentPicker.getDocumentAsync();

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

  // handleChoosePhoto = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   const { email } = this.state;
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // let result = await ImagePicker.launchImageLibraryAsync({
  //   allowsEditing: true
  //   // aspect: [4, 3]
  // });
  // console.log('result', result);

  //   if (!result.cancelled) {
  //     const response = await fetch(result.uri);

  //     const blob = await response.blob();

  //     Storage.put(email, blob, {
  //       contentType: 'image/jpeg'
  //     })
  //       .then(() => {
  //         console.log('blob', blob);
  //         this.setState({ image: email });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //     // Storage.put(email, result.uri)
  //     //   .then(() => {
  //     //     this.setState({ image: email });
  //     //   })
  //     //   .catch(err => {
  //     //     console.log(err);
  //     //   });
  //     // this.setState({ image: result.uri });
  //   }
  // };

  render() {
    let { fadeOut, fadeIn, isHidden, flag } = this.state;
    const countryData = data;
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
                  <View>
                    {/* <Text> Pick a file</Text> */}
                    <Button
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Choisir une image"
                      onPress={this.handleChoosePhoto}
                    />
                    {/* <S3Album level="private" path="" /> */}
                  </View>
                  {/* email section */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Prénom"
                      placeholderTextColor="#adb4bc"
                      keyboardType={'email-address'}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="FirstInput"
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('given_name', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* email section */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Nom"
                      placeholderTextColor="#adb4bc"
                      keyboardType={'email-address'}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="SecondInput"
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('family_name', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
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

                  {/* phone section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="call" style={styles.iconStyle} />
                    {/* country flag */}
                    <View>
                      <Text>{flag}</Text>
                    </View>
                    {/* open modal */}
                    <Icon
                      active
                      name="md-arrow-dropdown"
                      style={[styles.iconStyle, { marginLeft: 0 }]}
                      onPress={() => this.showModal()}
                    />
                    <Input
                      style={styles.input}
                      placeholder="+33766554433"
                      placeholderTextColor="#adb4bc"
                      keyboardType={'phone-pad'}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="SixthInput"
                      value={this.state.phoneNumber}
                      onChangeText={val =>
                        this.onChangeText('phoneNumber', val)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                    {/* Modal for country code and flag */}
                    <Modal
                      animationType="slide" // fade
                      transparent={false}
                      visible={this.state.modalVisible}
                    >
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flex: 10,
                            paddingTop: 80,
                            backgroundColor: '#1671B3'
                          }}
                        >
                          <FlatList
                            data={countryData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                              <TouchableWithoutFeedback
                                onPress={() => this.getCountry(item.name)}
                              >
                                <View
                                  style={[
                                    styles.countryStyle,
                                    {
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between'
                                    }
                                  ]}
                                >
                                  <Text style={{ fontSize: 45 }}>
                                    {item.flag}
                                  </Text>
                                  <Text style={{ fontSize: 20, color: '#fff' }}>
                                    {item.name} ({item.dial_code})
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                            )}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => this.hideModal()}
                          style={styles.closeButtonStyle}
                        >
                          <Text style={styles.textStyle}>Fermer</Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </Item>
                  {/* End of phone input */}
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.signUp()}
                    disabled={this.state.sendCodeDisabled}
                  >
                    <Text style={styles.buttonText}>
                      Recevoir le code de confirmation
                    </Text>
                  </TouchableOpacity>
                  {/* code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
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
                    disabled={this.state.createAccountDisabled}
                  >
                    <Text style={styles.buttonText}>Créer mon compte</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.resendSignUp()}
                    disabled={this.state.resendCodeDisabled}
                  >
                    <Text style={styles.buttonText}>Renvoyer le code</Text>
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
