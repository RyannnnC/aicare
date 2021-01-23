import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from './providerStyle';
import {data} from './Orders/data'


export default function ProviderMain() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;

  return (
    <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40}}>
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <View style={{marginLeft:30, marginRight:30}}>
          <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{month}月{date}日，</Text>
          <Text>您今日有{data.length}项工作待完成</Text>
        </View>
        <Image
          style = {styles.mainImg}
          source = {require('../images/crayon-1317.png')}
        />
      </View>
    <View style={styles.searchBar}>
      <SearchBar
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
        inputContainerStyle={{backgroundColor: 'white'}}
        placeholder="搜服务/订单..."
        />
    </View>
    <View style={{textAlign: "left" }}>
      <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>当月数据</Text>
    </View>
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
      <View style={{textAlign: "left" }}>
        <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>当日订单</Text>
      </View>
    <View style={styles.home}>
      <View style={{flexDirection: 'row', borderBottomColor:'#EEEEEE',borderBottomWidth:1, marginTop:21, paddingBottom:10}}>
        <View style={{marginLeft:20 }}>
          <Text style={{ color: '#333333', fontSize: 16, fontWeight: '500', marginBottom:5}}>罗女士</Text>
          <Text style={{ color: '#666666', fontSize: 12, fontWeight: '300'}}>1008A Mooltan avanue, Macquarie Park</Text>
        </View>
      <Image
        style = {styles.img3}
        source = {require('../images/crayon-892.png')}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop:10}}>
        <Image
          style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
          source = {require('../images/providerImg/order_icon_time.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>今日 14：00-17：00</Text>
      </View>
    </View>
    </View>
  );
}
