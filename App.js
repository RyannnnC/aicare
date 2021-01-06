import React ,{Component}from 'react';
import {StyleSheet, View,Text,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProviderOrder from './Scene/providerOrder.js'
import ProviderMain from './Scene/providerMain.js'
import Account from './Scene/account.js'
import Plan from './Scene/plan.js'

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="home" component={ProviderMain} />
          <Tab.Screen name="order" component={ProviderOrder} />
          <Tab.Screen name="plan" component={Plan} />
          <Tab.Screen name="account" component={Account} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
