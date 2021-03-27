import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import DataContext from '../../providerContext';
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from "expo";

export default class Info extends Component {
    constructor(props) {
      super(props);
      this.state={
      show: false,
      image:null,
      hasCameraPermission: null,
      latitude:0,
      longitude:0,
      checked1: true,
      checked2: false,
      checked3:true,
      buttons: [
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
      ],
      times: [
          { time1: '8:00 AM', time2:'17:00 PM',visible1:false, visible2:false},
          { time1: '8:00 AM', time2:'17:00 PM',visible1:false, visible2:false},
          { time1: '8:00 AM', time2:'17:00 PM',visible1:false, visible2:false},
          { time1: '8:00 AM', time2:'17:00 PM',visible1:false, visible2:false},
          { time1: '8:00 AM', time2:'17:00 PM',visible1:false, visible2:false},
          { time1: '8:00 AM', time2:'17:00 PM',visible1:false, visible2:false},
          { time1: '8:00 AM', time2:'17:00 PM',visible1:false, visible2:false},
      ]
    }
    }

  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }

  async componentDidMount(){
   navigator.geolocation.getCurrentPosition(
     position=>{
       this.setState({
         latitude:position.coords.latitude,
         longitude:position.coords.longitude
       });
     },
   );
   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
   this.setState({ hasCameraPermission: status === "granted" });
  }
  changeColor(index){
    let but = this.state.buttons;
    if(!but[index].pressed){
       but[index].pressed = true;
       but[index].backgroundColor = '#FF7E67';
       but[index].borderWidth = 0;
       but[index].fontColor = '#FFFFFF';
       this.setState({buttons: but});
    } else {
      but[index].pressed = false;
      but[index].backgroundColor = 'transparent';
      but[index].borderWidth = 1;
      but[index].fontColor = '#999999';
      this.setState({buttons: but});
    }
  };

  getData(){
    Geocoder.init("AIzaSyCXUX-a8NteFRhltP-WJ0npzFKiKiG8wb8"); // use a valid API key
    Geocoder.from(this.state.latitude, this.state.longitude)
		.then(json => {
      var addressComponent = json.results[0].address_components;
      if (addressComponent.length==7){
      this.context.action.changestreet(addressComponent[0].long_name + ' ' + addressComponent[1].long_name + ' ' + addressComponent[2].long_name);
      this.context.action.changestate(addressComponent[4].long_name);
      this.context.action.changepostcode(addressComponent[6].long_name);
      }
      else{
        this.context.action.changestreet(addressComponent[0].long_name + ' ' + addressComponent[1].long_name);
        this.context.action.changestate(addressComponent[3].long_name);
        this.context.action.changepostcode(addressComponent[5].long_name);
      }
		})
		.catch(error => console.warn(error));
  }

  sendRequest() {
    let s = this.state;
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/orginfo/save';
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
      },
      body: JSON.stringify({
        name: this.context.name,
        mobile: this.context.phone,
        email: this.context.email,
        address: this.context.street,
        postalCode: this.context.postcode,
        introduce:this.context.intro,
        Languages: [{
            "value": "1",
            "name": "英文",
            "status": 1
        },
        {
            "value": "2",
            "name": "中文",
            "status": 1
        }],
        serviceClassList:[
          {
            "value": "1",
            "name": "心理咨询",
            "status": -1
          },
          {
            "value": "2",
            "name": "眼科问诊",
            "status": -1
          }
        ],
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          alert("提交成功");
          console.log(json.msg);
        } else {
          alert('提交失败');
        }
      });
  }

  hidePicker = () => {
    this.setState({visible:false})
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({image:result.uri});
    }
  };

  render() {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ justifyContent: "center",alignItems: "center" }}>
          <TouchableOpacity onPress={() =>{this.pickImage}}>
          {this.state.image ?
          <Image style={styles.resumeImg}
                source={{ uri: image }}
          />
          :
          <Image style={styles.resumeImg}
              source = {require('../../images/providerImg/account_img_org_3.png')}
            />}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' , marginRight: 20}}>基本信息</Text>
          <TouchableOpacity style={{flexDirection: 'row', marginRight: 5}} onPress = {()=>{this.getData()}}>
            <Image style = {{width:12, height:15}}
              source= {require('../../images/providerImg/order_icon_location.png')}
            />
            <Text>自动定位</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>名称</Text>
          <TextInput style={styles.resumeInput} placeholder= "Kingsford Clinic"
          value={this.context.name}
          onChangeText={(text) => {this.context.action.changename(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>电话</Text>
          <TextInput style={styles.resumeInput} placeholder= "0403571833"
          value={this.context.phone}
          onChangeText={(text) => {this.context.action.changephone(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>邮箱</Text>
          <TextInput style={styles.resumeInput} placeholder= "657416708xy@gmail.com"
          value={this.context.email}
          onChangeText={(text) => {this.context.action.changeemail(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>地址</Text>
          <TextInput
          style={styles.resumeInput}
          placeholder= "1001/1 Mooltan Avanue"
          value = {this.context.street}
          onChangeText={(text) => {this.context.action.changestreet(text)}}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>编码</Text>
          <TextInput
            style={styles.resumeInput1}
            placeholder= "2113"
            value = {this.context.postcode}
            onChangeText={(text) => {this.context.action.changepostcode(text)}}
          />
          <Text style={{marginLeft:20, fontSize:16, fontWeight: '400' }}>州</Text>
          <TextInput
            style={styles.resumeInput1}
            value = {this.context.state}
            onChangeText={(text) => {this.context.action.changestate(text)}}
            placeholder= "NSW"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>介绍</Text>
          <Text numberOfLines={1} style={{ fontSize:16, fontWeight: '400' , color:'#999999',width:'80%'}}>{this.context.intro}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('介绍')}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_profile_normal.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>服务信息</Text>
        </View>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>支持语言</Text>
        </View>
        <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>中文</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resumeTag}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>英语</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('语言')}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
        </View>

            <Text style={{ fontSize:16, fontWeight: '400' }}>服务时间</Text>
          <View  style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[0].backgroundColor,
              borderWidth: this.state.buttons[0].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              alignItems: 'center',
              justifyContent: 'center',
              }}
              onPress={()=>this.changeColor(0)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[0].fontColor }}>周一</Text>
            </TouchableOpacity>
            { this.state.buttons[0].pressed &&
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[0].visible1 = true;
                this.setState({times:t})}}>
                <Text>{this.state.times[0].time1} </Text>
              </TouchableOpacity>
                <Text> _ </Text>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[0].visible2 = true;
                  this.setState({times:t})}}>
                  <Text>{this.state.times[0].time2} </Text>
                </TouchableOpacity>
              </View>
            }
            <DateTimePicker
              isVisible={this.state.times[0].visible1}
              onConfirm={(time) => {
                  let t = this.state.times;
                  t[0].time1 = moment(time).format('LT');
                  t[0].visible1 = false;
                this.setState({times:t})}}
              onCancel={()=> {
                  let t = this.state.times;
                  t[0].visible1 = false;
                this.setState({times:t})}}
              display="spinner"
              mode={'time'}
              minuteInterval={10}
              />
              <DateTimePicker
                isVisible={this.state.times[0].visible2}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[0].time2 = moment(time).format('LT');
                    t[0].visible2 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[0].visible2 = false;
                  this.setState({times:t})}}
                display="spinner"
                mode={'time'}
                minuteInterval={10}
                />
          </View>
          <View  style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[1].backgroundColor,
              borderWidth: this.state.buttons[1].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              alignItems: 'center',
              justifyContent: 'center',
              }}
              onPress={()=>this.changeColor(1)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[1].fontColor }}>周二</Text>
            </TouchableOpacity>
            { this.state.buttons[1].pressed &&
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[1].visible1 = true;
                this.setState({times:t})}}>
                <Text>{this.state.times[1].time1} </Text>
              </TouchableOpacity>
                <Text> _ </Text>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[0].visible2 = true;
                  this.setState({times:t})}}>
                  <Text>{this.state.times[1].time2} </Text>
                </TouchableOpacity>
              </View>
            }
            <DateTimePicker
              isVisible={this.state.times[1].visible1}
              onConfirm={(time) => {
                  let t = this.state.times;
                  t[1].time1 = moment(time).format('LT');
                  t[1].visible1 = false;
                this.setState({times:t})}}
              onCancel={()=> {
                  let t = this.state.times;
                  t[1].visible1 = false;
                this.setState({times:t})}}
              display="spinner"
              mode={'time'}
              minuteInterval={10}
              />
              <DateTimePicker
                isVisible={this.state.times[1].visible2}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[1].time2 = moment(time).format('LT');
                    t[1].visible2 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[1].visible2 = false;
                  this.setState({times:t})}}
                display="spinner"
                mode={'time'}
                minuteInterval={10}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[2].backgroundColor,
              borderWidth: this.state.buttons[2].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              alignItems: 'center',
              justifyContent: 'center',
              }}
              onPress={()=>this.changeColor(2)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[2].fontColor }}>周三</Text>
            </TouchableOpacity>
            { this.state.buttons[2].pressed &&
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[2].visible1 = true;
                this.setState({times:t})}}>
                <Text>{this.state.times[2].time1} </Text>
              </TouchableOpacity>
                <Text> _ </Text>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[2].visible2 = true;
                  this.setState({times:t})}}>
                  <Text>{this.state.times[2].time2} </Text>
                </TouchableOpacity>
              </View>
            }
            <DateTimePicker
              isVisible={this.state.times[2].visible1}
              onConfirm={(time) => {
                  let t = this.state.times;
                  t[2].time1 = moment(time).format('LT');
                  t[2].visible1 = false;
                this.setState({times:t})}}
              onCancel={()=> {
                  let t = this.state.times;
                  t[2].visible1 = false;
                this.setState({times:t})}}
              display="spinner"
              mode={'time'}
              minuteInterval={10}
              />
              <DateTimePicker
                isVisible={this.state.times[2].visible2}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[2].time2 = moment(time).format('LT');
                    t[2].visible2 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[2].visible2 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                minuteInterval={10}
                />
            </View>
            <View  style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[3].backgroundColor,
              borderWidth: this.state.buttons[3].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              alignItems: 'center',
              justifyContent: 'center',
              }}
              onPress={()=>this.changeColor(3)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[3].fontColor }}>周四</Text>
            </TouchableOpacity>
            { this.state.buttons[3].pressed &&
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[3].visible1 = true;
                this.setState({times:t})}}>
                <Text>{this.state.times[3].time1} </Text>
              </TouchableOpacity>
                <Text> _ </Text>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[3].visible2 = true;
                  this.setState({times:t})}}>
                  <Text>{this.state.times[3].time2} </Text>
                </TouchableOpacity>
              </View>
            }
            <DateTimePicker
              isVisible={this.state.times[3].visible1}
              onConfirm={(time) => {
                  let t = this.state.times;
                  t[3].time1 = moment(time).format('LT');
                  t[3].visible1 = false;
                this.setState({times:t})}}
              onCancel={()=> {
                  let t = this.state.times;
                  t[3].visible1 = false;
                this.setState({times:t})}}
              mode={'time'}
              display="spinner"
              minuteInterval={10}
              />
              <DateTimePicker
                isVisible={this.state.times[3].visible2}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[3].time2 = moment(time).format('LT');
                    t[3].visible2 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[3].visible2 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                minuteInterval={10}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[4].backgroundColor,
              borderWidth: this.state.buttons[4].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              alignItems: 'center',
              justifyContent: 'center',
              }}
              onPress={()=>this.changeColor(4)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[4].fontColor }}>周五</Text>
            </TouchableOpacity>
            { this.state.buttons[4].pressed &&
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[4].visible1 = true;
                this.setState({times:t})}}>
                <Text>{this.state.times[4].time1} </Text>
              </TouchableOpacity>
                <Text> _ </Text>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[4].visible2 = true;
                  this.setState({times:t})}}>
                  <Text>{this.state.times[4].time2} </Text>
                </TouchableOpacity>
              </View>
            }
            <DateTimePicker
              isVisible={this.state.times[4].visible1}
              onConfirm={(time) => {
                  let t = this.state.times;
                  t[4].time1 = moment(time).format('LT');
                  t[4].visible1 = false;
                this.setState({times:t})}}
              onCancel={()=> {
                  let t = this.state.times;
                  t[4].visible1 = false;
                this.setState({times:t})}}
              mode={'time'}
              display="spinner"
              minuteInterval={10}
              />
              <DateTimePicker
                isVisible={this.state.times[4].visible2}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[4].time2 = moment(time).format('LT');
                    t[4].visible2 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[4].visible2 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                minuteInterval={10}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[5].backgroundColor,
              borderWidth: this.state.buttons[5].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              alignItems: 'center',
              justifyContent: 'center',
              }}
              onPress={()=>this.changeColor(5)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[5].fontColor }}>周六</Text>
            </TouchableOpacity>
            { this.state.buttons[5].pressed &&
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[5].visible1 = true;
                this.setState({times:t})}}>
                <Text>{this.state.times[5].time1} </Text>
              </TouchableOpacity>
                <Text> _ </Text>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[5].visible2 = true;
                  this.setState({times:t})}}>
                  <Text>{this.state.times[5].time2} </Text>
                </TouchableOpacity>
              </View>
            }
            <DateTimePicker
              isVisible={this.state.times[5].visible1}
              onConfirm={(time) => {
                  let t = this.state.times;
                  t[5].time1 = moment(time).format('LT');
                  t[5].visible1 = false;
                this.setState({times:t})}}
              onCancel={()=> {
                  let t = this.state.times;
                  t[5].visible1 = false;
                this.setState({times:t})}}
              mode={'time'}
              display="spinner"
              minuteInterval={10}
              />
              <DateTimePicker
                isVisible={this.state.times[5].visible2}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[5].time2 = moment(time).format('LT');
                    t[5].visible2 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[5].visible2 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                minuteInterval={10}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[6].backgroundColor,
              borderWidth: this.state.buttons[6].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              alignItems: 'center',
              justifyContent: 'center',
              }}
              onPress={()=>this.changeColor(6)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[6].fontColor }}>周天</Text>
            </TouchableOpacity>
            { this.state.buttons[6].pressed &&
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[6].visible1 = true;
                this.setState({times:t})}}>
                <Text>{this.state.times[6].time1} </Text>
              </TouchableOpacity>
                <Text> _ </Text>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[6].visible2 = true;
                  this.setState({times:t})}}>
                  <Text>{this.state.times[6].time2} </Text>
                </TouchableOpacity>
              </View>
            }
            <DateTimePicker
              isVisible={this.state.times[6].visible1}
              onConfirm={(time) => {
                  let t = this.state.times;
                  t[6].time1 = moment(time).format('LT');
                  t[6].visible1 = false;
                this.setState({times:t})}}
              onCancel={()=> {
                  let t = this.state.times;
                  t[6].visible1 = false;
                this.setState({times:t})}}
              mode={'time'}
              display="spinner"
              minuteInterval={10}
              />
              <DateTimePicker
                isVisible={this.state.times[6].visible2}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[6].time2 = moment(time).format('LT');
                    t[6].visible2 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[6].visible2 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                minuteInterval={10}
                />
            </View>
            <Text style={{ fontSize:16, fontWeight: '400' }}>服务种类</Text>
            <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
              <TouchableOpacity style={styles.resumeTag}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>普通问诊</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resumeTag}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>心理咨询</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resumeTag}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>牙科问诊</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resumeTag}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>儿科问诊</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
              <TouchableOpacity style={styles.resumeTag}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>神经理疗</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('服务种类')}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop:10, marginBottom:10}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>服务类型</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                center
                title='实地问诊                                '
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='red'
                containerStyle={{borderWidth:0,backgroundColor:'white'}}
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
                title='远程医疗                                '
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={{borderWidth:0, backgroundColor:'white'}}
                checkedColor='red'
                size={this.state.size}
                checked={this.state.checked2}
                onPress={() => {
                  this.setState({
                  checked1: false,
                  checked2: true,
                })}}
               />
            </View>
            <View style={{ marginTop:10, marginBottom:10}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>收费方式</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                center
                title='bulk billing                          '
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={{borderWidth:0,backgroundColor:'white'}}
                checkedColor='red'
                size={this.state.size}
                checked={this.state.checked3}
                onPress={() => {
                  this.setState({
                  checked3: !this.state.checked3
                })}}
               />
            </View>
            <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
                <Text style={{ fontSize:16, fontWeight: '400' }}>分支机构（选填）</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('分支机构')}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
        <TouchableOpacity style={styles.resumeButton} onPress={() => {this.sendRequest()}}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );}
}
Info.contextType = DataContext;
