import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import DataContext from '../../providerContext';

export default class UploadMember extends Component {
    constructor(props) {
      super(props);
      this.state={
        name:"",
        phone:"",
        checked1: true,
        checked2: false,
        checked3: false,
        checked4: false,
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

  sendRequest() {
    let s = this.state;
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/employer/save';
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
        name: this.state.name,
        mobile: this.state.phone,
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
          console.log(json.msg)
          alert('提交失败');
        }
      }).catch(error => console.warn(error));
  }

  hidePicker = () => {
    this.setState({visible:false})
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop:10,marginBottom:20,justifyContent: "center",alignItems: "center" }}>
          <TouchableOpacity onPress={() => {Alert.alert('上传照片尚未开放')}}>
            <Image style={styles.resumeImg}
              source = {require('../../images/providerImg/account_icon_add_1.png')}
              />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' , marginRight: 20}}>基本信息</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>姓名</Text>
          <TextInput style={styles.resumeInput} placeholder= "Kingsford Clinic"
          value={this.state.name}
          onChangeText={(text) => {this.setState({name:text})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>电话</Text>
          <TextInput style={styles.resumeInput} placeholder= "0403571833"
          value={this.state.phone}
          onChangeText={(text) => {this.setState({phone:text})}}/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            center
            title='全科'
            checkedIcon='check-circle-o'
            uncheckedIcon='circle-o'
            checkedColor='red'
            containerStyle={{borderWidth:0,backgroundColor:'white'}}
            size={this.state.size}
            checked={this.state.checked1}
            onPress={() => {
              this.setState({
                checked1: !this.state.checked1,
            })}}
           />
        </View>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            center
            title='心理'
            checkedIcon='check-circle-o'
            uncheckedIcon='circle-o'
            containerStyle={{borderWidth:0, backgroundColor:'white'}}
            checkedColor='red'
            size={this.state.size}
            checked={this.state.checked2}
            onPress={() => {
              this.setState({
              checked2: !this.state.checked2,
            })}}
           />
        </View>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            center
            title='牙科'
            checkedIcon='check-circle-o'
            uncheckedIcon='circle-o'
            containerStyle={{borderWidth:0, backgroundColor:'white'}}
            checkedColor='red'
            size={this.state.size}
            checked={this.state.checked3}
            onPress={() => {
              this.setState({
              checked3: !this.state.checked3,
            })}}
           />
        </View>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            center
            title='儿科'
            checkedIcon='check-circle-o'
            uncheckedIcon='circle-o'
            containerStyle={{borderWidth:0, backgroundColor:'white'}}
            checkedColor='red'
            size={this.state.size}
            checked={this.state.checked4}
            onPress={() => {
              this.setState({
              checked4: !this.state.checked4,
            })}}
           />
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
                title='远程问诊                                '
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
                <Text style={{ fontSize:16, fontWeight: '400' }}>资格证书</Text>
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
UploadMember.contextType = DataContext;
