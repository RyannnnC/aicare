import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../providerStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProcessingOrder from '../Orders/processingOrder';
import PendingOrder from '../Orders/pendingOrder';
import CompletedOrder from '../Orders/completedOrder';

export default function ProviderOrder() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{alignItems: "center" }}>
      <Image
        style = {styles.orderImg}
        source = {require('../../images/providerImg/order_img.png')}
      />
      </View>
      <Tab.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name="待接取" component={PendingOrder} />
        <Tab.Screen name="进行中" component={ProcessingOrder} />
        <Tab.Screen name="已完成" component={CompletedOrder} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
