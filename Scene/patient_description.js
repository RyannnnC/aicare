import React,{Component} from 'react';
import { Platform,KeyboardAvoidingView,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ActivityIndicator,Modal} from 'react-native';
import {styles} from '../style';
import DataContext from "../consumerContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import * as Localization from 'expo-localization';
import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
//import ImageViewer from 'rn-image-zoom-viewer';
import ImageView from 'react-native-image-view';
import I18n from "./language"

export default class Patient_description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      image:"",
      loading:false,
      members:[],
      press:[],
      id:"",
      zoom:false,
    }
    
    
      
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({visible:false});
    if (!result.cancelled) {
      this.setState({image:result.uri});
    }
  };

  launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      //this.setState({loading:true})
      this.setState({image:result.uri});
      //this.setState({loading:false})
    }
  };
  
  uploadComplain(){
    if(this.state.image.length==0){
      Alert.alert(I18n.t("online_alert1"))
      return;
    }
    this.setState({loading:true});
    Alert.alert(I18n.t("online_loading"))


    let data = new FormData();
            data.append('filename', 'avatar');
            data.append('file', {
              uri: this.state.image,
              name:  '1.jpg',
              type: 'image/jpg'
            });
    let url = 'http://'
      +this.context.url
      +'/aicare-customer-api/customer/chiefcomplaint/save?info='+this.state.name;
      fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Content-Type': 'multipart/form-data',

        'sso-auth-token': this.context.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
        },
        body: data
     
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({loading:false})
        if (json.code === 0) {
          //this.setState({members:json.infos});
          //this.setState({press:new Array(members.length).fill(true)})
          console.log(json.id)
          //console.log(json.infos);
          this.props.navigation.navigate("onlineDoc",{Did:json.id})
        } else {
          console.log(json.msg)
          Alert.alert('网络异常');
        }
      }).catch(error => console.warn(error));
  }
   goBack= () => {
    this.props.navigation.dispatch(StackActions.pop(1))
  }
  async componentDidMount (){
    //this.setState({loading:true});

    /*let url = 'http://'
      +this.context.url
      +'/aicare-customer-api/customer/customer-info/all-users';
      await fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'sso-refresh-token': this.context.refresh_token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
        },
     
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({loading:false})
        if (json.code === 0) {
          this.setState({members:json.infos});
          //this.setState({press:new Array(members.length).fill(true)})
          console.log(json.infos);
        } else {
          console.log(json.msg)
          Alert.alert('人员列表获取失败');
        }
      }).catch(error => console.warn(error));*/
    
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
    const { c_status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: c_status === "granted" });
  }
  
  
  
  
  /*loginRequest() {
    let s = this.state;
    let errors=[];
    if (s.name.length === 0) {
        errors.push("Enter an account");
    }
    if (s.password.length === 0) {
        errors.push("Enter a password");
    }
    let url = 'http://'+this.context.url+'/aicare-customer-api/customer/user/login?'
    +'loginName='+ s.name
    +'&passWord=' + s.password
    +"&appType=4" +"&loginType="+s.type;
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) =>  {
        console.log(url);
        if (json.code === 0) {
          //this.context.action.changeLogin(true);
          this.storeToken(json.data);
          this.context.action.changetoken(json.data);
          console.log(json.code)
        } else {
          Alert.alert("Invalid username or password");  
          console.log(json.msg)
          //this.context.action.changeLogin(true);//need to remove this
        }
    })

  }*/
  render(){
    const { members,press,image,zoom} = this.state;
    
    const orders = members.length>0?members.map((item,index)=>{
        return(
            <TouchableOpacity style={{width:150,height:50,borderRadius:30,borderWidth:1,alignItems:"center",paddingTop:10,marginBottom:10}}
            onPress={()=>{Alert.alert("已选择Kim。")}}>
            <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }):null;
  return (
    <ScrollView
    style={{backgroundColor:"white"}}
    contentContainerStyle={{flex:1,backgroundColor: 'white',
    marginTop: -70,
    alignItems: 'center',}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{backgroundColor:"white"}}>
      <View style={{marginTop:70}}>
      
      </View>
      <View style={{flexDirection: 'row', marginTop:70, marginBottom:10}}>
            <TouchableOpacity onPress={this.goBack}>
            <Image
            style = {{width:30,
                height:30,
                marginTop:0,
                marginLeft:0,}}
            source={require('../images/icon/2/Arrow_left.png')}
            />
            </TouchableOpacity>
            <Text style={{
              fontSize:16,

              marginTop:3,marginLeft:85}}>{I18n.t("online_title")}</Text>
          </View>
          <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:0,width:340}}>
          
      
      <Text style={{marginTop:15,marginLeft:0,color:"#68B0AB"}}>{I18n.t("online_text1")}</Text>
      </View>  
          <Text style={{fontSize:18,fontWeight:"500",marginLeft:0,marginTop:15}}>{I18n.t("description")}</Text>

      <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:0}}>
      <View style={{width:330}}>
      <Text style={{marginTop:15,marginLeft:0}}>{I18n.t("online_text2")}</Text>
      </View>
      {/*<TouchableOpacity style={{    borderColor:"#999999",
      borderWidth:1,
    padding:8,
    width:120,
    marginTop:40,
    height:35,
    marginLeft:-120,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>this.switch()}>
      <Text style={{fontSize:12}}>{this.state.text}</Text>
    </TouchableOpacity>*/}
      </View>
      <TextInput
      multiline={true}
      maxLength={85}
      style = {{
        height:105,
        
        width:300,
        borderWidth:1,
        marginLeft: 5,
        paddingLeft:5,
        borderColor: '#ccc',
        borderRadius: 4,
        textAlignVertical: 'top'
      }}
      placeholder={this.state.text1}
      defaultValue=""
      //keyboardType={Platform.OS != "ios" ? "numeric" : "number-pad"}
      onChangeText={(text) => {this.setState({ name: text})}}
      />
      
      
      <Text style={{fontSize:18,fontWeight:"500",marginLeft:0,marginTop:30}}>{I18n.t("attachment")}</Text>
      <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:0,width:330}}>
          
      
      <Text style={{marginTop:15,marginLeft:0}}>{I18n.t("online_text3")}</Text>
      </View>     
      {this.state.loading?<ActivityIndicator size="large" style={{marginTop:0}} color="#8FD7D3"></ActivityIndicator>:null}
      <View style={{flexDirection:"row"}}>
      {this.state.image.length==0?null:
      <TouchableOpacity onPress={()=>this.setState({zoom:true})}>
      <Image
      style = {{height:100,width:100,marginTop:14}}
      source={{ uri: this.state.image }}
 
      />
      </TouchableOpacity>
      }
      <ImageView
      images={[{
        source: {
            uri: this.state.image,
        },
        title: 'patient',
        width: 806,
        height: 720,

    }]}
      imageIndex={0}
      isVisible={this.state.zoom}
      onClose={()=>(this.setState({zoom:false}))}
      ></ImageView>
      <TouchableOpacity style={{
              marginTop:20,
              alignItems: 'center',
           }}
              onPress = {()=>Alert.alert(
                I18n.t("upload_image_title"),
                I18n.t("upload_image_text"),
                [
                  {text:I18n.t("open_camera"),
                    onPress:()=>this.launchCamera(),
                    
                },{
                  text:I18n.t("open_album"),
                  onPress:()=>this.pickImage()//navigation.navigate("登陆")
        
                },{
                    text:I18n.t("cancel"),
                    style:"cancel"
                }
                
              ]
              )}>
        <Image
      style = {{height:100,width:100,marginTop:0,marginLeft:100}}
      source={require('../images/plus.png')} 
      />
      </TouchableOpacity>
      
      </View>
      <View>
      <View style={{width:330}}>
      <Text style={{marginTop:40,marginLeft:0}}>{/*I18n.t("online_text4")*/}</Text>
      </View>
      <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:280,
              marginTop:30,
              height:45,
              alignItems: 'center',
              marginLeft:20,
              borderRadius:25,}}
              onPress = {()=>this.uploadComplain()}>
        <Text style={{color:"white"}}>{I18n.t("submit")}</Text>
      </TouchableOpacity>
      </View>
      
      <View style={{flexDirection:"row"}}>
      <Image style = {{marginTop:70,
    width:120,
    height:32,marginLeft:85}}
        source = {require('../images/logo.png')}
      />
      </View>
      
    </View>

    <View style={{height:100,backgroundColor:'white'}}></View> 
    </ScrollView>
  );}
}

Patient_description.contextType = DataContext;