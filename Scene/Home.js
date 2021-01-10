import React ,{Component}from 'react';
import {StyleSheet, View,Text,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProviderOrder from './providerOrder.js'
import ProviderMain from './providerMain.js'
import Account from './account.js'
import Plan from './plan.js'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Home() {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator>
          <Tab.Screen
            name="主页"
            component={ProviderMain}
            options={{
              tabBarLabel: '主页',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
            />
          <Tab.Screen
            name="订单"
            component={ProviderOrder}
            options={{
              tabBarLabel: '订单',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="行程"
            component={Plan}
            options={{
              tabBarLabel: '行程',
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="calendar" size={size} color={color} />
              ),
            }}
             />
          <Tab.Screen
            name="账号"
            component={Account}
            options={{
              tabBarLabel: '账号',
              tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
             />
        </Tab.Navigator>
  );
}
