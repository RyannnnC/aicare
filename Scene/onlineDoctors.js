import React ,{Component,useContext}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import {styles} from '../style';

import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import DataContext from "../consumerContext";

//import moment from "moment"

class OnlineDoc extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        //secondsElapsed: 3600,
        search:"",
        candidates:[]
      };
    }

  setChange(value){
    this.setState({search:value});
  }
  splitString=(string)=>{
    let res = string.split(",").map(Number);
    return res;
  }
  componentDidMount(){
    console.log(this.props.route.params.Did)
    let url3 = "http://"+this.context.url+"/aicare-customer-api/customer/user/getServiceClassAndDoctor";
    fetch(url3,{
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
        //this.setState({query:json.page})
        //setLen(json.page.length)
        console.log(json.data.doctorInfoList);
        this.setState({candidates:json.data.doctorInfoList});
        //setOrder(json.page);
        //Alert.alert('查询成功');
        //console.log(json.page)
        //console.log("查询成功");
        //console.log(order)
      } else {
        console.log(json.msg);
        //Alert.alert('查询失败');
      }
    }).catch(error => console.warn(error));
  }
  render () {
    //console.log (this.state);
    if (this.state.candidates.length >0) {
    const orders = this.state.candidates.map((item) => {
      const types = item.serviceClass?this.splitString(item.serviceClass).map((sth) => {
        return (
            <Text style={{ marginTop:2,marginRight:5,fontSize:12, fontWeight: '400',color:'#666666'}}>{this.context.deptType[sth]}</Text>

        )
      }):null;
      return (
        <View style={styles.card} key={item.employerId}>
          <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("docInfo",{online:true,Did:this.props.route.params.Did,orgId:item.orgId,docId:item.businessUserId,docType:"全科",address:item.orgAddress,docName:item.employerName,queryId:item.employerId})}}>
            <View style={{flexDirection: 'row', marginTop:5,  marginLeft:25}}>

            <Image
            style = {{height:50,width:50,marginRight:15,marginLeft:-10}}
            source = {item.headPortrait?{uri:item.headPortrait}:require('../images/telehealth_icon/service_doctor_img1.png')}
            />
          <View >
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.employerName}</Text>
            <View style={{flexDirection:"row"}}>
            {types}</View>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400',marginLeft:0}}>{item.orgName}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
            <Image
              style = {{width: 20, height:20 , marginLeft:75, marginRight:1}}
              source = {require('../images/telehealth_icon/stars.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{5+" ("+1+"条评价)"}</Text>
            
          </View>
          </TouchableOpacity>    

        </View>
      )
    })
    return (
      <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10,marginTop:50}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {styles.arrow_image}
            source={require('../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:125,
        marginTop:23}}>名医推荐</Text>
        </View>
        <View style={{marginTop:10}}>
        <Image
            style = {styles.topping_image}
            source={require('../images/order_img.png')}
        />
        </View>
        <View style={{alignItems:'center',marginTop:0}}>
        
        </View>
        <ScrollView style={{ flex:1,marginTop:30,marginLeft:-30,maxHeight:550}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
        <Text style={{marginTop:20,marginLeft:115,fontSize:15,color:"grey"}}>下滑浏览所有推荐名医</Text>
      </View>
    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>目前没有可服务人员！</Text>
     </View>
    )
  }
  }
}
OnlineDoc.contextType = DataContext;
export default OnlineDoc;