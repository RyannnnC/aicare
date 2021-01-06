import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from './providerStyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProviderOrder from './providerOrder.js'
import Account from './account.js'
import Plan from './plan.js'

export default function ProviderMain() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>今天有什么新安排吗？</Text>
    <Image
      style = {styles.store}
      source = {require('../images/crayon-1317.png')}
      />
    <SearchBar placeholder="搜服务/订单..."/>
    <Text>服务</Text>
    <TouchableOpacity style={styles.buttonContainer} onPress={alertHandler}>
      <Image
        style = {styles.store}
        source = {require('../images/Store.png')}
        />
      <Text style={styles.buttonText}>上门服务</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonContainer2} onPress={alertHandler}>
      <Image
        style = {styles.store}
        source = {require('../images/To-do.png')}
      />
      <Text style={styles.buttonText}>远程医疗</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonContainer3} onPress={alertHandler}>
      <Image
        style = {styles.store}
        source = {require('../images/Banquet.png')}
        />
      <Text style={styles.buttonText}>外卖配送</Text>
    </TouchableOpacity>
    <Text style={styles.buttonText}>行程</Text>
    <Image
      style = {styles.store}
      source = {require('../images/crayon-892.png')}
      />
    </View>
  );
}
