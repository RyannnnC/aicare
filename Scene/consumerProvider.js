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
      this.state={
        //secondsElapsed: 3600,
        buttons: [
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:0},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:1},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:2},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:3},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:4},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:5},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:6},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:7},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:8},
          { backgroundColor: '#68B0AB', pressed: false,timeSlot: 0,id:9},
        ]
      };
    }


  componentDidMount = () => {
    console.log("set buttons work")
    var i=0;
    let butt=[];
    while (i < data.length) {
      butt.push({ backgroundColor: '#68B0AB', pressed: false,timeSlot: data[i].timeSlot, id:i });
      i++;
    }
    this.setState({buttons:butt});
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
  render () {
    //console.log (this.state);
    if (data.length >0) {
    const orders = data.map((item) => {
      return (
        <View style={styles.card} key={item.id}>
          <View style={{flexDirection: 'row', marginTop:5, marginBottom:5, marginLeft:25}}>
          <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("ProviderInfo")}} >
            <Image
            style = {styles.pendingImg}
            source = {require('../images/home_img_person.png')}
            />
          </TouchableOpacity>    
          <View>
            <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.address}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
            <Image
              style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
              source = {require('../images/order_icon_phone.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.phone}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:50, marginRight:5}}
              source = {require('../images/order_iocn_money.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.price}</Text>
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
          {orders}
        </View>
        </ScrollView>
        <Text style={{fontSize:14,color:"#006A71",marginLeft:30,marginTop:5}}>全部</Text>
        <ScrollView style={{ flex:1}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
        <TouchableOpacity onPress = {() =>{
            this.props.navigation.navigate("consumerMV")}}>
            <Image
                style={{width:70,height:70,position:"absolute",borderRadius:30,bottom:80,right:35}}
                source = {require("../images/map.png")}
            />
        </TouchableOpacity>
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