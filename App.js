/*import React ,{Component}from 'react';
import { Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class Signup extends Component {

  sendRequest() {
      /*let url = 'http://3.104.232.106:8085/aicare-customer-api/customer/user/scheduledetail?'
      +'orgId=30'
      +'&deptId=1' 
      +'&businessEmployerId=1' 
      +'&dayOfWeek=7';
      Alert.alert("hi");
      fetch(url,{
        credentials:"include",
        headers:{"sso-auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQ3Nzk3MzcsInVzZXJpbmZvIjoie1wiYXBwVHlwZVwiOlwiMVwiLFwiY2xpZW50VHlwZVwiOlwiM1wiLFwiY3JlYXRlQnlcIjpcImtpbVwiLFwiY3JlYXRlVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJkZXB0SWRcIjowLFwiZW1haWxcIjpcImtpbXpob25nMjAxN0BnbWFpbC5jb21cIixcImlkXCI6NSxcImxvZ2luTnVtYmVyXCI6MCxcImxvZ2luVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJtb2JpbGVcIjpcIjA0MjY4MDQ4OThcIixcInBhc3N3b3JkXCI6XCJjYjdkNWFjNTM2ZjAyZjhjNGZkZGJmYjg3MDcwNTMyZDc4NWM5YTk2Mzg5ZjYwNmUyZDEyNmEwZjliNTNlMmZhXCIsXCJzYWx0XCI6XCJSaEhkcnBVMTlqN1Q5MnJrY2tsclwiLFwic3RhdHVzXCI6MSxcInVwZGF0ZUJ5XCI6MTYxNDY3OTY4OTAwMCxcInVwZGF0ZVRpbWVcIjoxNjE0Njc5Njg5MDAwLFwidXNlcm5hbWVcIjpcImtpbVwifSJ9.S1zazA1yMZFvfpfet2iC9DJe43Zg8B0cY-aRDZkwouc"},
        method: 'GET',
      })
      .then((response) => response.json())
      .then((json)=>console.log(json.page[40]))*/
      /*let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/create-appointment?scheduleDetailedId=1457&customerId=5&customerName=PeixuanZhong&insuranceType=medicare&clientType=3&appType=1";
      Alert.alert("sending");
      fetch(url,{
        credentials:"include",
        headers:{"sso-auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTU1NDU0MTAsInVzZXJpbmZvIjoie1wiYXBwVHlwZVwiOlwiMVwiLFwiY2xpZW50VHlwZVwiOlwiM1wiLFwiY3JlYXRlQnlcIjpcImtpbVwiLFwiY3JlYXRlVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJkZXB0SWRcIjowLFwiZW1haWxcIjpcImtpbXpob25nMjAxN0BnbWFpbC5jb21cIixcImlkXCI6NSxcImxvZ2luTnVtYmVyXCI6MCxcImxvZ2luVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJtb2JpbGVcIjpcIjA0MjY4MDQ4OThcIixcInBhc3N3b3JkXCI6XCJjYjdkNWFjNTM2ZjAyZjhjNGZkZGJmYjg3MDcwNTMyZDc4NWM5YTk2Mzg5ZjYwNmUyZDEyNmEwZjliNTNlMmZhXCIsXCJzYWx0XCI6XCJSaEhkcnBVMTlqN1Q5MnJrY2tsclwiLFwic3RhdHVzXCI6MSxcInVwZGF0ZUJ5XCI6MTYxNDY3OTY4OTAwMCxcInVwZGF0ZVRpbWVcIjoxNjE0Njc5Njg5MDAwLFwidXNlcm5hbWVcIjpcImtpbVwifSJ9.F1NBwcQi15ce0jUhDmMG-hWI6l4tER4oP1a3wjDaNNo"},
        method: 'GET',
      })
      .then((response) => response.json())
      .then((json)=>console.log(json))
      
     let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/query-appointment?customerId=5";
     Alert.alert("sending");
     fetch(url,{
       credentials:"include",
       headers:{"sso-auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTU1NDU0MTAsInVzZXJpbmZvIjoie1wiYXBwVHlwZVwiOlwiMVwiLFwiY2xpZW50VHlwZVwiOlwiM1wiLFwiY3JlYXRlQnlcIjpcImtpbVwiLFwiY3JlYXRlVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJkZXB0SWRcIjowLFwiZW1haWxcIjpcImtpbXpob25nMjAxN0BnbWFpbC5jb21cIixcImlkXCI6NSxcImxvZ2luTnVtYmVyXCI6MCxcImxvZ2luVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJtb2JpbGVcIjpcIjA0MjY4MDQ4OThcIixcInBhc3N3b3JkXCI6XCJjYjdkNWFjNTM2ZjAyZjhjNGZkZGJmYjg3MDcwNTMyZDc4NWM5YTk2Mzg5ZjYwNmUyZDEyNmEwZjliNTNlMmZhXCIsXCJzYWx0XCI6XCJSaEhkcnBVMTlqN1Q5MnJrY2tsclwiLFwic3RhdHVzXCI6MSxcInVwZGF0ZUJ5XCI6MTYxNDY3OTY4OTAwMCxcInVwZGF0ZVRpbWVcIjoxNjE0Njc5Njg5MDAwLFwidXNlcm5hbWVcIjpcImtpbVwifSJ9.F1NBwcQi15ce0jUhDmMG-hWI6l4tER4oP1a3wjDaNNo"},
       method: 'GET',
     })
     .then((response) => response.json())
     .then((json)=>console.log(json))
    }
    
   let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/query-doctors?customerId=5";
     Alert.alert("sending");
     fetch(url,{
       credentials:"include",
       headers:{"sso-auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTU1NDU0MTAsInVzZXJpbmZvIjoie1wiYXBwVHlwZVwiOlwiMVwiLFwiY2xpZW50VHlwZVwiOlwiM1wiLFwiY3JlYXRlQnlcIjpcImtpbVwiLFwiY3JlYXRlVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJkZXB0SWRcIjowLFwiZW1haWxcIjpcImtpbXpob25nMjAxN0BnbWFpbC5jb21cIixcImlkXCI6NSxcImxvZ2luTnVtYmVyXCI6MCxcImxvZ2luVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJtb2JpbGVcIjpcIjA0MjY4MDQ4OThcIixcInBhc3N3b3JkXCI6XCJjYjdkNWFjNTM2ZjAyZjhjNGZkZGJmYjg3MDcwNTMyZDc4NWM5YTk2Mzg5ZjYwNmUyZDEyNmEwZjliNTNlMmZhXCIsXCJzYWx0XCI6XCJSaEhkcnBVMTlqN1Q5MnJrY2tsclwiLFwic3RhdHVzXCI6MSxcInVwZGF0ZUJ5XCI6MTYxNDY3OTY4OTAwMCxcInVwZGF0ZVRpbWVcIjoxNjE0Njc5Njg5MDAwLFwidXNlcm5hbWVcIjpcImtpbVwifSJ9.F1NBwcQi15ce0jUhDmMG-hWI6l4tER4oP1a3wjDaNNo"},
       method: 'GET',
     })
     .then((response) => response.json())
     .then((json)=>console.log(json))
    }
  render() {
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}>
        <Text>test</Text>
        <Button onPress={()=>this.sendRequest()} title="Learn More"
        color="#841584"></Button>
      </View>
  );}
}*/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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
import DataPolicy from './Scene/datapolicy';

