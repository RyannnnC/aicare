import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';

export default class DoctorInfo extends Component {
    constructor(props) {
      super(props);
      this.state={
        name:'',
        schedulevos:[],
        class:[],
        type:[],
        charging:[],
      }
    }

  componentDidMount(){
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/employer/list'
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
          })
          console.log(this.state);
        } else {
          console.log(json.msg)
        }
      }).catch(error => console.warn(error));
  }

  render() {
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
        <View style={{ marginTop:10,justifyContent: "center",alignItems: "center",marginBottom:18 }}>
          <Image style={styles.resumeImg}
            source = {require('../../images/providerImg/service_doctor_img1.png')}
          />
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
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>中文</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>英语</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginTop:15,marginBottom:15}}>
        <Text style={{ fontSize:18, fontWeight: '500' }}>服务时间</Text>
        </View>
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:10 }}>周一 8：00-19：00</Text>
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:10 }}>周三 8：00-19：00</Text>
        <Text style={{ fontSize:14, fontWeight: '300' ,marginBottom:10}}>周五 8：00-19：00</Text>
        <Text style={{ fontSize:14, fontWeight: '300' ,marginBottom:10}}>周六 8：00-19：00</Text>

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
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:10 }}>支持bulk billing</Text>
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
