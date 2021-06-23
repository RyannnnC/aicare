import React,{Component} from 'react';
import {SafeAreaView,Text, View, Alert, Image,TouchableOpacity,ActivityIndicator  } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from "../../providerContext";
import { LinearGradient } from 'expo-linear-gradient';
import I18n from '../switchLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';

export default class HealthAccountMain extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      email:'',
      isLoading:true,
    }
  }
  startAlert(){
    Alert.alert(
      '提醒',
      '您确定要退出登录吗？',
      [
        {text: '确定', onPress: () => {
                if (this.context.employerId != null) {
                  this.removeId();
                }
                this.removeToken();
                this.context.action.clearstate();
        }},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }
  async removeToken() {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("rtoken");
      console.log("Remove token success");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async removeId() {
    try {
      await AsyncStorage.removeItem("id");
      console.log("Remove id success");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  componentDidMount() {
    this.setState({isLoading:true})
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.context.employerId == null) {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/orginfo/list';
          fetch(url,{
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
          }})
          .then((response) => response.json())
          .then((json) => {
            this.setState({ isLoading: false });
            if (json.code === 0) {

              if(json.orginfo.name!=null){
                this.context.action.changeorg(json.orginfo.orgId);
                this.context.action.changeimg(json.orginfo.orgImg);
                this.context.action.changename(json.orginfo.name);
                this.context.action.changeemail(json.orginfo.email);
                this.context.action.changephone(json.orginfo.mobile);
                this.context.action.changestreet(json.orginfo.address);
                this.context.action.changepostcode(json.orginfo.postalCode);
                this.context.action.changeintro(json.orginfo.introduce);
                this.context.action.changestate(json.orginfo.city);
                this.context.action.changelanguage(json.orginfo.languages);
                this.context.action.changeserviceclass(json.orginfo.serviceClassList);
                this.context.action.changetime(json.orginfo.orgschedulevos);
                this.context.action.changetypelist(json.orginfo.serviceTypeList);
              }
              console.log(json.orginfo.orgschedulevos);
            } else {
              console.log(json.msg)
            }
          }).catch(error => console.warn(error));
      } else {
        let url = 'http://'
        +this.context.url
        +'/aicare-business-api/business/employer/list'
        +'?employerId=' + this.context.employerId;
        fetch(url,{
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
        }})
        .then((response) => response.json())
        .then((json) => {
          this.setState({ isLoading: false });
          if (json.code === 0) {
            console.log(json.employerInfo);
            if(json.employerInfo.name!=null){
              this.context.action.changeimg(json.employerInfo.imgUrl);
              this.context.action.changename(json.employerInfo.name);
              this.context.action.changeemail(json.employerInfo.email);
              this.context.action.changephone(json.employerInfo.mobile);
              this.context.action.changeintro(json.employerInfo.introduce);
              this.context.action.changestate(json.employerInfo.city);
              this.context.action.changemlan(json.employerInfo.languages);
              this.context.action.changeserviceclass(json.employerInfo.serviceClassList);
              this.context.action.changetime(json.employerInfo.employerSchedulevos);
              this.context.action.changetypelist(json.employerInfo.serviceTypeList);
            }
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
      }
    });
  }

  render() {
    if (this.state.isLoading){
      return(
        <SafeAreaView style={{ flex: 1}}>
        <View style={{ width:'100%',height:'100%',backgroundColor:'rgb(51,51,51)', alignItems: "center" }}>
        <View style={{flexDirection:'row',width:'100%',height:'8%',backgroundColor:'rgb(33,192,196)',alignItems:'center'}}>
          <Image
            style={{height:40,width:160,marginLeft:'5%'}}
            resizeMode='stretch'
            source={require('../../images/providerImg/顶端LOGO.png')}
          />
          <View style={{width:'75%',alignItems:'flex-end',justifyContent:'center'}}>
            <Text style={{fontSize:20,color:'white'}}>{moment(new Date()).format('ll')}</Text>
          </View>
        </View>
          <View style={{marginTop:'35%'}}>
            <ActivityIndicator size="large" color="white"  />
          </View>
        </View>
        </SafeAreaView>
    )
    }else {
      return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{width:'100%',height:'100%',alignItems: "center", backgroundColor:'rgb(51,51,51)' }}>
      <View style={{flexDirection:'row',width:'100%',height:'8%',backgroundColor:'rgb(33,192,196)',alignItems:'center'}}>
        <Image
          style={{height:40,width:160,marginLeft:'5%'}}
          resizeMode='stretch'
          source={require('../../images/providerImg/顶端LOGO.png')}
        />
        <View style={{width:'75%',alignItems:'flex-end',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'white'}}>{moment(new Date()).format('ll')}</Text>
        </View>
      </View>
      <View style={{width:'90%',height:'100%', backgroundColor:'white'}}>
      {this.context.image ?
      <View style={{ width: '100%',height:160}}>
      <LinearGradient
      colors={['rgba(250,250,247,0.0)', '#ecf4f3']}
      style={{width:'100%',height:'100%',alignItems: "center",justifyContent:'center'}}>
      <View style={{ width: 300, height: 50, alignItems: "center", flexDirection: 'row'}}>
      <Image
        style = {{height:60,width:60,borderRadius:30, marginRight:25}}
        source = {{uri:this.context.image}}
      />
      <View>
        <Text style={{ fontSize:20, fontWeight: '600' }}>{this.context.name}</Text>
        <Text style={{ fontSize:14, fontWeight: '300' }}>{this.context.email}</Text>
      </View>
      </View>
      </LinearGradient>
      </View>
      :
      <View style={{ width: '100%',height:160}}>
      <LinearGradient
      colors={['rgba(250,250,247,0.0)', '#ecf4f3']}
      style={{width:'100%',height:'100%',alignItems: "center",justifyContent:'center'}}>
      <View style={{ width: 300, height: 50, alignItems: "center", flexDirection: 'row'}}>
        <Text style={{ fontSize:20, fontWeight: '600' }}>{I18n.t('noInformation')}</Text>
      </View>
      </LinearGradient>
      </View>
      }
      <View style={{marginTop:20, alignItems: "center"}}>
      <TouchableOpacity style={styles.profileBar} onPress={() => {
        if (this.context.employerId != null) {
          this.props.navigation.navigate(I18n.t('uploadMember'), {id: this.context.employerId})
        } else {
          this.props.navigation.navigate(I18n.t('orginfo'));
        }
      }}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_medical.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('orginfo')}</Text>
      </TouchableOpacity>
      {this.context.employerId == null &&
        <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate(I18n.t('members'))}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('members')}</Text>
        </TouchableOpacity>
      }
      {this.context.employerId != null &&
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate(I18n.t('myAccount'))}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_card.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('myAccount')}</Text>
      </TouchableOpacity>
      }
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate(I18n.t('changePassword'))}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/signup_icon_pswd.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('resetPassword')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress={() => this.props.navigation.navigate(I18n.t('mySetting'))}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_setting.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('settings')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.profileBar}
      onPress={() => {
        //this.startAlert()
        if (this.context.employerId != null) {
          this.removeId();
        }
        this.removeToken();
        this.context.action.clearstate();
      }}
      >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_logout.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t('logout')}</Text>
      </TouchableOpacity>
      </View>
      <View style={{marginTop:50,flexDirection: 'row', alignSelf:'center',alignItems: "center" }}>
        <Image
          source={require('../../images/logo.png')}
          style = {{width:85, height:30}}
        />
        <Text style={{fontSize:12, color:'#68B0AB'}}>+61 421326182</Text>
       </View>
      </View>
      </View>
    </SafeAreaView>
  );}}
}
HealthAccountMain.contextType = DataContext;
