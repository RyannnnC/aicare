import React ,{Component}from 'react';
import { Platform, KeyboardAvoidingView,Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
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
    code:"",
    type:"",
    checked1: false,
    checked2: true,
  }
  sendRequest() {
    if (this.state.confirm != this.state.password) {
      Alert.alert("两次密码必须相同")
    } else {
    let s = this.state;
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/register?'
      +'username='+ s.name
      +'&password=' + s.password
      +'&email=' + s.mail
      +'&mobile=' + s.phone
      +'&code=' + s.code
      +'&clientType=3'
      +'&appType=1'
      +'&type=' + s.type;
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
        this.props.navigation.navigate('验证');
      });}
  //  .then(json => {console.log(json)});
  }
  sendCode() {
    if (this.state.checked1) {
      let p = this.state.phone;
      let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/send?'
      +'mobile=' + p
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
        this.setState({type: 'mobile'});
        console.log(json.msg);
      });
    } else {
      let m = this.state.mail;
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
        this.setState({ type: 'email'});
        console.log(json.msg);
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView style={{flex:1}}>
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
          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
          </TouchableOpacity>
          </ScrollView>
      </KeyboardAvoidingView>
  );}
}
