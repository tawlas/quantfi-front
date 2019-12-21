const AWS = require('aws-sdk');
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Animated,
  Image
} from 'react-native';
import { Container, Item, Input, Icon } from 'native-base';
// AWS Amplify
import Auth from '@aws-amplify/auth';

// Load the app logo
const logo = require('../../images/logo.png');

class SignInScreen extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),
    isHidden: false
  };
  onChangeText(key: string, value: string) {
    this.setState({ [key]: value });
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
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }
  deleteUser(email: string) {
    let params = {
      UserPoolId: 'us-west-2_BpSJP2kis',
      Username: email
    };
    return new Promise((resolve, reject) => {
      AWS.config.update({
        region: 'us-west-2',
        accessKeyId: 'AKIAJY2HEL5XDQPSAYEA',
        secretAccessKey: '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'
      });
      let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminDeleteUser(params, (err, data) => {
        if (err) {
          // console.log('error', err);
          reject(err);
        } else {
          // console.log('data', data);
          resolve(data);
        }
      });
    });
  }

  // async signIn() {
  //   const { email } = this.state;
  //   console.log(email);
  //   try {
  //     const response = await this.deleteUser(email);
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Sign in users with Auth
  async signIn() {
    const { email, password } = this.state;
    await Auth.signIn(email, password)
      .then(user => {
        console.log(user);
        this.setState({ user });
        this.props.navigation.navigate('AuthLoading');
      })
      .catch(async err => {
        if (
          err.code === 'NotAuthorizedException' ||
          err.code === 'UserNotFoundException'
        ) {
          Alert.alert(
            "Email et/ou mot de passe incorect(s): Veuillez réssayer s'il vous plaît"
          );
        } else if (err.code === 'UserNotConfirmedException') {
          try {
            await this.deleteUser(email);
            Alert.alert(
              "Email et/ou mot de passe incorect(s): Veuillez réssayer s'il vous plaît"
            );
          } catch (err) {
            if (!err.message) {
              console.log('Error when signing in: ', err);
              Alert.alert('Error when signing in: ', err);
            } else {
              console.log('Error when signing in: ', err.message);
              Alert.alert('Error when signing in: ', err.message);
            }
          }
        } else {
          if (!err.message) {
            console.log('Error when signing in: ', err);
            Alert.alert('Error when signing in: ', err);
          } else {
            console.log('Error when signing in: ', err.message);
            Alert.alert('Error when signing in: ', err.message);
          }
          console.log(err);
        }
      });
  }

  render() {
    let { fadeOut, fadeIn, isHidden } = this.state;
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
                  <Animated.Image source={logo} style={{ opacity: fadeIn }} />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{ opacity: fadeOut, width: 113.46, height: 117 }}
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
                      ref="FirstInput"
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText('email', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Mot de passe"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText('password', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onSubmitEditing={event => {
                        this.signIn();
                      }}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.signIn()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Se connecter</Text>
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
    backgroundColor: '#ffffff',
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
    height: 200,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff'
  },
  itemStyle: {
    marginBottom: 20,
    borderColor: '#1671B3'
  },
  iconStyle: {
    color: '#1671B3',
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#1671B3',
    padding: 14,
    marginBottom: 20,
    borderRadius: 24
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
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

export default SignInScreen;
