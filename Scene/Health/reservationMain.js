import React from 'react';
import { Platform,Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../providerStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProcessingOrder from './processingOrder';
import PendingOrder from './pendingOrder';
import I18n from '../switchLanguage';
import moment from 'moment-timezone';

export default function ReservationMain() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'rgb(51,51,51)'}}>
      <Tab.Navigator tabBarOptions={{
          style:{width:'90%',backgroundColor:'white',alignSelf:'center'},
          inactiveTintColor:'black',
          activeTintColor:'rgb(33,192,196)',
        }} headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name={I18n.t('pendingOrder')}  component={PendingOrder} />
        <Tab.Screen name={I18n.t('processingOrder')} component={ProcessingOrder} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
