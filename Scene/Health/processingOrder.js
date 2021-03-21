import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {doctors} from './doctors';
import {data} from './data';
import DateSelect from "./dateSelect";
import Category from "./category";

export default class ProcessingOrder extends Component {
    constructor(props) {
      super(props);
      this.state={
        buttons: [],
        date: new Date(),
        isEnabled: false,
        modalVisible: false,
        Visible:false,
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
  setVisible = (visible) => {
    this.setState({ Visible: visible });
  }
  render () {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    console.log (this.state);
    if (data.length >0) {
    const orders = data.map((item) => {
      return (
        <View style={styles.cardHolder} key={item.id}>
        <View style={{flexDirection: 'row'}}>
        <Image
          style = {{width: 18, height:18,marginRight:14}}
          source = {require('../../images/providerImg/order_icon_org.png')}
        />
        <Text style={{fontSize:16, color:'#333333', fontWeight: '400'}}>{item.period}</Text>
        </View>
        <View style={styles.card3} key={item.id}>
          <View style={{flexDirection: 'row', marginTop:24, marginBottom:21, marginLeft:33}}>
          <Image
            style = {styles.pendingImg}
            source = {require('../../images/providerImg/home_img_person.png')}
          />
          <View>
            <Text style={{fontSize:16, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.phone}</Text>
          </View>
            <TouchableOpacity style={styles.orderButton3} >
              <Text style={{fontSize:14, color:'#FAFAFA'}}>修改</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row',marginBottom:33}}>
            <Image
              style = {{width: 15, height:15 , marginLeft:33, marginRight:5}}
              source = {require('../../images/providerImg/schedule_icon_person.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.doctor}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:42, marginRight:5}}
              source = {require('../../images/providerImg/schedule_icon_type.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.subject}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:41, marginRight:5}}
              source = {require('../../images/providerImg/schedule_icon_location.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.treatment}</Text>
          </View>
        </View>
        </View>
      )
    })
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:21,marginTop:30}}>
          <TouchableOpacity style={{flexDirection: 'row', marginRight:199,marginLeft:30}}
          onPress={()=>{this.setVisible(!this.state.Visible)}}>
            <Text style={{fontSize:13}}>全部</Text>
            <Image
              style = {{width: 13, height:13,marginLeft:5}}
              source = {require('../../images/providerImg/schedule_icon_filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', marginRight:30}}
          onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Text style={{fontSize:13}}>{month}/{date}</Text>
            <Image
              style = {{width: 13, height:13,marginLeft:5}}
              source = {require('../../images/providerImg/schedule_icon_calender.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex:1}}>
        <View style={{flexDirection: 'row', marginBottom:20}}>
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img1.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img2.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img3.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img4.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img5.png')}
          />
          <TouchableOpacity style={{alignItems:'center',justifyContent: "center", width:40,height:40,backgroundColor:'#ecf4f3',borderRadius:50,}}>
          <Text style={{fontSize:14, color:'#006a71'}}>+7</Text>
          </TouchableOpacity>
        </View>
        <SearchBar
        placeholder="搜索医生..."
        containerStyle= {{width: 315,height: 40,backgroundColor: '#ffffff',borderRadius: 16,marginBottom:20}}
        inputContainerStyle= {{width: 300,height: 30,backgroundColor: '#ffffff',borderRadius: 16}}
        inputStyle={{width: 290,height: 30,backgroundColor: '#ffffff',borderRadius: 16}}/>
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
         <View>
         <TouchableOpacity style={styles.next_wrapper}>
             <Text style={{color:'white'}}>确定</Text>
          </TouchableOpacity>
         </View>
        </ScrollView>
        </View>
        <>
        </>
         </Modal>
         <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.Visible}
        onRequestClose={()=>{
          this.setVisible(!this.state.Visible);}
        }
      >
      <View style={{marginTop:370,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
    <TouchableOpacity style={{marginRight:30}}  onPress={()=>{
          this.setVisible(!this.state.Visible);}
        }>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <ScrollView style={{backgroundColor:"#F7FAFA",}}>
        <View style={{marginLeft:130,marginBottom:10,marginTop:-15}}>
        <Text style = {styles.service}>类型筛选</Text>
        </View>
        <ScrollView horizontal={true} style={{marginLeft:20,maxHeight:210,paddingTop:5,height:130}}>
          <Category/>
        </ScrollView>
        <TouchableOpacity style={styles.next_wrapper} onPress={()=>{
          this.setVisible(!this.state.Visible);}
        }>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>
    </ScrollView>
        <View style={{height:20}}/>
        </View>
      </Modal>
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
