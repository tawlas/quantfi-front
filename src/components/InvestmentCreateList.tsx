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
export default class InvestmentCreateList extends Component<Props> {
  state = {
    investment: null,
    value: null,
    contents: [
      {
        title: 'Expert Patrimoine',
        body: 'Rendement de 3%'
      },
      {
        title: 'Fonds de Fonds',
        body: 'Rendement de 5%'
      }
    ]
  };

  renderSeparator = () => {
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}></View>
    );
  };

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
      return { value: i };
    });
    // const radio_props = [
    //   { label: 'param1', value: 0 },
    //   { label: 'param2', value: 1 }
    // ];
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.container}>
          <ScrollView style={{ marginVertical: 10 }}>
            {data ? (
              <FlatList
                data={data}
                keyExtractor={result => result.title}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }) => {
                  return (
                    <>
                      <DropDownItem
                        // key={i}
                        style={styles.dropDownItem}
                        contentVisible={false}
                        invisibleImage={IC_ARR_DOWN}
                        visibleImage={IC_ARR_UP}
                        header={<Header data={item} />}
                        title={item.title}
                      >
                        <Body data={item} />
                      </DropDownItem>
                    </>
                  );
                }}
              />
            ) : null}
            {/* <View style={{ height: 96 }} /> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // borderWidth: 1,
    borderRadius: 20,
    // paddingTop: 60,
    marginBottom: 10,
    marginHorizontal: 10
  },
  dropDownItem: {
    // flex: 1,
    // justifyContent: 'center',
  }
});
