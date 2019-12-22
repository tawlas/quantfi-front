import React from 'react';
import { View, ViewProps } from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Button
} from '@ui-kitten/components';
import { CheckBox } from '@ui-kitten/components';
import { textStyle, ValidationInput } from '..';
import {
  DOBValidator,
  EmailValidator,
  NameValidator,
  PasswordValidator
} from '../../validators';
import { AddressFormData } from './type';
import UploadButton from '../UploadButton';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: AddressFormData | undefined) => void;
}

export type AddressFormProps = ThemedComponentProps &
  ViewProps &
  ComponentProps;

interface State {
  firstName: string | undefined;
  lastName: string | undefined;
  date: string | undefined;
  email: string | undefined;
  password: string | undefined;
  termsAccepted: boolean;
  blob: any;
  options: any;
}

class AddressFormComponent extends React.Component<AddressFormProps, State> {
  public state: State = {
    firstName: undefined,
    lastName: undefined,
    date: undefined,
    email: undefined,
    password: undefined,
    termsAccepted: false,
    blob: null,
    options: null
  };

  public componentDidUpdate(prevProps: AddressFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onFirstNameInputTextChange = (firstName: string) => {
    this.setState({ firstName });
  };

  private onLastNameValidationResult = (lastName: string) => {
    this.setState({ lastName });
  };

  private onDateInputTextChange = (date: string) => {
    this.setState({ date });
  };

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email });
  };

  private onPasswordInputTextChange = (password: string) => {
    this.setState({ password });
  };

  private onTermsAcceptChange = (termsAccepted: boolean) => {
    this.setState({ termsAccepted });
  };

  private isValid = (value: AddressFormData): boolean => {
    const { firstName, lastName, date, email, password, termsAccepted } = value;

    return (
      firstName !== undefined &&
      lastName !== undefined &&
      date !== undefined &&
      email !== undefined &&
      password !== undefined &&
      termsAccepted
    );
  };

  private passwordCaption = (): string => {
    return this.state.password
      ? 'Password entered correctly'
      : 'Password entered incorrectly';
  };

  storeBlob(blob, options) {
    this.setState({ blob, options });
  }

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          style={[themedStyle.input, themedStyle.firstNameInput]}
          textStyle={themedStyle.inputText}
          placeholder="Paul"
          label="PRENOM"
          autoCapitalize="words"
          validator={NameValidator}
          onChangeText={this.onFirstNameInputTextChange}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder="Hiriart"
          label="NOM"
          autoCapitalize="words"
          validator={NameValidator}
          onChangeText={this.onLastNameValidationResult}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder="JJ/MM/AAAA"
          label="DATE DE NAISSANCE"
          validator={DOBValidator}
          onChangeText={this.onDateInputTextChange}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={themedStyle.inputText}
          labelStyle={themedStyle.inputLabel}
          placeholder="24 RUE DU REGARD 92380 GARCHES France"
          label="ADRESSE COMPLETE"
          validator={() => true}
          onChangeText={this.onEmailInputTextChange}
        />
        <View style={{ marginTop: 30 }}>
          <UploadButton title="Joindre un justificatif de domicile" />
        </View>
        <CheckBox
          style={themedStyle.termsCheckBox}
          textStyle={themedStyle.termsCheckBoxText}
          checked={this.state.termsAccepted}
          text={
            "En créeant ce compte, j'accepte les termes et conditions et la politique de confidentialité."
          }
          onChange={this.onTermsAcceptChange}
        />
      </View>
    );
  }
}

export const AddressForm = withStyles(
  AddressFormComponent,
  (theme: ThemeType) => ({
    container: {},
    button: { marginTop: 30 },
    input: {
      marginTop: 16
    },
    firstNameInput: {
      marginTop: 0
    },
    termsCheckBox: {
      marginTop: 20
    },
    termsCheckBoxText: {
      fontSize: 11,
      color: theme['text-hint-color'],
      ...textStyle.paragraph
    }
  })
);
