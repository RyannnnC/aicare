import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Alert,Modal,Linking,Platform,ActivityIndicator} from 'react-native';
import {styles} from '../../style';
import {data} from './data';
//import moment from "moment"
import DataContext from "../../consumerContext";
import DateSelect from "../telehealth/DateSelect";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
class OngoingingOrder extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        modalVisible:false,
        //secondsElapsed: 3600,
        id:0,
        buttons: [
          { backgroundColor: '#68B0AB', pressed: false,id:0},
          { backgroundColor: '#68B0AB', pressed: false,id:1},
          { backgroundColor: '#68B0AB', pressed: false,id:2},
          { backgroundColor: '#68B0AB', pressed: false,id:3},
          { backgroundColor: '#68B0AB', pressed: false,id:4},
          { backgroundColor: '#68B0AB', pressed: false,id:5},
          { backgroundColor: '#68B0AB', pressed: false,id:6},
          { backgroundColor: '#68B0AB', pressed: false,id:7},
          { backgroundColor: '#68B0AB', pressed: false,id:8},
          { backgroundColor: '#68B0AB', pressed: false,id:9},
        ],
        buttons2: [
          { backgroundColor: '#68B0AB', pressed: false,id:0},
          { backgroundColor: '#68B0AB', pressed: false,id:1},
          { backgroundColor: '#68B0AB', pressed: false,id:2},
          { backgroundColor: '#68B0AB', pressed: false,id:3},
          { backgroundColor: '#68B0AB', pressed: false,id:4},
          { backgroundColor: '#68B0AB', pressed: false,id:5},
          { backgroundColor: '#68B0AB', pressed: false,id:6},
          { backgroundColor: '#68B0AB', pressed: false,id:7},
          { backgroundColor: '#68B0AB', pressed: false,id:8},
          { backgroundColor: '#68B0AB', pressed: false,id:9},
        ],
        buttons3: [
          { backgroundColor: '#68B0AB', pressed: false,id:0},
          { backgroundColor: '#68B0AB', pressed: false,id:1},
          { backgroundColor: '#68B0AB', pressed: false,id:2},
          { backgroundColor: '#68B0AB', pressed: false,id:3},
          { backgroundColor: '#68B0AB', pressed: false,id:4},
          { backgroundColor: '#68B0AB', pressed: false,id:5},
          { backgroundColor: '#68B0AB', pressed: false,id:6},
          { backgroundColor: '#68B0AB', pressed: false,id:7},
          { backgroundColor: '#68B0AB', pressed: false,id:8},
          { backgroundColor: '#68B0AB', pressed: false,id:9},
        ],
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
      "提醒",
      "您确定要取消这单预约吗？",
      [
        {
          text: "取消",
          onPress: () => console.log("didnt cancel order"),
          style: "cancel"
        },
        { text: "确定", onPress: () => this.cancelAppointment(id) } 
      ],
      { cancelable: false }
      )
  }
  changeOrder =(id,businessEmployerId,orgId,address)=>{
    Alert.alert(
      "更改",
      "您要更改时间还是更改医生呢？",
      [
        {
          text: "取消",
          onPress: () => console.log("didnt cancel order"),
          style: "cancel"
        },
        { text: "更改时间", onPress: () => {this.setModalVisible(true);this.setState({id:id});this.context.action.changeOrgId(orgId);this.context.action.changeDocId(businessEmployerId)}},
        { text: "更改医生", onPress: () => this.changeAlert(orgId,address,id)} 
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
        { text: "同一诊所", onPress: () => {this.props.navigation.navigate("changeDoc",{orgId:orgId,docType:"全科",address:address,id:id})}},
        { text: "不同诊所", onPress: () => {this.props.navigation.navigate("changeSuburb",{docType:"全科",id:id})}} 
      ],
      { cancelable: false }
      )
  }
  componentDidMount = () => {
    //console.log("set buttons work")
    var today = new Date();
    var month =(today.getMonth()+1);
    if (month<10){
      month = ('0' + month).slice(-2)
    }
    var day = today.getDate();
    if (day<10){
      day = ('0' + day).slice(-2)

    }
    var date = today.getFullYear()+'-'+month+'-'+day;

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/query-appointment?appointDate="+date+"&dateFlg=1"/*"http://3.104.232.106:8085/aicare-customer-api/customer/user/query-appointment&appointDate=".concat(date).concat("&dateFlg=2")*/;
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
                this.setState({query: json.page });
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                console.log(json.code);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
    
            
    });
  }
  updateAppointment(s_id){
    let url2 = "http://3.104.232.106:8085/aicare-customer-api/customer/user/update-appointment?scheduleDetailedId=".concat(s_id).concat("&id=").concat(this.state.id).concat("&status=0");
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
                Alert.alert('更改成功');
              } else {
                console.log(json.msg);
                Alert.alert('更改失败');
              }
            }).catch(error => console.warn(error));
  }

  cancelAppointment(id){
    
    let url2 = "http://3.104.232.106:8085/aicare-customer-api/customer/user/delete-appointment?id=".concat(id);
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
                /*let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/query-appointment?appointDate="+date+"&dateFlg=1";
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
                
                this.setState({query: json.page });
                Alert.alert('更新成功');
              } else {
                console.log(json.msg);
                console.log(json.code);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));*/
                //Alert.alert('查询成功');
                Alert.alert("订单已取消。")
              } else {
                console.log(json.msg);
                Alert.alert('更改失败');
              }
            }).catch(error => console.warn(error));
  }
  /*getHours() {
    return ("0" + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
  }

  getMinutes() {
    return ("0" + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(
      -2
    );
  }

  getSeconds() {
    return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
  }

  startTime(index) {
    let but = this.state.buttons;
    but[index].pressed = true;
    but[index].backgroundColor = '#FF7E67';
    this.setState({buttons: but});
    this.setState({secondsElapsed: but[index].timeSlot*3600});
    this.countdown = setInterval(() => {
      this.setState(({ secondsElapsed }) => ({
        secondsElapsed: secondsElapsed - 1
      }));
    }, 1000);
  }


  pauseTime(index) {
    let but = this.state.buttons;
    clearInterval(this.countdown);
    but[index].pressed = false;
    but[index].backgroundColor = '#68B0AB';
    this.setState({buttons: but});
  }

*/
  presstime(time,date,end,s_id){
    date=new Date(Date.parse(date));
    date.setDate(date.getDate() + 1)
    date=date.toLocaleDateString();    
    Alert.alert(
      "提醒",
      "确定要更改时间到"/*.concat(" ")*/.concat(time.slice(0,5)).concat(" - ").concat(end.slice(0,5)).concat("吗？"),
      [
        {
          text: "取消",
          onPress: () => console.log("cancel change"),
          style: "cancel"
        },
        { text: "确定", onPress: () => {this.updateAppointment(s_id);
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
      let date = moment(item.appointDate).tz(Localization.timezone).format('L')
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
            style = {styles.pendingImg}
            source = {require('../../images/home_img_person.png')}
          />
          <View>
            <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>{item.businessEmployerName}</Text>
            <Text style={{fontSize:12, color:'#333333', }}>{this.context.deptType[item.deptId]+" - "+item.orgName}</Text>

            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.address}</Text>
          </View>
          </View>
          <Text>{date+" "+item.startTime+ " - "+item.endTime}</Text>

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
              <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:20}}>联系</Text>
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
              <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:20}}>更改</Text>
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
              <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:20}}>取消</Text>
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
        <Text style={{fontSize:11,color:"#999999",marginTop:10}}>仅在预约一小时之前可以进行订单取消或更改。</Text>
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
    marginLeft:70,}}>时间筛选</Text>
    </View>
      <DateSelect/>
      {this.context.loading?<ActivityIndicator color="#00FF00" size="large"></ActivityIndicator>:
      this.context.schedule.length!=0?
      <ScrollView style={{ maxHeight:140,marginLeft:150 }}>
          {time}
      </ScrollView>:<Text style={{marginTop:15,marginBottom:10,marginLeft:100}}>抱歉，这一天没有可选时间哦。</Text>}

        
        <View style={{height:20}}/>
        </View>
      </Modal>
      </View> 

    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有新订单哦，快去预定吧！</Text>
     </View>
    )
  }
  }
}
OngoingingOrder.contextType = DataContext;
export default OngoingingOrder;