import Welcome from './Scene/welcome';
import Login from './Scene/login';
import Signup from './Scene/signUp';
import Forget from './Scene/forget';
import DocRecommend from './Scene/telehealth/docRecommend';
import changeSuburb from './Scene/telehealth/changeSuburb';
import changeClinic from './Scene/telehealth/changeClinic';
import changeDoc from './Scene/telehealth/changeDoc';
import changeDocInfo from './Scene/telehealth/changeDocInfo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
      <Tab.Navigator>
          <Tab.Screen
            name="consumerMain"
            component={ConsumerMain}
            options={{
              tabBarLabel: '主页',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
            />
          <Tab.Screen
            name="Icon"
            component={ConsumerIcon}
            options={{
              tabBarLabel: '服务',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="room-service" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="订单"
            component={ConsumerOrderPage}
            options={{
              tabBarLabel: '订单',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />              ),
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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading:true,
      first_visit:0,
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
      deptType:["推荐医生","全科","牙科","心理","中医","儿科","康复","疫苗"],
      lan:["语言","普通话","英语","粤语"],
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
      }
    }
  }
  clearstate=()=>{
    this.setState({
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
    })
  }
  changeLoading = (value) => {
    this.setState({loading: value});
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

render() {
  return (
    <DataContext.Provider value={ this.state }>
    <NavigationContainer>
      <Stack.Navigator >
        {this.state.token!="" ? (
        <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="consumerMain" component={ConsumerMain} />
        <Stack.Screen name="accountMain" component={AccountMain} />
        <Stack.Screen name="consumerIcon" component={ConsumerIcon} />
        <Stack.Screen name="consumerOrder" component={ConsumerOrder} />
        <Stack.Screen name="consumerInfo" component={Info} />
        <Stack.Screen name="consumerDate" component={ConsumerDate} />
        <Stack.Screen name="consumerAddress" component={ConsumerAddress} />
        <Stack.Screen name="consumerPayInfo" component={ConsumerPayInfo} />
        <Stack.Screen name="consumerPaySuccess" component={ConsumerPaySuccess} />
        <Stack.Screen name="accountInfo" component ={AccountInfo}/>
        <Stack.Screen name="changeEmail" component ={ChangeEmail}/>
        <Stack.Screen name="changePwd" component ={ChangePwd}/>
        <Stack.Screen name="setting" component ={Setting}/>
        <Stack.Screen name="cp" component ={ConsumerProvider}/>
        <Stack.Screen name="ProviderInfo" component ={ProviderInfo}/>
        <Stack.Screen name="consumerMV" component ={ConsumerMapView}/>
        <Stack.Screen name="consumerRating" component ={consumerRating}/>
        <Stack.Screen name="completedOrder" component ={CompletedOrder}/>
        <Stack.Screen name="telehealthMain" component ={TelehealthrMain}/>
        <Stack.Screen name="telehealthSub" component ={teleSuburb}/>
        <Stack.Screen name="telehealthClinic" component ={telehealthClinic}/>
        <Stack.Screen name="docInfo" component ={DocInfo}/>
        <Stack.Screen name="teleSuccess" component ={TeleSuccess}/>
        <Stack.Screen name="teleConfirm" component ={Confirm}/>
        <Stack.Screen name="telehealthPay" component ={TelePay}/>
        <Stack.Screen name="ClinicInfo" component ={ClinicInfo}/>
        <Stack.Screen name="telehealthDoc" component ={telehealthDoc}/>
        <Stack.Screen name="TelehealthMV" component ={TelehealthMV}/>
        <Stack.Screen name="ConsumerOrderPage" component ={ConsumerOrderPage}/>
        <Stack.Screen name ="docRecommend" component={DocRecommend}/>
        <Stack.Screen name ="changeSuburb" component={changeSuburb}/>
        <Stack.Screen name ="changeClinic" component={changeClinic}/>
        <Stack.Screen name ="changeDoc" component={changeDoc}/>
        <Stack.Screen name ="changeDocInfo" component={changeDocInfo}/>




        </>
        ):(
          <>
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
          <Stack.Screen options={{headerShown: false}} name="登陆" component={Login} />
          <Stack.Screen name="注册" component={Signup} />
          <Stack.Screen name="数据协议" component={DataPolicy} />
          <Stack.Screen name="忘记密码" component={Forget}/>
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
    </DataContext.Provider>
  );}
}

export default App;