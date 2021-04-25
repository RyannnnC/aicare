import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DataContext from "../../providerContext";

export default function HealthMain() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;

  return (
    <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40, backgroundColor:'white'}}>

      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <View style={{marginTop:30,marginLeft:30, marginRight:30}}>
          <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{month}月{date}日，</Text>
          <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您今日有7项行程待完成</Text>
        </View>
        <Image
          style = {styles.mainImg}
          source = {require('../../images/crayon-1317.png')}
        />
      </View>
    <View>
      <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>待接订单</Text>
    </View>

    <View style={styles.card2}>
      <View style={{width:'80%',marginLeft:'10%'}}>
      <TouchableOpacity style={{flexDirection: 'row', marginTop:16, marginBottom:16}}>
        <Image
          style = {{width:40,height:40,marginRight:15}}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View>
          <Text style={{marginTop:4,fontSize:16, color:'#333333', fontWeight: '500'}}>林女士</Text>
          <Text style={{marginTop:1,fontSize:12, color:'#666666', fontWeight: '400'}}>041234567</Text>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row',paddingBottom: 10}}>
        <Image
          style = {{width: 15, height:15 , marginRight:5}}
          source = {require('../../images/providerImg/schedule_icon_time.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>12/27 17：00-18：00</Text>
        <Image
          style = {{width: 15, height:15,marginLeft:40, marginRight:5}}
          source = {require('../../images/providerImg/schedule_icon_type.png')}
        />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>全科问诊</Text>
      </View>
      <View style={{flexDirection: 'row',paddingBottom: 12, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
        <Image
          style = {{width: 15, height:15 , marginRight:5}}
          source = {require('../../images/providerImg/schedule_icon_person.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>李医生</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            style = {{width: 15, height:15,marginLeft:100, marginRight:5}}
            source = {require('../../images/providerImg/account_icon_video.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>远程医疗</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row-reverse'}}>
        <TouchableOpacity style={{
          width: 'auto',
          height: 30,
          backgroundColor: '#68B0AB',
          borderRadius: 10,
          textAlign: 'center',
          marginTop: 15,
          justifyContent: "center",
          alignItems: "center" ,
          paddingLeft:15,
          paddingRight:15,
        }} onPress={() => {Alert.alert('请移步到订单完成操作') }}>
          <Text style={{fontSize:14, color:'#FAFAFA'}}>接受</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: 'auto',
          height: 30,
          backgroundColor: '#FF7E67',
          borderRadius: 10,
          textAlign: 'center',
          marginRight: 25,
          marginTop: 15,
          justifyContent: "center",
          alignItems: "center" ,
          paddingLeft:15,
          paddingRight:15,
        }} onPress={() => {Alert.alert('请移步到订单完成操作')  }}>
          <Text style={{fontSize:14, color:'#FAFAFA'}}>修改</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>

      <View>
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
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>+61 412345678</Text>
      </View>
    </View>
    </View>
  );
}
HealthMain.contextType = DataContext;
