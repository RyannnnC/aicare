import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DateSelect from "./dateSelect";
import DataContext from '../../providerContext';
import CalendarPicker from 'react-native-calendar-picker';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import I18n from '../switchLanguage';

export default class MyAccount extends Component {
    constructor(props) {
      super(props);
      this.state={
        balance:100,
        week:30,
        month:50,
        total:100,
      };
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
          <TouchableOpacity style={{height:90,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: '#9ADAD6',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{this.state.balance}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:90,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: '#196F75',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{this.state.week}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>Weekly Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:90,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: '#FF816B',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{this.state.month}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>Monthly Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:90,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: '#00FFFF',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{this.state.total}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>Total Income</Text>
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
MyAccount.contextType = DataContext;
