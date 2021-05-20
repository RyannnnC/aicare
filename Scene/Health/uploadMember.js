import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator  } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons ,AntDesign} from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements';
import moment from 'moment-timezone';
import DataContext from '../../providerContext';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import * as Localization from 'expo-localization';
import I18n from '../switchLanguage';
export default class UploadMember extends Component {
    constructor(props) {
      super(props);
      this.state={
        name:"",
        phone:"",
        email:'',
        schedulevos:[],
        image:null,
        oimage:null,
        pressed:false,
        we:'',
        isLoading:false,
        types: [
          { value:'1',name:'全科问诊',status: 0},
          { value:'2',name:'牙科问诊',status: 0},
          { value:'3',name:'心理问诊',status: 0},
          { value:'4',name:'中医问诊',status: 0},
          { value:'5',name:'少儿问诊',status: 0},
          { value:'6',name:'康复问诊',status: 0},
        ],
        service:[
          {value: "1",name: "实地问诊",status: 0},
          {value: "2",name: "远程问诊",status: 0},
        ],
        videoChannel:[
          {value: "1",channel: "facetime",status: 0},
          {value: "2",channel: "skype",status: 0},
        ],
        checked8: true,
        buttons: [
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        ],
        times: [
            { time1: new Date(), time2:new Date(),visible1:false, visible2:false},
            { time1: new Date(), time2:new Date(),visible1:false, visible2:false},
            { time1: new Date(), time2:new Date(),visible1:false, visible2:false},
            { time1: new Date(), time2:new Date(),visible1:false, visible2:false},
            { time1: new Date(), time2:new Date(),visible1:false, visible2:false},
            { time1: new Date(), time2:new Date(),visible1:false, visible2:false},
            { time1: new Date(), time2:new Date(),visible1:false, visible2:false},
        ]
      }
    }

