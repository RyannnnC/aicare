import React, { Component } from 'react';
import {
  StyleSheet, Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';

export default class ConsumerDate extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { navigation } = this.props;
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() =>
            this.props.navigation.dispatch(StackActions.pop(1))
          }>
          <Image
            style = {styles.arrow_image}
            source={require('../images/icon/2/Arrow_left.png')}
          />
        </TouchableOpacity>

        <Text style = {styles.service}>预约地址</Text>
        <CalendarPicker
          onDateChange={this.onDateChange}
          previousTitle="上一月"
          nextTitle = "下一月"
          width = "300"
          height = "300"
        />
        <Image style = {styles.time_image}
          source= {require('../images/icon/3/time.png')}
        />
        <View style ={styles.comment_container}>
          <TextInput style = {styles.time} placeholder="24时格式"/>
          <Text>至</Text>
          <TextInput style = {styles.time} placeholder="24时格式"/>
        </View>
        <Image style = {styles.time_image}
          source= {require('../images/icon/3/price.png')}
        />
        {/*this need to be automatically calculated but leave to later stage*/}
        <Text>$160</Text>
        <Image style = {styles.bottom}
        source={require('../images/icon/2/bottom2.png')}
        />
        <TouchableOpacity style={styles.next_wrapper} onPress={() =>
            this.props.navigation.dispatch(StackActions.pop(1))
          }>
          <Text style={styles.onsite_text}>确定</Text>
        </TouchableOpacity>

        <Image style = {styles.contact}
          source = {require('../images/icon/1/contact.png')}
        />
      </View>
    );
  }
}

