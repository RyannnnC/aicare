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
    <Text>您今日有2项工作待完成</Text>
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
      <Text>当月数据</Text>
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.buttonContainer} onPress={alertHandler}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>21</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>已完成</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2} onPress={alertHandler}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>7</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>待完成</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer3} onPress={alertHandler}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>$756</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>月收入</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.buttonText}>当日订单</Text>
    <View style={styles.home}>
      <Image
        style = {styles.img3}
        source = {require('../images/crayon-892.png')}
        />
    </View>
    </View>
  );
}
