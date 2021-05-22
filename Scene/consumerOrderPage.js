import React,{useState,useEffect, useContext} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../style';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import ProcessingOrder from './order/processingOrder';
import CompletedOrder from './order/completedOrder';
import ConsumerPaySuccess from "./consumerPaySuccess"
import OngoingingOrder from './order/onGoingOrder';
import DataContext from "../consumerContext";

export default function ConsumerOrderPage() {
  const [num, setNum] = useState(0);
  const user = useContext(DataContext)
  const Tab = createMaterialTopTabNavigator();
  useEffect(() => {
    let polling = setInterval( ()=>updateRequest(), 2000);
      return ( ()=>{
         clearInterval(polling);
      });
    
    },[])
  updateRequest=()=>{
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
    let url = "http://"+user.url+"/aicare-customer-api/customer/user/query-appointment?appointDate="+date+"&dateFlg=1";
            fetch(url,{
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
              headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
              'sso-auth-token': user.token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code == 0) {
                //this.setState({query:json.page})
                setNum(json.page.length)
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                //Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
          }
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <Image
        style = {{height:90,width:300,marginLeft:50,marginTop:10}}
        source = {require('../images/ordertop.png')}
      />
      <Tab.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name={"订单"+"("+num+")"} component={OngoingingOrder} />
      </Tab.Navigator>
    </View>
  );
}