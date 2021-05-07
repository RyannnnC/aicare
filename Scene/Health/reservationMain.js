import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../providerStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProcessingOrder from './processingOrder';
import PendingOrder from './pendingOrder';
import I18n from '../switchLanguage';

export default function ReservationMain() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
      <View style={{alignItems: "center" }}>
      <Image
        style = {styles.orderImg}
        source = {require('../../images/providerImg/order_img.png')}
      />
      </View>
      <Tab.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name={I18n.t('pendingOrder')}  component={PendingOrder} />
        <Tab.Screen name={I18n.t('processingOrder')} component={ProcessingOrder} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
