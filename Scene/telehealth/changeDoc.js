import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,Alert} from 'react-native';
import {styles} from '../../style';
import {data} from './docdata';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import DateFilter from "./datefilter";
import DataContext from "../../consumerContext";

//import moment from "moment"

class changeDoc extends Component {
  constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        //secondsElapsed: 3600,
        modalVisible: false,
        Visible:false,
        search:"",
        candidates:[],
        docs:[],
      };
    }
  setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }  
  setVisible = (visible) => {
      this.setState({ Visible: visible });
    }  

  componentDidMount = () => {
    console.log(this.props.route.params.address);

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/query-doctors?"+"orgId=".concat(this.props.route.params.orgId);
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
              if (json.code == 0) {
                console.log(json.businessEmployer[0].businessUserId);
                this.setState({docs:json.businessEmployer});
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
    });
  }
  setChange(value){
    this.setState({search:value});
  }
 
  render () {
    //console.log (this.state);
    const { modalVisible,Visible,docs } = this.state;

    if (docs.length >0) {
    const orders = docs.map((item) => {
      return (
        <View style={styles.card} key={item.id}> 
        <TouchableOpacity onPress={() =>{
          //console.log(this.props.route.params.orgId)
          console.log(this.props.route.params.doctype);

          this.props.navigation.navigate("changeDocInfo",{orgId:this.props.route.params.orgId,docId:item.businessUserId,doctype:this.props.route.params.doctype,address:this.props.route.params.address,docName:item.name,id:this.props.route.params.id})}}>
          <View style={{flexDirection: 'row', marginTop:5,  marginLeft:25}}>
         
            <Image
            style = {{height:50,width:50,marginRight:15,marginLeft:-10}}
            source = {require("../../images/telehealth_icon/service_doctor_img5.png")}
            />
          <View>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.serviceClass + " - "+ this.props.route.params.name}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
            <Image
              style = {{width: 20, height:20 , marginLeft:75, marginRight:1}}
              source = {require('../../images/telehealth_icon/stars.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{5+" ("+1+"条评价)"}</Text>
          </View>
          </TouchableOpacity>    

        </View>
      )
    })
    return (
      <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10,marginTop:0,marginBottom:20}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}
            style={{marginLeft:20}}>
            <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:105,
        marginTop:23}}>医生选择</Text>
        </View>
        <View style={{marginTop:5}}>
        <TouchableOpacity style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 2,
                },
                shadowOpacity: 0.150,
                shadowRadius: 3.05,

                elevation: 2,}}
                onPress={() =>{
                  this.props.navigation.navigate("ClinicInfo")}}>
        <Image
            style = {{marginLeft:40,height:165,width:340,borderRadius:30}}
            source={require('../../images/clinic_top.png')}
        />
        </TouchableOpacity>
        </View>
        <View style ={{flexDirection:'row',marginTop:15}}>
        <Text style={{marginLeft:50,color:"#333333",fontSize:14,marginTop:5}}>科目</Text>
      <TouchableOpacity onPress={()=>{
          this.setVisible(true)}
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
        <View style={{alignItems:'center',marginTop:5}}>
        
        </View>
        <ScrollView style={{ flex:1,marginTop:-5,paddingTop:13,marginLeft:-30,maxHeight:500}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>抱歉，该诊所目前没有可服务的医生！</Text>
     </View>
    )
  }
  }
}
changeDoc.contextType = DataContext;
export default changeDoc;