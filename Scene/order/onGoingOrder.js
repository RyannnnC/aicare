import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Alert,Modal,Linking,Platform,ActivityIndicator} from 'react-native';
import {styles} from '../../style';
import {data} from './data';
//import moment from "moment"
import DataContext from "../../consumerContext";
import DateSelect from "../telehealth/DateSelect";
import moment from 'moment-timezone';
import I18n from "../language";
import * as Localization from 'expo-localization';
class OngoingingOrder extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        modalVisible:false,
        //secondsElapsed: 3600,
        id:0,
        
        query:[]
      };
      
    }
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }  
    contact = (mobile) => {
      //phone='0403555432';
      //let phoneNumber = phone;
      if (Platform.OS !== 'android') {
        Linking.canOpenURL(`telprompt:${mobile}`)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(`telprompt:${mobile}`);
        }
      })
      .catch(err => console.log(err));
    }
      else  {
       
        Linking.canOpenURL(`tel:${mobile}`)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(`tel:${mobile}`);
        }
      })
      .catch(err => console.log(err));
      }
    };
  cancelOrder =(id)=>{
    Alert.alert(
      I18n.t("cancel_order"),
      I18n.t("cancelalert_order"),
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log("didnt cancel order"),
          style: "cancel"
        },
        { text: I18n.t("confirm_cancel"), onPress: () => this.cancelAppointment(id) } 
      ],
      { cancelable: false }
      )
  }
  changeOrder =(id,businessEmployerId,orgId,address)=>{
    Alert.alert(
      I18n.t("change_order"),
      I18n.t("changealert_order"),
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log("didnt cancel order"),
          style: "cancel"
        },
        { text: I18n.t("confirm_change"), onPress: () => {this.setModalVisible(true);this.setState({id:id});this.context.action.changeOrgId(orgId);this.context.action.changeDocId(businessEmployerId)}},
        //{ text: "更改医生", onPress: () => this.changeAlert(orgId,address,id)} 
      ],
      { cancelable: false }
      )
  }
  changeAlert=(orgId,address,id)=>{
    Alert.alert(
      "更改",
      "您是否要更改诊所呢？",
      [
        {
          text: "取消",
          onPress: () => console.log("didnt cancel order"),
          style: "cancel"
        },
        { text: "同一诊所", onPress: () => {this.props.navigation.navigate("changeDoc",{orgId:orgId,doctype:1,address:address,id:id})}},
        { text: "不同诊所", onPress: () => {this.props.navigation.navigate("changeSuburb",{doctype:1,id:id})}} 
      ],
      { cancelable: false }
      )
  }
  componentDidMount() {
    this.getAITraining();
    this.dataPolling = setInterval(
      () => {
        this.getAITraining();
      },
      3000);
  }

  componentWillUnmount() {
    console.log(this.dataPolling);
    clearInterval(this.dataPolling);

  }

  getAITraining = () => {
    //console.log("set buttons work")
    //console.log("i am polling...")
    var today = new Date();
    var month =(today.getMonth()+1);
    if (month<10){
      month = ('0' + month).slice(-2);
    }
    var day = today.getDate();
    if (day<10){
      day = ('0' + day).slice(-2)

    }
    var date = today.getFullYear()+'-'+month+'-'+day;

    let url = "http://"+this.context.url+"/aicare-customer-api/customer/user/query-appointment?appointDate="+date+"&dateFlg=1"/*"http://3.104.87.14:8085/aicare-customer-api/customer/user/query-appointment&appointDate=".concat(date).concat("&dateFlg=2")*/;
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
              if (json.code == 0) {
                //console.log(json.page[0].appointDate);
                //this.setState({query:json.page})
                console.log(json.page[0])
                this.setState({query: json.page });
                
              } else {
                
              }
            }).catch(error => console.warn(error));
    
            
   
  }
  updateAppointment(s_id){
    let url2 = "http://"+this.context.url+"/aicare-customer-api/customer/user/update-appointment?scheduleDetailedId=".concat(s_id).concat("&id=").concat(this.state.id).concat("&status=0");
            fetch(url2,{
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
              if (json.code == 0) {
                console.log("ok");
                Alert.alert(I18n.t("change_success"));
              } else {
                console.log(json.msg);
                Alert.alert(I18n.t("fail"));
              }
            }).catch(error => console.warn(error));
  }

  cancelAppointment(id){
    
    let url2 = "http://"+this.context.url+"/aicare-customer-api/customer/user/delete-appointment?id=".concat(id);
            fetch(url2,{
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
              if (json.code == 0) {
                console.log("ok");
               
                Alert.alert(I18n.t("cancel_success"))
              } else {
                console.log(json.msg);
                Alert.alert(I18n.t("fail"));
              }
            }).catch(error => console.warn(error));
  }
  
  presstime(time,date,end,s_id){
    date=new Date(Date.parse(date));
    date.setDate(date.getDate() + 1)
    date=date.toLocaleDateString();    
    Alert.alert(
      I18n.t("change_order"),
      I18n.t("changealert2_order").concat(time.slice(0,5)).concat(" - ").concat(end.slice(0,5)).concat(I18n.t("changealert3_order")),
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log("cancel change"),
          style: "cancel"
        },
        { text: I18n.t("confirm_change"), onPress: () => {this.updateAppointment(s_id);
          this.setModalVisible(!this.state.modalVisible);
          this.setState({id:0})}},
      ],
      { cancelable: false }
      )
  }
  render () {
    //console.log (this.state);
    const timeSection = this.context.schedule;
    const { modalVisible,Visible,query,id} = this.state;

    

    if (query.length >0) {
        //better check if time is null here
        
        const time= timeSection.map((item)=>{
          return(
            <View style={{marginBottom:10}} key={item.id}>
              <TouchableOpacity style={{width: 140,
                height: 40,
                backgroundColor: "#8FD7D3",
                borderRadius: 10,
                textAlign: 'center',
                marginRight: 25,
                marginTop: 15,
                paddingTop:10,paddingLeft:20}}
                onPress={()=>{
                  this.presstime(item.startTime,item.date,item.endTime,item.scheduleDetailedId);}
                }>
                <Text style={{color:"white"}}>{item.startTime.slice(0,5)+" - "+item.endTime.slice(0,5)}</Text>
              </TouchableOpacity>
            </View>
          )
        })
        
    const orders = query.map((item) => {
      let date = moment(item.appointDate).tz(Localization.timezone).format('DD/MM/YYYY')
      //date = new Date(date.getDate()+1).toLocaleDateString();
      return (
        <View style={{
            width: 315,
            height: 160,
            backgroundColor: '#F1F4F3',
            borderRadius: 15,
            marginTop:10,
            marginBottom:5,
         }} key={item.id}>
          <View style={{flexDirection: 'row', marginTop:16, marginBottom:16, marginLeft:25}}>
          <Image
            style = {{marginTop:5,width:45,height:45,borderRadius:20}}
            source={item.img?{uri:item.img}:require('../../images/telehealth_icon/service_doctor_img1.png')}
          />
          <View>
            <View style={{flexDirection:"row"}}>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500',marginTop:5}}>{item.businessEmployerName}</Text>
            <Image style={{marginTop:9,height:15,width:15,marginLeft:3}} source={item.serviceType==2?require('../../images/telehealth_icon/order_icon_video.png'):require('../../images/telehealth_icon/service_icon_location.png')}></Image>
            <Text style={{fontSize:12,color: '#666666',marginTop:8,marginLeft:3}}>{item.serviceType==1?I18n.t("onsite_order"):I18n.t("online_order")}</Text>
            {item.serviceType==2?<Text style={{fontSize:12,color: '#666666',marginTop:8}}>{item.videoChannel==1?"FaceTime":"Skype"}</Text>:null}

            </View>
            <Text style={{fontSize:12, color:'#333333', }}>{I18n.t("types")[item.deptId]+" - "+item.orgName}</Text>

            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.address}</Text>
          </View>
          </View>
          <Text style={{marginLeft:25,marginTop:-10}}>{date+"     "+item.startTime.substring(0,5)+ " - "+item.endTime.substring(0,5)}</Text>

          <View style={{flexDirection: 'row-reverse',borderTopWidth:0.3,borderColor:"#999999"}}>
            
            <TouchableOpacity style={{
              width: 75,
              height: 30,
              backgroundColor: '#68B0AB',//this.state.buttons[index].backgroundColor,
              borderRadius: 10,
              textAlign: 'center',
              marginRight: 25,
              marginTop: 15,
            }} 
            onPress={()=>this.contact(item.orgMobile)}>
              <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:20}}>{I18n.t("contact_order")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 75,
              height: 30,
              backgroundColor: '#68B0AB',//this.state.buttons2[index].backgroundColor,
              borderRadius: 10,
              textAlign: 'center',
              marginRight: 25,
              marginTop: 15,
            }} 
            onPress={()=>this.changeOrder(item.id,item.businessEmployerId,item.orgId,item.address)}>
              <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:20}}>{I18n.t("change_order")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 75,
              height: 30,
              backgroundColor:'#68B0AB', //this.state.buttons3[index].backgroundColor,
              borderRadius: 10,
              textAlign: 'center',
              marginRight: 25,
              marginTop: 15,
            }} 
            onPress={()=>this.cancelOrder(String(item.id))}>
              <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:20}}>{I18n.t("cancel_order")}</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      )
    })
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
        
        <ScrollView style={{ flex:1,marginTop:-25,maxHeight:530}}>
          {orders}
        </ScrollView>
        <Text style={{fontSize:11,color:"#999999",marginTop:10}}>{I18n.t("notice_order")}</Text>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
          this.setModalVisible(!modalVisible);}
        }
      >
      <View style={{marginTop:310,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity style={{marginRight:30,marginLeft:25}}  onPress={()=>{
          this.setModalVisible(!modalVisible);}
        }>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
      
    </TouchableOpacity>
    <View style={{marginTop:-15}}></View>
        <Text style = {{color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:70,}}>{I18n.t("slot_doctorinfo")}</Text>
    </View>
      <DateSelect/>
      {this.context.loading?<ActivityIndicator color="#00FF00" size="large"></ActivityIndicator>:
      this.context.schedule.length!=0?
      <ScrollView style={{ maxHeight:140,marginLeft:150 }}>
          {time}
      </ScrollView>:<Text style={{marginTop:15,marginBottom:10,marginLeft:100}}>{I18n.t("no_slot_doctorinfo")}</Text>}

        
        <View style={{height:20}}/>
        </View>
      </Modal>
      </View> 

    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/telehealth_icon/order_img_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>{I18n.t("no_order")}</Text>
     </View>
    )
  }
  }
}
OngoingingOrder.contextType = DataContext;
export default OngoingingOrder;