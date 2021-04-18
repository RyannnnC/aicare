import React,{Component} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ActivityIndicator  } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from "../../providerContext";
import I18n from '../switchLanguage';

export default class HealthAccountMain extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      email:'',
      isLoading:true,
    }
  }
  startAlert(){
    Alert.alert(
      '提醒',
      '您确定要退出登录吗？',
      [
        {text: '确定', onPress: () => {
                this.context.action.clearstate();}},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }

  componentDidMount() {
    this.setState({isLoading:true})
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.context.employerId == null) {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/orginfo/list';
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
            this.setState({ isLoading: false });
            if (json.code === 0) {
              console.log(json);
              if(json.orginfo.name!=null){
                this.context.action.changeimg(json.orginfo.orgImg);
                this.context.action.changename(json.orginfo.name);
                this.context.action.changeemail(json.orginfo.email);
                this.context.action.changephone(json.orginfo.mobile);
                this.context.action.changestreet(json.orginfo.address);
                this.context.action.changepostcode(json.orginfo.postalCode);
                this.context.action.changeintro(json.orginfo.introduce);
                this.context.action.changestate(json.orginfo.city);
                this.context.action.changelanguage(json.orginfo.languages);
                this.context.action.changeserviceclass(json.orginfo.serviceClassList);
                this.context.action.changetime(json.orginfo.orgschedulevos);
                this.context.action.changetypelist(json.orginfo.serviceTypeList);
              }
              console.log(json.orginfo.orgschedulevos);
            } else {
              console.log(json.msg)
            }
          }).catch(error => console.warn(error));
      } else {
        let url = 'http://'
        +this.context.url
        +'/aicare-business-api/business/employer/list'
        +'?employerId=' + this.context.employerId;
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
          this.setState({ isLoading: false });
          if (json.code === 0) {
            console.log(json);
            if(json.employerInfo.name!=null){
              this.context.action.changeimg(json.employerInfo.imgUrl);
              this.context.action.changename(json.employerInfo.name);
              this.context.action.changeemail(json.employerInfo.email);
              this.context.action.changephone(json.employerInfo.mobile);
              this.context.action.changeintro(json.employerInfo.introduce);
              this.context.action.changestate(json.employerInfo.city);
              this.context.action.changelanguage(json.employerInfo.languages);
              this.context.action.changeserviceclass(json.employerInfo.serviceClassList);
              this.context.action.changetime(json.employerInfo.employerSchedulevos);
              this.context.action.changetypelist(json.employerInfo.serviceTypeList);
            }
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
      }
    });
  }

  render() {
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
    }else {
      return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'white' }}>
      {this.context.image ?
      <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
      <Image
        style = {{height:60,width:60,borderRadius:30, marginRight:25}}
        source = {{uri:this.context.image}}
      />
      <View>
        <Text style={{ fontSize:20, fontWeight: '600' }}>{this.context.name}</Text>
        <Text style={{ fontSize:14, fontWeight: '300' }}>{this.context.email}</Text>
      </View>
      </View>
      :
      <View>
        <Text>您的诊所还未添加资料，请添加资料！</Text>
      </View>
      }

      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('机构信息')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_medical.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('orginfo')}</Text>
      </TouchableOpacity>
      {this.context.employerId == null &&
        <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('成员管理')}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('members')}</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('修改密码')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/signup_icon_pswd.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('resetPassword')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('我的设置')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_setting.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('settings')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.profileBar}
      onPress={() => {this.startAlert()}}
      >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_logout.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('logout')}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: "center" }}>
        <Image
          source={require('../../images/logo.png')}
          style = {{width:85, height:30}}
        />
        <Text style={{fontSize:12, color:'#68B0AB'}}>+61 0403555432</Text>
       </View>
    </View>
  );}}
}
HealthAccountMain.contextType = DataContext;
