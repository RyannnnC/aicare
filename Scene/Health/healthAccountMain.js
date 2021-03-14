import React,{Component} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from "../../providerContext";

export default class HealthAccountMain extends Component {
  constructor(props) {
    super(props);
  }
  startAlert(){
    Alert.alert(
      '提醒',
      '您确定要退出登录吗？',
      [
        {text: '确定', onPress: () => {
                this.context.action.changeLogin(false);
                this.context.action.changetoken(null);
                this.context.action.changedoctors(null);}},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }

  render() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'white' }}>
      <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
        <Image
          style = {styles.personIcon}
          source = {require('../../images/providerImg/account_img_org.png')}
        />
        <View>
        <Text style={{ fontSize:20, fontWeight: '600' }}>Kingsford Clinic</Text>
        <Text style={{ fontSize:14, fontWeight: '300' }}>657416708xy@gmail.com</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('机构信息')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_medical.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>机构信息</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('成员管理')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/singup_icon_name.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>成员管理</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('修改密码')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/signup_icon_pswd.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>修改密码</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate('我的设置')}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_setting.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>我的设置</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.profileBar}
      onPress={() => {this.startAlert()}}
      >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_logout.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>退出登录</Text>
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
