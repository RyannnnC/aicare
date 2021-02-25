import React ,{Component}from 'react';
import { Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from './providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

export default class Signup extends Component {
  state = {
    name:"",
    phone:"",
    mail:"",
    password:"",
    confirm: "",
    userCode:"",
    mailCode:"",
    checked1: false,
    checked2: true,
  }
  sendRequest() {
    let s = this.state;
    if (s.userCode === s.mailCode) {
      let url = 'http://3.25.192.210:8080/aicaredb/register/provider?'
      +'name='+ s.name
      +'&phone=' + s.phone
      +'&email=' + s.mail
      +'&password=' + s.password;
      fetch(url,{
        method: 'POST',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        console.log(response.status);
        this.props.navigation.navigate('验证');
      })
    } else {
      Alert.alert("验证码错误，请重新输入");
      alert("验证码错误，请重新输入");
    }

  //  .then(json => {console.log(json)});
  }
  sendCode() {
    if (this.state.checked1) {
      let p = this.state.phone;
      let url = 'http://3.25.192.210:8080/aicare-vc/sms?'
      +'&phone=' + p
      console.log(url);
      fetch(url,{
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({mailCode: json.code});
        console.log(json.code);
      });
    } else {
      let m = this.state.mail;
      let url = 'http://3.25.192.210:8080/aicare-vc/smtp?'
      +'&mail-address=' + m
      console.log(url);
      fetch(url,{
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ mailCode: json.code});
        console.log(json.code);
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}>
          <View style={{alignItems: "Left" }}>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>姓名</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的名字"
          onChangeText={(text) => {this.setState({ name: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_phone.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>电话</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的联系方式"
          onChangeText={(text) => {this.setState({ phone: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_mail.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>邮箱</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的邮箱"
          onChangeText={(text) => {this.setState({ mail: text})}}
          />
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
            <Text style={{ fontSize:18, fontWeight: '500' }}>确认</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请再次输入您的密码"
          onChangeText={(text) => {this.setState({ confirm: text})}}
          />
          </View>

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
              size={this.state.size}
              checked={this.state.checked1}
              onPress={() => {
                console.log("电话");
                this.setState({
                checked1: true,
                checked2: false,
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
              size={this.state.size}
              checked={this.state.checked2}
              onPress={() => {
                console.log("switch to mail");
                this.setState({
                checked1: false,
                checked2: true,
              })}}
             />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
            <TextInput style={styles.resumeInput}
            placeholder= "请输入您收到的验证码"
            onChangeText={(text) => {this.setState({ userCode: text})}}
            />
            </View>
            <TouchableOpacity style={styles.codeTab}
              onPress={()=>this.sendCode()}
            >
              <Text style={{ fontSize:14, fontWeight: '300' }}>获取验证码</Text>
            </TouchableOpacity>
          </View>

          </View>
          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
          </TouchableOpacity>
      </SafeAreaView>
  );}
}
