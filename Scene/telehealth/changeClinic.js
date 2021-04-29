import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,Alert,ActivityIndicator } from 'react-native';
import {styles} from '../../style';
import {data} from './data';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import DateFilter from "./datefilter";
import DataContext from "../../consumerContext";
//import { UserOfflineReason } from 'react-native-agora';


//import moment from "moment"

class changeClinic extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        modalVisible: false,
        Visible:false,
        search:"",
        candidates:[],
        clinics:[],
        loading:true,
      };
    }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }  
  setVisible = (visible) => {
    this.setState({ Visible: visible });
  }  
  sendRequest=()=>{
    let url2 = "http://"+this.context.url+"/aicare-customer-api/customer/user/query-clinic-info?";

    if (this.props.route.params.type==true){
      url2=url2.concat("areaName=".concat(this.props.route.params.return));
      url2=url2.concat("&state=".concat(this.props.route.params.state));
      
    }else{
      url2=url2.concat("postCode=".concat(this.props.route.params.return));
    }
            fetch(url2,{
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
              if (json.code == 0) {
                console.log(json.sysDeptInfo);
                this.setState({clinics:json.sysDeptInfo})
                this.setState({loading:false})
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.sendRequest();
    })}
    


 
  render () {
    const { modalVisible,Visible,clinics,loading} = this.state;
    if (loading){
      return (
        <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10,marginLeft:20}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:105,
        marginTop:20}}>诊所选择</Text>
        </View>
        <View style={{marginTop:10}}>
        <Image
            style = {styles.topping_image}
            source={require('../../images/order_img.png')}
        />
        </View>
        <View style={{marginTop:60,alignItems:"center"}}>
        <Image
            style = {{height:187,width:326}}
            source={require('../../images/waiting.png')}
        />
        </View>
        <Text style={{marginTop:10,marginLeft:65,fontSize:15}}>
          正在搜索相关诊所，请耐心等待..
        </Text>
        <ActivityIndicator size="large" style={{marginTop:-90}} color="#FF8570"></ActivityIndicator>
        </View>
      )
    }
    //console.log (this.state);
    if (clinics.length >0) {
    const orders = clinics.map((item) => {
      return (
        <View style={styles.card} key={item.id}>
           <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("changeDoc",{orgId:item.orgId,name:item.name,doctype:this.props.route.params.doctype,address:item.address,item:item})}}
            >
          <View style={{flexDirection: 'row', marginTop:5, marginBottom:5, marginLeft:25}}>
         
            <Image
            style = {{height:40,width:40,marginRight:15,marginLeft:-10}}
            source = {item.orgImg?{uri: item.orgImg}:require('../../images/telehealth_icon/service_telehealth_select_img_clinic1.png')}
            />
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
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{5+" (1条评价)"}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:40, marginRight:5}}
              source = {require('../../images/telehealth_icon/service_icon_location_green.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{'未知km'}</Text>
          </View>
          </TouchableOpacity>
          
        </View>
      )
    })
    return ( 


      <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10,marginLeft:20}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:105,
        marginTop:20}}>诊所选择</Text>
        </View>
        <View style={{marginTop:10}}>
        <Image
            style = {styles.topping_image}
            source={require('../../images/order_img.png')}
        />
        </View>
        <View style ={{flexDirection:'row',marginTop:15}}>
        <Text style={{marginLeft:50,color:"#333333",fontSize:14,marginTop:5}}>科目</Text>
      <TouchableOpacity onPress={()=>{
          this.setVisible(true);
          console.log(this.props.route.params.doctype)}
        }>
      <Image style={{width:25,height:25,marginLeft:10}}
          source = {require('../../images/telehealth_icon/科目选择.png')}
        />
      </TouchableOpacity>  
      <Text style={{marginLeft:170,color:"#333333",fontSize:14,marginTop:5}}>日期</Text>

      <TouchableOpacity onPress={()=>{
          this.setModalVisible(true)}
        }>
      <Image style = {{marginTop:4,width:25,height:25,marginLeft:10}}
        source= {require('../../images/telehealth_icon/时间选择.png')}
      />
    </TouchableOpacity>
    </View>
        <View style={{alignItems:'center',marginTop:10}}>
        {/*<SearchBar
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
        />*/}
        </View>
        <ScrollView style={{ flex:1,marginTop:30,marginLeft:-30,maxHeight:500}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
        {/*<TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("TelehealthMV")}}>
            <Image
                style={{width:70,height:70,marginLeft:300}}
                source = {require("../../images/map.png")}
            />
        </TouchableOpacity>*/}
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
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity style={{marginRight:30,marginLeft:25}}  onPress={()=>{
          this.setModalVisible(!modalVisible);}
        }>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
      
    </TouchableOpacity>
    <View style={{marginTop:-15}}></View>
        <Text style = {{color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:70,}}>时间筛选</Text>
    </View>
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
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity style={{marginRight:0,marginLeft:20}}  onPress={()=>{
          this.setVisible(!Visible);}
        }>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
      <View style={{marginLeft:130,marginBottom:10,marginTop:-15}}>
        <Text style = {{color:'black',
    fontSize:17,
    marginTop:-8,
    marginLeft:20,}}>类型筛选</Text>
        </View>
    </TouchableOpacity>
    </View>
      <ScrollView style={{backgroundColor:"#F7FAFA",}}>
        
        <View style={{flexDirection: 'row', marginBottom: 20,marginTop:20}}>
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
                            onPress={()=>{
                              this.setVisible(!Visible);}
                            }
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
                            onPress={()=>{
                              this.setVisible(!Visible);}
                            }
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
                            onPress={()=>{
                              this.setVisible(!Visible);}
                            }
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
                            onPress={()=>{
                              this.setVisible(!Visible);}
                            }
                            >
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/中医.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>中医</Text>

          </TouchableOpacity>
          </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 45}}>

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
                            onPress={()=>{
                              this.setVisible(!Visible);}
                            }
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
                            onPress={()=>{
                              this.setVisible(!Visible);}
                            }
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

        <View style={{height:20}}/>
        </View>
      </Modal>
    
        
      </View>
    )} else {
      let value = this.context;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white"}}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>抱歉，该区域目前没有可服务的{value.deptType[this.props.route.params.doctype]}诊所。</Text>
     </View>
    )
  }
  }
}

changeClinic.contextType = DataContext;

export default changeClinic;