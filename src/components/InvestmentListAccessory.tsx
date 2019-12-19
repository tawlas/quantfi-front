import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';

const InvestmentListAccessory = ({ data }) => {
  // const renderItemAccessory = style => <Button style={style}>FOLLOW</Button>;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.accessoryContainer}>
        <Text style={styles.date}>
          {moment(new Date()).format('DD-MM-YYYY')}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.accessory}>300</Text>
          <FontAwesome name="euro" style={styles.euro} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0'
  },
  accessoryContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center'
    // borderWidth: 1
    // alignItems: 'stretch'
  },
  title: {
    // flex: 1,
    fontSize: 24,
    fontWeight: 'bold'
    // marginTop: 5
  },
  accessory: {
    fontSize: 16,
    marginRight: 5
  },
  date: {},
  euro: {
    fontSize: 15,
    position: 'relative',
    top: 3
  }
});

export default InvestmentListAccessory;
