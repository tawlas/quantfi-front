// Amplify imports and config
import Amplify from '@aws-amplify/core';
import { Storage } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignUpScreen1 from './src/screens/SignUpScreen1';
import SignUpScreen2 from './src/screens/SignUpScreen2';
import SignUpScreen3 from './src/screens/SignUpScreen3';
import SignInScreen from './src/screens/SignInScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfilScreen from './src/screens/ProfilScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { configurations, options } from './src/tabConfig';

// Auth stack
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  // SignUp: {
  //   screen: SignUpScreen,
  //   navigationOptions: () => ({
  //     title: `Créer un nouveau compte`
  //   })
  // },
  SignUp: {
    screen: SignUpScreen1,
    navigationOptions: () => ({
      title: `Créer un nouveau compte`
    })
  },
  SignUp2: {
    screen: SignUpScreen2,
    navigationOptions: () => ({
      title: `Créer un nouveau compte`
    })
  },
  SignUp3: {
    screen: SignUpScreen3,
    navigationOptions: () => ({
      title: `Créer un nouveau compte`
    })
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Se connecter`
    })
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Créer un nouveau mot de passe`
    })
  }
});

// App tabs located at the bottom of the screen
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options);

// Making the common header title dynamic in AppTabNavigator
AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle = routeName;
  return {
    headerTitle
  };
};

const AppStackNavigator = createStackNavigator({
  Header: {
    screen: AppTabNavigator
    // Set the header icon
    // navigationOptions: ({ navigation }) => ({
    //   // headerLeft: (
    //   //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
    //   //     <View style={{ paddingHorizontal: 10 }}>
    //   //       <Ionicons name="md-menu" size={24} />
    //   //     </View>
    //   //   </TouchableOpacity>
    //   )
    // })
  }
});

// App stack for the drawer
// const AppDrawerNavigator = createDrawerNavigator({
//   Tabs: AppStackNavigator,
//   Home: HomeScreen,
//   Profile: ProfileScreen,
//   Settings: SettingsScreen
// });

const navigator = createSwitchNavigator(
  {
    // screen: name
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppStackNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const App = createAppContainer(navigator);
export default function Root() {
  return (
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  );
}
