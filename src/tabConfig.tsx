import React from 'react';
import HomeScreen from './screens/home/HomeScreen';
import AccountManagementScreen from './screens/home/AccountManagementScreen';
import BankTransactionHistoryScreen from './screens/home/BankTransactionHistoryScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import InvestmentListScreen from './screens/investments/InvestmentListScreen';
import InvestmentDetailScreen from './screens/investments/InvestmentDetailScreen';
import ProfilScreen from './screens/settings/ProfilScreen';
import AddNewCardScreen from './screens/settings/addNewCard/AddNewCardScreen';
import CreditCardScreen from './screens/settings/payment/payment.container';
import { AddressScreen } from './screens/auth/address/address.container';
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
      title: 'Carte Bancaire'
    })
  },
  AddNewCard: {
    screen: AddNewCardScreen,
    navigationOptions: () => ({
      title: 'Nouvelle Carte Bancaire'
    })
  },
  Address: {
    screen: AddressScreen,
    navigationOptions: () => ({
      title: 'Adresse'
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
  InvestmentDetail: {
    screen: InvestmentDetailScreen,
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
  },
  AccountManagement: {
    screen: AccountManagementScreen,
    navigationOptions: () => ({
      title: 'Gérer mon compte'
    })
  },
  BankTransactionHistory: {
    screen: BankTransactionHistoryScreen,
    navigationOptions: () => ({
      title: 'Historique de Transactions Bancaires'
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
