import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import moment from 'moment';

const HistoryListItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {data.title === 'Recharge' ? (
          <Feather
            name="trending-up"
            style={{ fontSize: 24, color: 'green' }}
          />
        ) : (
          <Feather
            name="trending-down"
            style={{ fontSize: 24, color: 'red' }}
          />
        )}
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.accessoryContainer}>
        <Text style={styles.date}>{data.date}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.accessory}>{data.amount}</Text>
          <FontAwesome name="euro" style={styles.euro} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0'
  },
  accessoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
    // marginRight: 1,
    // borderWidth: 1
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    // marginHorizontal: 1,
    // justifyContent: 'space-between'
    // borderWidth: 1
    // alignItems: 'stretch'
  },
  title: {
    // flex: 1,
    fontSize: 24,
    // fontWeight: 'bold',
    marginLeft: 10
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

export default HistoryListItem;
