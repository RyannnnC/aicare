import React, {Component} from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {data} from './data';

export default class PendingOrder extends Component {
  constructor(props) {
    super(props);
    this.state={
      buttons: []
    };
  }


  componentDidMount = () => {
    console.log("set buttons work")
    var i=0;
    let butt=[];
    while (i < data.length) {
      butt.push({ backgroundColor: '#68B0AB', pressed: false,id:i});
      i++;
    }
    this.setState({buttons:butt});
  }

  startAlert(index){
    Alert.alert(
      '提醒',
      '您确定要接受这桩订单吗？',
      [
        {text: '确定', onPress: () => console.log('yes button clicked')},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }

  render() {
  let orders;
  if (data.length >0) {
  orders = data.map((item) => {
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
            source = {require('../../images/providerImg/order_icon_time.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.time}</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:130, marginRight:5}}
            source = {require('../../images/providerImg/order_iocn_money.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.price}</Text>
        </View>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={styles.orderButton2} onPress ={this.startAlert} >
            <Text style={{fontSize:14, color:'#FAFAFA'}}>接受</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>拒绝</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  })
  return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView style={{ flex:1}}>
        {orders}
      </ScrollView>
    </SafeAreaView>
  )} else {
    return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <Image
       style = {styles.finishImg}
       source = {require('../../images/providerImg/order_img_empty1.png')}
     />
    <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有新订单哦，耐心等待一下吧！</Text>
    </View>
 )};
  }
}
