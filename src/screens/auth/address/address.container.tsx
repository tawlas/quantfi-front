import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { AddressFormData } from '../../../components/addressForm';
import { Address } from './address.component';

export class AddressScreen extends React.Component<NavigationStackScreenProps> {
  private navigationKey: string = 'SignUp1Container';

  private onSignUpPress = (data: AddressFormData) => {
    this.props.navigation.goBack();
  };

  private onSignInPress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Sign In 1'
    });
  };

  private onGooglePress = () => {};

  private onFacebookPress = () => {};

  private onTwitterPress = () => {};

  private onEwaPress = () => {};

  public render(): React.ReactNode {
    return (
      <Address
        onSignUpPress={this.onSignUpPress}
        onSignInPress={this.onSignInPress}
        onGooglePress={this.onGooglePress}
        onFacebookPress={this.onFacebookPress}
        onTwitterPress={this.onTwitterPress}
        onEwaPress={this.onEwaPress}
      />
    );
  }
}
