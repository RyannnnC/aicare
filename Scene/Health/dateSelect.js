import React, { Component } from 'react';
import {
   Text, View,TouchableOpacity,ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from '../providerStyle';
import DataContext from "../../providerContext";
import I18n from '../switchLanguage';

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
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/user/scheduledetail?date='
    + date;
      fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'sso-refresh-token': this.context.refresh_token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      }})
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          this.setState({time:json.data})
        } else {
          console.log(json.msg);
        }
      }).catch(error => console.warn(error));
  }
  componentDidMount() {
      let d = new Date();
      var date = this.formatDate(d);
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/user/scheduledetail?date='
      + date;
        fetch(url,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'sso-auth-token': this.context.token,
          'sso-refresh-token': this.context.refresh_token,
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
        <Text style = {{ color:'#006A71',fontSize:16}}>{I18n.t('orderTime')}</Text>
        <CalendarPicker
          onDateChange={this.onDateChange}
          previousTitle={I18n.t('prevMonth')}
          nextTitle = {I18n.t('nextMonth')}
          width = {300}
          height = {300}
        />
        <Text style = {{ color:'#006A71',fontSize:16,marginTop:10}}>{I18n.t('time')}</Text>
        <ScrollView style ={{marginTop: 30}}>
          {times}
        </ScrollView>
      </View>
    );
  }
}
DateSelect.contextType = DataContext;
