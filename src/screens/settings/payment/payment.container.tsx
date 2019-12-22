import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Payment } from './payment.component';
import { PaymentCard } from '../../../model';
import { paymentCard1 } from '../../../data/paymentCard';

interface State {
  paymentCards: PaymentCard[];
}

export default class PaymentContainer extends React.Component<
  NavigationStackScreenProps
> {
  public state: State = {
    paymentCards: [paymentCard1]
  };

  private navigationKey: string = 'PaymentContainer';

  private onCardDetailsPress = (index: number): void => {};

  private onBuyPress = (): void => {};

  private onAddCardPress = (): void => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'AddNewCard'
    });
  };

  public render(): React.ReactNode {
    return (
      <Payment
        paymentCards={this.state.paymentCards}
        onCardDetailsPress={this.onCardDetailsPress}
        onBuy={this.onBuyPress}
        onAddCard={this.onAddCardPress}
      />
    );
  }
}
