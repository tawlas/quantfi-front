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
  Animated,
  Image
} from 'react-native';
import { Container, Item, Input, Icon } from 'native-base';
// AWS Amplify
import Auth from '@aws-amplify/auth';

// Load the app logo
const logo = require('../images/logo.png');

export default class ForgetPasswordScreen extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    authCode: '',
    newPassword: '',
    fadeIn: new Animated.Value(0), // Initial value for opacity: 0
    fadeOut: new Animated.Value(1), // Initial value for opacity: 1
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
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }

  // Request a new password
  async forgotPassword() {
    const { username } = this.state;
    await Auth.forgotPassword(username)
      .then(data => console.log('New code sent', data))
      .catch(err => {
        if (!err.message) {
          console.log('Error while setting up the new password: ', err);
          Alert.alert('Error while setting up the new password: ', err);
        } else {
          console.log('Error while setting up the new password: ', err.message);
          Alert.alert('Error while setting up the new password: ', err.message);
        }
      });
  }

  // Upon confirmation redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    const { username, authCode, newPassword } = this.state;
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
      .then(() => {
        this.props.navigation.navigate('SignIn');
        console.log('the New password submitted successfully');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error while confirming the new password: ', err);
          Alert.alert('Error while confirming the new password: ', err);
        } else {
          console.log('Error while confirming the new password: ', err.message);
          Alert.alert('Error while confirming the new password: ', err.message);
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
          keyboardVerticalOffset={23}
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
                  <Animated.Image source={logo} style={{ opacity: fadeOut }} />
                )}
              </View>
              {/* Infos */}
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
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText('email', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.forgotPassword()}
                  >
                    <Text style={styles.buttonText}>
                      Envoyer le code de vérification
                    </Text>
                  </TouchableOpacity>
                  {/* the New password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Nouveau mot de passe"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('newPassword', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* Code confirmation section  */}
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
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText('authCode', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity style={styles.buttonStyle}>
                    <Text
                      style={styles.buttonText}
                      onPress={() => this.forgotPasswordSubmit()}
                    >
                      Changer le mot de passe
                    </Text>
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
    marginBottom: 20
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
