import React, { Component } from 'react';
import {
  StyleSheet, Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import DataContext from "../../consumerContext";


class DateSelect extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      duration:0,
    };
    this.onDateChange = this.onDateChange.bind(this);
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
    this.context.action.changetime([year, month, day].join('-'));
    return [year, month, day].join('-');
}
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    //console.log(this.formatDate(date));
    this.sendRequest(date);
  }
  sendRequest=(date)=>{
    //console.log(date)
    this.context.action.changeLoading(true);
    let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/scheduledetail?"+"orgId="+this.context.orgId.toString()+"&businessEmployerId="+this.context.docId.toString()+"&date="+this.formatDate(date)+"&status=0";
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
              if (json.code == 0) {
                this.context.action.changeSchedule(json.data);
                //console.log("length");
                console.log("json.page")
                console.log(json.data)
                console.log("schedule start")
                //console.log(this.context.schedule)
                console.log("schedule end")
                this.context.action.changeLoading(false);

                //console.log(json.page);
                /*if (json.page.length>0){
                  console.log(json.page[0]);
                }else{
                  //console.log(this.context.orgId)
                  console.log("this page has no schedule")
                }*/
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                this.context.action.changeLoading(false);

                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
  }
  
  render() {
    let state = this.context;
    const { navigation } = this.props;
    const { selectedStartDate } = this.state;
    const duration = this.state.duration;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      
      <View style={{
        backgroundColor: '#F7FAFA',
        alignItems: 'center',
        marginTop:20,
      }}>
        <CalendarPicker
          onDateChange={this.onDateChange}
          previousTitle="上一月"
          nextTitle = "下一月"
          width = {300}
          height = {300}
        />
        
        
      </View>
    
    );
  }

}
DateSelect.contextType = DataContext;
export default DateSelect;

