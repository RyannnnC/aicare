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
      mds:[],
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
            for(let i=0; i<json.page.length;i++){
              var d= {
                id:json.page[i].id,
                visible:false,
              }
              let t = this.state.mds;
              t.push(d);
              this.setState({mds:t});
            }
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
          this.setState({time:json.data});
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

  findvis(id) {
    for (let i=0;i<this.state.mds.length;i++) {
      if(this.state.mds[i].id == id) {
        return this.state.mds[i].visible;
      }
    }
  }

  changevis(id,value){
    for (let i=0;i<this.state.mds.length;i++) {
      if(this.state.mds[i].id == id) {
        let t = this.state.mds;
        t[i].visible = value;
        this.setState({mds:t})
      }
    }
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
    let tp = '';
    if (item.videoChannel == 1) {
      tp = 'Facetime'
    } else {
      tp = 'Skype'
    }
    return (
      <View style={styles.card2} key={item.id}>
        <View style={{width:'80%',marginLeft:'10%'}}>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:16, marginBottom:16}} onPress={()=>this.changevis(item.id,true)}>
          <Image
            style = {{width:40,height:40,marginRight:15}}
            source = {require('../../images/providerImg/home_img_person.png')}
          />
          <View>
            <Text style={{marginTop:4,fontSize:16, color:'#333333', fontWeight: '500'}}>{item.customerRealName}</Text>
            <Text style={{marginTop:1,fontSize:12, color:'#666666', fontWeight: '400'}}>{item.mobile}</Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row',paddingBottom: 10}}>
          <Image
            style = {{width: 15, height:15 , marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_time.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{moment(item.appointDate).format('L').substring(0,5)} {item.startTime&&item.startTime.substring(0,5)}-{item.endTime&&item.endTime.substring(0,5)}</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:40, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_type.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.deptName}</Text>
        </View>
        <View style={{flexDirection: 'row',paddingBottom: 12, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
          <Image
            style = {{width: 15, height:15 , marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_person.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.businessEmployerName}</Text>
          {item.telehealthFlg ==1?
            <View style={{flexDirection: 'row'}}>
            <Image
              style = {{width: 15, height:15,marginLeft:100, marginRight:5}}
              source = {require('../../images/providerImg/account_icon_video.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>远程医疗</Text>
            </View>
          :
          <View style={{flexDirection: 'row'}}>
          <Image
            style = {{width: 15, height:15,marginLeft:100, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_location.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>实地问诊</Text>
          </View>
          }
        </View>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={{
            width: 'auto',
            height: 30,
            backgroundColor: '#68B0AB',
            borderRadius: 10,
            textAlign: 'center',
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center" ,
            paddingLeft:15,
            paddingRight:15,
          }} onPress={() => this.startAlert(item.id)}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>接受</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 'auto',
            height: 30,
            backgroundColor: '#FF7E67',
            borderRadius: 10,
            textAlign: 'center',
            marginRight: 25,
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center" ,
            paddingLeft:15,
            paddingRight:15,
          }} onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
            this.setState({selectedId:item.id,selectedDoctor:item.businessEmployerId});
            console.log(this.state.selectedId);
            console.log(this.state.selectedDoctor);
          }}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>修改</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.findvis(item.id)}
      onRequestClose={() => {
        this.changevis(item.id,false)
      }}
    >
    <View style={{marginTop:250,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
width: 0,
height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
  <View style={{flexDirection:"row"}}>
  <TouchableOpacity onPress={() =>{this.changevis(item.id,false)}} style={{marginRight:60,marginLeft:23}}>
    <Image
      style = {styles.arrow_image}
      source={require('../../images/icon/2/Arrow_left.png')}
    />
  </TouchableOpacity>
  </View>
  <ScrollView style={{backgroundColor:"#F7FAFA"}}>
    <View style={{marginLeft:115,marginTop:30}}>
      <Text style={{marginBottom:10}}>患者姓名: {item.customerRealName}</Text>
      <Text style={{marginBottom:10}}>患者电话: {item.mobile}</Text>
      <Text style={{marginBottom:10}}>就诊时间: {moment(item.appointDate).format('L').substring(0,5)}  {item.startTime&&item.startTime.substring(0,5)}-{item.endTime&&item.endTime.substring(0,5)}</Text>
      <Text style={{marginBottom:10}}>就诊医生: {item.businessEmployerName}</Text>
      <Text style={{marginBottom:10}}>就诊科目: {item.deptName}</Text>
      <Text style={{marginBottom:10}}>就诊地址: {item.orgAddress}</Text>
      {item.telehealthFlg ==1?
        <View>
          <Text style={{marginBottom:10}}>就诊方式: 远程医疗</Text>
          <Text style={{marginBottom:10}}>远程方式: {tp}</Text>
        </View>
      :
      <Text style={{marginBottom:10}}>就诊方式: 实地会诊</Text>
      }
      <Text style={{marginBottom:10}}>保险方式: {item.insuranceType}</Text>
      {item.insuranceType == 'Medicare' &&
        <View>
          <Text style={{marginBottom:10}}>医保序列: {item.serialNumber}</Text>
          <Text style={{marginBottom:10}}>医保卡号: {item.cardNumber}</Text>
          <Text style={{marginBottom:10}}>过期时间: {item.expireDate}</Text>
        </View>
      }
      {item.insuranceType == '私人保险' &&
        <View>
          <Text style={{marginBottom:10}}>医保卡号: {item.cardNumber}</Text>
        </View>
      }
    </View>
      <TouchableOpacity style={styles.next_wrapper} onPress={() =>{this.changevis(item.id,false)}}>
        <Text style={styles.onsite_text}>确定</Text>
      </TouchableOpacity>
  </ScrollView>
      <View style={{height:20}}/>
      </View>
    </Modal>
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
