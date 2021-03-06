import React ,{Component}from 'react';
import { Platform,KeyboardAvoidingView,Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from './providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

export default class Forget extends Component {
  state = {
    info:"",
    password:"",
    confirm: "",
    code:"",
    mobile:true,
    email:false,
  }
  sendRequest() {
    let s = this.state;
    if (this.state.confirm != this.state.password) {
      Alert.alert("两次密码必须相同")
    } else {
      if (this.state.email) {
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/updatepassword?'
    +'email='+ s.info
    +'&code=' + s.code
    +'&type=email'
    +'&appType=1'
    +'&clientType=3'
    +'&password=' + s.password;
    console.log(url);
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) =>  {
        if (json.code === 0) {
          console.log("success");
          Alert.alert("修改成功");
          this.props.navigation.navigate('登陆');
        } else {
          Alert.alert("Unknown Error");
          return false;
        }
    })} else {
      let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/updatepassword?'
      +'mobile='+ s.info
      +'&code=' + s.code
      +'&type=mobile'
      +'&appType=1'
      +'&clientType=3'
      +'&password=' + s.password;
      console.log(url);
      fetch(url,{
        method: 'POST',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) =>  {
          if (json.code === 0) {
            console.log("success");
            Alert.alert("修改成功");
            this.props.navigation.navigate('登陆');
          } else {
            Alert.alert("Unknown Error");
            return false;
          }
      })
    }}
  }
  sendCode() {
    if (this.state.email) {
    let m = this.state.info;
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/send?'
    +'email=' + m
    +'&type=email';
    console.log(url);
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.msg);
    });} else {
      let m = this.state.info;
      let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/send?'
      +'mobile=' + m
      +'&type=mobile';
      console.log(url);
      fetch(url,{
        method: 'POST',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.msg);
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
      style={{ flex:1 ,justifyContent: "center",backgroundColor:'white'}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={{flex:1, marginLeft:50}}>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_link.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>绑定方式</Text>
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <CheckBox
              center
              title='电话          '
              iconRight
              checkedIcon='check-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='red'
              checked={this.state.mobile}
              onPress={() => {
                console.log("电话");
                this.setState({
                mobile: true,
                email: false,
              })}}
             />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <CheckBox
              center
              title='邮箱          '
              iconRight
              checkedIcon='check-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='red'
              checked={this.state.email}
              onPress={() => {
                console.log("switch to mail");
                this.setState({
                  mobile: false,
                  email: true,
              })}}
             />
          </View>

          <View style={{height:30,borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginBottom:10}}>
            <TextInput style={styles.resumeInput}
            placeholder= "请输入您的邮箱或手机"
            onChangeText={(text) => {this.setState({ info: text})}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
            <TextInput style={styles.resumeInput3}
            placeholder= "请输入您收到的验证码"
            onChangeText={(text) => {this.setState({ code: text})}}
            />
            </View>
            <TouchableOpacity style={styles.codeTab}
              onPress={()=>this.sendCode()}
            >
              <Text style={{ fontSize:14, fontWeight: '300' }}>获取验证码</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/login_icon_pswd.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>密码</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的密码"
          onChangeText={(text) => {this.setState({ password: text})}}
          />
          </View>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/account_icon_confirm.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>确认新密码</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请再次输入您的密码"
          onChangeText={(text) => {this.setState({ confirm: text})}}
          />
          </View>
          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  );}
}
