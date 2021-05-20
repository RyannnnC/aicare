import React ,{Component}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Feather,FontAwesome5,AntDesign   } from '@expo/vector-icons';
import ProviderOrder from './Scene/teleCare/providerOrder.js'
import ProviderMain from './Scene/teleCare/providerMain.js'
import Income from './Scene/teleCare/income.js'
import Welcome from './Scene/welcome';
import ProviderType from './Scene/providerType';
import Login from './Scene/login';
import AccountMain from './Scene/Account/accountMain';
import Resume from './Scene/Account/resume';
import Comment from './Scene/Account/comment';
import AccountInfo from './Scene/Account/accountInfo';
import ChangePwd from './Scene/Account/changePwd';
import Setting from './Scene/Account/setting';
import WorkExperience from './Scene/Account/workExperience';
import License from './Scene/Account/license';
import PersonalTag from './Scene/Account/personalTag';
import Certificate from './Scene/Account/certificate';
import ServiceType from './Scene/Account/serviceType';
import ChangeMail from './Scene/Account/changeMail';
import TransferOut from './Scene/Income/transferOut';
import Signup from './Scene/signUp';
import Forget from './Scene/forget';
import DataContext from './providerContext';
import Agency from './Scene/teleCare/agency';
import HealthMain from './Scene/Health/healthMain';
import HealthAccountMain from './Scene/Health/healthAccountMain';
import ReservationMain from './Scene/Health/reservationMain';
import Verify from './Scene/verification';
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
import Enotes2 from './Scene/Health/enotes2';
import Enotes3 from './Scene/Health/enotes3';
import CaseRecord from './Scene/Health/caseRecord';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function Home() {
  return (
      <Tab.Navigator>
          <Tab.Screen
            name="主页"
            component={ProviderMain}
            options={{
              tabBarLabel: '主页',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
            />
          <Tab.Screen
            name="订单"
            component={ProviderOrder}
            options={{
              tabBarLabel: '订单',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="收益"
            component={Income}
            options={{
              tabBarLabel: '收益',
              tabBarIcon: ({ color, size }) => (
                <Feather name="dollar-sign" size={24} color="black" />
              ),
            }}
             />
          <Tab.Screen
            name="账号"
            component={AccountMain}
            options={{
              tabBarLabel: '账号',
              tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
             />
        </Tab.Navigator>
  );
}
function OrgHome() {
  return (
      <Tab.Navigator>
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
  );
}
function DoctorHome() {
  return (
      <Tab.Navigator>
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
            name="病历"
            component={CaseRecord}
            options={{
              tabBarLabel: I18n.t('record'),
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="notes-medical" size={24} color="black" />
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
  );
}

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
    token:'',
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
    }
    }
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
  changetoken = (value) => {
    this.setState({
        token: value
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
      token:'',
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

  render() {
  return (
    <DataContext.Provider value={ this.state }>
    <NavigationContainer>
      <Stack.Navigator>
      {this.state.authenticate ? (
        this.state.health ? (
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
            <Stack.Screen options={{headerShown: false}} name="healthHome" component={DoctorHome} />
            <Stack.Screen name={I18n.t('changePassword')} component={ChangePwd} />
            <Stack.Screen name={I18n.t('mySetting')} component={Setting} />
            <Stack.Screen name={I18n.t('orginfo')}component={Info} />
            <Stack.Screen name={I18n.t('members')} component={Members} />
            <Stack.Screen name={I18n.t('mlan')} component={Mlan} />
            <Stack.Screen name={I18n.t('languages')} component={Languages} />
            <Stack.Screen name={I18n.t('serviceType')} component={HealthServiceType} />
            <Stack.Screen name={I18n.t('uploadMember')}component={UploadMember} />
            <Stack.Screen name={I18n.t('doctorInfo')} component={DoctorInfo} />
            <Stack.Screen name={I18n.t('enote')} component={Enotes} />
            <Stack.Screen name={I18n.t('enote2')} component={Enotes2} />
            <Stack.Screen name={I18n.t('enote3')} component={Enotes3} />
            </>
          )
        ):(
          <>
          <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <Stack.Screen options={{headerShown: false}} name="accountMain" component={AccountMain}/>
          <Stack.Screen name="简历" component={Resume} />
          <Stack.Screen name="评价" component={Comment} />
          <Stack.Screen name="账户信息" component={AccountInfo} />
          <Stack.Screen name="修改密码" component={ChangePwd} />
          <Stack.Screen name="我的设置" component={Setting} />
          <Stack.Screen name="工作经历" component={WorkExperience} />
          <Stack.Screen name="证书执照" component={License} />
          <Stack.Screen name="个人简介" component={PersonalTag} />
          <Stack.Screen name="证件上传" component={Certificate} />
          <Stack.Screen name="服务类型" component={ServiceType} />
          <Stack.Screen name="修改邮箱" component={ChangeMail} />
          <Stack.Screen name="资金转出" component={TransferOut} />
          </>
        )
      ): (
        <>
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
        <Stack.Screen options={{headerShown: false}} name="请选择服务类型" component={ProviderType} />
        <Stack.Screen options={{headerShown: false}} name= {I18n.t('login')} component={Login} />
        <Stack.Screen options={{headerShown: false}} name="机构" component={Agency} />
        <Stack.Screen name="验证" component={Verify} />
        <Stack.Screen name={I18n.t('signup')}  component={Signup} />
        <Stack.Screen name={I18n.t('forgotPassword')}  component={Forget}/>
        </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
    </DataContext.Provider>
  );}
}
