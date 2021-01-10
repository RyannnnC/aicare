import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from './providerStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Order from './Orders/Order';
import OrderMain from './Orders/OrderMain';

export default function ProviderOrder() {
  const Stack = createStackNavigator();

  return (
      <Stack.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="订单" component={OrderMain} />
        <Stack.Screen name="上门服务" component={Order} />
      </Stack.Navigator>
  );
}
