import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Slider,
  ViewProps
} from 'react-native';
import { Input } from '@ui-kitten/components';
import { Feather, Ionicons } from '@expo/vector-icons';
// import Slider from 'azir-slider';
import { textStyle, ValidationInput } from './';

import { InvestmentAmountValidator } from '../validators';
import { InvestmentAmountFormatter } from '../formatters';

interface State {
  amount: string;
}
export interface InvestmentFormType {
  amount: string;
}
interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onFormValueChange: (value: InvestmentFormType | undefined) => void;
  action: string;
}
export type InvestmentFormProps = ViewProps & ComponentProps;

export default class SliderComponent extends React.Component<
  InvestmentFormProps,
  State
> {
  state = {
    amount: '0'
  };
  public getSnapshotBeforeUpdate() {
    if (this.state.amount.slice(-1).match(/[a-z]/i)) {
      this.setState({ amount: '' });
    }
    return null;
  }

  public componentDidUpdate(prevProps: InvestmentFormProps, prevState: State) {
    // const oldFormValid: boolean = this.isValid(prevState);
    // const newFormValid: boolean = this.isValid(this.state);

    // const becomeValid: boolean = !oldFormValid && newFormValid;
    // const becomeInvalid: boolean = oldFormValid && !newFormValid;

    // if (becomeValid) {
    //   this.props.onFormValueChange(this.state);
    // } else if (becomeInvalid) {
    //   this.props.onFormValueChange(undefined);
    // }
    if (this.state.amount.slice(-1).match(/[a-z]/i)) {
      this.setState({ amount: '' });
    }
  }

  private isValid = (value: InvestmentFormType): boolean => {
    const { amount } = value;
    return amount !== undefined;
  };

  render() {
    const parseAmount = amount => {
      try {
        parseInt(this.state.amount, 10);
      } catch (e) {
        return 0;
      }
    };
    const onChangeText = amount => {
      // value = value.replace();
      amount = amount.replace(/\s?/g, '').trim();
      if (this.state.amount.slice(-1).match(/[a-z]/i)) {
        this.setState({ amount: '' });
      }
      this.setState({ amount });
    };
    return (
      <>
        <Text style={styles.titleStyle}>Rentrer un montant</Text>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.textStyle}>{this.props.action}</Text>
            <View style={styles.inputContainer}>
              <Input
                status="info"
                size="small"
                value={this.state.amount}
                onChangeText={onChangeText}
                // style={[
                //   themedStyle.input,
                //   themedStyle.expireInput,
                //   { width: 130 }
                // ]}
                textStyle={textStyle.paragraph}
                // labelStyle={textStyle.label}
                // label="DATE D'EXPIRATION"
                // placeholder="MM/AA"
                // validator={InvestmentAmountValidator}
                // formatter={InvestmentAmountFormatter}
                maxLength={4}
                keyboardType="numeric"
              />
            </View>
            <Text style={{ ...styles.textStyle, marginLeft: 5 }}>euros</Text>
          </View>
          <Slider
            value={this.state.amount ? parseAmount(this.state.amount) : 0}
            onValueChange={amount =>
              this.setState({ amount: amount ? amount.toString() : '0' })
            }
            maximumValue={5000}
            step={20}
            style={styles.track}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff'
  //   // alignItems: 'center',
  //   // justifyContent: 'center'
  // },
  container: {
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
  textStyle: {
    // fontWeight: 'bold',
    // color: '#0095ff',
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 10
    // padding: 10
  },
  titleStyle: {
    fontWeight: 'bold',
    color: '#0095ff',
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 10
    // padding: 10
  },
  track: {
    marginHorizontal: 10,
    marginBottom: 5
    // height: 4,
    // borderRadius: 2
  },
  inputContainer: {
    // margin: 5,
    // paddingTop: 10,
    top: 5,
    marginLeft: 5
    // borderWidth: 1
  }
});
