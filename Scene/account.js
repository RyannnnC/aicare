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
//import AccountMain from "./Scene/account/aacountMain"
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
      action: {
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
      }
    }
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

      </Stack.Navigator>
    </NavigationContainer>
    </DataContext.Provider>
  );}
}

export default App;