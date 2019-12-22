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
import { setNavigator } from './src/navigationRef';
import { Ionicons } from '@expo/vector-icons';
import { ImageRequireSource } from 'react-native';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import {
  ApplicationLoader,
  Assets
} from './src/appLoader/applicationLoader.component';

import AuthLoadingScreen from './src/screens/auth/AuthLoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import SignUpScreen1 from './src/screens/auth/SignUpScreen1';
import SignUpScreen2 from './src/screens/auth/SignUpScreen2';
import SignUpScreen3 from './src/screens/auth/SignUpScreen3';
import SignInScreen from './src/screens/auth/SignInScreen';
import ForgetPasswordScreen from './src/screens/auth/ForgetPasswordScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import ProfilScreen from './src/screens/settings/ProfilScreen';
import InvestmentListScreen from './src/screens/investments/InvestmentListScreen';
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
// AppTabNavigator.navigationOptions = ({ navigation }) => {
//   let { routeName } = navigation.state.routes[navigation.state.index];
//   let headerTitle = routeName;
//   return {
//     headerTitle
//   };
// };

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
//   InvestmentList: InvestmentListScreen,
//   Settings: SettingsScreen
// });

const navigator = createSwitchNavigator(
  {
    // screen: name
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppTabNavigator
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

const fonts: { [key: string]: number } = {
  'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
  'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
  'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
  'opensans-light': require('./assets/fonts/opensans-light.ttf'),
  'opensans-regular': require('./assets/fonts/opensans-regular.ttf')
};
// const images: ImageRequireSource[] = [
//   require('../src/assets/images/source/image-profile-1.jpg'),
//   require('./assets/images/source/image-profile-2.jpg'),
//   require('./assets/images/source/image-profile-3.jpg'),
//   require('./assets/images/source/image-profile-4.jpg'),
//   require('./assets/images/source/image-profile-5.jpg'),
//   require('./assets/images/source/image-profile-6.jpg'),
//   require('./assets/images/source/image-profile-7.jpg'),
//   require('./assets/images/source/image-profile-8.jpg'),
//   require('./assets/images/source/image-profile-9.jpg'),
//   require('./assets/images/source/image-profile-10.jpg')
// ];
const assets: Assets = {
  images: [],
  fonts: fonts
};

export default function Root() {
  return (
    <ApplicationLoader assets={assets}>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={createStore(reducers)}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <App
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </ApplicationProvider>
      </Provider>
    </ApplicationLoader>
  );
}
