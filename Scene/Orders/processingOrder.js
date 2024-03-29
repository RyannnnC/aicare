import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {data} from './data';
import moment from "moment"

export default class ProcessingOrder extends Component {
    constructor(props) {
      super(props);
      date: new Date();
      this.state={
        secondsElapsed: 3600,
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

  startAlert(index){
    Alert.alert(
      '确认',
      '您确定要结束订单倒计时吗？ 确定后需等待顾客方进行二次确认',
      [
        {text: '确定', onPress: () => this.pauseTime(index)},
        {text: '取消', onPress: () => console.log('OK button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }

  getHours() {
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

  render () {
    console.log (this.state);
    if (data.length >0) {
    const orders = data.map((item) => {
      return (
        <View style={styles.card} key={item.id}>
          <View style={{flexDirection: 'row', marginTop:16, marginBottom:16, marginLeft:25}}>
          <Image
            style = {styles.pendingImg}
            source = {require('../../images/providerImg/home_img_person.png')}
          />
          <View>
            <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.address}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
            <Image
              style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
              source = {require('../../images/providerImg/order_icon_phone.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.phone}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:130, marginRight:5}}
              source = {require('../../images/providerImg/order_iocn_money.png')}
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
              justifyContent: "center",
              alignItems: "center" ,
            }} onPress={this.state.buttons[item.id].pressed ? ()=>this.startAlert(item.id) : ()=>this.startTime(item.id)}>
              <Text style={{fontSize:14, color:'#FAFAFA'}}>开始</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:20}}>{this.getHours()} : {this.getMinutes()} : {this.getSeconds()}</Text>
        <ScrollView style={{ flex:1}}>
          {orders}
        </ScrollView>
      </SafeAreaView>
    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/providerImg/order_img_empty_inprogress1.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有新订单哦，快去接取吧！</Text>
     </View>
    )
  }
  }
}
