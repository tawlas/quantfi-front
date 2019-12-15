import React from 'react';
import {
  AsyncStorage,
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
import { Container, Item, Input, Icon } from 'native-base';
// AWS Amplify
import Auth from '@aws-amplify/auth';

interface Props {
  navigation: any;
}

export default class SettingsScreen extends React.Component<Props> {
  state = {
    password1: '',
    password2: ''
  };
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  // Change user password for the app
  changePassword = async () => {
    const { password1, password2 } = this.state;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, password1, password2);
      })
      .then(data => console.log('Password changed successfully', data))
      .catch(err => {
        if (!err.message) {
          console.log('Error changing password: ', err);
          Alert.alert('Error changing password: ', err);
        } else {
          console.log('Error changing password: ', err.message);
          Alert.alert('Error changing password: ', err.message);
        }
      });
  };
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel'
        },
        // Calling signOut
        { text: 'OK', onPress: () => this.signOut() }
      ],
      { cancelable: false }
    );
  };
  // Confirm sign out
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log('Sign out complete');
        this.props.navigation.navigate('AuthLoading');
      })
      .catch(err => console.log('Error while signing out!', err));
  };
  render() {
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
              {/*Infos*/}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <View
                    style={[
                      styles.buttonStyle,
                      { borderRadius: 4, marginBottom: 20 }
                    ]}
                  >
                    <Text style={styles.buttonText}>Change password</Text>
                  </View>
                  {/* Old password */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Old password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('password1', value)
                      }
                    />
                  </Item>
                  {/* New password */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="New password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText('password2', value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.changePassword}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingBottom: 100
                    }}
                  />
                  <TouchableOpacity
                    style={[
                      styles.buttonStyle,
                      {
                        flexDirection: 'row',
                        justifyContent: 'center'
                      }
                    ]}
                    onPress={() => this.signOutAlert()}
                  >
                    <Icon
                      name="md-power"
                      style={{ color: '#fff', paddingRight: 10 }}
                    />
                    <Text style={styles.buttonText}>Sign out</Text>
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
    color: '#5a52a5'
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
    color: '#5a52a5',
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#667292',
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
