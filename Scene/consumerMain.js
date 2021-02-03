
import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
import {styles} from '../style';
import {data} from './order/data';
 
//call(args).catch(console.error)
export default function ProviderMain({navigation}) {
    const alertHandler= () => {
      Alert.alert('function unimplemented')
    }
    const goToOrder= () => {
        navigation.navigate("consumerOrder")
    }
    
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40,backgroundColor:"white"}}>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <View style={{marginLeft:30, marginRight:30}}>
            <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{month}月{date}日，</Text>
            <Text>您今日有{data.length}项行程待完成</Text>
          </View>
          <Image
            style = {styles.mainImg}
            source = {require('../images/crayon-1317.png')}
          />
        </View>
      <View style={{textAlign: "left" }}>
        <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>服务</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={goToOrder}>
          <Image
          style = {{width:100,height:100}}
          source = {require('../images/service.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer2} onPress={alertHandler}>
          <Image
          style = {{width:95,height:95}}
          source = {require('../images/medicare.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer3} onPress={alertHandler}>
          <Image
          style = {{width:97,height:97}}
          source = {require('../images/delivery.png')}
          />
        </TouchableOpacity>
      </View>
        <View style={{textAlign: "left" }}>
          <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500',marginBottom:8}}>行程</Text>
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
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>今日 14：00-17：00</Text>
        </View>
      </View>
      </View>
    );
  }