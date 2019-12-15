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
  Animated
} from 'react-native';

import { Container, Item, Input, Icon } from 'native-base';
import { connect } from 'react-redux';
// AWS Amplify
import Auth from '@aws-amplify/auth';

import * as actions from '../actions';
import data from '../countriesData';
const logo = require('../images/logo.png');

// Default render of country flag
const defaultFlag = data.filter(obj => obj.name === 'France')[0].flag;

class SignUpScreen extends React.Component {
  state = {
    password: '',
    passwordConfirm: '',
    email: '',
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(1),
    isHidden: false,
    flag: defaultFlag,
    modalVisible: false,
    authCode: '',
    toggleOpacity: false
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
  // async goToSecondStep() {
  //   const { email, password, passwordConfirm } = this.state;
  //   const username = email;
  //   if (password !== passwordConfirm) {
  //     Alert.alert(
  //       "Veuillez rentrer deux mots de passe identiques s'il vous plait"
  //     );
  //     return;
  //   }

  //   this.props.navigation.navigate('SignUp2', { email, password });
  // }

  async goToSecondStep() {
    const { password, email, passwordConfirm } = this.state;
    // console.log(username);
    // rename variable to conform with Amplify Auth field phone attribute
    // const phone_number = phoneNumber;
    const username = email;
    const family_name = 'watt';
    const first_name = 'alassane';
    const pn = '11';
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, pn, family_name, first_name }
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

  // async goToSecondStep() {
  //   const { email, password, passwordConfirm } = this.state;
  //   const username = email;
  // if (password !== passwordConfirm) {
  //   Alert.alert(
  //     "Veuillez rentrer deux mots de passe identiques s'il vous plait"
  //   );
  //   return;
  // }
  //   try {
  //     await Auth.signUp({
  //       username,
  //       password,
  //       attributes: { email }
  //     });
  //     // console.log('sign up successful!');
  //     this.props.navigation.navigate('SignUp2', { email, password });
  //   } catch (err) {
  //     if (!err.message) {
  //       console.log('Error when signing up: ', err);
  //       Alert.alert('Error when signing up: ', err);
  //     } else {
  //       console.log('Error when signing up: ', err.message);
  //       Alert.alert('Error when signing up: ', err.message);
  //     }
  //   }

  // Auth.verifyCurrentUserAttribute(email)
  //   .then(() => {
  //     this.props.navigation.navigate('SignUp2', { email, password });
  //   })
  //   .catch(e => {
  //     Alert.alert(
  //       "Erreur lors de l'envoi du code de confirmation. Veuillez ressayer s'il vous plaît."
  //     );
  //     console.log(e);
  //   });

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

  render() {
    let { fadeOut, fadeIn, isHidden, flag } = this.state;
    const countryData = data;
    // if {}
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
              <View style={styles.logoContainer}>
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
              </View>
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
                      ref="SecondInput"
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
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
                      ref="ThirdInput"
                      // onSubmitEditing={event => {
                      //   this.refs.ThirdInput._root.focus();
                      // }}
                      onChangeText={value =>
                        this.onChangeText('passwordConfirm', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* End of confirm password input */}
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.goToSecondStep()}
                    disabled={false}
                  >
                    <Text style={styles.buttonText}>Suivant</Text>
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
