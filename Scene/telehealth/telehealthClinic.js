import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal } from 'react-native';
import {styles} from '../../style';
import {data} from './data';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import DateFilter from "./datefilter";

//import moment from "moment"

export default class telehealthClinic extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        modalVisible: false,
        Visible:false,
        search:"",
        candidates:[]
      };
    }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }  
  setVisible = (visible) => {
    this.setState({ Visible: visible });
  }  
  sendRequest=()=>{
    //var data={address:"UNSW Sydney,NSW",postcode:654,category:"plumber"};
    var qs = require('qs');

    console.log("send request");
    var url = "http://13.239.57.130:8081/aicare/all-providers";
    fetch(url, {
      //mode:"no-cors",
      method:"GET",
    }).then((data) => {console.log(data.json())});
  }

  componentDidMount = () => {
    
    console.log("send")
  }

 
  render () {
    const { modalVisible,Visible } = this.state;

    //console.log (this.state);
    if (data.length >0) {
    const orders = data.map((item) => {
      return (
        <View style={styles.card} key={item.id}>
          <View style={{flexDirection: 'row', marginTop:5, marginBottom:5, marginLeft:25}}>
          <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("ClinicInfo")}}>
            <Image
            style = {{height:40,width:40,marginRight:15,marginLeft:-10}}
            source = {item.img}
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
              source = {require('../../images/telehealth_icon/stars.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.score.toFixed(1)+" ("+item.commentNum+"条评价)"}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:40, marginRight:5}}
              source = {require('../../images/telehealth_icon/service_icon_location_green.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.price+'km'}</Text>
          </View>
          
          
        </View>
      )
    })
    return (
      <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:125,
        marginTop:20}}>诊所选择</Text>
        </View>
        <View style={{marginTop:10}}>
        <Image
            style = {styles.topping_image}
            source={require('../../images/order_img.png')}
        />
        </View>
        <View style ={{flexDirection:'row',marginTop:10}}>
      <TouchableOpacity onPress={()=>{
          this.setVisible(true)}
        }>
      <Image style={{marginLeft:60,width:30,height:30}}
          source = {require('../../images/telehealth_icon/科目选择.png')}
        />
      </TouchableOpacity>  
      <TouchableOpacity onPress={()=>{
          this.setModalVisible(true)}
        }>
      <Image style = {{marginTop:4,width:30,height:30,marginLeft:230}}
        source= {require('../../images/telehealth_icon/时间选择.png')}
      />
    </TouchableOpacity>
    </View>
        <View style={{alignItems:'center',marginTop:10}}>
        <SearchBar
          round
          //searchIcon={{ size: 24 }}
          //onChangeText={(text) => searchFilterFunction(text)}
          //onClear={(text) => searchFilterFunction('')}
          containerStyle={{backgroundColor:'white',width:355,height:40,shadowColor:"000000",shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
            borderRadius:25}}
          inputStyle={{color:'black',fontSize:14}}
          inputContainerStyle={{backgroundColor:'white',height:15}}
          lightTheme={true}
          placeholder="搜索诊所..."
          onChangeText={this.setChange}
          
          value={this.state.search}
        />
        </View>
        <ScrollView style={{ flex:1,marginTop:30,marginLeft:-30,maxHeight:500}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("TelehealthMV")}}>
            <Image
                style={{width:70,height:70,position:"absolute",borderRadius:30,bottom:80,right:35}}
                source = {require("../../images/map.png")}
            />
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
          this.setModalVisible(!modalVisible);}
        }
      >
      <View style={{marginTop:310,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
    <TouchableOpacity style={{marginRight:30}}  onPress={()=>{
          this.setModalVisible(!modalVisible);}
        }>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
      <DateFilter/>

        <TouchableOpacity style={styles.next_wrapper} onPress={()=>{
          this.setModalVisible(!modalVisible);}
        }>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>
        <View style={{height:20}}/>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Visible}
        onRequestClose={()=>{
          this.setVisible(!Visible);}
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
          this.setVisible(!Visible);}
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
        <View style={{flexDirection: 'row', marginBottom: 45}}>
        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FEA495',
                            padding:20,
                            width:80,
                            marginLeft:20,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            >
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_gp.png')}
          />
          <Text style={{color:'#FFFFFF',marginTop:2}}>全科</Text>

          </TouchableOpacity>
          </View>

          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            >
          <Image
            style={{width:34,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_child.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>儿科</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            >
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_mental.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>心理</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            >
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/中医.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>中医</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            >
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/康复.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>康复</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                }}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            
                            >
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_dentist.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>牙医</Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
        

        <TouchableOpacity style={styles.next_wrapper} onPress={()=>{
          this.setVisible(!Visible);}
        }>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>
    </ScrollView>

        <View style={{height:20}}/>
        </View>
      </Modal>
    
        
      </View>
    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>目前没有可服务人员！</Text>
     </View>
    )
  }
  }
}