import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
//import { TimePicker } from 'react-native-simple-time-picker';
import Geocoder from 'react-native-geocoding';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements';
import moment from 'moment';

export default class Info extends Component {
    state={
    show: false,
    latitude:0,
    longitude:0,
    street:"",
    suburb:"",
    state:"",
    postcode:"",
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
  };

  componentDidMount(){
   navigator.geolocation.getCurrentPosition(
     position=>{
       this.setState({
         latitude:position.coords.latitude,
         longitude:position.coords.longitude
       });
     },

   )
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
      this.changestreet(addressComponent[0].long_name + ' ' + addressComponent[1].long_name + ' ' + addressComponent[2].long_name);
      this.changestate(addressComponent[4].long_name);
      this.changepostcode(addressComponent[6].long_name);
      }
      else{
        this.changestreet(addressComponent[0].long_name + ' ' + addressComponent[1].long_name);
        this.changestate(addressComponent[4].long_name);
        this.changepostcode(addressComponent[5].long_name);
      }
		})
		.catch(error => console.warn(error));
  }
  changepostcode = (value) => {
    this.setState({
        postcode: value
    });
  }
  changestate = (value) => {
    this.setState({
        state: value
    });
  }
  changesuburb = (value) => {
    this.setState({
        suburb: value
    });
  }
  changestreet = (value) => {
    this.setState({
        street: value
    });
  }

  hidePicker = () => {
    this.setState({visible:false})
  }



  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ justifyContent: "center",alignItems: "center" }}>
          <Image style={styles.resumeImg}
            source = {require('../../images/providerImg/account_img_org_3.png')}
          />
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
          onChangeText={(text) => {this.setState({ name: text})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>电话</Text>
          <TextInput style={styles.resumeInput} placeholder= "0403571833"
          onChangeText={(text) => {this.setState({ phone: text})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>邮箱</Text>
          <TextInput style={styles.resumeInput} placeholder= "657416708xy@gmail.com"
          onChangeText={(text) => {this.setState({ phone: text})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>地址</Text>
          <TextInput
          style={styles.resumeInput}
          placeholder= "1001/1 Mooltan Avanue"
          value = {this.state.street}
          onChangeText={(text) => {this.state.changestreet(text)}}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>编码</Text>
          <TextInput
            style={styles.resumeInput1}
            placeholder= "2113"
            value = {this.state.postcode}
            onChangeText={(text) => {this.state.changepostcode(text)}}
          />
          <Text style={{ fontSize:16, fontWeight: '400' }}>州</Text>
          <TextInput
            style={styles.resumeInput1}
            value = {this.state.state}
            onChangeText={(text) => {this.state.changestate(text)}}
            placeholder= "NSW"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>介绍</Text>
          <Text style={{ fontSize:16, fontWeight: '400' , color:'#999999'}}>Kingsford Clinic 是一家专注...</Text>
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
              mode={'time'}
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
                mode={'time'}
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
              mode={'time'}
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
                mode={'time'}
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
              mode={'time'}
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
            <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
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

            <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
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
            <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
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
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );}
}
