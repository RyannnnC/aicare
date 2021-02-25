import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../providerStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProcessingOrder from './processingOrder';
import PendingOrder from './pendingOrder';
import {data} from './data';

export default function ReservationMain() {
  const Tab = createMaterialTopTabNavigator();
  let pend = "待接取(" + data.length + ")";
  let proc = "已预约(" + data.length + ")";

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
      <View style={{alignItems: "center" }}>
      <Image
        style = {styles.orderImg}
        source = {require('../../images/providerImg/order_img.png')}
      />
      </View>
      <Tab.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name={pend}  component={PendingOrder} />
        <Tab.Screen name={proc} component={ProcessingOrder} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
