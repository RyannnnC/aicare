import React ,{Component}from 'react';
import {Platform, Alert,Text, Button, View, Switch,KeyboardAvoidingView, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../style';
//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
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
    checked1: true,
    checked2: false,
    checked3:false,
    press:false,
  }
  sendRequest() {
    if (this.state.confirm != this.state.password) {
      Alert.alert("两次密码必须相同")
    } else {

    if(this.state.name.length==0){
      Alert.alert("请填写姓名")
      return
    }

    if(this.state.phone.length==0){
      Alert.alert("请填写电话")
      return
    }
    
    if(this.state.password.length==0){
      Alert.alert("请填写密码")
      return
    }
    if(this.state.password.length<6){
      Alert.alert("密码需要至少6位")
      return
    }
    if(this.state.userCode.length==0){
      Alert.alert("请填写验证码")
      return
    }
    if(!this.state.checked3){
      Alert.alert("请阅读并同意用户须知")
      return
    }
    if(!this.state.press){
      Alert.alert("请获取验证码验证电话号码")
      return
    }
    let s = this.state;
    let url = 'http://3.104.232.106:8085/aicare-customer-api/customer/user/register?'
      +'username='+ s.name
      +'&password=' + s.password
      +'&email=' + s.mail
      +'&mobile=' + s.phone
      +'&clientType=3'
      +'&code=' + s.userCode
      +'&appType=4'+"&type=mobile"
      fetch(url,{
        method: 'POST',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.msg)
        if(json.code==0){
           console.log(json.msg);
           Alert.alert("注册成功！")
          this.props.navigation.navigate('登陆');
        }else{
          Alert.alert(json.msg)
        }
      });}
  //  .then(json => {console.log(json)});
  }


  

  sendCode() {
    if (this.state.checked1) {
      let p = this.state.phone;
      let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/send?"
      +'&type=mobile'
      +'&mobile=' + p;
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
        if(json.code==0){
        console.log(json.msg);
        this.setState({press:true})
        Alert.alert("验证码已发送。")
        }else{
          Alert.alert("验证码请求失败，请检查网络或者咨询客服。")
        }
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
        if(json.code==0){
          console.log(json.msg);
          Alert.alert("验证码已发送。")
          }else{
            Alert.alert("验证码请求失败，请检查网络或咨询客服。")
          }
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
      <ScrollView style={{flex:1}}>

      <View style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}>
          <View style={{alignItems: 'flex-start',marginTop:40 }}>
          <View style={{marginTop:35, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/singup_icon_name.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>姓名</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的名字"
          onChangeText={(text) => {this.setState({ name: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_phone.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>电话</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>
          <TextInput style={styles.resumeInput}
                keyboardType={Platform.OS != "ios" ? "numeric" : "number-pad"}
          placeholder="请输入您的电话号码"
          onChangeText={(text) => {this.setState({ phone: text})}}
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
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的密码"
          secureTextEntry={true}

          onChangeText={(text) => {this.setState({ password: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_confirm.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>确认</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>
          <TextInput style={styles.resumeInput}
          placeholder="请再次输入您的密码"
          secureTextEntry={true}

          onChangeText={(text) => {this.setState({ confirm: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_link.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>验证</Text>
          </View>

         
          <View style={{flexDirection: 'row'}}>
            <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10}}>
            <TextInput style={{width:200}}
            placeholder= "请输入您收到的验证码"
            onChangeText={(text) => {this.setState({ userCode: text})}}
            />
            </View>
            <TouchableOpacity style={{borderWidth:1,borderColor:"#BBBBBB",borderRadius:10,width:100,height:30,padding:5,paddingLeft:8,marginLeft:3}}
              onPress={()=>this.sendCode()}
            >
              <Text style={{ fontSize:13, fontWeight: '300' }}>获取验证码</Text>
            </TouchableOpacity>
          </View>

          </View>
          <View style={{marginTop:60, marginBottom:0,flexDirection: 'row',marginLeft:-25}}>
            <CheckBox
              center
              iconRight
              uncheckedIcon='square-o'
              checkedIcon='check-square-o'
              checkedColor='red'
              size={this.state.size}
              checked={this.state.checked3}
              onPress={() => {
                console.log("switch to mail");
                this.setState({
                checked3:!this.state.checked3
              })}}
             />
             <Text style={{marginTop:18,marginLeft:-18}}>我已阅读并同意该</Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('数据协议')}>
               <Text style={{marginLeft:2,marginTop:18,color:"#8FD7D3"}}>用户须知条款。</Text>
             </TouchableOpacity>
          </View>
          <TouchableOpacity style={{width: 280,
   height: 40,
   marginTop: 10,
   backgroundColor: "#8FD7D3",
   borderRadius: 20,
   alignItems: 'center',
   justifyContent: "center",}} onPress={()=>{this.sendRequest()}}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row"}}>
      <Image style = {{marginTop:90,
    width:120,
    height:32,}}
        source = {require('../images/logo.png')}
      />
      </View>
      </View>
      </ScrollView>

      </KeyboardAvoidingView>
  );}
}