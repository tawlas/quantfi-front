import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import DropDownItem from 'react-native-drop-down-item';

import moment from 'moment';

export const Header = ({ data }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{data.title}</Text>
    </View>
  );
};

export const Body = ({ data }) => {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.body}>{data.body}</Text>
    </View>
  );
};

const InvestmentCreateListItem = ({ data }) => {
  return;
};

const styles = StyleSheet.create({
  headerContainer: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 12,
    // borderWidth: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 60
    // flexWrap: 'wrap',
    // borderWidth: 1
  },
  bodyContainer: {
    marginLeft: 20
    // flexWrap: 'wrap'
  },
  body: {
    fontSize: 16
    // marginRight: 60,
    // flexWrap: 'wrap'
  },
  txt: {
    fontSize: 14
  }
});

export default InvestmentCreateListItem;
