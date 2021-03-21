import React, {Component} from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DateSelect from "./dateSelect";
import DataContext from '../../providerContext';

export default class PendingOrder extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      isEnabled: false,
      modalVisible: false,
    };
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = 'http://3.104.232.106:8084/aicare-business-api/business/appointment/query';
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
          if (json.code === 0) {
            console.log(json);
            this.setState({data:json.page});
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
    });
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
  if (this.state.data.length >0) {
  orders = this.state.data.map((item) => {
    return (
      <View style={styles.card2} key={item.id}>
        <View style={{flexDirection: 'row', marginTop:16, marginBottom:16, marginLeft:25}}>
        <Image
          style = {styles.pendingImg}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View>
          <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>{item.customerName}</Text>
          <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>+61 4165222222</Text>
        </View>
        </View>
        <View style={{flexDirection: 'row',paddingBottom: 10}}>
          <Image
            style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_time.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.appointDate}</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:79, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_type.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>全科</Text>
        </View>
        <View style={{flexDirection: 'row',paddingBottom: 12, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
          <Image
            style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
            source = {require('../../images/providerImg/schedule_icon_person.png')}
            />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>李医生</Text>
          <Image
            style = {{width: 15, height:15,marginLeft:141, marginRight:5}}
            source = {require('../../images/providerImg/order_icon_location.png')}
          />
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>实地预约</Text>
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
PendingOrder.contextType = DataContext;
