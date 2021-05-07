import React ,{Component}from 'react';
import { Platform, KeyboardAvoidingView,Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from './providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import DataContext from "../providerContext";
import I18n from './switchLanguage';

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
    timer:null,
    counter:60,
  }
  sendRequest() {
    if (this.state.confirm != this.state.password) {
      Alert.alert("两次密码必须相同");
      return false;
    } else if(this.state.mail==''){
      Alert.alert('请输入一个邮箱')
    } else if(this.state.code==''){
      Alert.alert('请输入一个验证码')
    } else {
    let s = this.state;
    let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/user/register?'
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
        if (json.code == 0) {
          Alert.alert("注册成功");
        } else {
          Alert.alert('注册失败');
          return false;
        }
        console.log(json.msg);
        this.props.navigation.navigate(I18n.t('login'))
      });}
  //  .then(json => {console.log(json)});
  }
  sendCode() {
    this.setTimer();
    if (this.state.checked1) {
      let p = this.state.phone;
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/user/send?'
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
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/user/send?'
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

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  setTimer() {
    let timer = setInterval(this.tick.bind(this), 1000);
    this.setState({timer});
  }

  tick() {
    if (this.state.counter == 0) {
      clearInterval(this.state.timer);
      this.setState({
        counter: 60,
        timer:null
      });
    }else {
      this.setState({
        counter: this.state.counter - 1
      });
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView style={{flex:1}}>
          <View style={{width:'85%',flex:1}}>
          <View style={{marginTop:30, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('name')} *</Text>
          </View>
          <View>
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t('nameInput')}
          onChangeText={(text) => {this.setState({ name: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_phone.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('mobile')} *</Text>
          </View>
          <View>
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t('phoneInput')}
          onChangeText={(text) => {this.setState({ phone: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_mail.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('email')} *</Text>
          </View>
          <View >
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t('mailInput')}
          onChangeText={(text) => {this.setState({ mail: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/login_icon_pswd.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('password')} *</Text>
          </View>
          <View >
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t('passwordInput')}
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({ password: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/account_icon_confirm.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('confirm')} *</Text>
          </View>
          <View >
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t('passwordInput2')}
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({ confirm: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_link.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('binding')} *</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              center
              title={I18n.t('mobile')}
              iconRight
              checkedIcon='check-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='red'
              containerStyle={{borderWidth:0, backgroundColor:'white'}}
              size={this.state.size}
              checked={this.state.checked1}
              onPress={() => {
                this.setState({
                checked1: true,
                checked2: false,
              })}}
             />
          </View>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              center
              title={I18n.t('email')}
              iconRight
              checkedIcon='check-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='red'
              containerStyle={{borderWidth:0, backgroundColor:'white'}}
              size={this.state.size}
              checked={this.state.checked2}
              onPress={() => {
                this.setState({
                checked1: false,
                checked2: true,
              })}}
             />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
            <TextInput style={styles.resumeInput3}
            placeholder= {I18n.t('verifyInput')}
            onChangeText={(text) => {this.setState({ code: text})}}
            />
            </View>
            {this.state.timer ?
            <TouchableOpacity style={styles.codeTab2}>
            <Text style={{ fontSize:14, fontWeight: '300',color:'white' }}>{I18n.t('resend')} {this.state.counter}s</Text>
          </TouchableOpacity>
            :
            <TouchableOpacity style={styles.codeTab} onPress={()=>this.sendCode()}>
            <Text style={{ fontSize:14, fontWeight: '300' }}>{I18n.t('sendCode')}</Text>
          </TouchableOpacity>
            }

          </View>
          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirm')}</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
      </KeyboardAvoidingView>
  );}
}
Signup.contextType = DataContext;
