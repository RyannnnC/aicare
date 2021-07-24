import React from 'react';
import { Platform,Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BasicInformation from './basicInformation';
import Eprescription from './ePrescription';
import Path from './path'
import ImageList from './image'
import I18n from '../switchLanguage';

export default function RecordDetail(props) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'rgb(51,51,51)'}}>
      <Tab.Navigator tabBarOptions={{
          style:{width:'90%',backgroundColor:'white',alignSelf:'center'},
          inactiveTintColor:'black',
          activeTintColor:'rgb(33,192,196)',
        }} headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name={I18n.t('bi')}  component={BasicInformation} initialParams={{appointmentId:props.route.params.appointmentId,customerUserInfoId:props.route.params.customerUserInfoId}} />
        <Tab.Screen name={I18n.t('prescrip')} component={Eprescription} initialParams={{customerUserInfoId:props.route.params.customerUserInfoId}}/>
        <Tab.Screen name={I18n.t('pathology')} component={Path} initialParams={{customerUserInfoId:props.route.params.customerUserInfoId}}/>
        <Tab.Screen name={I18n.t('image')} component={ImageList} initialParams={{customerUserInfoId:props.route.params.customerUserInfoId}}/>
      </Tab.Navigator>
    </SafeAreaView>
  );
}