    componentDidMount ()  {
      console.log(this.props.route.params.id);
      this.setState({isLoading:true})
      if(this.props.route.params.id !=null){
        let url = 'http://'
        +this.context.url
        +'/aicare-business-api/business/employer/list'
        +'?employerId=' + this.props.route.params.id;
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
            this.setState({isLoading:false})
            if (json.code === 0) {
              console.log(json.msg);
              this.setState({
                name:json.employerInfo.name,
                phone:json.employerInfo.mobile,
                we:json.employerInfo.workLong,
                languages:json.employerInfo.languages,
                email:json.employerInfo.email,
                oimage:json.employerInfo.imgUrl,
              })
              let i;
              if (json.employerInfo.employerSchedulevos.length>0){
                for (i=0;i<json.employerInfo.employerSchedulevos.length;i++){
                  if (json.employerInfo.employerSchedulevos[i].status != 0 && json.employerInfo.employerSchedulevos[i].status != null){
                    let but = this.state.buttons;
                    but[i].pressed = true;
                    but[i].backgroundColor = '#FF7E67';
                    but[i].borderWidth = 0;
                    but[i].fontColor = '#FFFFFF';
                    this.setState({buttons: but});
                    let t = this.state.times;
                    t[i].time1 = json.employerInfo.employerSchedulevos[i].startTime;
                    t[i].time2 = json.employerInfo.employerSchedulevos[i].endTime;
                    this.setState({times:t})
                  }
                }
              }
              if (json.employerInfo.serviceClassList.length>0){
                for (i=0;i<json.employerInfo.serviceClassList.length;i++){
                  let j;
                  for (j=0;j<this.state.types.length;j++){
                    if (this.state.types[j].name ==json.employerInfo.serviceClassList[i].name){
                      let but = this.state.types;
                      but[j].status = 1;
                      this.setState({types: but});
                    }
                  }
                }
              }
              if (json.employerInfo.serviceTypeList.length>0){
                for (i=0;i<json.employerInfo.serviceTypeList.length;i++){
                  let j;
                  for (j=0;j<this.state.service.length;j++){
                    if (this.state.service[j].name ==json.employerInfo.serviceTypeList[i].name){
                      let but = this.state.service;
                      but[j].status = 1;
                      this.setState({service: but});
                    }
                  }
                }
              }
              if (json.employerInfo.videoChannel.length>0){
                for (i=0;i<json.employerInfo.videoChannel.length;i++){
                  let j;
                  for (j=0;j<this.state.videoChannel.length;j++){
                    if (this.state.videoChannel[j].channel ==json.employerInfo.videoChannel[i].channel){
                      let but = this.state.videoChannel;
                      but[j].status = 1;
                      this.setState({videoChannel: but});
                    }
                  }
                }
              }
              this.context.action.changemintro(json.employerInfo.introduce)
            } else {
              console.log(json.msg)
            }
          }).catch(error => console.warn(error));
      } else{
        this.setState({isLoading:false})
      }

    }
  changeColor(index){
    let but = this.state.buttons;
    if(!but[index].pressed){
       but[index].pressed = true;
       but[index].backgroundColor = '#FF7E67';
       but[index].borderWidth = 0;
       but[index].fontColor = '#FFFFFF';
       this.setState({buttons: but});
    } else {
      but[index].pressed = false;
      but[index].backgroundColor = 'transparent';
      but[index].borderWidth = 1;
      but[index].fontColor = '#999999';
      this.setState({buttons: but});
    }
  };

  sendRequest() {
    let s = this.state;
    this.setState({isLoading:true});
    if(this.props.route.params.id !=null){
    let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/employer/update';
      fetch(url,{
        method: 'POST',
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
      },
      body: JSON.stringify({
        employerId: this.props.route.params.id,
        name: this.state.name,
        mobile: this.state.phone,
        languages: this.context.mlan,
        introduce:this.context.mintro,
        workLong:this.state.we,
        email:this.state.email,
        employerSchedulevos:[
            {
                "dayOfWeek": 1,
                "dayOfWeekStr": "星期一",
                "startTime": moment(this.state.times[0].time1).format(),
                "endTime": moment(this.state.times[0].time2).format(),
                "status": this.state.buttons[0].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 2,
                "dayOfWeekStr": "星期二",
                "startTime": moment(this.state.times[1].time1).format(),
                "endTime": moment(this.state.times[1].time2).format(),
                "status": this.state.buttons[1].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 3,
                "dayOfWeekStr": "星期三",
                "startTime": moment(this.state.times[2].time1).format(),
                "endTime": moment(this.state.times[2].time2).format(),
                "status": this.state.buttons[2].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 4,
                "dayOfWeekStr": "星期四",
                "startTime": moment(this.state.times[3].time1).format(),
                "endTime": moment(this.state.times[3].time2).format(),
                "status": this.state.buttons[3].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 5,
                "dayOfWeekStr": "星期五",
                "startTime": moment(this.state.times[4].time1).format(),
                "endTime": moment(this.state.times[4].time2).format(),
                "status": this.state.buttons[4].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 6,
                "dayOfWeekStr": "星期六",
                "startTime": moment(this.state.times[5].time1).format(),
                "endTime": moment(this.state.times[5].time2).format(),
                "status": this.state.buttons[5].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 7,
                "dayOfWeekStr": "星期天",
                "startTime": moment(this.state.times[6].time1).format(),
                "endTime": moment(this.state.times[6].time2).format(),
                "status": this.state.buttons[6].pressed ? 1 : 0
            },
        ],
        serviceClassList:this.state.types,
        serviceTypeList: this.state.service,
        videoChannel:this.state.videoChannel,
        chargingMethodList: [
            {
                "value": "1",
                "name": "bulk billing",
                "status": this.state.checked8?1:0
            }
        ],
      })
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({isLoading:false})
        if (json.code === 0) {
          if (this.state.image != null) {
            let data = new FormData();
            data.append('filename', 'avatar');
            data.append('file', {
              uri: this.state.image,
              name: this.context.name+ '.jpg',
              type: 'image/jpg'
            });
            data.append('employerId',this.props.route.params.id)
            url = 'http://'
                +this.context.url
                +'/aicare-business-api/business/employer/uploadimg';
               fetch(url,{
                 method: 'POST',
                 mode: 'cors',
                 credentials: 'include',
                 headers: {
                 'Content-Type': 'multipart/form-data',
                 'sso-auth-token': this.context.token,
               },
                 body: data
               })
               .then((response) => response.json())
               .then((json) => {
                 if (json.code === 0) {
                   alert("照片提交成功");
                   console.log(json.msg);
                 } else {
                   alert('照片提交失败');
                 }
               });
             }
          alert("提交成功");
          console.log(json.msg);
          this.props.navigation.pop();
        } else {
          console.log(json.msg)
          alert('提交失败');
        }
      }).catch(error => console.warn(error));} else {
        let url = 'http://'
        +this.context.url
        +'/aicare-business-api/business/employer/save';
        fetch(url,{
        method: 'POST',
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
      },
      body: JSON.stringify({
        name: this.state.name,
        mobile: this.state.phone,
        languages: this.context.mlan,
        introduce:this.context.mintro,
        workLong:this.state.we,
        email:this.state.email,
        employerSchedulevos:[
            {
                "dayOfWeek": 1,
                "dayOfWeekStr": "星期一",
                "startTime": moment(this.state.times[0].time1).format(),
                "endTime": moment(this.state.times[0].time2).format(),
                "status": this.state.buttons[0].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 2,
                "dayOfWeekStr": "星期二",
                "startTime": moment(this.state.times[1].time1).format(),
                "endTime": moment(this.state.times[1].time2).format(),
                "status": this.state.buttons[1].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 3,
                "dayOfWeekStr": "星期三",
                "startTime": moment(this.state.times[2].time1).format(),
                "endTime": moment(this.state.times[2].time2).format(),
                "status": this.state.buttons[2].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 4,
                "dayOfWeekStr": "星期四",
                "startTime": moment(this.state.times[3].time1).format(),
                "endTime": moment(this.state.times[3].time2).format(),
                "status": this.state.buttons[3].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 5,
                "dayOfWeekStr": "星期五",
                "startTime": moment(this.state.times[4].time1).format(),
                "endTime": moment(this.state.times[4].time2).format(),
                "status": this.state.buttons[4].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 6,
                "dayOfWeekStr": "星期六",
                "startTime": moment(this.state.times[5].time1).format(),
                "endTime": moment(this.state.times[5].time2).format(),
                "status": this.state.buttons[5].pressed ? 1 : 0
            },
            {
                "dayOfWeek": 7,
                "dayOfWeekStr": "星期天",
                "startTime": moment(this.state.times[6].time1).format(),
                "endTime": moment(this.state.times[6].time2).format(),
                "status": this.state.buttons[6].pressed ? 1 : 0
            },
        ],
        serviceClassList:this.state.types,
        serviceTypeList: this.state.service,
        videoChannel:this.state.videoChannel,
        chargingMethodList: [
            {
                "value": "1",
                "name": "bulk billing",
                "status": this.state.checked8?1:0
            }
        ],
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          console.log(json.msg);
          if (this.state.image != null) {
            let data = new FormData();
            data.append('filename', 'avatar');
            data.append('file', {
              uri: this.state.image,
              name: this.context.name+ '.jpg',
              type: 'image/jpg'
            });
            data.append('employerId',json.employerId)
            url = 'http://'
                +this.context.url
                +'/aicare-business-api/business/employer/uploadimg';
               fetch(url,{
                 method: 'POST',
                 mode: 'cors',
                 credentials: 'include',
                 headers: {
                 'Content-Type': 'multipart/form-data',
                 'sso-auth-token': this.context.token,
               },
                 body: data
               })
               .then((response) => response.json())
               .then((json) => {
                 if (json.code === 0) {
                   alert("照片提交成功");
                   console.log(json.msg);
                 } else {
                   alert('照片提交失败');
                   console.log(json.msg);
                 }
               });
             }
             alert("提交成功");
             this.props.navigation.pop();
        } else {
          console.log(json.msg)
          alert('提交失败');
        }
      }).catch(error => console.warn(error));
      }
  }

  hidePicker = () => {
    this.setState({visible:false})
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({image:result.uri});
    }
  };

  render() {
    let languages =[];
    if(this.context.mlan.length>0) {
    languages = this.context.mlan.map((item) => {
      if (item.status == 1) {
      return (
        <TouchableOpacity style={styles.resumeTag} key={item.value}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>{item.name}</Text>
        </TouchableOpacity>
      )
      }
    })};
    if (this.state.isLoading){
      return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00"  />
     </View>
    )
    }else {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{flex:1,width:'90%'}}>
        <View style={{ marginTop:10,marginBottom:20,justifyContent: "center",alignItems: "center" }}>
          <TouchableOpacity onPress={this.pickImage}>
          {this.state.image ?
          <Image style={{width:80,height:80,borderRadius:40}}
                source={{ uri: this.state.image }}
          />
          : this.state.oimage ?
          <Image style={{width:80,height:80,borderRadius:40}}
                source={{ uri: this.state.oimage }}
          />
          :
          <Image style={{width:80,height:80,borderRadius:40}}
            source = {require('../../images/providerImg/account_icon_add_1.png')}
            />}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',justifyContent: "flex-start", alignItems: "flex-start"}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' , marginRight: 20}}>{I18n.t('basicInformation')}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('name')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "Kingsford Clinic"
          value={this.state.name}
          onChangeText={(text) => {this.setState({name:text})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('mobile')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "04*******"
          value={this.state.phone}
          onChangeText={(text) => {this.setState({phone:text})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('email')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "****@gmail.com"
          value={this.state.email}
          editable={this.props.route.params.id !=null?false:true}
          onChangeText={(text) => {this.setState({email:text})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('serviceClass')}</Text>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <View style={{flexDirection: 'row', flexWrap:'wrap',marginTop:2,marginLeft:10,width:'65%'}}>
            {this.state.types[0].status==1&&<Text style={{ fontSize:14, fontWeight: '400',marginLeft:5 }}>{I18n.t('gpfull')}</Text>}
            {this.state.types[1].status==1&&<Text style={{ fontSize:14, fontWeight: '400',marginLeft:5 }}>{I18n.t('denfull')}</Text>}
            {this.state.types[2].status==1&&<Text style={{ fontSize:14, fontWeight: '400',marginLeft:5 }}>{I18n.t('phyfull')}</Text>}
            {this.state.types[3].status==1&&<Text style={{ fontSize:14, fontWeight: '400',marginLeft:5 }}>{I18n.t('chifull')}</Text>}
            {this.state.types[4].status==1&&<Text style={{ fontSize:14, fontWeight: '400',marginLeft:5 }}>{I18n.t('pedfull')}</Text>}
            {this.state.types[5].status==1&&<Text style={{ fontSize:14, fontWeight: '400',marginLeft:5 }}>{I18n.t('phyfull')}</Text>}
          </View>
            <AntDesign name="down" size={18} color="black" />
          </TouchableOpacity>
        </View>
          {this.state.pressed &&
            <View style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
              <CheckBox
                center
                title={I18n.t('gpfull')}
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='red'
                containerStyle={{borderWidth:0,backgroundColor:'white'}}
                checked={this.state.types[0].status==1?true:false}
                onPress={() => {
                  let t = this.state.types;
                  t[0].status = this.state.types[0].status==1?0:1;
                  this.setState({types:t})}}
               />
              <CheckBox
                center
                title={I18n.t('denfull')}
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={{borderWidth:0, backgroundColor:'white'}}
                checkedColor='red'
                checked={this.state.types[1].status==1?true:false}
                onPress={() => {
                  let t = this.state.types;
                  t[1].status = this.state.types[1].status==1?0:1;
                  this.setState({types:t})}}
               />
               <CheckBox
                 center
                 title={I18n.t('psyfull')}
                 checkedIcon='check-circle-o'
                 uncheckedIcon='circle-o'
                 containerStyle={{borderWidth:0, backgroundColor:'white'}}
                 checkedColor='red'
                 checked={this.state.types[2].status==1?true:false}
                 onPress={() => {
                   let t = this.state.types;
                 t[2].status = this.state.types[2].status==1?0:1;
                 this.setState({types:t})}}
                />
                <CheckBox
                  center
                  title={I18n.t('chifull')}
                  checkedIcon='check-circle-o'
                  uncheckedIcon='circle-o'
                  containerStyle={{borderWidth:0, backgroundColor:'white'}}
                  checkedColor='red'
                  checked={this.state.types[3].status==1?true:false}
                  onPress={() => {let t = this.state.types;
                  t[3].status = this.state.types[3].status==1?0:1;
                  this.setState({types:t})}}
                 />
                 <CheckBox
                   center
                   title={I18n.t('pedfull')}
                   checkedIcon='check-circle-o'
                   uncheckedIcon='circle-o'
                   containerStyle={{borderWidth:0, backgroundColor:'white'}}
                   checkedColor='red'
                   checked={this.state.types[4].status==1?true:false}
                   onPress={() => {let t = this.state.types;
                   t[4].status = this.state.types[4].status==1?0:1;
                   this.setState({types:t})}}
                  />
                  <CheckBox
                    center
                    title={I18n.t('phyfull')}
                    checkedIcon='check-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{borderWidth:0, backgroundColor:'white'}}
                    checkedColor='red'
                    checked={this.state.types[5].status==1?true:false}
                    onPress={() => {let t = this.state.types;
                    t[5].status = this.state.types[5].status==1?0:1;
                    this.setState({types:t})}}
                   />
            </View>
          }
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('experience')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "Input Only a number"
            value={this.state.we}
            keyboardType="numeric"
            onChangeText={(number) => {this.setState({we:number})}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('introduction')}</Text>
          <Text numberOfLines={1} style={{ marginLeft:10,fontSize:16, fontWeight: '400' , color:'#999999',width:'60%'}}>{this.context.mintro}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(I18n.t('mintro'))}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop:10}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_medical.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('serviceInformation')}</Text>
        </View>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('serviceLanguage')}</Text>
        </View>
        <View style={{flexDirection: 'row' , marginBottom:10}}>
        {this.context.mlan.length>0 ? languages:
        <Text style={{marginTop:5}}>{I18n.t('nosupLanguage')}</Text>}
          <TouchableOpacity  onPress={() => this.props.navigation.navigate(I18n.t('mlan'))}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

            <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('serviceHours')}</Text>
            <View  style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                backgroundColor:this.state.buttons[0].backgroundColor,
                borderWidth: this.state.buttons[0].borderWidth,
                width: 100,
                height: 30,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={()=>this.changeColor(0)}>
                <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[0].fontColor }}>{I18n.t('monday')}</Text>
              </TouchableOpacity>
              { this.state.buttons[0].pressed &&
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[0].visible1 = true;
                  this.setState({times:t})}}>
                  <Text>{moment(this.state.times[0].time1).tz(Localization.timezone).format('LT')} </Text>
                </TouchableOpacity>
                  <Text> _ </Text>
                  <TouchableOpacity style={styles.timePick} onPress={()=>{
                    let t = this.state.times;
                    t[0].visible2 = true;
                    this.setState({times:t})}}>
                    <Text>{moment(this.state.times[0].time2).tz(Localization.timezone).format('LT')} </Text>
                  </TouchableOpacity>
                </View>
              }
              <DateTimePicker
                isVisible={this.state.times[0].visible1}
                onConfirm={(time) => {
                    console.log(time)
                    let t = this.state.times;
                    t[0].time1 = time;
                    t[0].visible1 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[0].visible1 = false;
                  this.setState({times:t})}}
                display="spinner"
                mode={'time'}
                value={this.state.times[0].time1}
                minuteInterval={10}
                />
                <DateTimePicker
                  isVisible={this.state.times[0].visible2}
                  onConfirm={(time) => {
                      let t = this.state.times;
                      t[0].time2 = time;
                      t[0].visible2 = false;
                    this.setState({times:t})}}
                  onCancel={()=> {
                      let t = this.state.times;
                      t[0].visible2 = false;
                    this.setState({times:t})}}
                  display="spinner"
                  mode={'time'}
                  value={this.state.times[0].time2}
                  minuteInterval={10}
                  />
            </View>
            <View  style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                backgroundColor:this.state.buttons[1].backgroundColor,
                borderWidth: this.state.buttons[1].borderWidth,
                width: 100,
                height: 30,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={()=>this.changeColor(1)}>
                <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[1].fontColor }}>{I18n.t('tuesday')}</Text>
              </TouchableOpacity>
              { this.state.buttons[1].pressed &&
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[1].visible1 = true;
                  this.setState({times:t})}}>
                  <Text>{moment(this.state.times[1].time1).tz(Localization.timezone).format('LT')} </Text>
                </TouchableOpacity>
                  <Text> _ </Text>
                  <TouchableOpacity style={styles.timePick} onPress={()=>{
                    let t = this.state.times;
                    t[1].visible2 = true;
                    this.setState({times:t})}}>
                    <Text>{moment(this.state.times[1].time2).tz(Localization.timezone).format('LT')} </Text>
                  </TouchableOpacity>
                </View>
              }
              <DateTimePicker
                isVisible={this.state.times[1].visible1}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[1].time1 = time;
                    t[1].visible1 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[1].visible1 = false;
                  this.setState({times:t})}}
                display="spinner"
                mode={'time'}
                value={this.state.times[1].time1}
                minuteInterval={10}
                />
                <DateTimePicker
                  isVisible={this.state.times[1].visible2}
                  onConfirm={(time) => {
                      let t = this.state.times;
                      t[1].time2 = time;
                      t[1].visible2 = false;
                    this.setState({times:t})}}
                  onCancel={()=> {
                      let t = this.state.times;
                      t[1].visible2 = false;
                    this.setState({times:t})}}
                  display="spinner"
                  mode={'time'}
                  value={this.state.times[1].time2}
                  minuteInterval={10}
                  />
              </View>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                backgroundColor:this.state.buttons[2].backgroundColor,
                borderWidth: this.state.buttons[2].borderWidth,
                width: 100,
                height: 30,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={()=>this.changeColor(2)}>
                <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[2].fontColor }}>{I18n.t('wednesday')}</Text>
              </TouchableOpacity>
              { this.state.buttons[2].pressed &&
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[2].visible1 = true;
                  this.setState({times:t})}}>
                  <Text>{moment(this.state.times[2].time1).tz(Localization.timezone).format('LT')} </Text>
                </TouchableOpacity>
                  <Text> _ </Text>
                  <TouchableOpacity style={styles.timePick} onPress={()=>{
                    let t = this.state.times;
                    t[2].visible2 = true;
                    this.setState({times:t})}}>
                    <Text>{moment(this.state.times[2].time2).tz(Localization.timezone).format('LT')} </Text>
                  </TouchableOpacity>
                </View>
              }
              <DateTimePicker
                isVisible={this.state.times[2].visible1}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[2].time1 = time;
                    t[2].visible1 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[2].visible1 = false;
                  this.setState({times:t})}}
                display="spinner"
                mode={'time'}
                value={this.state.times[2].time1}
                minuteInterval={10}
                />
                <DateTimePicker
                  isVisible={this.state.times[2].visible2}
                  onConfirm={(time) => {
                      let t = this.state.times;
                      t[2].time2 = time;
                      t[2].visible2 = false;
                    this.setState({times:t})}}
                  onCancel={()=> {
                      let t = this.state.times;
                      t[2].visible2 = false;
                    this.setState({times:t})}}
                  mode={'time'}
                  display="spinner"
                  value={this.state.times[2].time2}
                  minuteInterval={10}
                  />
              </View>
              <View  style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                backgroundColor:this.state.buttons[3].backgroundColor,
                borderWidth: this.state.buttons[3].borderWidth,
                width: 100,
                height: 30,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={()=>this.changeColor(3)}>
                <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[3].fontColor }}>{I18n.t('thursday')}</Text>
              </TouchableOpacity>
              { this.state.buttons[3].pressed &&
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[3].visible1 = true;
                  this.setState({times:t})}}>
                  <Text>{moment(this.state.times[3].time1).tz(Localization.timezone).format('LT')} </Text>
                </TouchableOpacity>
                  <Text> _ </Text>
                  <TouchableOpacity style={styles.timePick} onPress={()=>{
                    let t = this.state.times;
                    t[3].visible2 = true;
                    this.setState({times:t})}}>
                    <Text>{moment(this.state.times[3].time2).tz(Localization.timezone).format('LT')} </Text>
                  </TouchableOpacity>
                </View>
              }
              <DateTimePicker
                isVisible={this.state.times[3].visible1}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[3].time1 = time;
                    t[3].visible1 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[3].visible1 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                value={this.state.times[3].time1}
                minuteInterval={10}
                />
                <DateTimePicker
                  isVisible={this.state.times[3].visible2}
                  onConfirm={(time) => {
                      let t = this.state.times;
                      t[3].time2 = time;
                      t[3].visible2 = false;
                    this.setState({times:t})}}
                  onCancel={()=> {
                      let t = this.state.times;
                      t[3].visible2 = false;
                    this.setState({times:t})}}
                  mode={'time'}
                  display="spinner"
                  value={this.state.times[3].time2}
                  minuteInterval={10}
                  />
              </View>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                backgroundColor:this.state.buttons[4].backgroundColor,
                borderWidth: this.state.buttons[4].borderWidth,
                width: 100,
                height: 30,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={()=>this.changeColor(4)}>
                <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[4].fontColor }}>{I18n.t('friday')}</Text>
              </TouchableOpacity>
              { this.state.buttons[4].pressed &&
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[4].visible1 = true;
                  this.setState({times:t})}}>
                  <Text>{moment(this.state.times[4].time1).tz(Localization.timezone).format('LT')} </Text>
                </TouchableOpacity>
                  <Text> _ </Text>
                  <TouchableOpacity style={styles.timePick} onPress={()=>{
                    let t = this.state.times;
                    t[4].visible2 = true;
                    this.setState({times:t})}}>
                    <Text>{moment(this.state.times[4].time2).tz(Localization.timezone).format('LT')} </Text>
                  </TouchableOpacity>
                </View>
              }
              <DateTimePicker
                isVisible={this.state.times[4].visible1}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[4].time1 = time;
                    t[4].visible1 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[4].visible1 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                value={this.state.times[4].time1}
                minuteInterval={10}
                />
                <DateTimePicker
                  isVisible={this.state.times[4].visible2}
                  onConfirm={(time) => {
                      let t = this.state.times;
                      t[4].time2 = time;
                      t[4].visible2 = false;
                    this.setState({times:t})}}
                  onCancel={()=> {
                      let t = this.state.times;
                      t[4].visible2 = false;
                    this.setState({times:t})}}
                  mode={'time'}
                  display="spinner"
                  value={this.state.times[4].time1}
                  minuteInterval={10}
                  />
              </View>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                backgroundColor:this.state.buttons[5].backgroundColor,
                borderWidth: this.state.buttons[5].borderWidth,
                width: 100,
                height: 30,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={()=>this.changeColor(5)}>
                <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[5].fontColor }}>{I18n.t('saturday')}</Text>
              </TouchableOpacity>
              { this.state.buttons[5].pressed &&
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[5].visible1 = true;
                  this.setState({times:t})}}>
                  <Text>{moment(this.state.times[5].time1).tz(Localization.timezone).format('LT')} </Text>
                </TouchableOpacity>
                  <Text> _ </Text>
                  <TouchableOpacity style={styles.timePick} onPress={()=>{
                    let t = this.state.times;
                    t[5].visible2 = true;
                    this.setState({times:t})}}>
                    <Text>{moment(this.state.times[5].time2).tz(Localization.timezone).format('LT')} </Text>
                  </TouchableOpacity>
                </View>
              }
              <DateTimePicker
                isVisible={this.state.times[5].visible1}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[5].time1 = time;
                    t[5].visible1 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[5].visible1 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                value={this.state.times[5].time1}
                minuteInterval={10}
                />
                <DateTimePicker
                  isVisible={this.state.times[5].visible2}
                  onConfirm={(time) => {
                      let t = this.state.times;
                      t[5].time2 = time;
                      t[5].visible2 = false;
                    this.setState({times:t})}}
                  onCancel={()=> {
                      let t = this.state.times;
                      t[5].visible2 = false;
                    this.setState({times:t})}}
                  mode={'time'}
                  display="spinner"
                  value={this.state.times[5].time2}
                  minuteInterval={10}
                  />
              </View>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                backgroundColor:this.state.buttons[6].backgroundColor,
                borderWidth: this.state.buttons[6].borderWidth,
                width: 100,
                height: 30,
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={()=>this.changeColor(6)}>
                <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[6].fontColor }}>{I18n.t('sunday')}</Text>
              </TouchableOpacity>
              { this.state.buttons[6].pressed &&
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.timePick} onPress={()=>{
                  let t = this.state.times;
                  t[6].visible1 = true;
                  this.setState({times:t})}}>
                  <Text>{moment(this.state.times[6].time1).tz(Localization.timezone).format('LT')}</Text>
                </TouchableOpacity>
                  <Text> _ </Text>
                  <TouchableOpacity style={styles.timePick} onPress={()=>{
                    let t = this.state.times;
                    t[6].visible2 = true;
                    this.setState({times:t})}}>
                    <Text>{moment(this.state.times[6].time2).tz(Localization.timezone).format('LT')} </Text>
                  </TouchableOpacity>
                </View>
              }
              <DateTimePicker
                isVisible={this.state.times[6].visible1}
                onConfirm={(time) => {
                    let t = this.state.times;
                    t[6].time1 =time;
                    t[6].visible1 = false;
                  this.setState({times:t})}}
                onCancel={()=> {
                    let t = this.state.times;
                    t[6].visible1 = false;
                  this.setState({times:t})}}
                mode={'time'}
                display="spinner"
                value={this.state.times[6].time1}
                minuteInterval={10}
                />
                <DateTimePicker
                  isVisible={this.state.times[6].visible2}
                  onConfirm={(time) => {
                      let t = this.state.times;
                      t[6].time2 = time;
                      t[6].visible2 = false;
                    this.setState({times:t})}}
                  onCancel={()=> {
                      let t = this.state.times;
                      t[6].visible2 = false;
                    this.setState({times:t})}}
                  mode={'time'}
                  display="spinner"
                  value={this.state.times[6].time2}
                  minuteInterval={10}
                  />
              </View>
            <View style={{ marginTop:10, marginBottom:10}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('serviceType')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                center
                title={I18n.t('onsite')}
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='red'
                containerStyle={{borderWidth:0,backgroundColor:'white'}}
                size={this.state.size}
                checked={this.state.service[0].status==1?true:false}
                onPress={() => {
                  let t = this.state.service;
                  t[0].status = this.state.service[0].status==1?0:1;
                  this.setState({service:t})}}
               />
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                center
                title={I18n.t('telehealth')}
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={{borderWidth:0, backgroundColor:'white'}}
                checkedColor='red'
                size={this.state.size}
                checked={this.state.service[1].status==1?true:false}
                onPress={() => {
                  let t = this.state.service;
                  t[1].status = this.state.service[1].status==1?0:1;
                  this.setState({service:t})}}
               />
            </View>

            {this.state.service[1].status == 1 &&
              <View>
              <View style={{ marginTop:10, marginBottom:10}}>
                <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('remoteMethod')}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  center
                  title='FaceTime(IOS)                                '
                  iconRight
                  checkedIcon='check-circle-o'
                  uncheckedIcon='circle-o'
                  checkedColor='red'
                  containerStyle={{borderWidth:0,backgroundColor:'white'}}
                  size={this.state.size}
                  checked={this.state.videoChannel[0].status==1?true:false}
                  onPress={() => {
                    let t = this.state.videoChannel;
                    t[0].status = this.state.videoChannel[0].status==1?0:1;
                    this.setState({videoChannel:t})}}
                 />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  center
                  title='Skype (Android)                              '
                  iconRight
                  checkedIcon='check-circle-o'
                  uncheckedIcon='circle-o'
                  containerStyle={{borderWidth:0, backgroundColor:'white'}}
                  checkedColor='red'
                  size={this.state.size}
                  checked={this.state.videoChannel[1].status==1?true:false}
                  onPress={() => {
                    let t = this.state.videoChannel;
                    t[1].status = this.state.videoChannel[1].status==1?0:1;
                    this.setState({videoChannel:t})}}
                 />
              </View>
              </View>
            }

            <View style={{ marginTop:10, marginBottom:10}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('chargingMethod')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                center
                title='bulk billing                          '
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={{borderWidth:0,backgroundColor:'white'}}
                checkedColor='red'
                size={this.state.size}
                checked={this.state.checked8}
                onPress={() => {
                  this.setState({
                  checked8: !this.state.checked8
                })}}
               />
            </View>

        <TouchableOpacity style={styles.resumeButton} onPress={() => {this.sendRequest()}}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirmation')}</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );}}
}
UploadMember.contextType = DataContext;
