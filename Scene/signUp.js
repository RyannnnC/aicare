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
    password:"",
    code:"",
    type:"",
    checked3:1,
    checked4:0,
    timer:null,
    counter:60,
  }
  sendRequest() {
    if(this.state.code==''){
      Alert.alert('请输入一个验证码')
    } else {
    let s = this.state;
    let rt = 1;
    if (s.checked3 == 1) {
      rt = 2
    }
    let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/user/pcregister?'
      +'username='+ s.name
      +'&password=' + s.password
      +'&roleType='+ rt
      +'&mobile=' + s.phone
      +'&code=' + s.code
      +'&clientType=2'
      +'&appType=1'
      +'&type=mobile';
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
          this.props.navigation.navigate(I18n.t('login'))
        } else {
          Alert.alert(json.msg);
          return false;
        }
        console.log(json.msg);
      });}
  }
  sendCode() {
    this.setTimer();
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
        console.log(json.msg);
      });
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
      <KeyboardAvoidingView style={{ flex:1,backgroundColor:'white' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView style={{width:'90%',marginLeft:'5%'}}>
          <View style={{marginTop:30, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('name')} *</Text>
          </View>
          <TextInput style={{width:'80%',borderBottomWidth:1,borderBottomColor:'#EEEEEE'}}
            placeholder={I18n.t('nameInput')}
            onChangeText={(text) => {this.setState({ name: text})}}
          />

          <View style={{flex:1,marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_phone.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('mobile')} *</Text>
          </View>
          <TextInput style={{width:'80%',borderBottomWidth:1,borderBottomColor:'#EEEEEE'}}
          placeholder={I18n.t('phoneInput')}
          keyboardType="numeric"
          onChangeText={(text) => {this.setState({ phone: text})}}
          />

          <View style={{flex:1,marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/login_icon_pswd.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('password')} *</Text>
          </View>
          <TextInput style={{width:'80%',borderBottomWidth:1,borderBottomColor:'#EEEEEE'}}
          placeholder={I18n.t('passwordInput')}
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({ password: text})}}
          />

          <View style={{flex:1,marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_link.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('role')} *</Text>
          </View>
            <CheckBox
              title={I18n.t('dt')}
              iconRight
              checkedIcon='check-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='red'
              containerStyle={{borderWidth:0, backgroundColor:'white'}}
              size={this.state.size}
              checked={this.state.checked3 == 1?true:false}
              onPress={() => {
                this.setState({
                checked3:1,
                checked4:0,
              })}}
             />
            <CheckBox
              title={I18n.t('cl')}
              iconRight
              checkedIcon='check-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='red'
              containerStyle={{borderWidth:0, backgroundColor:'white'}}
              size={this.state.size}
              checked={this.state.checked4== 1?true:false}
              onPress={() => {
                this.setState({
                checked3: 0,
                checked4: 1,
              })}}
             />

         <View style={{flex:1,marginTop:15, marginBottom:15,flexDirection: 'row'}}>
           <Image
             style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_link.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('verify')} *</Text>
          </View>

          <View style={{flex:1,flexDirection: 'row'}}>
            <TextInput style={{width:'70%',borderBottomWidth:1,borderBottomColor:'#EEEEEE'}}
            placeholder= {I18n.t('verifyInput')}
            onChangeText={(text) => {this.setState({ code: text})}}
            />
            {this.state.timer ?
            <TouchableOpacity style={styles.codeTab2}>
            <Text style={{ fontSize:14, fontWeight: '300',color:'white' }}>{I18n.t('resend')} {this.state.counter}s</Text>
          </TouchableOpacity>
            :
            <TouchableOpacity style={styles.codeTab} onPress={()=>this.sendCode()}>
            <Text style={{ color:'white',fontSize:14, fontWeight: '300' }}>{I18n.t('sendCode')}</Text>
          </TouchableOpacity>
            }
          </View>

          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirm')}</Text>
          </TouchableOpacity>
          </ScrollView>
      </KeyboardAvoidingView>
  );}
}
Signup.contextType = DataContext;
