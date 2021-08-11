import * as Localization from 'expo-localization';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import VersionCheck from "react-native-version-check-expo";
import {Platform,Alert,Linking,AsyncStorage,BackHandler} from "react-native";
import Info from './Scene/consumerInfo';
import ConsumerOrder from './Scene/consumerOrder';
import ConsumerIcon from "./Scene/consumerIcon";
import ConsumerDate from './Scene/consumerDate';
import ConsumerAddress from './Scene/consumerAdrress';
import ConsumerPayInfo from './Scene/consumerPayInfo';
import ConsumerPaySuccess from "./Scene/consumerPaySuccess";
import ConsumerMain from "./Scene/consumerMain";
import DataContext from './consumerContext';
import AccountMain from "./Scene/account/aacountMain";
import 'react-native-gesture-handler';
import AccountInfo from "./Scene/account/accountInfo";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import ChangeEmail from './Scene/account/changeEmail';
import ChangePwd from "./Scene/account/changePwd";
import Setting from "./Scene/account/setting";
import ConsumerOrderPage from "./Scene/consumerOrderPage";
import ConsumerProvider from "./Scene/consumerProvider";
import ProviderInfo from "./Scene/ProviderInfo";
import Consumer from './Scene/consumerOrder';
import ConsumerMapView from "./Scene/consumerMapView";
import consumerRating from './Scene/order/rating';
import CompletedOrder from "./Scene/order/completedOrder";
import TelehealthrMain from './Scene/telehealth/telehealthMain';
import teleSuburb from './Scene/telehealth/telehealthSuburb';
import telehealthClinic from './Scene/telehealth/telehealthClinic';
import DocInfo from "./Scene/telehealth/docInfo";
import TeleSuccess from "./Scene/telehealth/telehealthPaySuccess";
//import AccountMain from "./Scene/account/aacountMain"
import Confirm from "./Scene/telehealth/telehealthConfirm";
import TelePay from "./Scene/telehealth/telehealthPay";
import ClinicInfo from "./Scene/telehealth/clinicInfo";
import telehealthDoc from './Scene/telehealth/telehealthDoc';
import TelehealthMV from './Scene/telehealth/telehealthMap';
import Pay from './Scene/telehealth/Pay';
import OnlineDoc from "./Scene/onlineDoctors";
import DataPolicy from './Scene/datapolicy';
import TermOfUse from './Scene/termofuse';
import Patient_description from "./Scene/patient_description";
import Welcome from './Scene/welcome';
import Login from './Scene/login';
import Signup from './Scene/signUp';
import Forget from './Scene/forget';
import DocRecommend from './Scene/telehealth/docRecommend';
import changeSuburb from './Scene/telehealth/changeSuburb';
import changeClinic from './Scene/telehealth/changeClinic';
import changeDoc from './Scene/telehealth/changeDoc';
import changeDocInfo from './Scene/telehealth/changeDocInfo';
import telehealthPayment from "./Scene/telehealth/telehealthPayment";
import Intro from "./intro";
import Report from "./Scene/report"
import covid_confirm from "./Scene/covid_test/covid_confirm"
import CardInfo from "./Scene/account/cardInfo";
import HealthRecord from "./Scene/healthRecord";
import HistoryInfo from "./Scene/account/historyInfo";
import AiTest from "./Scene/aiTest";
import Result from "./Scene/result";
import prescription from './Scene/prescriptions';
import Pdf from './Scene/pdf';
import I18n from './Scene/language';
import chatbot from "./Scene/chatbot"
import reservation from "./Scene/covid_test/reservation"
import covid_finish from "./Scene/covid_test/covid_finish"
import covid_info from "./Scene/covid_test/covid_info"
import covid_pay from "./Scene/covid_test/covid_pay";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
      <Tab.Navigator tabBarOptions={{activeTintColor:"#FF7E67"}}>
          <Tab.Screen
            name="consumerMain"
            component={ConsumerMain}
            options={{
              tabBarLabel: I18n.t("homepage_tab"),
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
            />
          <Tab.Screen
            name="Icon"
            component={ConsumerIcon}
            options={{
              tabBarLabel: I18n.t("service_tab"),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="room-service" size={size} color={color} />
              ),
            }}
          />
          
          <Tab.Screen
            name="订单"
            component={ConsumerOrderPage}
            options={{
              tabBarLabel: I18n.t("appointment_tab"),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />              ),
            }}
             />
          <Tab.Screen
            name="账号"
            component={AccountMain}
            options={{
              tabBarLabel: I18n.t("account_tab"),
              tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color}  size={size} />
            ),
          }}
             />
        </Tab.Navigator>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      des:"",
      air:"",
      dep:"",
      tes:"",
      fir:"",
      las:"",
      gen:"",
      dob:"",
      add:"",
      sub:"",
      sta:"",
      post:"",
      mob:"",
      ema:"",
      pass:"",
      nat:"",
      customer_service:"+61 421326182",
      loading:true,
      first_visit:0,
      street:"请点击右边箭头按钮输入您的地址",
      url:"3.104.232.106:8085",//develop："3.104.232.106:8085"；test："3.104.87.14:8085"
      suburb:"",
      postcode:"",
      state:"",
      name:"kim",
      mobile:"",
      customerUserInfoId:-1,
      language:"en",
      date: "请点击右边箭头按钮输入时间",
      start_time:"",
      end_time:"",
      total_time:0,
      rate:40,
      extra_supply:false,
      username: '',
      address:null,
      authenticate: false,
      ad:true,
      token:"",
      orgId:0,
      docId:0,
      schedule:[],
      consultWay:["就诊方式","实地就诊","远程医疗"],
      deptType:["推荐医生","全科","牙科","心理","中医","儿科","康复","疫苗"],
      lan:["语言","普通话","英语","粤语"],
      version:1.343,
      action: {
        changeLogin: this.changeLogin,
        changesupply: this.changesupply,
        changename:this.changename,
        changetime:this.changetime,
        changestreet:this.changestreet,
        changesuburb:this.changesuburb,
        changestate:this.changestate,
        changepostcode:this.changepostcode,
        changestarttime:this.changestarttime,
        changeendtime:this.changeendtime,
        changetotal:this.changetotal,
        changeaddress:this.changeaddress,
        changetoken:this.changetoken,
        changeOrgId:this.changeOrgId,
        changeDocId:this.changeDocId,
        clearstate:this.clearstate,
        changeSchedule:this.changeSchedule,
        changevisit:this.changevisit,
        changeLoading:this.changeLoading,
        contact:this.contact,
        changeInfoId:this.changeInfoId,
        changeLan:this.changeLan,
        changeDes:this.changeDes,
        changeAir:this.changeAir,
        changeDep:this.changeDep,
        changeBook:this.changeBook,
        changeFir:this.changeFir,
        changeLas:this.changeLas,
        changeDob:this.changeDob,
        changeAdd:this.changeAdd,
        changeSub:this.changeSub,
        changeAd:this.changeAd,
        changeSta:this.changeSta,
        changePost:this.changePost,
        changeMob:this.changeMob,
        changeEma:this.changeEma,
        changePass:this.changePass,
        changeNat:this.changeNat
      }
    }
  }
  contact = () => {
    //phone='0403555432';
    //let phoneNumber = phone;
    const mobile = "+61 421326182";
    if (Platform.OS !== 'android') {
      Linking.canOpenURL(`telprompt:${mobile}`)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(`telprompt:${mobile}`);
      }
    })
    .catch(err => console.log(err));
  }
    else  {
     
      Linking.canOpenURL(`tel:${mobile}`)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(`tel:${mobile}`);
      }
    })
    .catch(err => console.log(err));
    }
  };
  clearstate=()=>{
    this.setState({
      des:"",
      air:"",
      dep:"",
      tes:"",
      fir:"",
      las:"",
      gen:"",
      dob:"",
      add:"",
      sub:"",
      sta:"",
      post:"",
      mob:"",
      ema:"",
      pass:"",
      nat:"",
      ad:true,
    loading:true,
    street:"请点击右边箭头按钮输入您的地址",
    suburb:"",
    postcode:"",
    state:"",
    name:"kim",
    mobile:"",
    date: "请点击右边箭头按钮输入时间",
    start_time:"",
    end_time:"",
    total_time:0,
    rate:40,
    extra_supply:false,
    username: '',
    address:null,
    authenticate: false,
    token:"",
    orgId:0,
    docId:0,
    schedule:[],
    first_visit:0,
    first_time:null,
    customerUserInfoId:-1,
    language:"en"

    })
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("token");
      let userId = JSON.parse(await AsyncStorage.getItem("infoId"));

      //let id = await AsyncStorage.getItem("id");
      /*if(id) {
        this.setState({employerId:JSON.parse(id)});
        console.log("Get id success");
      }*/
      if(userData){
        this.setState({token:userData})
        //Alert.alert(this.state.token)
        this.setState({customerUserInfoId:userId})
        SystemLanguage=Localization.locale.slice(0,2)
  if(SystemLanguage){
    this.setState({language:SystemLanguage})
  }
  var lan = "en";
  if(this.state.language=="en"){
    lan= "en_US"
  }else{
    lan = "zh_CN"
  }
  //Alert.alert(this.state.token);
  let url = 'http://'
      +this.state.url
      +'/aicare-customer-api/changeSessionLanauage?lang='+lan;
      fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.state.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      }, 
    })
      .then((response) => response.json())
      .then((json) => {
        //this.setState({loading:false})
        //Alert.alert(json.code)
        if (json.code === 0) {
          //Alert.alert(I18n.t("changed"))
          
          console.log(json.msg)

        } else {
          console.log(json.msg)
          //Alert.alert(this.state.token);
        }
      }).catch(error => console.warn(error));
        console.log("Get token success");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getFirst() {
    try {
      let userData = await AsyncStorage.getItem("firsttime");
      //let id = await AsyncStorage.getItem("id");
      /*if(id) {
        this.setState({employerId:JSON.parse(id)});
        console.log("Get id success");
      }*/
      if(userData){
        //this.setState({token:userData})
        this.setState({first_time:userData});
        
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  changeLoading = (value) => {
    this.setState({loading: value});
    console.log(value);
  }




  changeAd = (value) => {
    this.setState({ad: value});
    console.log(value);
  }
  changeSub = (value) => {
    this.setState({sub: value});
    console.log(value);
  }

  changeSta = (value) => {
    this.setState({sta: value});
    console.log(value);
  }
  changePost = (value) => {
    this.setState({post: value});
    console.log(value);
  }
  changeMob = (value) => {
    this.setState({mob: value});
    console.log(value);
  }
  changeEma = (value) => {
    this.setState({ema: value});
    console.log(value);
  }
  changePass = (value) => {
    this.setState({pass: value});
    console.log(value);
  }
  changeNat = (value) => {
    this.setState({nat: value});
    console.log(value);
  }



  changeDes = (value) => {
    this.setState({des: value});
    console.log(value);
  }
  changeDep = (value) => {
    this.setState({dep: value});
    console.log(value);
  }
  changeAir = (value) => {
    this.setState({air: value});
    console.log(value);
  }
  changeBook = (value) => {
    this.setState({book: value});
    console.log(value);
  }
  changeTes = (value) => {
    this.setState({tes: value});
    console.log(value);
  }
  changeFir = (value) => {
    this.setState({fir: value});
    console.log(value);
  }
  changeLas = (value) => {
    this.setState({las: value});
    console.log(value);
  }
  changeGen = (value) => {
    this.setState({gen: value});
    console.log(value);
  }
  changeDob = (value) => {
    this.setState({dob: value});
    console.log(value);
  }
  changeAdd = (value) => {
    this.setState({add: value});
    console.log(value);
  }
  changeSub = (value) => {
    this.setState({sub: value});
    console.log(value);
  }
  changeInfoId = (value) => {
    this.setState({customerUserInfoId: value});
    console.log(value);
  }
  changetoken = (value) => {
    this.setState({token: value});
    console.log(value);
  }
  changevisit = (value) => {
    this.setState({first_visit: value});
    console.log(value);
  }
  changeSchedule = (value) => {
    console.log("value:")
    this.setState({schedule: value});
    console.log(value);
  }
  changeOrgId = (value) => {
    this.setState({orgId: value});
    console.log(value);
  }
  changeDocId = (value) => {
    this.setState({docId: value});
    console.log(value);
  }
  changeLogin = (value) => {
    this.setState({authenticate: value});
    console.log(value);
  }
  changeaddress = (value) => {
    this.setState({
        address: value
    });
  }
  
changetotal = (value) => {
  this.setState({
      total_time: value
  });
}
changestarttime = (value) => {
  this.setState({
      start_time: value
  });
}
changeendtime = (value) => {
  this.setState({
      end_time: value
  });
}
changestate = (value) => {
  this.setState({
      state: value
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


changestreet = (value) => {
  this.setState({
      street: value
  });
}
changesupply = (value) => {
    this.setState({
        extra_supply: value
    });
}
changename = (value) => {
  this.setState({
      name: value
  });
}

changetime = (value) => {
  this.setState({
      date: value
  });
}
changeLan=(lan)=>{
  this.setState({
    language:lan
  })
}
checkVersion = async()=>{
 
  

  var version_latest = 0;

  try {
    let url = 'http://version.doctoraicare.com.au/getVersion';
      fetch(url,{
        method: 'GET',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }})
      .then((response) => response.json())
      .then((json) => {
        //this.setState({loading:false})
        //Alert.alert(json.code)
        if (json.status === "success") {
          //Alert.alert(I18n.t("changed"))
          
          version_latest=parseFloat(json.result)
          //checking until the third decimal(inclsuive)
          if(parseFloat(json.result)-this.state.version >0.001){


            Alert.alert(
              "Please Update",
              "You will have to update your app to the latest version to the continue using.",
              [
                {
                  text:"Update",
                  onPress:()=>{
                    
                    Linking.openURL(Platform.OS != 'android'?"https://apps.apple.com/us/app/aicare-health/id1565283508":"https://play.google.com/store/apps/details?id=com.jingzhuo.aicare")
                    //RNExitApp.exitApp();
      
                  },
                },
              ],
              {cancelable:false},
            );
          }
        } else {
          console.log(json.msg)
          //Alert.alert(this.state.token);
        }
      }).catch(error => console.warn(error));
      //Alert.alert("whats wrong")

    
  }catch (error){

    console.log(error)
    Alert.alert("error")
  }
}
componentDidMount() {
  this.getToken();
  this.checkVersion();
      //Alert.alert(this.state.token);

 }

render() {
  return (
    <DataContext.Provider value={ this.state }>
    <NavigationContainer>
      <Stack.Navigator >
        {this.state.token!="" ? (
        <>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="consumerMain" component={ConsumerMain} />
        <Stack.Screen name="accountMain" component={AccountMain} />
        <Stack.Screen name="consumerIcon" component={ConsumerIcon} />
        <Stack.Screen name="consumerOrder" component={ConsumerOrder} />
        <Stack.Screen name="consumerInfo" component={Info} />
        <Stack.Screen name="consumerDate" component={ConsumerDate} />
        <Stack.Screen name="consumerAddress" component={ConsumerAddress} />
        <Stack.Screen name="consumerPayInfo" component={ConsumerPayInfo} />
        <Stack.Screen name="consumerPaySuccess" component={ConsumerPaySuccess} />
        <Stack.Screen name="accountInfo" component ={AccountInfo} options={{headerShown: false}}/>
        <Stack.Screen name="changeEmail" component ={ChangeEmail}/>
        <Stack.Screen name="changePwd" component ={ChangePwd}/>
        <Stack.Screen name="setting" component ={Setting}/>
        <Stack.Screen name="cp" component ={ConsumerProvider}/>
        <Stack.Screen name="ProviderInfo" component ={ProviderInfo}/>
        <Stack.Screen name="consumerMV" component ={ConsumerMapView}/>
        <Stack.Screen name="consumerRating" component ={consumerRating}/>
        <Stack.Screen name="completedOrder" component ={CompletedOrder}/>
        <Stack.Screen name="telehealthMain" component ={TelehealthrMain} options={{headerShown: false}}/>
        <Stack.Screen name="telehealthSub" component ={teleSuburb} options={{headerShown: false}}/>
        <Stack.Screen name="telehealthClinic" component ={telehealthClinic} options={{headerShown: false}}/>
        <Stack.Screen name="docInfo" component ={DocInfo} options={{headerShown: false}}/>
        <Stack.Screen name="teleSuccess" component ={TeleSuccess} options={{headerShown: false}}/>
        <Stack.Screen name="teleConfirm" component ={Confirm} options={{headerShown: false}}/>
        <Stack.Screen name="telehealthPay" component ={TelePay} options={{headerShown: false}}/>
        <Stack.Screen name="ClinicInfo" component ={ClinicInfo} options={{headerShown: false}}/>
        <Stack.Screen name="telehealthDoc" component ={telehealthDoc} options={{headerShown: false}}/>
        <Stack.Screen name="TelehealthMV" component ={TelehealthMV}/>
        <Stack.Screen name="ConsumerOrderPage" component ={ConsumerOrderPage}/>
        <Stack.Screen name ="docRecommend" component={DocRecommend} options={{headerShown:false}}/>
        <Stack.Screen name ="changeSuburb" component={changeSuburb}/>
        <Stack.Screen name ="changeClinic" component={changeClinic}/>
        <Stack.Screen name ="changeDoc" component={changeDoc}/>
        <Stack.Screen name ="changeDocInfo" component={changeDocInfo}/>
        <Stack.Screen name ="telehealthPayment" component={telehealthPayment}/>
        <Stack.Screen name ="pay" component={Pay} options={{headerShown:false}}/>
        <Stack.Screen name="数据协议" component={DataPolicy} />
        <Stack.Screen name="termofuse" component={TermOfUse} />
        <Stack.Screen name="资料收集" component={Patient_description} options={{headerShown:false}}/>
        <Stack.Screen name="onlineDoc" component={OnlineDoc} options={{headerShown:false}}/>
        <Stack.Screen name="healthRecord" component={HealthRecord} options={{headerShown:false}}/>
        <Stack.Screen name="report" component={Report} options={{headerShown:false}}/>
        <Stack.Screen name="cardInfo" component={CardInfo} options={{headerShown:false}}/>
        <Stack.Screen name="historyInfo" component={HistoryInfo} options={{headerShown:false}}/>
        <Stack.Screen name="aiTest" component={AiTest} options={{headerShown:false}}/>
        <Stack.Screen name="result" component={Result} options={{headerShown:false}}/>
        <Stack.Screen name="prescription" component={prescription} options={{headerShown:false}}/>
        <Stack.Screen name="pdf" component={Pdf} options={{headerShown:false}}/>
        <Stack.Screen name="chatbot" component={chatbot} options={{headerShown:false}}/>
        <Stack.Screen name="reservation" component={reservation} options={{headerShown:false}}/>
        <Stack.Screen name="covid_info" component={covid_info} options={{headerShown:false}}/>
        <Stack.Screen name="covid_confirm" component={covid_confirm} options={{headerShown:false}}/>
        <Stack.Screen name="covid_finish" component={covid_finish} options={{headerShown:false}}/>
        <Stack.Screen name="covid_pay" component={covid_pay} options={{headerShown:false}}/>





        </>
        ):(
          <>
          {this.first_time?null:<Stack.Screen options={{headerShown: false}} name="intro" component={Intro} />}
          <Stack.Screen options={{headerShown: false}} name="登陆" component={Login} />
          <Stack.Screen name={I18n.t("signup_signin")} component={Signup} />
          <Stack.Screen name="数据协议" component={DataPolicy} />
          <Stack.Screen name={I18n.t("forget_password_signin")} component={Forget}/>
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
    </DataContext.Provider>
  );}
}

export default App;

