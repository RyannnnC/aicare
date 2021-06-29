import React,{Component} from 'react';
import { Platform,KeyboardAvoidingView,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ActivityIndicator} from 'react-native';
import {styles} from '../style';
import DataContext from "../consumerContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import * as Localization from 'expo-localization';

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
    this.setState({loading:true});
    Alert.alert("正在为您寻找医生，请稍等")


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
    const { members,press,image} = this.state;
    
    const orders = members.length>0?members.map((item,index)=>{
        return(
            <TouchableOpacity style={{width:150,height:50,borderRadius:30,borderWidth:1,alignItems:"center",paddingTop:10,marginBottom:10}}
            onPress={()=>{Alert.alert("已选择Kim。")}}>
            <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }):null;
  return (
    <KeyboardAwareScrollView
    enableOnAndroid={true}
    enableAutomaticScroll={(Platform.OS === 'ios')}
    style={{backgroundColor:"white"}}
    contentContainerStyle={{flex:1,backgroundColor: 'white',
    marginTop: -70,
    alignItems: 'center',}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{backgroundColor:"white"}}>
      <View style={{marginTop:70}}>
      {/*<View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:0}}>
          <Image style = {{height:20,width:20,marginTop:34}}
        source = {require('../images/telehealth_icon/signup_icon_phone.png')}
      />
      
      <Text style={{marginTop:35,marginLeft:10}}>人员列表</Text>
      </View>     
      {orders}*/}
      </View>
    
      
      <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:0}}>
      <View style={{width:300}}>
      <Text style={{marginTop:35,marginLeft:10}}>请仔细描述您的病情(如症状，患病时长，用药状况等)</Text>
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
      
      
      
      <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:0,width:300}}>
          
      
      <Text style={{marginTop:35,marginLeft:10}}>请问患者是否有相关病症照片等附件？请在此上传以便医生进行判断。(必填)</Text>
      </View>     
      {this.state.loading?<ActivityIndicator size="large" style={{marginTop:0}} color="#8FD7D3"></ActivityIndicator>:null}
      {this.state.image.length==0?null:
      <Image
      style = {{height:130,width:130,marginTop:14}}
      source={{ uri: this.state.image }}
 
      />
      
      }
      <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:280,
              marginTop:20,
              height:45,
              alignItems: 'center',
              borderRadius:25,}}
              onPress = {()=>Alert.alert(
                "照片上传",
                "您可以上传与病情相关的照片，请问请问你是要打开相机拍照还是从相册选择呢?",
                [
                  {text:"打开相机",
                    onPress:()=>this.launchCamera(),
                    
                },{
                  text:"从相册选择",
                  onPress:()=>this.pickImage()//navigation.navigate("登陆")
        
                },{
                    text:"取消",
                    style:"cancel"
                }
                
              ]
              )}>
        <Text style={{color:"white"}}>照片上传 +</Text>
      </TouchableOpacity>
      
      {image.length>0?
      <View>
      <Text style={{marginTop:40}}>  如填写完毕，请点击此处上传。</Text>
      <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:280,
              marginTop:30,
              height:45,
              alignItems: 'center',
              borderRadius:25,}}
              onPress = {()=>this.uploadComplain()}>
        <Text style={{color:"white"}}>{"提交"}</Text>
      </TouchableOpacity>
      </View>:null}
      <View style={{flexDirection:"row"}}>
      <Image style = {{marginTop:70,
    width:120,
    height:32,marginLeft:85}}
        source = {require('../images/logo.png')}
      />
      </View>
      
    </View>
    <View style={{height:100,backgroundColor:'white'}}></View> 
    </KeyboardAwareScrollView>
  );}
}

Patient_description.contextType = DataContext;