import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
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
    <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
    <Text>今天有什么新安排吗？</Text>
    <Image
      style = {styles.store}
      source = {require('../images/crayon-1317.png')}
      />
    <View style={styles.searchBar}>
      <SearchBar placeholder="搜服务/订单..."/>
    </View>
      <Text>服务</Text>
    <View style={styles.buttons}>
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
    </View>
    <Text style={styles.buttonText}>行程</Text>
    <Image
      style = {styles.img3}
      source = {require('../images/crayon-892.png')}
      />
    </View>
  );
}
