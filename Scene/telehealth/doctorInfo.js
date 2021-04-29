import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import moment from 'moment';

export default class DoctorInfo extends Component {
    constructor(props) {
      super(props);
      this.state={
        name:'',
        schedulevos:[],
        class:[],
        type:[],
        charging:[],
        languages:[],
      }
    }

  componentDidMount(){
    let url = 'http://3.104.87.14:8084/aicare-business-api/business/employer/list'
    +'?employerId=' + this.props.route.params.id;
      fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      }})
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          console.log(json.msg);
          this.setState({
            name:json.employerInfo.name,
            class:json.employerInfo.serviceClassList,
            type:json.employerInfo.serviceTypeList,
            schedulevos:json.employerInfo.employerSchedulevos,
            languages:json.employerInfo.languages,
          })
          console.log(this.state);
        } else {
          console.log(json.msg)
        }
      }).catch(error => console.warn(error));
  }

  render() {
    let times = this.state.schedulevos.map((item) => {
      return (
        <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>{item.dayOfWeekStr}</Text>
          <Text style={{ marginLeft:5,fontSize:14, fontWeight: '300' }}>{moment(item.startTime).format('LT')}-{moment(item.endTime).format('LT')}</Text>
        </View>
      )
    })
    let languages = this.state.languages.map((item) => {
      return (
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>{item.name}</Text>
        </TouchableOpacity>
      )
    })
    let classes = this.state.class.map((item) => {
      return (
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>{item.name}</Text>
        </TouchableOpacity>
      )
    })
    let types = this.state.type.map((item) => {
      return (
        <View style={{marginTop:5,marginBottom:5}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>{item.name}</Text>
        </View>
      )
    })
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <ScrollView style={{ flex: 1,width:'85%' }}>
        <View style={{ width:'90%',flex:1, justifyContent: "center", alignItems: "center",marginTop:10,zIndex: 1,}}>
          <Image style={{width:80,height:80}}
            source = {require('../../images/providerImg/service_doctor_img1.png')}
          />
        </View>
        <View style={{marginTop:-50,width:'90%',height:200,justifyContent: "center",alignItems: "center",marginBottom:18,backgroundColor:'#ECF4F3'}}>
          <Text style={{ fontSize:18, fontWeight: '600',marginTop:10 }}>{this.state.name}</Text>
          <Text style={{ fontSize:12, fontWeight: '400' }}>全科医生 - 9年工作经验</Text>
          <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={styles.infoButton2}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton1}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>删除人员</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>医生简介</Text>
        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start'}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>李医生拥有新南威尔士大学临床医学硕士学位，已在Kingsford Hospital拥有5年工作经验，精通于临床诊断。</Text>
        </View>

        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务语言</Text>
        </View>
        <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
          {languages}
        </View>
        <View style={{marginTop:15,marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务时间</Text>
        </View>
          {times}
        <View style={{marginTop:15,marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务种类</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          {classes}
        </View>
        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务类型</Text>
        </View>
          {types}
        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>收费方式</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:15,height:15,marginBottom:10}}
            source = {require('../../images/providerImg/account_icon_billing.png')}
          />
          <Text style={{ marginLeft:5,fontSize:14, fontWeight: '300',marginBottom:10 }}>支持bulk billing</Text>
        </View>
        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>资格证书</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>GACCP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>SPA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );}
}
DoctorInfo.contextType = DataContext;
