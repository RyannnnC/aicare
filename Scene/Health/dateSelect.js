import React, { Component } from 'react';
import {
  StyleSheet, Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from '../providerStyle';
import { StackActions } from '@react-navigation/native';
import DataContext from "../../providerContext";


export default class DateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      time:[],
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.context.action.changetime(date.toString().substring(0, 15));
    let fd = this.formatDate(date);
    this.sendRequest(fd);
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }
  sendRequest(date){
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/scheduledetail?date='
    + date;
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
          alert('查询成功');
          this.setState({time:json.data})
        } else {
          console.log(json.msg);
          alert('查询失败');
        }
      }).catch(error => console.warn(error));
  }
  componentDidMount() {
      let d = new Date();
      var date = this.formatDate(d);
      let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/scheduledetail?date='
      + date;
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
            this.setState({time:json.data})
          } else {
            console.log(json.msg);
          }
        }).catch(error => console.warn(error));
  }

  render() {
    let state = this.context;
    const { navigation } = this.props;
    const { selectedStartDate } = this.state;

    let times=[];
    if (this.state.time.length >0) {
    times = this.state.time.map((item) => {
      return (
        <View style={styles.timePick} key={item.id}>
          <TouchableOpacity>
            <Text>{item.startTime}-{item.endTime}</Text>
          </TouchableOpacity>
        </View>
      )
    })}
    return (
      <View style={{backgroundColor: '#F7FAFA',  alignItems: 'center',justifyContent:'center'}}>
        <Text style = {{ color:'#006A71',fontSize:16}}>预约时间</Text>
        <CalendarPicker
          onDateChange={this.onDateChange}
          previousTitle="上一月"
          nextTitle = "下一月"
          width = {300}
          height = {300}
        />
        <Text style = {{ color:'#006A71',fontSize:16,marginTop:10}}>时间</Text>
        <ScrollView style ={{marginTop: 30}}>
          {times}
        </ScrollView>
      </View>
    );
  }
}
DateSelect.contextType = DataContext;
