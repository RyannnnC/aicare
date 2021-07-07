import React ,{Component, useContext}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from "@react-navigation/drawer";
import { Platform,SafeAreaView,ScrollView,Text,View,Image,TouchableOpacity} from 'react-native';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Feather,FontAwesome5,AntDesign   } from '@expo/vector-icons';
import Welcome from './Scene/welcome';
import Login from './Scene/login';
import ChangePwd from './Scene/Account/changePwd';
import Setting from './Scene/Account/setting';
import Signup from './Scene/signUp';
import Forget from './Scene/forget';
import DataContext from './providerContext';
import HealthMain from './Scene/Health/healthMain';
import HealthAccountMain from './Scene/Health/healthAccountMain';
import ReservationMain from './Scene/Health/reservationMain';
import Info from './Scene/Health/info';
import Introduction from './Scene/Health/introduction';
import Languages from './Scene/Health/languages';
import HealthServiceType from './Scene/Health/healthServiceType';
import OtherStores from './Scene/Health/otherStores';
import Members from './Scene/Health/members';
import UploadMember from './Scene/Health/uploadMember';
import DoctorInfo from './Scene/Health/doctorInfo';
import Mintro from './Scene/Health/mintro';
import Mlan from './Scene/Health/mlan';
import I18n from './Scene/switchLanguage';
import Enotes from './Scene/Health/enotes';
import Enotes3 from './Scene/Health/enotes3';
import CaseRecord from './Scene/Health/caseRecord';
import MyAccount from './Scene/Health/myAccount'
import PrescriptionCheck  from './Scene/Health/prescriptionCheck'
import Finish from './Scene/Health/finish'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={I18n.t('booking')} style={{borderWidth:1}}/>
      <DrawerItem label={I18n.t('processingOrder')}
       onPress={() => props.navigation.navigate('预约',{screen:I18n.t('processingOrder')})} />
      <DrawerItem label={I18n.t('pendingOrder')}
       onPress={() => props.navigation.navigate('预约',{screen:I18n.t('pendingOrder')})} />
      <DrawerItem label={I18n.t('myAccount')} onPress={() => {
        props.navigation.navigate('账号')
        props.navigation.navigate(I18n.t('myAccount'))
      }} />
      <DrawerItem label={I18n.t('changePassword')}
       onPress={() => {
        props.navigation.navigate('账号')
        props.navigation.navigate(I18n.t('changePassword'))
      }} />
      <DrawerItem label={I18n.t('enote')} style={{borderWidth:1}}/>
    </DrawerContentScrollView>
  );
}

function Draw() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={I18n.t('homePage')} component={DoctorHome}/>
    </Drawer.Navigator>
  )
}

