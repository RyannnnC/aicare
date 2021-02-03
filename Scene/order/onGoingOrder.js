import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import {styles} from '../../style';
import {data} from './data';
//import moment from "moment"

export default class OngoingingOrder extends Component {
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
            <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.address}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
            <Image
              style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
              source = {require('../../images/order_icon_phone.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.phone}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:50, marginRight:5}}
              source = {require('../../images/order_iocn_money.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.price}</Text>
          </View>
          <View style={{flexDirection: 'row-reverse'}}>
            <TouchableOpacity style={{
              width: 75,
              height: 30,
              backgroundColor: this.state.buttons[item.id].backgroundColor,
              borderRadius: 10,
              textAlign: 'center',
              marginRight: 25,
              marginTop: 15,
            }} >
              <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:14}}>未开始</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
        
        <ScrollView style={{ flex:1}}>
          {orders}
        </ScrollView>
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