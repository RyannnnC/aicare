import React, {Component} from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DateSelect from "./dateSelect";
import DataContext from '../../providerContext';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'

export default class PendingOrder extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      time:[],
      isEnabled: false,
      timeLoad:false,
      modalVisible: false,
      selectedId:'',
      selectedDoctor:'',
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount = () => {
    let tp = 1;
    if (this.context.employerId !=null) {
      tp = 2;
    }
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/appointment/query?status=0'
      + '&type=' + tp;
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
            this.setState({data:json.page});
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
    });
  }

  setIsEnabled = (value) => {
    this.setState({isEnabled: value})
  }
  setModalVisible = (value) => {
    this.setState({modalVisible: value})
  }

  sendRequest(date){
    this.setState({timeLoad:true})
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/user/scheduledetail?date='
    + date +'&businessEmployerId=' + this.state.selectedDoctor + '&status=0';
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
        this.setState({timeLoad:false})
        if (json.code === 0) {
          console.log(json.msg);
          this.setState({time:json.data})
        } else {
          console.log(json.msg);
        }
      }).catch(error => console.warn(error));
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
                  Alert.alert('修改成功')
                } else {
                  Alert.alert('修改失败')
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
  startAlert(id){
    Alert.alert(
      '提醒',
      '您确定要接受这桩预约吗？',
      [
        {text: '确定', onPress: () => {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/appointment/take?id='
          +id;
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
                Alert.alert('接单成功')
              } else {
                Alert.alert('接单失败')
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

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.context.action.changetime(date.toString().substring(0, 15));
    let fd = this.formatDate(date);
    this.sendRequest(fd);
  }

  render() {
  let times=[];
  if (this.state.time.length >0) {
  times = this.state.time.map((item) => {
    return (
      <View style={styles.timePick} key={item.id}>
        <TouchableOpacity onPress={() => {this.modify(item.scheduleDetailedId);}}>
          <Text>{item.startTime.substring(0,5)}-{item.endTime.substring(0,5)}</Text>
        </TouchableOpacity>
      </View>
    )
  })}
  let orders;
  if (this.state.data.length >0) {
  orders = this.state.data.map((item) => {
    return (
      <View style={styles.card2} key={item.id}>
        <View style={{flexDirection: 'row', marginTop:16, marginBottom:16, marginLeft:25}}>
        <Image
          style = {{width:40,height:40,marginRight:15}}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View>
          <Text style={{marginTop:4,fontSize:16, color:'#333333', fontWeight: '500'}}>{item.customerRealName}</Text>
          <Text style={{marginTop:1,fontSize:12, color:'#666666', fontWeight: '400'}}>{item.mobile}</Text>
        </View>
        </View>
        <View style={{flexDirection: 'row',paddingBottom: 10}}>
          <Image
            style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_time.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{moment(item.appointDate).format('L').substring(0,5)} {item.startTime&&item.startTime.substring(0,5)}-{item.endTime&&item.endTime.substring(0,5)}</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:70, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_type.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.deptName}</Text>
        </View>
        <View style={{flexDirection: 'row',paddingBottom: 12, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
          <Image
            style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_person.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.businessEmployerName}</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:120, marginRight:5}}
            source = {require('../../images/providerImg/order_icon_location.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>实地预约</Text>
        </View>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={styles.orderButton2} onPress={() => this.startAlert(item.id)}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>接受</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton} onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
            this.setState({selectedId:item.id,selectedDoctor:item.businessEmployerId});
            console.log(this.state.selectedId);
            console.log(this.state.selectedDoctor);
          }}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>修改</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  })
  return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" , backgroundColor:'white'}}>
      <ScrollView style={{ flex:1}}>
        {orders}
        <Modal
         animationType="slide"
         transparent={true}
         visible={this.state.modalVisible}
         onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>
         <View style={{marginTop:200,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
         shadowOffset: {
   	       width: 0,
   	       height: 12,
         },
         shadowOpacity: 0.58,
         shadowRadius: 16.00,
         elevation: 24,}}>
     <TouchableOpacity onPress={() =>{this.setModalVisible(!this.state.modalVisible)}} style={{marginRight:30}}>
       <Image
         style = {styles.arrow_image}
         source={require('../../images/icon/2/Arrow_left.png')}
       />
     </TouchableOpacity>
     <ScrollView style={{backgroundColor:"#F7FAFA", marginBottom:20}}>
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
       <ScrollView style ={{marginTop: 30,maxHeight:100}}>
         <View style ={{alignItems: 'center',justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
         { this.state.timeLoad?
         <View>
           <ActivityIndicator size="large" color="#00ff00"  />
         </View>
        :this.state.time.length>0 ? times :
          <View>
           <Text>这位医生今天没有排班！</Text>
         </View>}
        </View>
       </ScrollView>
     </View>
       <TouchableOpacity style={styles.next_wrapper}>
           <Text style={{color:'white'}}>确定</Text>
      </TouchableOpacity>
     </ScrollView>
      </View>
      <>
      </>
       </Modal>
      </ScrollView>
    </SafeAreaView>
  )} else {
    return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor:'white'}}>
     <Image
       style = {styles.finishImg}
       source = {require('../../images/providerImg/order_img_empty1.png')}
     />
    <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有新订单哦，耐心等待一下吧！</Text>
    </View>
 )};
  }
}
PendingOrder.contextType = DataContext;
