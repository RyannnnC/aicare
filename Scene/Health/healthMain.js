import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {data} from '../Orders/data'


export default function HealthMain() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;

  return (
    <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40, backgroundColor:'white'}}>
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <View style={{marginLeft:30, marginRight:30}}>
          <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{month}月{date}日，</Text>
          <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您今日有{data.length}项行程待完成</Text>
        </View>
        <Image
          style = {styles.mainImg}
          source = {require('../../images/crayon-1317.png')}
        />
      </View>
    <View style={{alignItems: "left" }}>
      <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>代接订单</Text>
    </View>

    <View style={styles.card2}>
      <View style={{flexDirection: 'row', marginTop:16, marginBottom:16, marginLeft:25}}>
      <Image
        style = {styles.pendingImg}
        source = {require('../../images/providerImg/home_img_person.png')}
      />
      <View>
        <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>林女士</Text>
        <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>+61 0403555435</Text>
      </View>
      </View>
      <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
        <Image
          style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
          source = {require('../../images/providerImg/order_icon_time.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>12/27 17：00-18：00</Text>
        <Image
          style = {{width: 15, height:15,marginLeft:75, marginRight:5}}
          source = {require('../../images/providerImg/home_icon_location.png')}
        />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>实地预约</Text>
      </View>
      <View style={{flexDirection: 'row-reverse'}}>
        <TouchableOpacity style={styles.orderButton2} >
          <Text style={{fontSize:14, color:'#FAFAFA'}}>接受</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={{fontSize:14, color:'#FAFAFA'}}>修改</Text>
        </TouchableOpacity>
      </View>
    </View>


      <View style={{alignItems: "left" }}>
        <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>当日订单</Text>
      </View>
    <View style={styles.card}>
      <View style={{flexDirection: 'row', borderBottomColor:'#EEEEEE',borderBottomWidth:1, marginTop:21, paddingBottom:10}}>
        <View style={{marginLeft:20 }}>
          <Text style={{ color: '#333333', fontSize: 16, fontWeight: '600', marginBottom:5}}>14：00-15：00</Text>
          <Text style={{ color: '#333333', fontSize: 14, fontWeight: '300'}}>您有一项实地预约</Text>
        </View>
      <Image
        style = {styles.img3}
        source = {require('../../images/crayon-892.png')}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop:10}}>
        <Image
          style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
          source = {require('../../images/providerImg/home_icon_user.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>罗女士</Text>
        <Image
          style = {{width: 15, height:15 , marginLeft:100, marginRight:5}}
          source = {require('../../images/providerImg/home_icon_mobile.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>+61 403555435</Text>
      </View>
    </View>
    </View>
  );
}
