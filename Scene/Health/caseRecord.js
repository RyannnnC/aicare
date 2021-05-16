import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DateSelect from "./dateSelect";
import Category from "./category";
import DataContext from '../../providerContext';
import CalendarPicker from 'react-native-calendar-picker';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import I18n from '../switchLanguage';

export default class CaseRecord extends Component {
    constructor(props) {
      super(props);
      this.state={
        data:[],
        time:[],
        date: new Date(),
        isEnabled: false,
        modalVisible: false,
        mdVisible:false,
        mds:[],
        Visible:false,
        selectedId:'',
        selectedDoctor:'',
        timeLoad:false,
        isLoading:false,
      };
      this.onDateChange = this.onDateChange.bind(this);
    }

  /*
} */

  setIsEnabled = (value) => {
    this.setState({isEnabled: value})
  }
  setModalVisible = (value) => {
    this.setState({modalVisible: value})
  }
  setMdVisible = (value) => {
    this.setState({mdVisible: value})
  }
  setVisible = (visible) => {
    this.setState({ Visible: visible });
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

  modify(sid) {
      Alert.alert(
        '提醒',
        '您确定要修改预约至这个时间吗？',
        [
          {text: '确定', onPress: () => {
            let url = 'http://'
            +this.context.url
            +'/aicare-business-api/business/appointment/modify?'
            +'id=' + this.state.selectedId
            +'&scheduleDetailedId=' + sid;
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
              }
              })
              .then((response) => response.json())
              .then((json) => {
                if (json.code === 0) {
                  console.log(json.msg)
                  Alert.alert('修改成功')
                } else {
                  Alert.alert('修改失败')
                  console.log(json.msg)
                }
              }).catch(error => console.warn(error));
          }},
          {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
        ],
        {
          cancelable: false
        }
      );
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    let fd = this.formatDate(date);
    this.sendRequest(fd);
  }


  render () {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    if (this.state.isLoading){
      return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00"  />
     </View>
    )
    }else {
    return (
      <SafeAreaView style={{ flex:1,backgroundColor:"white" }}>
        <View style={{height:'20%',flexDirection: 'row',justifyContent:'center',alignItems: 'center',borderBottomWidth:1}}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{I18n.t('myPatient')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer2}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{I18n.t('myAssistant')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer3}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{I18n.t('emRecord')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginBottom:21,marginTop:30}}>
          <TouchableOpacity style={{flexDirection: 'row', marginRight:199,marginLeft:30}}
          onPress={()=>{this.setVisible(!this.state.Visible)}}>
            <Text style={{fontSize:13}}>{I18n.t('all')}</Text>
            <Image
              style = {{width: 13, height:13,marginLeft:5}}
              source = {require('../../images/providerImg/schedule_icon_filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', marginRight:30}}
          onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Text style={{fontSize:13}}>{month}/{date}</Text>
            <Image
              style = {{width: 13, height:13,marginLeft:5}}
              source = {require('../../images/providerImg/schedule_icon_calender.png')}
            />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }}
}
CaseRecord.contextType = DataContext;
