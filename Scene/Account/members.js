import React ,{Component}from 'react';
import { Alert,Text, View, ImageBackground,Image,SafeAreaView,ScrollView,TouchableOpacity,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import moment from 'moment-timezone';

export default class Members extends Component {
    constructor(props) {
      super(props);
      this.state={
        buttons: [],
        doctors:[],
        isLoading:true,
      };
    }

  componentDidMount() {
    this.setState({isLoading:true})
    this._unsubscribe = this.props.navigation.addListener('focus', () => {this.getData()});
  }

  getData() {
    let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/orginfo/employerlist';
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
        },
        body: JSON.stringify({})
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({isLoading:false})
        if (json.code === 0) {
          console.log(json.msg);
          this.context.action.changedoctors(json.page.list)
        } else {
          console.log(json.msg)
        }
      }).catch(error => console.warn(error));
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
                Alert.alert('Delete Success');
                this.getData();
              } else {
                console.log(json.msg);
                Alert.alert('Delete Failed');
              }
            }).catch(error => console.warn(error));}},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }

  render () {
    let docs = [];
    if (this.context.doctors.length >0) {
    docs = this.context.doctors.map((item) => {
      return (
        <View key={item.id} style={{borderColor:'#EEEEEE',borderTopWidth:1,flexDirection:'row',width:'100%',height:50,backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:'20%',paddingLeft:'1%'}}>
            {item.personalProfile == null?
            <Image
              style = {{width:20,height:20,marginRight:5}}
              source = {require('../../images/providerImg/Gender-2.png')}
            />
            :
            <Image
              style = {{width:20,height:20,marginRight:5,borderRadius:5}}
              source = {{ uri: item.personalProfile }}
            />
            }
            <Text style={{fontWeight: '400'}}>{item.name}</Text>
          </TouchableOpacity>
          <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
            <Text style={{fontWeight: '400'}}>{item.serviceClassName}</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',width:'30%'}}>
            <Text style={{fontWeight: '400'}}>{item.workLong} years working experience</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
            <Text style={{fontWeight: '400'}}>{item.mobile}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'20%'}}>
            <TouchableOpacity style={{marginRight:3,padding:2,borderWidth:1,borderRadius:5,borderColor:'rgb(33,192,196)'}}
            onPress={() => {
              this.props.navigation.navigate(I18n.t('uploadMember'),{id:item.employerId})
            }}>
              <Text style={{color:'rgb(33,192,196)'}}>{I18n.t('modify')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:2,borderWidth:1,borderRadius:5,borderColor:'rgb(33,192,196)'}} onPress={() => {this.deleteDoctor(item.employerId)}}>
              <Text style={{color:'rgb(33,192,196)'}}>{I18n.t('delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })}
    if (this.state.isLoading){
      return(
        <View style={{ flex: 1, backgroundColor:'rgb(51,51,51)', justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="white"  />
        </View>
    )
    }else {
    return (
      <SafeAreaView style={{ flex:1,alignItems: "center",backgroundColor:'rgb(51,51,51)' }}>
        <View style={{flex:1,width:'90%',backgroundColor:'white',alignItems: "center"}}>

        <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',marginTop:30,marginBottom:6}}>
          <Text style={{ color: 'rgb(33,192,196)', fontSize: 22, fontWeight: '500'}}>{I18n.t('myMember')}</Text>
          <TouchableOpacity style={{flexDirection:'row'}} onPress={() => this.props.navigation.navigate(I18n.t('uploadMember'))}>
            <Image
              style = {{width:20,height:20}}
              source = {require('../../images/providerImg/account_icon_add_green.png')}
            />
            <Text style={{ fontSize: 18, fontWeight: '400'}}>{I18n.t('addMember')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{width:'90%', flex: 1}} contentContainerStyle={{alignItems:'center'}}>
          {this.context.doctors.length >0 ? docs :
          <View>
            <Image
              style = {{width:350,height:350}}
              source = {require('../../images/providerImg/splash_img3.png')}
            />
            <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>{I18n.t('noMember')}</Text>
          </View>
          }
        </ScrollView>
        </View>
      </SafeAreaView>
    )
  }}
}
Members.contextType = DataContext;
