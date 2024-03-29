import React ,{Component}from 'react';
import { Alert,Text, View, ImageBackground,Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DateSelect from "./dateSelect";
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class Members extends Component {
    constructor(props) {
      super(props);
      this.state={
        buttons: [],
        doctors:[],
        isLoading:true,
      };
    }

  componentDidMount() {
    this.setState({isLoading:true})
    this._unsubscribe = this.props.navigation.addListener('focus', () => {this.getData()});
  }

  getData() {
    let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/employer/employerlist';
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
          this.context.action.changedoctors(json.employerlist)
        } else {
          console.log(json.msg)
        }
      }).catch(error => console.warn(error));
  }

  deleteDoctor(id) {
    Alert.alert(
      '提醒',
      '您确定要删除这位成员吗？',
      [
        {text: '确定', onPress: () => {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/employer/delete'
          + '?employerId=' + id;
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
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code === 0) {
                console.log(json.msg);
                Alert.alert('删除成功');
                this.getData();
              } else {
                console.log(json.msg);
                Alert.alert('删除失败');
              }
            }).catch(error => console.warn(error));}},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }
  /*    <View style={{flexDirection:'row',marginBottom:10}}>
      <ScrollView horizontal={true}>
        <TouchableOpacity style={{borderWidth:1,borderRadius:10,backgroundColor:'#FF816B',width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
          <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '400'}}>全部(24)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>全科(12)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>儿科(4)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>牙科(6)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>心理(2)</Text>
        </TouchableOpacity>
      </ScrollView>
      </View> */
  render () {
    let docs = [];
    if (this.context.doctors.length >0) {
    docs = this.context.doctors.map((item) => {
      return (
        <View style={styles.doctorHolder} key={item.employerId}>
          <TouchableOpacity style={{ marginRight:10}} onPress={() => this.props.navigation.navigate(I18n.t('doctorInfo'), {id: item.employerId})}>
          <Image
            style = {{width: 40, height:40,marginRight:15,borderRadius:20}}
            source = {item.imgUrl?{uri:item.imgUrl}:require('../../images/providerImg/service_doctor_img1.png')}
          />
          </TouchableOpacity>
          <View style={{width:'60%'}}>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text numberOfLines={1} style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.personalProfile}</Text>
          </View>
          <TouchableOpacity style={{marginRight:10}} onPress={() => this.props.navigation.navigate(I18n.t('doctorInfo'), {id: item.employerId})}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.deleteDoctor(item.employerId)}}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_delete.png')}
            />
          </TouchableOpacity>
        </View>
      )
    })}
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
      <SafeAreaView style={{ flex:1,alignItems: "center",backgroundColor:'white' }}>
        <View style={{flex:1,width:'85%'}}>
          <TouchableOpacity style={{borderRadius:15,marginTop:20,width:'100%',height:70}}
          onPress={() => this.props.navigation.navigate(I18n.t('uploadMember'), {id: null})}>
            <ImageBackground source={require('../../images/providerImg/account_img_block.png')} style={{flexDirection:'row',width:'100%',height:70,justifyContent: "center", alignItems: "center"}}>
              <Text style={{ color: '#68B0AB', fontSize: 18, fontWeight: '400'}}>{I18n.t('addMember')}</Text>
              <Image
                style = {{width:25,height:25,marginLeft:10}}
                source = {require('../../images/providerImg/account_icon_add_green.png')}
              />
            </ImageBackground>
          </TouchableOpacity>

        <View style={{flexDirection:'row',marginTop:30,marginBottom:6}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '500'}}>{I18n.t('myMember')}</Text>
        </View>

        <ScrollView style={{ flex: 1}}>
          <View style={{ flex: 1}}>
          {this.context.doctors.length >0 ? docs :
          <View>
            <Image
              style = {{width:280,height:280}}
              source = {require('../../images/providerImg/splash_img3.png')}
            />
            <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>{I18n.t('noMember')}</Text>
          </View>
          }
          </View>
        </ScrollView>
        </View>
      </SafeAreaView>
    )
  }}
}
Members.contextType = DataContext;
