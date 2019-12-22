import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import HistoryListItem from './HistoryListItem';

export default class BankTransactionList extends React.Component {
  renderSeparator = () => {
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}></View>
    );
  };
  render() {
    const data = [
      {
        title: 'Recharge',
        amount: 200,
        date: '21-12-2019'
      },
      { title: 'Retrait', amount: 100, date: '20-12-2019' },
      {
        title: 'Recharge',
        amount: 150,
        date: '19-12-2019'
      }
    ];
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            {/* Bloc 3 */}
            <View style={{ flex: 1, marginVertical: 20 }}>
              <Text style={styles.textStyle}>
                Mon historique de transactions bancaires
              </Text>
              <View style={styles.accountStateContainer}>
                <FlatList
                  showsVerticalScrollIndicator={true}
                  data={data}
                  keyExtractor={result => result.title}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flex: 1 }}>
                        <TouchableOpacity>
                          <HistoryListItem data={item} />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  ItemSeparatorComponent={this.renderSeparator}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    color: '#0095ff', // bleu ciel
    fontSize: 16,
    marginLeft: 15,
    marginVertical: 10
    // padding: 10
  },

  accountStateContainer: {
    flex: 1,
    // height: 150,
    // justifyContent: 'space-between',
    marginHorizontal: 15,
    // marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#f0f0f0'
  },
  accessoryContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  date: { top: 9 },
  wrapper: {
    flex: 1,
    marginVertical: 15
  },
  soldeContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  titleContainer: {
    // flex: 1,
    marginHorizontal: 15,
    // marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
    // borderWidth: 1
    // alignItems: 'stretch'
  },
  title: {
    // flex: 1,
    fontSize: 24
    // marginVertical: 10,
    // marginLeft: 10,
    // fontWeight: 'bold'
    // marginTop: 5
  },
  accessory: {
    fontWeight: 'bold',
    fontSize: 28,
    marginRight: 7
  },
  manageAccount: {
    fontSize: 16,
    marginVertical: 10,
    marginRight: 15,
    textAlign: 'right',
    color: '#0095ff'
  },
  euro: {
    fontWeight: 'bold',
    fontSize: 28,
    position: 'relative',
    top: 4
  }
});
