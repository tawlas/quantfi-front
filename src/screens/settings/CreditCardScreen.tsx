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
  // constructor() {
  //   super();
  //   this.onValueChange = this.onValueChange.bind(this);
  //   this.state = { switchValue: false };
  // }
  state = { switchValue: false };
  render() {
    this.onValueChange = this.onValueChange.bind(this);
    var bgColor = '#DCE3F4';
    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: '#f7f7f8',
            borderColor: '#c8c7cc',
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
              fontSize: 30
            }}
          >
            Settings
          </Text>
        </View>
        <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              title="Nom"
              titleInfo="Nom"
              titleInfoStyle={styles.titleInfoStyle}
              hasNavArrow={false}
            />
            <SettingsList.Item
              title="Prénom"
              titleInfo="Nom"
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Item
              title="Email"
              titleInfo="Nom"
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Item
              title="Téléphone"
              titleInfo="Nom"
              titleInfoStyle={styles.titleInfoStyle}
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
    width: 30
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
