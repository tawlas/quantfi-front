import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import List from '../components/List';

export default class InvestmentListScreen extends React.Component {
  render() {
    return (
      <>
        <SearchBar
        // term={term}
        // onTermChange={setTerm}
        // onTermSubmit={() => searchApi(term)}
        />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.textStyle}>Mes Investissements</Text>
            <List />
          </View>
          <View style={styles.invest}>
            <Ionicons name="md-add-circle" style={styles.icon} />
            <Text style={{ fontSize: 16, left: 3 }}>Investir</Text>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#0095ff',
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 10
    // padding: 10
  },
  invest: {
    alignItems: 'flex-end',
    marginRight: 30
  },
  icon: {
    // textAlign: 'right',
    fontSize: 60,
    color: '#0095ff',
    marginTop: 20
  }
});
