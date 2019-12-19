import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default ({ title, amount }: { title: string; amount: number }) => {
  return (
    <View style={styles.soldeContainer}>
      <Text style={styles.title}>{title}:</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.accessory}>{amount}</Text>
        <FontAwesome name="euro" style={styles.euro} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accessoryContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  soldeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
    marginHorizontal: 10,
    // borderWidth: 1,
    borderColor: 'white'
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
    fontSize: 35,
    fontWeight: 'bold'
    // marginTop: 5
  },
  accessory: {
    fontWeight: 'bold',
    fontSize: 28,
    marginRight: 7
  },
  euro: {
    fontWeight: 'bold',
    fontSize: 28,
    position: 'relative',
    top: 4
  }
});
