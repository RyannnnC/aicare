import React ,{Component}from 'react';
import { Alert,Modal,Text,  View,  Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import MaterialIcons from '../../node_modules/react-native-vector-icons/MaterialIcons';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements';
import moment from 'moment-timezone';
import DataContext from '../../providerContext';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import * as Localization from 'expo-localization';
import I18n from '../switchLanguage';

export default class Info extends Component {
    constructor(props) {
      super(props);
      this.state={
      show: false,
      image:null,
      isLoading:false,
      hasCameraPermission: null,
      latitude:0,
      longitude:0,
      service:[
        {value: "0",name: "实地问诊",status: 0},
        {value: "1",name: "远程问诊",status: 0},
      ],
      checked3:true,
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
          { time1: this.convertTime(new Date("May 4 2021 09:00")), time2:this.convertTime(new Date("May 4 2021 17:00")),visible1:false, visible2:false},
          { time1: this.convertTime(new Date("May 4 2021 09:00")), time2:this.convertTime(new Date("May 4 2021 17:00")),visible1:false, visible2:false},
          { time1: this.convertTime(new Date("May 4 2021 09:00")), time2:this.convertTime(new Date("May 4 2021 17:00")),visible1:false, visible2:false},
          { time1: this.convertTime(new Date("May 4 2021 09:00")), time2:this.convertTime(new Date("May 4 2021 17:00")),visible1:false, visible2:false},
          { time1: this.convertTime(new Date("May 4 2021 09:00")), time2:this.convertTime(new Date("May 4 2021 17:00")),visible1:false, visible2:false},
          { time1: this.convertTime(new Date("May 4 2021 09:00")), time2:this.convertTime(new Date("May 4 2021 17:00")),visible1:false, visible2:false},
          { time1: this.convertTime(new Date("May 4 2021 09:00")), time2:this.convertTime(new Date("May 4 2021 17:00")),visible1:false, visible2:false},
      ]
    }
    }
/*    <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>分支机构（选填）</Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('分支机构')}>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
*/

  async componentDidMount(){
    if (this.context.time.length>0){
      let i;
      for (i=0;i<this.context.time.length;i++){
        if (this.context.time[i].status != 0){
          let but = this.state.buttons;
          but[i].pressed = true;
          but[i].backgroundColor = '#FF7E67';
          but[i].borderWidth = 0;
          but[i].fontColor = '#FFFFFF';
          this.setState({buttons: but});
          let t = this.state.times;
          t[i].time1 = this.context.time[i].startTime;
          t[i].time2 = this.context.time[i].endTime;
          this.setState({times:t})
        }
      }
    }
    if (this.context.typeList.length>0){
      for (let i =0;i<this.context.typeList.length;i++) {
          let t = this.state.service;
          for(let j =0; j<t.length;j++) {
            if(t[j].value == this.context.typeList[i].value) {
              if (this.context.typeList[i].status == 1) {
                t[j].status = 1
                this.setState({service:t})
              }
            }
          }
      }

    }
/*   navigator.geolocation.getCurrentPosition(
     position=>{
       this.setState({
         latitude:position.coords.latitude,
         longitude:position.coords.longitude
       });
     },
   );*/
   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
   this.setState({ hasCameraPermission: status === "granted" });
   const { c_status } = await Permissions.askAsync(Permissions.CAMERA);
   this.setState({ hasCameraPermission: c_status === "granted" });
  }
  convertTime(date) {
    var d = new Date(date);
    let h = d.getHours(); // => 9
    let m = d.getMinutes(); // =>  30
    let s = d.getSeconds(); // => 51
    return moment(h+':'+m+':'+s,'HH:mm:ss')
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

/*  getData(){
    Geocoder.init("AIzaSyCXUX-a8NteFRhltP-WJ0npzFKiKiG8wb8"); // use a valid API key
    Geocoder.from(this.state.latitude, this.state.longitude)
		.then(json => {
      var addressComponent = json.results[0].address_components;
      if (addressComponent.length==7){
      this.context.action.changestreet(addressComponent[0].long_name + ' ' + addressComponent[1].long_name + ' ' + addressComponent[2].long_name);
      this.context.action.changestate(addressComponent[4].long_name);
      this.context.action.changepostcode(addressComponent[6].long_name);
      }
      else{
        this.context.action.changestreet(addressComponent[0].long_name + ' ' + addressComponent[1].long_name);
        this.context.action.changestate(addressComponent[3].long_name);
        this.context.action.changepostcode(addressComponent[5].long_name);
      }
		})
		.catch(error => console.warn(error));
  }*/

  sendRequest() {
    let s = this.state;
    this.setState({isLoading:true})
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/orginfo/save';
      fetch(url,{
        method: 'POST',
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
      body: JSON.stringify({
        name: this.context.name,
        mobile: this.context.phone,
        email: this.context.email,
        address: this.context.street,
        postalCode: this.context.postcode,
        introduce:this.context.intro,
        city:this.context.state,
        languages: this.context.languages,
        serviceClassList:this.context.serviceclass,
        serviceTypeList: this.state.service,
        chargingMethodList: [
            {
                "value": "1",
                "name": "bulk billing",
                "status": this.state.checked3?1:0
            }
        ],
        orgschedulevos:[
          {
              "dayOfWeek": 1,
              "dayOfWeekStr": "星期一",
              "startTime": moment(this.state.times[0].time1).format('HH:mm:ss'),
              "endTime": moment(this.state.times[0].time2).format('HH:mm:ss'),
              "status": this.state.buttons[0].pressed ? 1 : 0
          },
          {
              "dayOfWeek": 2,
              "dayOfWeekStr": "星期二",
              "startTime": moment(this.state.times[1].time1).format('HH:mm:ss'),
              "endTime": moment(this.state.times[1].time2).format('HH:mm:ss'),
              "status": this.state.buttons[1].pressed ? 1 : 0
          },
          {
              "dayOfWeek": 3,
              "dayOfWeekStr": "星期三",
              "startTime": moment(this.state.times[2].time1).format('HH:mm:ss'),
              "endTime": moment(this.state.times[2].time2).format('HH:mm:ss'),
              "status": this.state.buttons[2].pressed ? 1 : 0
          },
          {
              "dayOfWeek": 4,
              "dayOfWeekStr": "星期四",
              "startTime": moment(this.state.times[3].time1).format('HH:mm:ss'),
              "endTime": moment(this.state.times[3].time2).format('HH:mm:ss'),
              "status": this.state.buttons[3].pressed ? 1 : 0
          },
          {
              "dayOfWeek": 5,
              "dayOfWeekStr": "星期五",
              "startTime": moment(this.state.times[4].time1).format('HH:mm:ss'),
              "endTime": moment(this.state.times[4].time2).format('HH:mm:ss'),
              "status": this.state.buttons[4].pressed ? 1 : 0
          },
          {
              "dayOfWeek": 6,
              "dayOfWeekStr": "星期六",
              "startTime": moment(this.state.times[5].time1).format('HH:mm:ss'),
              "endTime": moment(this.state.times[5].time2).format('HH:mm:ss'),
              "status": this.state.buttons[5].pressed ? 1 : 0
          },
          {
              "dayOfWeek": 7,
              "dayOfWeekStr": "星期天",
              "startTime": moment(this.state.times[6].time1).format('HH:mm:ss'),
              "endTime": moment(this.state.times[6].time2).format('HH:mm:ss'),
              "status": this.state.buttons[6].pressed ? 1 : 0
          },
        ]
      })
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({isLoading:false})
        if (json.code === 0) {
          alert("提交成功");
          console.log(json.msg);
        } else {
          alert('提交失败');
        }
      });
     if (this.state.image != null) {
     let data = new FormData();
     data.append('filename', 'avatar');
     data.append('file', {
       uri: this.state.image,
       name: this.context.name+ '.jpg',
       type: 'image/jpg'
     });
     data.append('orgId',this.context.orgId);
     url = 'http://'
     +this.context.url
     +'/aicare-business-api/business/orginfo/uploadimg';
        fetch(url,{
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
          'Content-Type': 'multipart/form-data',
          'sso-auth-token': this.context.token,
          'sso-refresh-token': this.context.refresh_token,
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

  launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    this.setState({visible:false});
    if (!result.cancelled) {
      this.setState({image:result.uri});
    }
  };
  startAlert(){
    Alert.alert(
      'Alert',
      '请选择一种方式来上传照片？',
      [
        {text: I18n.t('takePhoto'), onPress: this.launchCamera},
        {text: I18n.t('chooseLib'), onPress: this.pickImage },
        {text: I18n.t('cancel'), onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }
/*  <TouchableOpacity style={{flexDirection: 'row', marginRight: 5}} onPress = {()=>{this.getData()}}>
    <Image style = {{width:12, height:15}}
      source= {require('../../images/providerImg/order_icon_location.png')}
    />
    <Text>自动定位</Text>
  </TouchableOpacity>*/
  render() {
    let languages =[];
    if(this.context.languages.length>0) {
    languages = this.context.languages.map((item) => {
      if (item.status == 1) {
      return (
        <TouchableOpacity style={styles.resumeTag} key={item.value}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>{item.name}</Text>
        </TouchableOpacity>
      )
      }
    })};
    let service =[];
    if(this.context.serviceclass.length>0) {
    service = this.context.serviceclass.map((item) => {
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
      <SafeAreaView style={{ flex:1, width:'100%',justifyContent: "center", alignItems: "center" ,backgroundColor:"rgb(51,51,51)"}}>
        <ScrollView style={{ flex: 1,width:'90%',backgroundColor:"white"  }}
        contentContainerStyle={{alignItems: "center"}}>
          <View style={{flex:1,width:'90%',backgroundColor:"white"}}>
          <View style={{ marginTop:10,marginBottom:20,justifyContent: "center",alignItems: "center" }}>
          <TouchableOpacity onPress={() => {this.startAlert()}}>
          {this.state.image ?
          <Image style={{width:80,height:80,borderRadius:40}}
                source={{ uri: this.state.image }}
          />
          : this.context.image?
          <Image style={{width:80,height:80,borderRadius:40}}
              source = {{ uri: this.context.image }}
            />
          :
          <Image style={styles.resumeImg}
            source = {require('../../images/providerImg/account_icon_add_1.png')}
            />}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row',justifyContent: "flex-start", alignItems: "flex-start",borderBottomWidth:1,borderBottomColor:'rgb(32,191,195)'}}>
             <Text style={{ fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('basicInformation')}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('name')}</Text>
          <TextInput style={{width: '80%',
          fontSize:18,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE',}} placeholder= "Kingsford Clinic"
          value={this.context.name}
          onChangeText={(text) => {this.context.action.changename(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('mobile')}</Text>
          <TextInput style={{width: '80%',
          fontSize:18,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE',}} placeholder= "0403571833"
          value={this.context.phone}
          keyboardType="numeric"
          onChangeText={(text) => {this.context.action.changephone(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('email')}</Text>
          <TextInput style={{width: '80%',
          fontSize:18,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE',}} placeholder= "********@gmail.com"
          value={this.context.email}
          onChangeText={(text) => {this.context.action.changeemail(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('address')}</Text>
          <TextInput
          style={{width: '80%',
          fontSize:18,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE',}}
          placeholder= "1001/1 Mooltan Avanue"
          value = {this.context.street}
          onChangeText={(text) => {this.context.action.changestreet(text)}}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('postcode')}</Text>
          <TextInput
            style={styles.resumeInput1}
            placeholder= "2113"
            value = {this.context.postcode}
            keyboardType="numeric"
            onChangeText={(text) => {this.context.action.changepostcode(text)}}
          />
          <Text style={{marginLeft:20, fontSize:16, fontWeight: '400' }}>{I18n.t('state')}</Text>
          <TextInput
            style={styles.resumeInput1}
            value = {this.context.state}
            onChangeText={(text) => {this.context.action.changestate(text)}}
            placeholder= "NSW"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('introduction')}</Text>
          <Text numberOfLines={1} style={{ fontSize:16, fontWeight: '400' , color:'#999999',width:'80%'}}>{this.context.intro}</Text>
          <TouchableOpacity style={{marginTop:5}} onPress={() => this.props.navigation.navigate(I18n.t('introduction'))}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{marginTop:20,flexDirection: 'row',justifyContent: "flex-start", alignItems: "flex-start",borderBottomWidth:1,borderBottomColor:'rgb(32,191,195)'}}>
           <Text style={{ fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('serviceInformation')}</Text>
        </View>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('supLanguage')}</Text>
        </View>

        <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10,flexWrap:'wrap'}}>
        {this.context.languages.length>0 ? languages:
        <Text>{I18n.t('nosupLanguage')}</Text>}
        <TouchableOpacity onPress={() => this.props.navigation.navigate(I18n.t('languages'))}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
        </View>
        <Text style={{ marginTop:10,marginBottom:10,fontSize:16, fontWeight: '400' }}>{I18n.t('serviceHours')}</Text>
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
              <Text>{moment(this.state.times[0].time1,'HH:mm:ss').format('HH:mm')} </Text>
            </TouchableOpacity>
              <Text> _ </Text>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[0].visible2 = true;
                this.setState({times:t})}}>
                <Text>{moment(this.state.times[0].time2,'HH:mm:ss').format('HH:mm')} </Text>
              </TouchableOpacity>
            </View>
          }
          <DateTimePicker
            isVisible={this.state.times[0].visible1}
            onConfirm={(time) => {
              let st = moment.tz(time,Localization.timezone).format('HH:mm');
              let et = moment.tz(this.state.times[0].time2,Localization.timezone).format('HH:mm');
              console.log(st);
              console.log(et)
              if (moment(st,'HH:mm').isAfter(moment(et,'HH:mm'))) {
                alert(I18n.t('sae'))
              }else {
              let t = this.state.times;
              t[0].time1 = time;
              t[0].visible1 = false;
              this.setState({times:t})}}}
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
                  let st = moment.tz(this.state.times[0].time1,Localization.timezone).format('HH:mm');
                  let et = moment.tz(time,Localization.timezone).format('HH:mm');
                  console.log(st);
                  console.log(et)
                  if (moment(et,'HH:mm').isBefore(moment(st,'HH:mm'))) {
                    alert(I18n.t('ebs'))
                  }else {
                  let t = this.state.times;
                  t[0].time2 = time;
                  t[0].visible2 = false;
                  this.setState({times:t})}}}
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
              <Text>{moment(this.state.times[1].time1,'HH:mm:ss').format('HH:mm')} </Text>
            </TouchableOpacity>
              <Text> _ </Text>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[1].visible2 = true;
                this.setState({times:t})}}>
                <Text>{moment(this.state.times[1].time2,'HH:mm:ss').format('HH:mm')} </Text>
              </TouchableOpacity>
            </View>
          }
          <DateTimePicker
            isVisible={this.state.times[1].visible1}
            onConfirm={(time) => {
              let st = moment.tz(time,Localization.timezone).format('HH:mm');
              let et = moment.tz(this.state.times[1].time2,Localization.timezone).format('HH:mm');
              console.log(st);
              console.log(et)
              if (moment(st,'HH:mm').isAfter(moment(et,'HH:mm'))) {
                alert(I18n.t('sae'))
              }else {
              let t = this.state.times;
              t[1].time1 = time;
              t[1].visible1 = false;
              this.setState({times:t})}}}
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
                let st = moment.tz(this.state.times[1].time1,Localization.timezone).format('HH:mm');
                let et = moment.tz(time,Localization.timezone).format('HH:mm');
                console.log(st);
                console.log(et)
                if (moment(et,'HH:mm').isBefore(moment(st,'HH:mm'))) {
                  alert(I18n.t('ebs'))
                }else {
                let t = this.state.times;
                t[1].time2 = time;
                t[1].visible2 = false;
                this.setState({times:t})}}}
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
              <Text>{moment(this.state.times[2].time1,'HH:mm:ss').format('HH:mm')}</Text>
            </TouchableOpacity>
              <Text> _ </Text>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[2].visible2 = true;
                this.setState({times:t})}}>
                <Text>{moment(this.state.times[2].time2,'HH:mm:ss').format('HH:mm')} </Text>
              </TouchableOpacity>
            </View>
          }
          <DateTimePicker
            isVisible={this.state.times[2].visible1}
            onConfirm={(time) => {
              let st = moment.tz(time,Localization.timezone).format('HH:mm');
              let et = moment.tz(this.state.times[2].time2,Localization.timezone).format('HH:mm');
              console.log(st);
              console.log(et)
              if (moment(st,'HH:mm').isAfter(moment(et,'HH:mm'))) {
                alert(I18n.t('sae'))
              }else {
              let t = this.state.times;
              t[2].time1 = time;
              t[2].visible1 = false;
              this.setState({times:t})}}}
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
                let st = moment.tz(this.state.times[2].time1,Localization.timezone).format('HH:mm');
                let et = moment.tz(time,Localization.timezone).format('HH:mm');
                console.log(st);
                console.log(et)
                if (moment(et,'HH:mm').isBefore(moment(st,'HH:mm'))) {
                  alert(I18n.t('ebs'))
                }else {
                let t = this.state.times;
                t[2].time2 = time;
                t[2].visible2 = false;
                this.setState({times:t})}}}
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
              <Text>{moment(this.state.times[3].time1,'HH:mm:ss').format('HH:mm')} </Text>
            </TouchableOpacity>
              <Text> _ </Text>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[3].visible2 = true;
                this.setState({times:t})}}>
                <Text>{moment(this.state.times[3].time2,'HH:mm:ss').format('HH:mm')}</Text>
              </TouchableOpacity>
            </View>
          }
          <DateTimePicker
            isVisible={this.state.times[3].visible1}
            onConfirm={(time) => {
              let st = moment.tz(time,Localization.timezone).format('HH:mm');
              let et = moment.tz(this.state.times[3].time2,Localization.timezone).format('HH:mm');
              console.log(st);
              console.log(et)
              if (moment(st,'HH:mm').isAfter(moment(et,'HH:mm'))) {
                alert(I18n.t('sae'))
              }else {
              let t = this.state.times;
              t[3].time1 = time;
              t[3].visible1 = false;
              this.setState({times:t})}}}
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
                let st = moment.tz(this.state.times[3].time1,Localization.timezone).format('HH:mm');
                let et = moment.tz(time,Localization.timezone).format('HH:mm');
                console.log(st);
                console.log(et)
                if (moment(et,'HH:mm').isBefore(moment(st,'HH:mm'))) {
                  alert(I18n.t('ebs'))
                }else {
                let t = this.state.times;
                t[3].time2 = time;
                t[3].visible2 = false;
                this.setState({times:t})}}}
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
              <Text>{moment(this.state.times[4].time1,'HH:mm:ss').format('HH:mm')} </Text>
            </TouchableOpacity>
              <Text> _ </Text>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[4].visible2 = true;
                this.setState({times:t})}}>
                <Text>{moment(this.state.times[4].time2,'HH:mm:ss').format('HH:mm')} </Text>
              </TouchableOpacity>
            </View>
          }
          <DateTimePicker
            isVisible={this.state.times[4].visible1}
            onConfirm={(time) => {
              let st = moment.tz(time,Localization.timezone).format('HH:mm');
              let et = moment.tz(this.state.times[4].time2,Localization.timezone).format('HH:mm');
              console.log(st);
              console.log(et)
              if (moment(st,'HH:mm').isAfter(moment(et,'HH:mm'))) {
                alert(I18n.t('sae'))
              }else {
              let t = this.state.times;
              t[4].time1 = time;
              t[4].visible1 = false;
              this.setState({times:t})}}}
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
                let st = moment.tz(this.state.times[4].time1,Localization.timezone).format('HH:mm');
                let et = moment.tz(time,Localization.timezone).format('HH:mm');
                console.log(st);
                console.log(et)
                if (moment(et,'HH:mm').isBefore(moment(st,'HH:mm'))) {
                  alert(I18n.t('ebs'))
                }else {
                let t = this.state.times;
                t[4].time2 = time;
                t[4].visible2 = false;
                this.setState({times:t})}}}
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
              <Text>{moment(this.state.times[5].time1,'HH:mm:ss').format('HH:mm')} </Text>
            </TouchableOpacity>
              <Text> _ </Text>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[5].visible2 = true;
                this.setState({times:t})}}>
                <Text>{moment(this.state.times[5].time2,'HH:mm:ss').format('HH:mm')} </Text>
              </TouchableOpacity>
            </View>
          }
          <DateTimePicker
            isVisible={this.state.times[5].visible1}
            onConfirm={(time) => {
              let st = moment.tz(time,Localization.timezone).format('HH:mm');
              let et = moment.tz(this.state.times[5].time2,Localization.timezone).format('HH:mm');
              console.log(st);
              console.log(et)
              if (moment(st,'HH:mm').isAfter(moment(et,'HH:mm'))) {
                alert(I18n.t('sae'))
              }else {
              let t = this.state.times;
              t[5].time1 = time;
              t[5].visible1 = false;
              this.setState({times:t})}}}
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
                let st = moment.tz(this.state.times[5].time1,Localization.timezone).format('HH:mm');
                let et = moment.tz(time,Localization.timezone).format('HH:mm');
                console.log(st);
                console.log(et)
                if (moment(et,'HH:mm').isBefore(moment(st,'HH:mm'))) {
                  alert(I18n.t('ebs'))
                }else {
                let t = this.state.times;
                t[5].time2 = time;
                t[5].visible2 = false;
                this.setState({times:t})}}}
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
              <Text>{moment(this.state.times[6].time1,'HH:mm:ss').format('HH:mm')}</Text>
            </TouchableOpacity>
              <Text> _ </Text>
              <TouchableOpacity style={styles.timePick} onPress={()=>{
                let t = this.state.times;
                t[6].visible2 = true;
                this.setState({times:t})}}>
                <Text>{moment(this.state.times[6].time2,'HH:mm:ss').format('HH:mm')} </Text>
              </TouchableOpacity>
            </View>
          }
          <DateTimePicker
            isVisible={this.state.times[6].visible1}
            onConfirm={(time) => {
              let st = moment.tz(time,Localization.timezone).format('HH:mm');
              let et = moment.tz(this.state.times[6].time2,Localization.timezone).format('HH:mm');
              console.log(st);
              console.log(et)
              if (moment(st,'HH:mm').isAfter(moment(et,'HH:mm'))) {
                alert(I18n.t('sae'))
              }else {
              let t = this.state.times;
              t[6].time1 = time;
              t[6].visible1 = false;
              this.setState({times:t})}}}
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
                let st = moment.tz(this.state.times[6].time1,Localization.timezone).format('HH:mm');
                let et = moment.tz(time,Localization.timezone).format('HH:mm');
                console.log(st);
                console.log(et)
                if (moment(et,'HH:mm').isBefore(moment(st,'HH:mm'))) {
                  alert(I18n.t('ebs'))
                }else {
                let t = this.state.times;
                t[6].time2 = time;
                t[6].visible2 = false;
                this.setState({times:t})}}}
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
            <View style={{marginTop:10, marginBottom:10}}>
              <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('serviceClass')}</Text>
            </View>
            <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10,flexWrap:'wrap'}}>
            {this.context.serviceclass.length>0 ? service:
            <Text>{I18n.t('enterServiceClass')}</Text>}
            <TouchableOpacity onPress={() => this.props.navigation.navigate(I18n.t('serviceType'))}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
            </View>

            <View style={{ marginTop:10, marginBottom:10}}>
              <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('serviceType')}</Text>
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
            <View>
              <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('chargingMethod')}</Text>
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
                checked={this.state.checked3}
                onPress={() => {
                  this.setState({
                  checked3: !this.state.checked3
                })}}
               />
            </View>
        <TouchableOpacity style={{
          width: '100%',
          height: 40,
          marginTop: 10,
          marginBottom:20,
        backgroundColor: 'rgb(33,192,196)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center",}} onPress={() => {this.sendRequest()}}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirmation')}</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );}}
}
Info.contextType = DataContext;
