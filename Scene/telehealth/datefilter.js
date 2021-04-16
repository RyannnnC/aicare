import React, { Component } from 'react';
import {
  StyleSheet, Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import DataContext from "../../consumerContext";


class DateFilter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      duration:0,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

        this.context.action.changetime( [year, month, day].join('-'));
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.formatDate(date);
  }
  
  
  render() {
    const { navigation } = this.props;
    const { selectedStartDate } = this.state;
    const duration = this.state.duration;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <ScrollView style={{backgroundColor:"#F7FAFA"}}>
      <View style={{
        backgroundColor: '#F7FAFA',
        alignItems: 'center',
      }}>
        
        <View style={{marginBottom:20}}></View>
        <CalendarPicker
          onDateChange={this.onDateChange}
          previousTitle="上一月"
          nextTitle = "下一月"
          width = {300}
          height = {300}
        />
        
        
      </View>
      </ScrollView>
    );
  }

}
DateFilter.contextType = DataContext;
export default DateFilter;
