import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Container, Item, Input, Icon } from 'native-base';
import color from '../colorTheme';

interface Props {
  navigation: any;
}
// Load the app logo
const logo = require('../images/logo.png');

class WelcomeScreen extends React.Component<Props> {
  handleRoute = async destination => {
    await this.props.navigation.navigate(destination);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <View style={styles.sloganContainer}>
          <Text style={styles.sloganText}>Providing Financial Solutions</Text>
          <Text style={styles.sloganText}>Using Quantum Algorithms</Text>
        </View>
        <View style={styles.container}>
          <Container style={styles.infoContainer}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>Créer un compte</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgetPassword')}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  sloganContainer: {
    position: 'absolute',
    top: 300,
    left: 50,
    right: 50,
    alignItems: 'center'
  },
  sloganText: {
    fontSize: 20,
    elevation: 20
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5a52a5'
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff'
  },
  itemStyle: {
    marginBottom: 20
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#1671B3',
    padding: 14,
    marginBottom: 20,
    borderRadius: 24
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  logoContainer: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // height: 400,
    // bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

export default WelcomeScreen;
