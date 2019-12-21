import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import InvestmentCreateList from '../../components/InvestmentCreateList';
import RadioButtons from '../../components/RadioButtons';

export default class InvestmentCreateScreen extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            Choisir un fonds d'investissement
          </Text>
          <InvestmentCreateList />
          <RadioButtons />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#0095ff',
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 10
    // padding: 10
  },
  invest: {
    alignItems: 'flex-end',
    marginRight: 30
  },
  icon: {
    // textAlign: 'right',
    fontSize: 60,
    color: '#0095ff',
    marginTop: 20
  }
});
