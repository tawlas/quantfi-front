import React from 'react';
import HomeScreen from './screens/home/HomeScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import InvestmentListScreen from './screens/investments/InvestmentListScreen';
import ProfilScreen from './screens/settings/ProfilScreen';
import CreditCardScreen from './screens/settings/CreditCardScreen';
import SecurityScreen from './screens/settings/SecurityScreen';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InvestmentCreateScreen from './screens/investments/InvestmentCreateScreen';

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      title: 'Settings'
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

const InvestmentStackNavigator = createStackNavigator({
  InvestmentList: {
    screen: InvestmentListScreen,
    navigationOptions: () => ({
      title: 'Investissements'
    })
  },
  InvestmentCreate: {
    screen: InvestmentCreateScreen,
    navigationOptions: () => ({
      title: 'Nouvel Investissement'
    })
  }
});

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Accueil'
    })
  }
});

export const configurations = {
  Accueil: {
    screen: HomeStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Accueil',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ fontSize: 26, color: tintColor }} />
      )
    }
  },
  Investissements: {
    screen: InvestmentStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Investissements',
      tabBarIcon: ({ tintColor }) => (
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
      paddingBottom: 0,
      marginTop: 2
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
