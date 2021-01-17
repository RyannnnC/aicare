import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from './providerStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Transfer from './Income/transfer';
import IncomeMain from './Income/incomeMain';

export default function Income() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center'}}>
    <Image
      style = {styles.img4}
      source = {require('../images/providerImg/money_img.png')}
      />
    <View style={{alignItems: "Left" }}>
      <Text style= {{color: '#333333', fontSize: 16, fontWeight: '500'}}>数据统计</Text>
    </View>
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>$100</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>总余额</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>$500</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>本月转出</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer3}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>$756</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>本月收入</Text>
      </TouchableOpacity>
    </View>
      <SafeAreaView>
        <Tab.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
          <Tab.Screen name="收入明细" component={IncomeMain} />
          <Tab.Screen name="转出明细" component={Transfer} />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaView>
  );
}
