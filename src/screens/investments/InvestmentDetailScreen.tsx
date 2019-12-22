import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AccountStateDetail from '../../components/AccountStateDetail';
import { ScrollView } from 'react-native-gesture-handler';
import InvestmentDetailItem from '../../components/InvestmentDetailItem';
import HistoryListItem from '../../components/HistoryListItem';

export default class HomeScreen extends React.Component {
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
            {/* Bloc 1 */}
            <View style={{ flex: 1, marginVertical: 20 }}>
              <Text style={styles.textStyle}>Expert Patrimoine</Text>
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
                    <InvestmentDetailItem
                      textLeft={'Encourt'}
                      textRight={'300'}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('InvestmentList')}
              >
                <Text style={styles.manageAccount}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            {/* Fin Bloc 1 */}
            {/* Bloc 2 */}
            {/* <ScrollableTabView renderTabBar={this.renderTabBar}> */}
            <View>
              <Text>Bezier Line Chart</Text>
              <LineChart
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June'
                  ],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
            {/* </ScrollableTabView> */}

            {/* Fin Bloc 2 */}
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
