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

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.context.action.changetime(date.toString().substring(0, 15));
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
        <View style={{marginTop:-15}}></View>
        <Text style = {styles.service}>时间筛选</Text>
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
