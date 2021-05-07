import React ,{Component} from 'react';
import { SafeAreaView,ScrollView,Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DataContext from "../../providerContext";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment-timezone';
import I18n from '../switchLanguage';

export default class HealthMain extends Component {
  alertHandler= () => {
    Alert.alert('function unimplemented')
  }


  render () {
  var date = moment(new Date()).format('LL');
  return (
    <SafeAreaView>
    <LinearGradient
    colors={['rgba(250,250,247,0.0)', '#ecf4f3']}
    style={{width:'100%',height:'100%', justifyContent: "center", alignItems: "center"}}>
    <ScrollView style={{ flex:1}}>
      <View style={{ justifyContent: "center", alignItems: "center"}}>
      <View style={{flex:1,marginTop:40,flexDirection: 'row', marginBottom: 15}}>
        <View style={{flex:1,width:200,marginTop:30,marginLeft:30, marginRight:20}}>
          <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{date}</Text>
          <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>{I18n.t('numOrder',{num:7})}</Text>
        </View>
        <Image
          style = {styles.mainImg}
          source = {require('../../images/crayon-1317.png')}
        />
      </View>
    <View>
      <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>{I18n.t('pOrder')}</Text>
    </View>

    <TouchableOpacity style={styles.card2} onPress = {() => this.props.navigation.navigate('预约')}>
      <View style={{width:'80%',marginLeft:'10%'}}>
      <View style={{flexDirection: 'row', marginTop:16, marginBottom:16}}>
        <Image
          style = {{width:40,height:40,marginRight:15}}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View>
          <Text style={{marginTop:4,fontSize:16, color:'#333333', fontWeight: '500'}}>林女士</Text>
          <Text style={{marginTop:1,fontSize:12, color:'#666666', fontWeight: '400'}}>041234567</Text>
        </View>
      </View>
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
    </TouchableOpacity>

      <View>
        <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>{I18n.t('todayOrder')}</Text>
      </View>
    <TouchableOpacity style={styles.card} onPress = {() => this.props.navigation.navigate('预约')}>
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
    </TouchableOpacity>
    </View>
    </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );}
}
HealthMain.contextType = DataContext;
