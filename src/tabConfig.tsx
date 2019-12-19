import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import InvestmentListScreen from './screens/InvestmentListScreen';
import ProfilScreen from './screens/ProfilScreen';
import CreditCardScreen from './screens/CreditCardScreen';
import SecurityScreen from './screens/SecurityScreen';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      // title: 'Settings'
      header: null
    })
  },
  Profil: {
    screen: ProfilScreen,
    navigationOptions: () => ({
      title: 'Profil'
    })
  },
  CreditCard: {
    screen: CreditCardScreen,
    navigationOptions: () => ({
      title: 'Carte de crédit'
    })
  },
  Security: {
    screen: SecurityScreen,
    navigationOptions: () => ({
      title: 'Securité'
    })
  }
});

export const configurations = {
  Accueil: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Accueil',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ fontSize: 26, color: tintColor }} />
      )
    }
  },
  Investissements: {
    screen: InvestmentListScreen,
    navigationOptions: {
      tabBarLabel: 'Investissements',
      tabBarIcon: ({ tintColor }) => (
        // <Icon name="ios-person" style={{ fontSize: 26, color: tintColor }} />
        <MaterialCommunityIcons
          name="finance"
          style={{ fontSize: 26, color: tintColor }}
        />
      )
    }
  },
  Réglages: {
    screen: SettingsStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Réglages',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" style={{ fontSize: 26, color: tintColor }} />
      )
    }
  }
};

export const options = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#1671B3',
    inactiveTintColor: '#a8abaf',
    style: {
      backgroundColor: '#f0f0f0',
      paddingBottom: 0
    },
    labelStyle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop: 12
    },
    indicatorStyle: {
      height: 0
    },
    showIcon: true
  }
};
