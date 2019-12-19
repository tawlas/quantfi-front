import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Amount = ({ amount, fontSize, top }) => {
  // const renderItemAccessory = style => <Button style={style}>FOLLOW</Button>;
  const styles = StyleSheetFactory.getSheet(fontSize, top);
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.accessory}>{amount}</Text>
      <FontAwesome name="euro" style={styles.euro} />
    </View>
  );
};

class StyleSheetFactory {
  static getSheet(fontSize: number, top: number) {
    return StyleSheet.create({
      accessory: {
        fontSize: fontSize,
        marginRight: 5
      },
      euro: {
        fontSize: fontSize,
        position: 'relative',
        top: top
      }
    });
  }
}

// const styles = StyleSheetFactory.getSheet(fontSize, 'red');

export default Amount;
