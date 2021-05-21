import React ,{Component}from 'react';
import { Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Alert,Platform } from 'react-native';
import {styles} from '../style';
import DataContext from "../consumerContext";

class Forget extends Component {
  state = {
    mail:"",
    password:"",
    confirm: "",
    code:"",
    checked:true, //true是电话 false是邮箱
    text:"切换邮箱验证",
  }
  switch(){
    let s = this.state;
    if(s.checked){
      this.setState({checked:false})
      this.setState({text:"切换电话验证"})
    }else{
      this.setState({checked:true})
      this.setState({text:"切换邮箱验证"})
    }
  }
  sendRequest() {
    if(this.state.checked){
    let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/updatepassword?mobile="+this.state.mail+"&code="+this.state.code+"&type=mobile&password="+this.state.password;
            fetch(url,{
              method: 'POST',
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
              if (json.code == 0) {
                //this.setState({query:json.page})
                //setNum(json.page.length)
                Alert.alert('密码更改成功');
                this.props.navigation.navigate('登陆');

              } else {
                console.log(json.msg);
                Alert.alert('联系方式或验证码错误');
              }
            }).catch(error => console.warn(error));
          }else{
            let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/updatepassword?email="+this.state.mail+"&code="+this.state.code+"&type=email&password="+this.state.password;
            fetch(url,{
              method: 'POST',
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
              if (json.code == 0) {
                //this.setState({query:json.page})
                //setNum(json.page.length)
                Alert.alert('密码更改成功');
                this.props.navigation.navigate('登陆');

              } else {
                console.log(json.msg);
                Alert.alert('联系方式或验证码错误');
              }
            }).catch(error => console.warn(error));
          }
  }
  sendCode() {
    if (this.state.checked) {
      let mail = this.state.mail;
      let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/send?"
      +'&type=mobile'
      +'&mobile=' + mail;
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
        //this.setState({mailCode: json.code});
        //console.log(json.code);
        console.log(json.msg);
      });
    } else {
      let m = this.state.mail;
      let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/send?"
      +'&email=' + m+'&type=email';
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
      <View style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
          <View style={{alignItems: "flex-start" }}>

          <View style={{marginTop:-80, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/telehealth_icon/signup_icon_phone.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>电话号码</Text>
            
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>

          <TextInput style={{height:20,width:280}}
          placeholder="请输入您的电话"
          keyboardType={Platform.OS != "ios" ? "numeric" : "number-pad"}
          onChangeText={(text) => {this.setState({ mail: text})}}
          />
          </View>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_key.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>验证码</Text>
            <TouchableOpacity style={{width:'auto', marginTop: 3, marginLeft: 25, paddingLeft:10, paddingRight:10, height:20,borderRadius:10,borderWidth:1}}
              onPress={()=>this.sendCode()}
            >
              <Text style={{ fontSize:14, fontWeight: '300' }}>发送验证码</Text>
            </TouchableOpacity>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>

          <TextInput style={{height:20,width:280}} placeholder= "请输入您电话收到的验证码" onChangeText={(text) => {this.setState({ code: text})}}
/>
          </View>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_pswd.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>密码</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>

          <TextInput style={{height:20,width:280}}
          placeholder="请输入您的密码"
          onChangeText={(text) => {this.setState({ password: text})}}
          />
          </View>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_confirm.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>确认新密码</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>

          <TextInput style={{height:20,width:280}}
          placeholder="请再次输入您的密码"
          onChangeText={(text) => {this.setState({ confirm: text})}}
          />
          </View>
          </View>
          <TouchableOpacity style={{width: 280,
   height: 40,
   marginTop: 50,
   backgroundColor: "#8FD7D3",
   borderRadius: 20,
   alignItems: 'center',
   justifyContent: "center",}} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
          </TouchableOpacity>
          <Image style = {{marginTop:90,
    width:120,
    height:32,}}
        source = {require('../images/logo.png')}
      />
      </View>
  );}
}
Forget.contextType = DataContext;
export default Forget;