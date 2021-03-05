import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import {styles} from '../style';
import {data} from './order/data';
import { StackActions } from '@react-navigation/native';

//import moment from "moment"

export default class ConsumerProvider extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      /*this.state={
        //secondsElapsed: 3600,
        
        candidates:[]
      };*/
    }
  /*sendRequest=()=>{
    //var data={address:"UNSW Sydney,NSW",postcode:654,category:"plumber"};
    var qs = require('qs');
    console.log("send request");
    var url = "http://13.239.57.130:8081/aicare/all-providers";
    fetch(url, {
      //mode:"no-cors",
      method:"GET",
    }).then(data => data.json())
    .then((handledata)=>{this.setState({candidates:handledata});console.log(handledata)})
    .catch((error)=>{
      console.log("Api call error");
      alert(error.message);
   });
  }
*/
  /*componentDidMount = () => {
    console.log("send");
    this.sendRequest();
    console.log("finish")
  }*/
  
  render () {
    //console.log (this.state);
    if (data.length >0) {
    const orders = data.map((item) => {
      return (
        
        <View style={styles.card} key={item.id}>
          <View style={{flexDirection: 'row', marginTop:5, marginBottom:5, marginLeft:25}}>
          <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("ProviderInfo")}}>
            <Image
            style = {{height:40,width:40,marginRight:15,marginLeft:-10}}
            source = {require('../images/telehealth_icon/service_doctor_img5.png')}
            />
          </TouchableOpacity>    
          <View>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.address}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
            <Image
              style = {{width: 20, height:20 , marginLeft:70, marginRight:1}}
              source = {require('../images/telehealth_icon/stars.png')}
            />
      
            <Image
              style = {{width: 15, height:15,marginLeft:40, marginRight:5}}
              source = {require('../images/telehealth_icon/service_icon_location_green.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.price+'km'}</Text>
          </View>
          
        </View>
      )
    })
    return (

      <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {styles.arrow_image}
            source={require('../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{color:'#006A71',
        fontSize:16,
        marginLeft:125,
        marginTop:23}}>服务人选</Text>
        </View>
        <Image
            style = {styles.topping_image}
            source={require('../images/order_img.png')}
        />
        <Text style={{fontSize:14,color:"#006A71",marginLeft:30,marginTop:20}}>推荐</Text>
        <ScrollView style={{ flex:1,maxHeight:200}}>
        <View  style={{alignItems:'center'}}>
          {orders.slice(0,3)}
        </View>
        </ScrollView>
        <Text style={{fontSize:14,color:"#006A71",marginLeft:30,marginTop:5}}>全部</Text>
        <ScrollView style={{ flex:1}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("consumerMV")}}>
            <Image
                style={{width:70,height:70,marginLeft:300}}
                source = {require("../images/map.png")}
            />
        </TouchableOpacity>
      </View>
    )} else {
    return (
      <ScrollView style={{ flex:1,backgroundColor:"white"}}>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>目前没有可服务人员！</Text>
     </View>
     </ScrollView>
    )
  }
  }
}