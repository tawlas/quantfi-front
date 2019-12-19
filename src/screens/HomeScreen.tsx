import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AccountStateDetail from '../components/AccountStateDetail';
import { ScrollView } from 'react-native-gesture-handler';
import InvestmentDetailItem from '../components/InvestmentDetailItem';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {/* Bloc 1 */}
        <View style={{ flex: 1 }}>
          <Text style={styles.textStyle}>Etat de mon compte</Text>
          <View style={styles.accountStateContainer}>
            <View style={styles.wrapper}>
              <AccountStateDetail title="Solde" amount={300} />
              <View
                style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}
              ></View>
              <AccountStateDetail title="Gain" amount={100} />
            </View>
          </View>
          <Text style={styles.manageAccount}>Gérer mon compte</Text>
        </View>
        {/* Bloc 2 */}
        <View>
          <Text style={styles.textStyle}>Mon dernier investissement</Text>
          <View style={styles.accountStateContainer}>
            <View style={styles.wrapper}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Expert Patrimoine</Text>
                <Text style={styles.date}>20-12-19</Text>
              </View>
              <View>
                <InvestmentDetailItem
                  textLeft={'Montant Investit'}
                  textRight={'300'}
                />
                <InvestmentDetailItem
                  textLeft={'Rendement'}
                  textRight={'300'}
                />
                <InvestmentDetailItem textLeft={'Encourt'} textRight={'300'} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    color: '#0095ff', // bleu ciel
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 10
    // padding: 10
  },

  accountStateContainer: {
    // flex: 1,
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
