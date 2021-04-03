import React,{Component} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
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
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = 'http://3.104.232.106:8084/aicare-business-api/business/orginfo/list';
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
            console.log(json);
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
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
    });
  }

  render() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'white' }}>
      <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
        <Image
          style = {styles.personIcon}
          source = {{uri:this.context.image}}
        />
        <View>
        <Text style={{ fontSize:20, fontWeight: '600' }}>{this.context.name}</Text>
        <Text style={{ fontSize:14, fontWeight: '300' }}>{this.context.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('机构信息')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_medical.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('orginfo')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('成员管理')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/singup_icon_name.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('members')}</Text>
      </TouchableOpacity>
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
  );}
}
HealthAccountMain.contextType = DataContext;
