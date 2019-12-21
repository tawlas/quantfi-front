import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import InvestmentCreateListItem from './InvestmentCreateListItem';
import DropDownItem from '../components/DropDown';

export default class InvestmentCreateList extends React.Component {
  state = {
    contents: [
      {
        title: 'Title 1',
        body: 'Hi. I love this component. What do you think?'
      },
      {
        title: 'See this one too',
        body: 'Yes. You can have more items.'
      },
      {
        title: 'Thrid thing',
        body:
          'What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text?'
      }
    ]
  };
  render() {
    const data = [{ title: 'Dummy' }];
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView style={{ alignSelf: 'stretch' }}>
            {this.state.contents
              ? this.state.contents.map((param, i) => {
                  return (
                    <DropDownItem
                      key={i}
                      // style={{}}
                      contentVisible={true}
                      // invisibleImage={}
                      // visibleImage={<SimpleLineIcons name="arrow-up" />}
                      header={
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'blue'
                            }}
                          >
                            {param.title}
                          </Text>
                        </View>
                      }
                    >
                      <Text
                        style={{
                          fontSize: 20
                        }}
                      >
                        {param.body}
                      </Text>
                    </DropDownItem>
                  );
                })
              : null}
            <View style={{ height: 96 }} />
          </ScrollView>
        </View>
        });
        {/* <FlatList
          data={data}
          keyExtractor={result => result.title}
          renderItem={({ item }) => {
            return <InvestmentCreateListItem data={item} />;
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
