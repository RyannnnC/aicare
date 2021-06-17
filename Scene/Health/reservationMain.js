import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
    <View style={{flexDirection:'row',width:'100%',height:'8%',backgroundColor:'rgb(33,192,196)',alignItems:'center'}}>
      <Image
        style={{height:'70%',width:'20%'}}
        resizeMode='stretch'
        source={require('../../images/providerImg/顶端LOGO.png')}
      />
      <View style={{width:'75%',alignItems:'flex-end',justifyContent:'center'}}>
        <Text style={{fontSize:20,color:'white'}}>{moment(new Date()).format('ll')}</Text>
      </View>
    </View>
      <Tab.Navigator tabBarOptions={{
          style:{width:'90%'},
          inactiveTintColor:'black',
          activeTintColor:'rgb(33,192,196)',
        }} headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name={I18n.t('pendingOrder')}  component={PendingOrder} />
        <Tab.Screen name={I18n.t('processingOrder')} component={ProcessingOrder} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
