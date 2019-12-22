import React from 'react';
import { ImageProps, View } from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles
} from '@ui-kitten/components';
import { Button, Text } from '@ui-kitten/components';
import { AddressForm, AddressFormData } from '../../../components/addressForm';
import {
  ScrollableAvoidKeyboard,
  // ImageOverlay,
  textStyle
} from '../../../components';
import { ArrowForwardIconOutline, HeartIconFill } from '../../../assets/icons';
import { imageSignUp1Bg, ImageSource } from '../../../assets/images';
import Auth from '@aws-amplify/auth';

interface ComponentProps {
  onSignUpPress: (formData: AddressFormData) => void;
  onSignInPress: () => void;
  onGooglePress: () => void;
  onFacebookPress: () => void;
  onTwitterPress: () => void;
  onEwaPress: () => void;
}

export type AddressProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: AddressFormData;
  blob: null;
  options: null;
}

class AddressComponent extends React.Component<AddressProps, State> {
  public state: State = {
    formData: undefined,
    blob: null,
    options: null
  };

  private backgroundImage: ImageSource = imageSignUp1Bg;

  private onFormDataChange = (formData: AddressFormData) => {
    this.setState({ formData });
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress(this.state.formData);
  };

  private onSignInButtonPress = () => {
    this.props.onSignInPress();
  };

  private onGoogleButtonPress = () => {
    this.props.onGooglePress();
  };

  private onFacebookButtonPress = () => {
    this.props.onFacebookPress();
  };

  private onTwitterButtonPress = () => {
    this.props.onTwitterPress();
  };

  private onEwaButtonPress = () => {
    this.props.onEwaPress();
  };

  private renderEwaButtonIcon = (
    style: StyleType
  ): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return HeartIconFill({ ...style, ...themedStyle.ewaButtonIcon });
  };

  private renderSignInButtonIcon = (
    style: StyleType
  ): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return ArrowForwardIconOutline({
      ...style,
      ...themedStyle.signInButtonIcon
    });
  };
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log('Sign out complete');
        this.props.navigation.navigate('AuthLoading');
      })
      .catch(err => console.log('Error while signing out!', err));
  };
  async storeImage(blob, options) {
    // const { email } = this.props;
    const email = 'wattalassane@gmail.com';
    const key = email;
    try {
      const result = await Storage.put(key, blob, options);
      return {
        key: result.key
      };
    } catch (err) {
      throw err;
    }
  }

  async onClickNext() {
    const { blob, options } = this.state;
    await this.storeImage(blob, options);
    Alert.alert('Compte crée avec succès. Veuillez vous connecter à présent');
    // this.props.navigation.navigate('SignUp3', {});
  }

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <View style={themedStyle.orContainer}>
          <View style={themedStyle.divider} />
          <Text style={themedStyle.orLabel} category="h5">
            Compléter mon profil
          </Text>
          <View style={themedStyle.divider} />
        </View>
        {/* <Text style={themedStyle.emailSignLabel}>Sign up with Email</Text> */}
        <AddressForm
          style={themedStyle.formContainer}
          onDataChange={this.onFormDataChange}
        />
        <Button
          style={themedStyle.signUpButton}
          textStyle={textStyle.button}
          size="large"
          disabled={!this.state.formData}
          onPress={this.onSignUpButtonPress}
        >
          Soumettre et finir
        </Button>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const Address = withStyles(AddressComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1']
  },
  headerContainer: {
    minHeight: 200,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  socialAuthContainer: {
    marginTop: 24
  },
  formContainer: {
    marginTop: 48,
    paddingHorizontal: 16
  },
  ewaButton: {
    maxWidth: 72,
    paddingHorizontal: 0
  },
  ewaButtonText: {
    color: 'white',
    ...textStyle.button
  },
  ewaButtonIcon: {
    marginHorizontal: 0,
    tintColor: 'white'
  },
  signInLabel: {
    flex: 1,
    color: 'white',
    ...textStyle.headline
  },
  signInButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0
  },
  signInButtonText: {
    color: 'white',
    ...textStyle.button
  },
  signInButtonIcon: {
    marginHorizontal: 0,
    tintColor: 'white'
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16
  },
  socialAuthHint: {
    ...textStyle.paragraph
  },
  socialAuthIcon: {
    tintColor: theme['text-basic-color']
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 30
  },
  orLabel: {
    marginHorizontal: 8,
    ...textStyle.headline
  },
  emailSignLabel: {
    alignSelf: 'center',
    marginTop: 8,
    ...textStyle.paragraph
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme['background-basic-color-3']
  }
}));
