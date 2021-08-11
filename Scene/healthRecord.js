import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,Alert,ActivityIndicator} from 'react-native';
import {styles} from '../style';
//import {data} from './docdata';
import { StackActions } from '@react-navigation/native';
//import { SearchBar } from 'react-native-elements';
//import DateFilter from "./datefilter";
import DataContext from "../consumerContext";
import I18n from "./language"
//import moment from "moment"

class HealthRecord extends Component {
  constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        //secondsElapsed: 3600,
        modalVisible: false,
        Visible:false,
        search:"",
        candidates:[],
        reports:[],
        loading:true,
      };
    }
  setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }  
  setVisible = (visible) => {
      this.setState({ Visible: visible });
    }  

  componentDidMount = () => {
    console.log("start");

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = "http://"+this.context.url+"/aicare-customer-api/customer/consultation/query-all-reports?customerUserInfoId="+this.context.customerUserInfoId;
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
                //console.log(json.businessEmployer[0].businessUserId);
                this.setState({reports:json.reports});
                console.log(json.reports[1]);
                this.setState({loading:false})
                //Alert.alert('查询成功');
              } else {
                console.log(json.code)
                console.log(json.msg);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
    });
  }
  setChange(value){
    this.setState({search:value});
  }
  splitString=(string)=>{
    let res = string.split(",").map(Number);
    return res;
  }
  
  render () {
    //console.log (this.state);
    const { modalVisible,Visible,docs,loading,reports } = this.state;
    if (loading){
      return (
        <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10,marginLeft:20,marginTop:60}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {styles.arrow_image}
            source={require('../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:105,
        marginTop:20}}>{I18n.t("health_record")}</Text>
        </View>
        <View style={{marginTop:10}}>
        <Image
            style = {styles.topping_image}
            source={require('../images/order_img.png')}
        />
        </View>
        <View style={{marginTop:60,alignItems:"center"}}>
        <Image
            style = {{height:187,width:326}}
            source={require('../images/waiting.png')}
        />
        </View>
        <Text style={{marginTop:10,marginLeft:65,fontSize:15}}>
{I18n.t("loading_record")}        </Text>
        <ActivityIndicator size="large" style={{marginTop:-90}} color="#FF8570"></ActivityIndicator>
        </View>
      )
    }
    if (reports.length >0) {
    const orders = reports.map((item) => {
     
      return (
        <View style={styles.card} key={item.employerId}> 
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("report",{appId:item.customerAppointmentId})}>
          <View style={{flexDirection: 'row', marginTop:5,  marginLeft:25}}>
         
            <Image
            style = {{height:50,width:50,marginRight:15,marginLeft:-10,borderRadius:25}}
            source = {item.businessEmployerImg?{uri:item.businessEmployerImg}:require("../images/telehealth_icon/service_doctor_img5.png")}
            />
          <View>
          <View style={{flexDirection:"row"}}>

            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.businessEmployerName}</Text>
            {item.type=="远程医疗"?<Image style={{height:15,width:15,marginTop:5,marginLeft:10}}source={require('../images/telehealth_icon/service_icon_video.png')}></Image>:null}
            </View>
            <View style={{flexDirection:"row"}}>
            {/*types*/}
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400',marginLeft:0,marginTop:10}}>{ I18n.t("gp") }</Text>
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginLeft:75,marginTop:8}}>{item.dateOfDiagnosis}</Text>

            </View>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
          
          </View>
          </TouchableOpacity>    

        </View>
      )
    })
    return (
      <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10,marginTop:60,marginBottom:20}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}
            style={{marginLeft:20}}>
            <Image
            style = {styles.arrow_image}
            source={require('../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:105,
        marginTop:23}}>{I18n.t("health_record")}</Text>
        </View>
        <View style={{marginTop:10}}>
        <Image
            style = {styles.topping_image}
            source={require('../images/telehealth_icon/service_img.png')}
        />
        </View>
        
        <View style={{alignItems:'center',marginTop:5}}>
        
        </View>
        <ScrollView style={{ flex:1,marginTop:-5,paddingTop:15,marginLeft:-30,maxHeight:600}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
        
      
      </View>
    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
        <View style={{flexDirection:"row"}}>
        <Text style={{
        fontSize:16,
        marginLeft:20,
        marginTop:-245}}>{I18n.t("health_record")}</Text>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {{width:30,
                height:30,
                marginTop:-250,
                marginLeft:-221,}}
            source={require('../images/icon/2/Arrow_left.png')}
            />
            </TouchableOpacity>
            </View>
      <Image
        style = {styles.finishImg}
        source = {require('../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>{I18n.t("no_record")}</Text>
     </View>
    )
  }
  }
}
HealthRecord.contextType = DataContext;
export default HealthRecord;