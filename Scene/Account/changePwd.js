import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class ChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      op:'',
      np:'',
      confirm:'',
    }
  }
  sendRequest() {
    let s = this.state;
    if (s.np != s.confirm) {
      Alert.alert('两次输入的密码不一致')
      return false;
    }
    let url = 'http://'
    + this.context.url
    +'/aicare-business-api/business/user/password?'
    +'oldPassword=' + s.op
    +'&newPassword=' +s.np
    console.log(url);
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      'sso-auth-token': this.context.token,
      'sso-refresh-token': this.context.refresh_token,
      }
    })
    .then((response) => response.json())
    .then((json) =>  {
        if (json.code === 0) {
          console.log("success");
          Alert.alert("修改成功");
        } else {
          Alert.alert("Unknown Error");
          console.log(json)
          return false;
        }
    })
  }
  render() {
    return (
    <SafeAreaView style={{ flex:1, alignItems: "center" ,backgroundColor:'white'}}>
        <View style={{alignItems: "flex-start",width:'85%' }}>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_pswd.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('oldPassword')}</Text>
        </View>
        <TextInput
        style={styles.resumeInput}
        placeholder= {I18n.t('passwordInput')}
        value={this.state.op}
        onChangeText={(text) => {this.setState({op:text})}}
        />
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_pswd.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('newPassword')}</Text>
        </View>
        <TextInput
        style={styles.resumeInput}
        placeholder= {I18n.t('passwordInput')}
        value={this.state.np}
        onChangeText={(text) => {this.setState({np:text})}}/>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_confirm.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('confirm')}</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= {I18n.t('passwordInput2')}
        value={this.state.confirm}
        onChangeText={(text) => {this.setState({confirm:text})}}/>
        <TouchableOpacity style={styles.resumeButton} onPress={() => {this.sendRequest()}}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirmation')}</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );}
}
ChangePwd.contextType = DataContext;
