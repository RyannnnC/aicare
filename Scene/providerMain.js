import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from './providerStyle';
import data from './Orders/data'


export default function ProviderMain() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }

  return (
    <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40}}>
    <Text>今天有什么新安排吗？</Text>
    <Image
      style = {styles.mainImg}
      source = {require('../images/crayon-1317.png')}
      />
    <View style={styles.searchBar}>
      <SearchBar
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
        inputContainerStyle={{backgroundColor: 'white'}}
        placeholder="搜服务/订单..."
        />
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
    <View style={styles.home}>
      <Image
        style = {styles.img3}
        source = {require('../images/crayon-892.png')}
        />
    </View>
    </View>
  );
}
