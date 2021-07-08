import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,Alert,ActivityIndicator} from 'react-native';
import {styles} from '../style';
//import {data} from './docdata';
import { StackActions } from '@react-navigation/native';
//import { SearchBar } from 'react-native-elements';
//import DateFilter from "./datefilter";
import DataContext from "../consumerContext";
import * as Linking from 'expo-linking';
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
//import { UserOfflineReason } from 'react-native-agora';

//import moment from "moment"

class prescription extends Component {
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
      let url = "http://"+this.context.url+"/aicare-customer-api/customer/user/chief-complaint-pdf-list?customerUserinfoId="+this.context.customerUserInfoId;
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
                this.setState({loading:false})

              if (json.code == 0) {
                //console.log(json.businessEmployer[0].businessUserId);
                this.setState({reports:json.data});
                console.log(json.data);
                //console.log(json.reports[1]);
                //Alert.alert('查询成功');
              } else {
                //console.log(json.code)
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
        marginTop:20}}>电子处方</Text>
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
          正在搜索相关医生，请耐心等待..
        </Text>
        <ActivityIndicator size="large" style={{marginTop:-90}} color="#FF8570"></ActivityIndicator>
        </View>
      )
    }
    if (reports&&reports.length >0) {
    const orders = reports.map((item) => {
    let date = moment(item.appointDate).tz(Localization.timezone).format('DD/MM/YYYY')
      if(item.chiefcomplaintpdfUrl){
      return (
        <View style={{
            width: 315,
            backgroundColor: '#ffffff',
            borderRadius: 15,
          }} key={item.employerId}> 
            <View style={{flexDirection: 'row',}}>

          <Text style={{marginBottom:10,marginLeft:15,marginTop:10,fontSize:15,fontWeight:"500",color:"#006A71"}}>处方总览</Text>
          <View style={{
            width: 150,marginLeft:30,
            borderColor:"#68B0AB",
            height:20,
            marginTop:10,
            borderRadius: 15,
            borderWidth:0.5,paddingLeft:3,paddingTop:2
          }}>
              <Text style={{fontSize:11,color:"#68B0AB"}}>
                  处方号：
              </Text>
              </View> 
          </View>
          <View style={{flexDirection: 'row', marginTop:5,  marginLeft:25}}>
         
            <Image
            style = {{height:50,width:50,marginRight:15,marginLeft:-10,borderRadius:25}}
            source = {item.headportraitUrl?{uri:item.headportraitUrl}:require("../images/telehealth_icon/service_doctor_img5.png")}
            />
          <View>
          <View style={{flexDirection:"row"}}>

            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.employerName}</Text>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '300',marginLeft:30,marginTop:2}}>{item.serviceClassName}</Text>

            </View>
            
            {item.orgName?<Text style={{fontSize:12, color:'#666666', fontWeight: '400',marginLeft:0,marginBottom:2}}>{item.orgName}</Text>:null}
            <View style={{flexDirection:"row"}}>
            {/*types*/}
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400',marginLeft:0,marginTop:5}}>{ date }</Text>
            <TouchableOpacity onPress={()=>Linking.openURL(item.chiefcomplaintpdfUrl)}>

            <Image
            style = {{height:30,width:30,marginLeft:110}}
            source = {require("../images/clarity_download-line2.png")}
            />
            </TouchableOpacity>
            </View>
            <View style={{height:10}}></View>
          </View>
          </View>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
          
          </View>

        </View>
      )}
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
        marginTop:23}}>电子处方</Text>
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
        marginTop:-245}}>电子病历</Text>
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
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您目前还没有已登记的就诊记录。</Text>
     </View>
    )
  }
  }
}
prescription.contextType = DataContext;
export default prescription;