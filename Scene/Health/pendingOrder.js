import React, {Component} from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {data} from './data';
import DateSelect from "./dateSelect";

export default class PendingOrder extends Component {
  constructor(props) {
    super(props);
    this.state={
      buttons: [],
      isEnabled: false,
      modalVisible: false,
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
  setIsEnabled = (value) => {
    this.setState({isEnabled: value})
  }
  setModalVisible = (value) => {
    this.setState({modalVisible: value})
  }
  startAlert(index){
    Alert.alert(
      '提醒',
      '您确定要接受这桩预约吗？',
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
      <View style={styles.card2} key={item.id}>
        <View style={{flexDirection: 'row', marginTop:16, marginBottom:16, marginLeft:25}}>
        <Image
          style = {styles.pendingImg}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View>
          <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
          <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.phone}</Text>
        </View>
        </View>
        <View style={{flexDirection: 'row',paddingBottom: 10}}>
          <Image
            style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_time.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.time}</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:79, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_type.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.subject}</Text>
        </View>
        <View style={{flexDirection: 'row',paddingBottom: 12, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
          <Image
            style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_person.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.doctor}</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:141, marginRight:5}}
            source = {require('../../images/providerImg/order_icon_location.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.treatment}</Text>
        </View>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={styles.orderButton2} onPress={() => this.startAlert(item.id)}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>接受</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Text style={{fontSize:14, color:'#FAFAFA'}}>修改</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  })
  return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" , backgroundColor:'white'}}>
      <ScrollView style={{ flex:1}}>
        {orders}
        <Modal
         animationType="slide"
         transparent={true}
         visible={this.state.modalVisible}
         onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>
         <View style={{marginTop:200,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
         shadowOffset: {
   	       width: 0,
   	       height: 12,
         },
         shadowOpacity: 0.58,
         shadowRadius: 16.00,
         elevation: 24,}}>
     <TouchableOpacity onPress={() =>{this.setModalVisible(!this.state.modalVisible)}} style={{marginRight:30}}>
       <Image
         style = {styles.arrow_image}
         source={require('../../images/icon/2/Arrow_left.png')}
       />
     </TouchableOpacity>
     <ScrollView style={{backgroundColor:"#F7FAFA", marginBottom:20}}>
       <DateSelect/>
     <TouchableOpacity style={styles.next_wrapper}>
           <Text style={{color:'white'}}>确定</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
      <>
      </>
       </Modal>
      </ScrollView>
    </SafeAreaView>
  )} else {
    return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor:'white'}}>
     <Image
       style = {styles.finishImg}
       source = {require('../../images/providerImg/order_img_empty1.png')}
     />
    <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有新订单哦，耐心等待一下吧！</Text>
    </View>
 )};
  }
}
