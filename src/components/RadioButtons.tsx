import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import { Header, Body } from './InvestmentCreateListItem';
import DropDownItem from '../components/DropDown';
import Item from '../components/DropDown';
// import DropDownItem from 'react-native-drop-down-item';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

const IC_ARR_DOWN = require('../icons/ic_arr_down.png');
const IC_ARR_UP = require('../icons/ic_arr_up.png');

type Props = {};
export default class RadioButtons extends Component<Props> {
  state = {
    investment: null,
    value: null
  };

  renderSeparator = () => {
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}></View>
    );
  };
  onPress = value => this.setState({ value: value });

  render() {
    const data = [
      {
        title: 'Expert Patrimoine',
        body: 'Rendement de 3%'
      },
      {
        title: 'Fonds de Fonds',
        body: 'Rendement de 5%'
      }
    ];
    const radio_props = data.map((obj, i) => {
      return { label: obj.title, value: i };
    });
    return (
      <View style={styles.container}>
        <RadioForm formHorizontal={true} animation={true}>
          {/* To create radio buttons, loop through your array of options */}
          {radio_props.map((obj, i) => (
            <RadioButton labelHorizontal={false} key={i}>
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                formHorizontal={false}
                isSelected={this.state.value === i}
                onPress={this.onPress}
                borderWidth={1}
                buttonInnerColor={'#e74c3c'}
                buttonOuterColor={this.state.value === i ? '#2196f3' : 'white'}
                buttonSize={15}
                buttonOuterSize={20}
                buttonStyle={{ borderWidth: 2 }}
                buttonWrapStyle={{ marginBottom: 0, top: 10 }}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={this.onPress}
                labelStyle={{ fontSize: 15 }}
                labelWrapStyle={{ marginTop: 10 }}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // borderWidth: 1,
    borderRadius: 20,
    // paddingTop: 60,
    marginBottom: 30,
    marginHorizontal: 10
  },
  dropDownItem: {
    // flex: 1,
    // justifyContent: 'center',
  }
});
