import React, {Component} from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'
import I18n from '../switchLanguage';

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
      isLoading:false,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {this.queryOrders()});
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  setIsEnabled = (value) => {
    this.setState({isEnabled: value})
  }
  setModalVisible = (value) => {
    this.setState({modalVisible: value})
  }

  queryOrders() {
    let tp = 1;
    if (this.context.employerId !=null) {
      tp = 2;
    }
    this.setState({isLoading:true});
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/appointment/query?status=2'
    + '&type=' + tp;
      fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'sso-refresh-token': this.context.refresh_token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      }})
      .then((response) => response.json())
      .then((json) => {
        this.setState({isLoading:false});
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
        'sso-refresh-token': this.context.refresh_token,
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
  modify(sid,stime,etime) {
      Alert.alert(
        '提醒',
        '您确定要修改预约至'+stime+' - ' +etime+'吗？',
        [
          {text: '确定', onPress: () => {
            this.setState({isLoading:true})
            let url = 'http://'
            +this.context.url
            +'/aicare-business-api/business/appointment/modify?'
            +'id=' + this.state.selectedId
            +'&scheduleDetailedId=' + sid;
              fetch(url,{
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'sso-auth-token': this.context.token,
                'sso-refresh-token': this.context.refresh_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
              }
              })
              .then((response) => response.json())
              .then((json) => {
                if (json.code === 0) {
                  this.setState({isLoading:true})
                  Alert.alert('修改成功')
                  this.queryOrders();
                } else {
                  this.setState({isLoading:true})
                  Alert.alert('修改失败')
                  this.queryOrders();
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
          this.setState({isLoading:true})
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
              'sso-refresh-token': this.context.refresh_token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
            }
            })
            .then((response) => response.json())
            .then((json) => {
              if (json.code === 0) {
                this.setState({isLoading:true})
                Alert.alert('接单成功')
                this.queryOrders();
              } else {
                this.setState({isLoading:true})
                Alert.alert('接单失败')
                this.queryOrders();
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
      <View style={{height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        backgroundColor:'#8FD7D3',
        alignItems: 'center',
        justifyContent: 'center'}} key={item.id}>
        <TouchableOpacity onPress={() => {this.modify(item.scheduleDetailedId,item.startTime.substring(0,5),item.endTime.substring(0,5));}}>
          <Text style={{color:'white'}}>{item.startTime.substring(0,5)}-{item.endTime.substring(0,5)}</Text>
        </TouchableOpacity>
      </View>
    )
  })}
  let orders;
  if (this.state.isLoading){
    return(
    <View style={{ flex: 1, backgroundColor:'rgb(51,51,51)', justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="white"  />
    </View>
  )
  }else {
  if (this.state.data.length >0) {
  orders = this.state.data.map((item) => {
    let tp = '';
    if (item.videoChannel == 1) {
      tp = 'Facetime'
    } else {
      tp = 'Skype'
    }
    return (
      <View key={item.id} style={{width:'90%'}}>
      <View  style={{borderTopWidth:1,flexDirection:'row',width:'100%',height:50,backgroundColor:'white'}}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'14%'}}
        onPress={()=>{this.changevis(item.id,true)}}>
          {item.sex == 'Male'?
          <Image
            style = {{width:20,height:20,marginRight:5}}
            source = {require('../../images/providerImg/Gender-2.png')}
          />
          :
          <Image
            style = {{width:20,height:20,marginRight:5}}
            source = {require('../../images/providerImg/Gender-1.png')}
          />
          }
          <Text style={{fontWeight: '400'}}>{item.customerRealName}</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center',justifyContent:'center',width:'13%'}}>
          <Text style={{fontWeight: '400'}}>{moment(item.appointDate).format('L')}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:'11%'}}>
          <Text style={{fontWeight: '400'}}>{item.startTime&&item.startTime.substring(0,5)}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:'11%'}}>
          <Text style={{fontWeight: '400'}}>{item.serviceTypeName}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:'8%'}}>
          <Text style={{fontWeight: '400'}}>{item.sex}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:'13%'}}>
          <Text style={{fontWeight: '400'}}>{item.birthDate}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
          <Text style={{fontWeight: '400'}}>{item.mobile}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'15%'}}>
          <TouchableOpacity stlye={{margin:5}} onPress={() => this.startAlert(item.id)}>
            <Image
              style = {{width:25,height:25}}
              source={require('../../images/providerImg/Operation-4.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
            this.setState({selectedId:item.id,selectedDoctor:item.businessEmployerId});
          }}>
            <Image
              style = {{marginLeft:'20%',width:25,height:25}}
              source={require('../../images/providerImg/Operation-3.png')}
            />
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
    <View style={{alignItems:'center'}}>
    <View style={{marginTop:30}}>
      <Text style={{marginBottom:10}}>{I18n.t('patientName')}: {item.customerRealName}</Text>
      <Text style={{marginBottom:10}}>{I18n.t('patientMobile')}: {item.mobile}</Text>
      <Text style={{marginBottom:10}}>{I18n.t('bookingTime')}: {moment(item.appointDate).format('L').substring(0,5)}  {item.startTime&&item.startTime.substring(0,5)}-{item.endTime&&item.endTime.substring(0,5)}</Text>
      <Text style={{marginBottom:10}}>{I18n.t('bookingDoctor')}: {item.businessEmployerName}</Text>
      <Text style={{marginBottom:10}}>{I18n.t('bookingDept')}: {item.deptName}</Text>
      <Text style={{marginBottom:10}}>{I18n.t('bookingAdress')}: {item.orgAddress}</Text>
      {item.telehealthFlg ==1?
        <View>
          <Text style={{marginBottom:10}}>{I18n.t('treatmentTypeT')}</Text>
          <Text style={{marginBottom:10}}>{I18n.t('remoteMethod')}: {tp}</Text>
        </View>
      :
      <Text style={{marginBottom:10}}>{I18n.t('treatmentTypeO')}</Text>
      }
      <Text style={{marginBottom:10}}>{I18n.t('insuranceType')}: {item.insuranceType}</Text>
      {item.insuranceType == 'Medicare' &&
        <View>
          <Text style={{marginBottom:10}}>{I18n.t('serialNumber')}: {item.serialNumber}</Text>
          <Text style={{marginBottom:10}}>{I18n.t('cardNumber')}: {item.cardNumber}</Text>
          <Text style={{marginBottom:10}}>{I18n.t('expireDate')}: {item.expireDate}</Text>
        </View>
      }
      {item.insuranceType == '私人保险' &&
        <View>
          <Text style={{marginBottom:10}}>{I18n.t('cardNumber')}: {item.cardNumber}</Text>
        </View>
      }
    </View>
      <TouchableOpacity style={styles.next_wrapper} onPress={() =>{this.changevis(item.id,false)}}>
        <Text style={styles.onsite_text}>{I18n.t('confirmation')}</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
      <View style={{height:20}}/>
      </View>
    </Modal>
      </View>
    )
  })
  return (
    <SafeAreaView style={{ flex:1,height:'100%', justifyContent: "center", alignItems: "center" , backgroundColor:'rgb(51,51,51)'}}>
      <ScrollView style={{ flex:1, width:'90%',height:'100%',backgroundColor:'white'}}
      contentContainerStyle={{alignItems:'center'}}>
        <View style={{flexDirection:'row',width:'90%',margin:'3%'}}>
          <Image
            style = {{width:30,height:30}}
            source={require('../../images/providerImg/Appointment-calendar-3.png')}
          />
          <Text style={{marginLeft:'2%',fontSize:24,color:'rgb(33,192,196)',fontWeight: '500'}}>{I18n.t('pOrder')}</Text>
        </View>
        <View style={{borderTopWidth:1,flexDirection:'row',width:'90%',height:60,backgroundColor:'rgb(222,246,246)'}}>
            <View style={{alignItems:'center',justifyContent:'center',width:'14%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('name')}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'13%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('bookingDate')}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'11%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('bookingTime')}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'11%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('serviceType')}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'8%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('gender')}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'13%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('dateofBirth')}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('mobile')}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
              <Text style={{fontWeight: '400'}}>{I18n.t('operation')}</Text>
            </View>
        </View>
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
        <Text style = {{ color:'#006A71',fontSize:16}}>{I18n.t('orderTime')}</Text>
        <CalendarPicker
         onDateChange={this.onDateChange}
         previousTitle={I18n.t('prevMonth')}
         nextTitle = {I18n.t('nextMonth')}
         width = {300}
         height = {300}
        />
       <Text style = {{ color:'#006A71',fontSize:16,marginTop:10}}>{I18n.t('time')}</Text>
       <ScrollView style ={{marginTop: 30,maxHeight:130}}>
         <View style ={{maxWidth:300,alignItems: 'center',justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
         { this.state.timeLoad?
         <View>
           <ActivityIndicator size="large" color="#00ff00"  />
         </View>
        :this.state.time.length>0 ? times :
          <View>
           <Text>{I18n.t('noSchedule')}</Text>
         </View>}
        </View>
       </ScrollView>
       </View>

       </ScrollView>

        </View>
        <>
        </>
         </Modal>
      </ScrollView>
    </SafeAreaView>
  )} else {
    return (
      <SafeAreaView style={{ flex:1,height:'100%', justifyContent: "center", alignItems: "center" , backgroundColor:'rgb(51,51,51)'}}>
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , flex:1, width:'90%',height:'100%',backgroundColor:'white'}}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/providerImg/order_img_empty1.png')}
       />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>{I18n.t('noOrder')}</Text>
    </View>
    </SafeAreaView>
 )};
  }}
}
PendingOrder.contextType = DataContext;
