import React ,{Component}from 'react';
import { Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from './providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

export default class Verify extends Component {
  state = {
    phone:"",
    mail:"",
    userCode:"",
    mailCode:"",
    checked1: false,
    checked2: true,
    checked3: false,
    size:20,
  }
  sendRequest() {
/*    let s = this.state;
    let url = 'http://3.25.192.210:8080/aicare-vc/codematch?'
    +'input-code='+ s.userCode
    +'&code=' + s.mailCode;
    fetch(url,{
      method: 'GET',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then(json => {
      if(!json.status) {
        Alert.alert("验证码错误，请重新输入");
        alert("验证码错误，请重新输入");
      } else {
        Alert.alert("验证成功");
        alert("验证成功");
        this.props.navigation.navigate('注册')
      }
    });*/
    this.props.navigation.navigate('登陆')
    Alert.alert("注册成功");
    alert("注册成功");
  }


  render() {
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center", backgroundColor:'white'}}>
          <View style={{alignItems: "Left" }}>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_service.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>角色选择</Text>
          </View>
          <CheckBox
            center
            title='上门服务          '
            iconRight
            checkedIcon='check-circle-o'
            uncheckedIcon='circle-o'
            checkedColor='red'
            size={this.state.size}
            checked={this.state.checked1}
            onPress={() => this.setState({
              checked1: true,
              checked2: false,
              checked3: false,
            })}
           />
           <CheckBox
             center
             title='远程医疗          '
             iconRight
             checkedIcon='check-circle-o'
             uncheckedIcon='circle-o'
             checkedColor='red'
             size={this.state.size}
             checked={this.state.checked2}
             onPress={() => this.setState({
               checked1: false,
               checked2: true,
               checked3: false,
             })}
            />
            <CheckBox
              center
              title='药品配送          '
              iconRight
              checkedIcon='check-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='red'
              size={this.state.size}
              checked={this.state.checked3}
              onPress={() => this.setState({
                checked1: false,
                checked2: false,
                checked3: true,
              })}
             />
          </View>

          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>下一步</Text>
          </TouchableOpacity>
      </SafeAreaView>
  );}
}
