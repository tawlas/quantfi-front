import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import InvestmentListAccessory from './InvestmentListAccessory';
import { navigate } from '../navigationRef';
import { View } from 'native-base';

const data = [
  {
    title: 'Fonds de fonds'
    // description: 'Description for Item'
  },
  {
    title: 'Expert Patrimoine'
    // description: 'Description for Item'
  }
];

const ListCompositeItemShowcase = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={true}
      data={data}
      keyExtractor={result => result.title}
      renderItem={({ item }) => {
        return (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
            // onPress={() => navigate('ResultsShow', { id: item })}
            >
              <InvestmentListAccessory data={item} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default ListCompositeItemShowcase;

// const data = new Array(8).fill({
//   title: 'Title for Item',
//   description: 'Description for Item'
// });

// export default () => {
//   const renderItemAccessory = style => <Button style={style}>FOLLOW</Button>;

//   const renderItemIcon = style => <Icon {...style} name="person" />;

//   const renderItem = ({ item, index }) => (
//     <ListItem
//       title={`${item.title} ${index + 1}`}
//       description={`${item.description} ${index + 1}`}
//       icon={renderItemIcon}
//       accessory={renderItemAccessory}
//     />
//   );

//   return <List data={data} renderItem={renderItem} />;
// };
