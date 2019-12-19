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
import SettingsList from 'react-native-settings-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  navigation: any;
}

export default class SettingsScreen extends React.Component {
  state = { switchValue: false };
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      'Se déconnecter',
      "Êtes vous sûr(e) de vouloir vous déconnecter de l'application ?",
      [
        {
          text: 'Annuler',
          onPress: () => console.log('Cancelled'),
          style: 'cancel'
        },
        // Calling signOut
        { text: 'Oui', onPress: () => this.signOut() }
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
    this.onValueChange = this.onValueChange.bind(this);
    var bgColor = '#DCE3F4';
    return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: '#1671B3',
            borderColor: '#1671B3',
            marginTop: 30
          }}
        >
          <Text
            style={{
              // alignSelf: 'center',
              marginVertical: 20,
              marginLeft: 10,
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 30,
              color: 'white'
            }}
          >
            Paul Hiriart
          </Text>
        </View>
        <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
          <SettingsList borderColor="#1671B3" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              icon={
                <Icon
                  active
                  name="person"
                  style={{ ...styles.imageStyle, color: '#ffdc2b' }}
                />
              }
              hasNavArrow={true}
              title="Profil"
              onPress={() => {
                this.props.navigation.navigate('Profil');
              }}
            />
            <SettingsList.Item
              icon={<Icon active name="card" style={styles.imageStyle} />}
              title="Carte Bancaire"
              // titleInfo=""
              // titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Wifi Page')}
            />
            <SettingsList.Item
              icon={
                <Icon
                  active
                  name="lock"
                  style={{ ...styles.imageStyle, color: '#2cb890' }}
                />
              }
              title="Sécurité"
              onPress={() => Alert.alert('Route to Wifi Page')}
            />
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              icon={
                <Icon
                  active
                  name="log-out"
                  style={{ ...styles.imageStyle, color: '#ff7700' }}
                />
              }
              title="Se déconnecter"
              // titleInfo=""
              // titleInfoStyle={styles.titleInfoStyle}
              onPress={() => this.signOutAlert()}
            />
            <SettingsList.Item
              icon={
                <Icon
                  active
                  name="md-help-circle-outline"
                  style={{ ...styles.imageStyle, color: '#2cb890' }}
                />
              }
              title="Aide"
              onPress={() => Alert.alert('Route to Wifi Page')}
            />
            <SettingsList.Item
              icon={
                <Icon
                  active
                  name="heart"
                  style={{ ...styles.imageStyle, color: '#ff0000' }}
                />
              }
              title="Recommander à un ami"
              onPress={() => Alert.alert('Route to Wifi Page')}
            />
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  imageStyle: {
    marginLeft: 15,
    alignSelf: 'center',
    height: 30,
    width: 30,
    color: '#1671B3'
  },
  titleInfoStyle: {
    fontSize: 16,
    color: '#8e8e93'
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
