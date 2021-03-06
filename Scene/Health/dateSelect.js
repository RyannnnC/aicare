import React, { Component } from 'react';
import {
  StyleSheet, Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import DataContext from "../../providerContext";


export default class DateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      duration:0,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.context.action.changetime(date.toString().substring(0, 15));
  }


  render() {
    let state = this.context;
    const { navigation } = this.props;
    const { selectedStartDate } = this.state;
    const duration = this.state.duration;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

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
        <View style ={{ flexDirection: 'row', marginTop: 30 }}>
          <TextInput style = {{
              marginLeft: 30,
              marginRight:10,
              height: 35,
              width: 80,
              borderBottomColor: '#999999',
              borderBottomWidth:1}} placeholder="24时格式"/>
          <Text>至</Text>
          <TextInput style = {{
              marginLeft: 10,
              marginRight:30,
              height: 35,
              width: 80,
              borderBottomColor: '#999999',
              borderBottomWidth:1}} placeholder="24时格式"/>
        </View>
      </View>
    );
  }
}
DateSelect.contextType = DataContext;
