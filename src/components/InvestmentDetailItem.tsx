import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Amount from '../components/Amount';

export default ({ textLeft, textRight }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLeftStyle}>{textLeft}</Text>
      {/* <Text style={styles.textRightStyle}> */}
      <Amount amount={textRight} fontSize={14} top={2} />
      {/* </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 5
  },
  textRightStyle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  textLeftStyle: {
    fontSize: 14,
    marginLeft: 10
  }
});
