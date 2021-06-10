import React ,{Component}from 'react';
import { Text, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import I18n from '../switchLanguage';

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
        introduce:'',
        isLoading:true,
        imgUrl:null,
        video:[],
      }
    }

  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.setState({isLoading:true})
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/employer/list'
    +'?employerId=' + this.props.route.params.id;
      fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'sso-refresh-token': this.context.refresh_token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      }})
      .then((response) => response.json())
      .then((json) => {
        this.setState({isLoading:false})
        if (json.code === 0) {
          console.log(json.msg);
          this.setState({
            name:json.employerInfo.name,
            phone:json.employerInfo.mobile,
            class:json.employerInfo.serviceClassList,
            type:json.employerInfo.serviceTypeList,
            introduce:json.employerInfo.introduce,
            schedulevos:json.employerInfo.employerSchedulevos,
            languages:json.employerInfo.languages,
            imgUrl:json.employerInfo.imgUrl,
            video:json.employerInfo.videoChannel,
          })
          this.context.action.changemlan(json.employerInfo.languages)
          this.context.action.changedimg(json.employerInfo.imgUrl)
          console.log(this.state);
        } else {
          console.log(json.msg)
        }
      }).catch(error => console.warn(error));
    })
  }

  deleteDoctor(id) {
    Alert.alert(
      '提醒',
      '您确定要删除这位成员吗？',
      [
        {text: '确定', onPress: () => {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/employer/delete'
          + '?employerId=' + id;
            fetch(url,{
              method: 'POST',
              mode: 'cors',
              credentials: 'include',
              headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
              'sso-auth-token': this.context.token,
              'sso-refresh-token': this.context.refresh_token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code === 0) {
                console.log(json.msg);
                Alert.alert('删除成功');
                this.props.navigation.pop();
              } else {
                console.log(json.msg);
                Alert.alert('删除失败');
              }
            }).catch(error => console.warn(error));}},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }

  render() {
    let times = this.state.schedulevos.map((item) => {
      if(item.status == 1){
        let t1 = moment(item.startTime).tz(Localization.timezone).format('LT')
        let t2 = moment(item.endTime).tz(Localization.timezone).format('LT');
      return (
        <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>{item.dayOfWeekStr}</Text>
          <Text style={{ marginLeft:5,fontSize:14, fontWeight: '300' }}>{t1}-{t2}</Text>
        </View>
      )
    }})
    console.log(times)
    let languages = this.state.languages.map((item) => {
      return (
        <View key={item.value}>
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>{item.name}</Text>
        </TouchableOpacity>
        </View>
      )
    })
    let classes = this.state.class.map((item) => {
      return (
        <View key={item.value}>
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>{item.name}</Text>
        </TouchableOpacity>
        </View>
      )
    })
    let types = this.state.type.map((item) => {
      if(item.status == 1){
      return (
        <View style={{marginTop:5,marginBottom:5}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>{item.name}</Text>
        </View>
      )}
    })
    let videos = this.state.video.map((item) => {
      if(item.status == 1){
      return (
        <View style={{marginTop:5,marginBottom:5}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>{item.channel}</Text>
        </View>
      )}
    })
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <ScrollView style={{ flex: 1,width:'85%' }}>
        <View style={{ width:'100%',flex:1, justifyContent: "center", alignItems: "center",marginTop:10,zIndex: 1,}}>
          <Image style={{width:80,height:80,borderRadius:40}}
            source = {this.state.imgUrl?{uri:this.state.imgUrl}:require('../../images/providerImg/service_doctor_img1.png')}
          />
        </View>
        <View style={{borderRadius:15,marginTop:-50,width:'100%',height:180,justifyContent: "center",alignItems: "center",marginBottom:18,backgroundColor:'#ECF4F3'}}>
          <Text style={{ fontSize:18, fontWeight: '600',marginTop:10 }}>{this.state.name}</Text>
          <Text style={{ fontSize:12, fontWeight: '400' }}>全科医生 - 9年工作经验</Text>
          <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={styles.infoButton2} onPress={() => this.props.navigation.navigate(I18n.t('uploadMember'), {id: this.props.route.params.id})}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>{I18n.t('editInformation')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton1} onPress={() => {this.deleteDoctor(this.props.route.params.id)}}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>{I18n.t('deleteMember')}</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('doctorIntro')}</Text>
        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start'}}>
        {this.state.introduce ?
        <Text>{this.state.introduce}</Text>
        :
        <Text>{I18n.t('nodoctorIntro')}</Text>}
        </View>

        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('serviceLanguage')}</Text>
        </View>
        <View style={{flexWrap: 'wrap',flexDirection: 'row' , marginTop:10, marginBottom:10}}>
        {this.state.languages.length>0 ?
        languages
        :
        <Text>{I18n.t('noserviceLanguage')}</Text>}
        </View>
        <View style={{marginTop:15,marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('serviceHours')}</Text>
        </View>
        {times.length>0 ?
        times
        :
        <Text>{I18n.t('noserviceHours')}</Text>}
        <View style={{marginTop:15,marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('serviceClass')}</Text>
        </View>
        <View style={{flexWrap: 'wrap',flexDirection: 'row', marginTop:10, marginBottom:10}}>
        {this.state.class.length>0 ?
        classes
        :
        <Text>{I18n.t('serviceClass')}</Text>}
        </View>
        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('serviceType')}</Text>
        </View>
        {this.state.type.length>0 ?
        types
        :
        <Text>{I18n.t('noserviceType')}</Text>}
        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('telehealthMethod')}</Text>
        </View>
        {this.state.video.length>0 ?
        videos
        :
        <Text>{I18n.t('notelehealthMethod')}</Text>}
        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('chargingMethod')}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:15,height:15,marginBottom:10}}
            source = {require('../../images/providerImg/account_icon_billing.png')}
          />
          <Text style={{ marginLeft:5,fontSize:14, fontWeight: '300',marginBottom:10 }}>{I18n.t('bulkBilling')}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );}}
}
DoctorInfo.contextType = DataContext;
