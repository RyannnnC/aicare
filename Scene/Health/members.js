import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {doctors} from './doctors';
import DateSelect from "./dateSelect";
import Category from "./category";
import DataContext from '../../providerContext';

export default class Members extends Component {
    constructor(props) {
      super(props);
      this.state={
        buttons: [],
        doctors:[],
      };
    }


  componentDidMount = () => {
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/employer/employerlist';
      fetch(url,{
        method: 'GET',
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
        if (json.code === 0) {
          console.log(json.msg);
          this.context.action.changedoctors(json.employerlist)
        } else {
          console.log(json.msg)
        }
      }).catch(error => console.warn(error));
  }

  render () {
    let docs = [];
    if (this.context.doctors.length >0) {
    docs = this.context.doctors.map((item) => {
      return (
        <View style={styles.doctorHolder} key={item.employerId}>
          <Image
            style = {{width: 40, height:40,marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img1.png')}
          />
          <View>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>全科医生 - 9年工作经验</Text>
          </View>
          <TouchableOpacity style={{marginLeft:68, marginRight:10}} onPress={() => {Alert.alert('功能尚未开放')}}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Alert.alert('功能尚未开放')}}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_delete.png')}
            />
          </TouchableOpacity>
        </View>
      )
    })}
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}>
        <TouchableOpacity style={{borderRadius:15,marginTop:20,width:315,height:70,marginLeft:30,marginRight:30,justifyContent: "center", alignItems: "center",backgroundColor:'#ECF4F3'}}
        onPress={() => {this.props.navigation.navigate('成员添加')}}>
          <Text style={{ color: '#68B0AB', fontSize: 18, fontWeight: '400'}}>添加新成员</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',marginTop:30,marginBottom:6}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '500'}}>我的成员</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom:10}}>
        <ScrollView horizontal={true}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,backgroundColor:'#FF816B',width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '400'}}>全部(24)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>全科(12)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>儿科(4)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>牙科(6)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>心理(2)</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
        <SearchBar
        placeholder="搜索医生..."
        containerStyle= {{width: 315,height: 40,backgroundColor: '#ffffff',borderRadius: 16,marginBottom:20}}
        inputContainerStyle= {{width: 300,height: 30,backgroundColor: '#ffffff',borderRadius: 16}}
        inputStyle={{width: 290,height: 30,backgroundColor: '#ffffff',borderRadius: 16}}/>
        <ScrollView style={{flex:1}}>
          {this.context.doctors.length >0 ? docs :
          <View>
            <Image
              style = {{width:280,height:280}}
              source = {require('../../images/providerImg/splash_img3.png')}
            />
            <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您的诊所还没有医生哦，请在上面添加吧！</Text>
          </View>
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}
Members.contextType = DataContext;
