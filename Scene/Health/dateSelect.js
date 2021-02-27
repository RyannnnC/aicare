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

      <View style={{backgroundColor: '#F7FAFA',  alignItems: 'center'}}>
        <Text style = {styles.service}>预约时间</Text>
        <CalendarPicker
          onDateChange={this.onDateChange}
          previousTitle="上一月"
          nextTitle = "下一月"
          width = {300}
          height = {300}
        />
        <Text>时间</Text>
        <View style ={{ flexDirection: 'row', marginTop: 30 }}>
          <TextInput style = {styles.time} placeholder="24时格式"
        /*  onChangeText={(text) => {state.action.changestarttime(text)}}*//>
          <Text>至</Text>
          <TextInput style = {styles.time} placeholder="24时格式"
    /*    onChangeText={(text) => {state.action.changeendtime(text);}}*//>
        </View>
      </View>
    );
  }
}
DateSelect.contextType = DataContext;