function OrgHome() {
  const user = useContext(DataContext);
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{paddingTop: Platform.OS === 'android' ? 21 : 0,width:'100%',height:'100%',backgroundColor:'rgb(51,51,51)'}}>
      <View style={{flexDirection:'row',width:'100%',height:'8%',backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'space-between'}}>
      <Image
        style={{height:36,width:160,marginLeft:'5%'}}
        resizeMode='stretch'
        source={require('./images/providerImg/顶端LOGO.png')}
      />
      <View style={{width:'70%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
        <Text style={{fontSize:24,color:'white',marginRight:'10%'}}>{user.name}</Text>
        <Text style={{fontSize:24,color:'white',marginRight:'10%'}}>{moment(new Date()).format('ll')}</Text>
      </View>
    </View>
      <Tab.Navigator tabBarOptions={{
          style:{backgroundColor:'rgb(51,51,51)'},
          inactiveTintColor:'white',
          activeTintColor:'rgb(33,192,196)',
        }}>
          <Tab.Screen
            name="主页"
            component={HealthMain}
            options={{
              tabBarLabel:I18n.t('homePage'),
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
            />
          <Tab.Screen
            name="预约"
            component={ReservationMain}
            options={{
              tabBarLabel: I18n.t('booking'),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="账号"
            component={HealthAccountMain}
            options={{
              tabBarLabel: I18n.t('account'),
              tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
             />
        </Tab.Navigator>
        </View>
      </SafeAreaView>
  );
}
function DoctorHome() {
  const user = useContext(DataContext);
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{paddingTop: Platform.OS === 'android' ? 21 : 0,width:'100%',height:'100%',backgroundColor:'rgb(51,51,51)'}}>
      <View style={{flexDirection:'row',width:'100%',height:'8%',backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'space-between'}}>
      <Image
        style={{height:36,width:160,marginLeft:'5%'}}
        resizeMode='stretch'
        source={require('./images/providerImg/顶端LOGO.png')}
      />
      <View style={{width:'70%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
        <Text style={{fontSize:24,color:'white',marginRight:'10%'}}>{user.name}</Text>
        <Text style={{fontSize:24,color:'white',marginRight:'10%'}}>{moment(new Date()).format('ll')}</Text>
      </View>
    </View>
      <Tab.Navigator tabBarOptions={{
          style:{backgroundColor:'rgb(51,51,51)'},
          inactiveTintColor:'white',
          activeTintColor:'rgb(33,192,196)',
        }}>
          <Tab.Screen
            name="主页"
            component={HealthMain}
            options={{
              tabBarLabel:I18n.t('homePage'),
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
            />
          <Tab.Screen
            name="预约"
            component={ReservationMain}
            options={{
              tabBarLabel: I18n.t('booking'),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="账号"
            component={HealthAccountMain}
            options={{
              tabBarLabel: I18n.t('account'),
              tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
             />
        </Tab.Navigator>
        </View>
      </SafeAreaView>
  );
}
/*        <Tab.Screen
          name="病历"
          component={CaseRecord}
          options={{
            tabBarLabel: I18n.t('record'),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="notes-medical" size={24} color="black" />
            ),
          }}
        />*/
export default class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    authenticate: false,
    health: true,
    employerId:null,
    orgId:null,
    url:'3.104.232.106:8084',
    date: "",
    name: '',
    phone: '',
    email: '',
    street:"",
    suburb:"",
    postcode:"",
    intro:'',
    mintro:'',
    state:'',
    token:null,
    refresh_token:null,
    image:'',
    dimage:'',
    languages:[],
    mlan:[],
    time:[],
    serviceclass:[],
    typeList:[],
    userLanguage:null,
    cn:true,
    en:false,
    doctors:[],
    action: {
      changeLogin: this.changeLogin,
      changeHealth: this.changeHealth,
      changetime:this.changetime,
      changestreet:this.changestreet,
      changepostcode:this.changepostcode,
      changesuburb:this.changesuburb,
      changestate:this.changestate,
      changeemail:this.changeemail,
      changephone:this.changephone,
      changename:this.changename,
      changetoken:this.changetoken,
      changedoctors:this.changedoctors,
      clearstate:this.clearstate,
      changetime:this.changetime,
      changeintro:this.changeintro,
      changemintro:this.changemintro,
      changelanguage:this.changelanguage,
      changemlan:this.changemlan,
      changeen:this.changeen,
      changecn:this.changecn,
      changeimg:this.changeimg,
      changedimg:this.changedimg,
      changeserviceclass:this.changeserviceclass,
      changetypelist:this.changetypelist,
      changeemployerid:this.changeemployerid,
      changeorg:this.changeorg,
      logout:this.logout,
    }
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem("token");
      let rtoken = await AsyncStorage.getItem("rtoken");
      let id = await AsyncStorage.getItem("id");
      if(id) {
        this.setState({employerId:JSON.parse(id)});
        console.log("Get id success");
      }
      if(token){
        this.setState({token:token})
        console.log("Get token success");
      }
      if(rtoken){
        this.setState({refresh_token:rtoken})
        console.log("Get token success");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
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
  logout = () => {
    if (this.state.employerId != null) {
      this.removeId();
    }
    this.removeToken();
    this.clearstate();
  }

  changeemployerid = (value) => {
    this.setState({employerId: value});
  }
  changeorg = (value) => {
    this.setState({orgId: value});
  }
  changeLogin = (value) => {
    this.setState({authenticate: value});
  }
  changeHealth = (value) => {
    this.setState({health: value});
  }
  changetime = (value) => {
    this.setState({
      date: value
    });
  }
  changepostcode = (value) => {
    this.setState({
        postcode: value
    });
  }
  changesuburb = (value) => {
    this.setState({
        suburb: value
    });
  }
  changetypelist = (value) => {
    this.setState({
      typeList: value
    });
  }
  changestreet = (value) => {
    this.setState({
        street: value
    });
  }
  changestate = (value) => {
    this.setState({
        state: value
    });
  }
  changetime = (value) => {
    this.setState({
        time: value
    });
  }
  changephone = (value) => {
    this.setState({
        phone: value
    });
  }
  changeemail = (value) => {
    this.setState({
        email: value
    });
  }
  changename = (value) => {
    this.setState({
        name: value
    });
  }
  changetoken = (value1,value2) => {
    this.setState({
        token: value1,
        refresh_token:value2
    });
  }

  changedoctors = (value) => {
    this.setState({
        doctors: value
    });
  }
  changeintro = (value) => {
    this.setState({
        intro: value
    });
  }
  changemintro = (value) => {
    this.setState({
        mintro: value
    });
  }
  changelanguage = (value) => {
    this.setState({
        languages: value
    });
  }
  changemlan = (value) => {
    this.setState({
        mlan: value
    });
  }
  changeen = (value) => {
    this.setState({
        en: value
    });
  }
  changecn = (value) => {
    this.setState({
        cn: value
    });
  }
  changeimg = (value) => {
    this.setState({
        image: value
    });
  }
  changedimg = (value) => {
    this.setState({
        dimage: value
    });
  }
  changeserviceclass = (value) => {
    this.setState({
        serviceclass: value
    });
  }
  clearstate=()=>{
    this.setState({
      authenticate: false,
      health: true,
      employerId:null,
      orgId:null,
      date: "",
      name: '',
      phone: '',
      email: '',
      street:"",
      suburb:"",
      postcode:"",
      intro:'',
      mintro:'',
      state:'',
      token:null,
      refresh_token:null,
      image:'',
      dimage:'',
      languages:[],
      mlan:[],
      time:[],
      serviceclass:[],
      userLanguage:null,
      cn:true,
      en:false,
      doctors:[],
    })
  }

  componentDidMount() {
   this.getToken()
   .then(() => {
     if (this.state.employerId == null) {
         let url = 'http://'
         +this.state.url
         +'/aicare-business-api/business/orginfo/list';
         fetch(url,{
           method: 'GET',
           mode: 'cors',
           credentials: 'include',
           headers: {
           'Accept':       'application/json',
           'Content-Type': 'application/json',
           'sso-auth-token': this.state.token,
           'sso-refresh-token': this.state.refresh_token,
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
               this.changeorg(json.orginfo.orgId);
               this.changeimg(json.orginfo.orgImg);
               this.changename(json.orginfo.name);
               this.changeemail(json.orginfo.email);
               this.changephone(json.orginfo.mobile);
               this.changestreet(json.orginfo.address);
               this.changepostcode(json.orginfo.postalCode);
               this.changeintro(json.orginfo.introduce);
               this.changestate(json.orginfo.city);
               this.changelanguage(json.orginfo.languages);
               this.changeserviceclass(json.orginfo.serviceClassList);
               this.changetime(json.orginfo.orgschedulevos);
               this.changetypelist(json.orginfo.serviceTypeList);
             }
             console.log(json.orginfo.orgschedulevos);
           } else if (json.code == 10011) {
             this.loggedin(json.msg)
           } else {
             console.log(json.msg)
           }
         }).catch(error => console.warn(error));
     } else {
       let url = 'http://'
       +this.state.url
       +'/aicare-business-api/business/employer/list'
       +'?employerId=' + this.state.employerId;
       fetch(url,{
         method: 'GET',
         mode: 'cors',
         credentials: 'include',
         headers: {
         'Accept':       'application/json',
         'Content-Type': 'application/json',
         'sso-auth-token': this.state.token,
         'sso-refresh-token': this.state.refresh_token,
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
             this.changeimg(json.employerInfo.imgUrl);
             this.changename(json.employerInfo.name);
             this.changeemail(json.employerInfo.email);
             this.changephone(json.employerInfo.mobile);
             this.changeintro(json.employerInfo.introduce);
             this.changestate(json.employerInfo.city);
             this.changemlan(json.employerInfo.languages);
             this.changeserviceclass(json.employerInfo.serviceClassList);
             this.changetime(json.employerInfo.employerSchedulevos);
             this.changetypelist(json.employerInfo.serviceTypeList);
           }
         } else {
           console.log(json.msg)
         }
       }).catch(error => console.warn(error));
   }})
  }

  render() {
  return (
    <DataContext.Provider value={ this.state }>
    <NavigationContainer>
      <Stack.Navigator>
      {this.state.token ? (
          this.state.employerId == null ? (
            <>
            <Stack.Screen options={{headerShown: false}} name="healthHome" component={OrgHome} />
            <Stack.Screen name={I18n.t('changePassword')} component={ChangePwd} />
            <Stack.Screen name={I18n.t('mySetting')} component={Setting} />
            <Stack.Screen name={I18n.t('orginfo')}component={Info} />
            <Stack.Screen name={I18n.t('members')} component={Members} />
            <Stack.Screen name={I18n.t('introduction')} component={Introduction} />
            <Stack.Screen name={I18n.t('mintro')} component={Mintro} />
            <Stack.Screen name={I18n.t('mlan')} component={Mlan} />
            <Stack.Screen name={I18n.t('languages')} component={Languages} />
            <Stack.Screen name={I18n.t('serviceType')} component={HealthServiceType} />
            <Stack.Screen name={I18n.t('stores')} component={OtherStores} />
            <Stack.Screen name={I18n.t('uploadMember')}component={UploadMember} />
            <Stack.Screen name={I18n.t('doctorInfo')} component={DoctorInfo} />
            </>
          ):(
            <>
            <Stack.Screen options={{headerShown: false}} name="healthHome" component={Draw} />
            <Stack.Screen name={I18n.t('changePassword')} component={ChangePwd} />
            <Stack.Screen name={I18n.t('mySetting')} component={Setting} />
            <Stack.Screen name={I18n.t('mintro')} component={Mintro} />
            <Stack.Screen name={I18n.t('mlan')} component={Mlan} />
            <Stack.Screen name={I18n.t('serviceType')} component={HealthServiceType} />
            <Stack.Screen name={I18n.t('uploadMember')}component={UploadMember} />
            <Stack.Screen name={I18n.t('doctorInfo')} component={DoctorInfo} />
            <Stack.Screen name={I18n.t('myAccount')} component={MyAccount} />
            <Stack.Screen name={I18n.t('enote')} component={Enotes} />
            <Stack.Screen name={I18n.t('enote3')} component={Enotes3} />
            <Stack.Screen name={I18n.t('prescription')} component={PrescriptionCheck} />
            <Stack.Screen name={I18n.t('finish')} component={Finish} />
            </>
          )
      ): (
        <>
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
        <Stack.Screen options={{headerShown: false}} name= {I18n.t('login')} component={Login} />
        <Stack.Screen name={I18n.t('signup')}  component={Signup} />
        <Stack.Screen name={I18n.t('forgotPassword')}  component={Forget}/>
        </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
    </DataContext.Provider>
  );}
}
