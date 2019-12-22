import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { Feather, Ionicons } from '@expo/vector-icons';
import InvestmentCreateList from '../../components/InvestmentCreateList';
import RadioButtons from '../../components/RadioButtons';
import Slider from '../../components/Slider';
import { textStyle } from '../../components';
import { Input, Button } from '@ui-kitten/components';

export default class AccountManagementScreen extends React.Component {
  state = {
    amount: '',
    code: ''
  };
  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result);
  }
  _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log('dragged');
  }
  render() {
    return (
      <>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            <Text style={styles.textStyle}>Choisir une action</Text>
            <RadioButtons labels={['Recharger', 'Retirer']} />
            <Slider action="" />
            <Text style={styles.textStyle}>Confirmation</Text>
            <View style={styles.codeContainer}>
              <Input
                // status="info"
                size="small"
                value={this.state.code}
                onChangeText={code => this.setState({ code })}
                style={styles.input}
                textStyle={textStyle.paragraph}
                labelStyle={textStyle.label}
                label="Code secret"
                placeholder="****"
                // validator={InvestmentAmountValidator}
                // formatter={InvestmentAmountFormatter}
                maxLength={4}
                keyboardType="numeric"
              />
            </View>
            {/* <SignatureCapture
              style={[{ flex: 1 }, styles.signature]}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={'portrait'}
            /> */}
            <Button style={styles.button}>Appliquer</Button>
          </View>
        </TouchableWithoutFeedback>
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
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1
  },
  codeContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // borderWidth: 1,
    borderRadius: 20,
    // paddingTop: 60,
    marginBottom: 30,
    marginHorizontal: 10
  },
  button: {
    margin: 10,
    marginTop: 30
    // alignSelf: 'flex-end'
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
  input: {
    // textAlign: 'right',
    // fontSize: 60,
    backgroundColor: 'white',
    margin: 20,
    marginVertical: 10
    // margin
  }
});
