import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../style';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import ProcessingOrder from './order/processingOrder';
import CompletedOrder from './order/completedOrder';
import ConsumerPaySuccess from "./consumerPaySuccess"
import OngoingingOrder from './order/onGoingOrder';
export default function ConsumerOrderPage() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{flex:1}}>
      <Image
        style = {styles.topping_image}
        source = {require('../images/ordertop.png')}
      />
      <Tab.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name="进行中" component={OngoingingOrder} />
        <Tab.Screen name="已完成" component={CompletedOrder} />
      </Tab.Navigator>
    </View>
  );
}