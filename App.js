import React ,{Component}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ProviderOrder from './Scene/providerOrder.js'
import ProviderMain from './Scene/providerMain.js'
import Income from './Scene/income.js'
import Welcome from './Scene/welcome';
import ProviderType from './Scene/providerType';
import Login from './Scene/login';
import AccountMain from './Scene/Account/accountMain';
import Resume from './Scene/Account/resume';
import Orders from './Scene/Account/orders';
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
import Agency from './Scene/agency';
import HealthMain from './Scene/Health/healthMain';
import HealthAccountMain from './Scene/Health/healthAccountMain';
import ReservationMain from './Scene/Health/reservationMain';
import Verify from './Scene/verification';

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
function HealthHome() {
  return (
      <Tab.Navigator>
          <Tab.Screen
            name="主页"
            component={HealthMain}
            options={{
              tabBarLabel: '主页',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
            />
          <Tab.Screen
            name="预约"
            component={ReservationMain}
            options={{
              tabBarLabel: '预约',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="账号"
            component={HealthAccountMain}
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

export default class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    authenticate: false,
    health: false,
    action: {
      changeLogin: this.changeLogin,
      changeHealth: this.changeHealth,
    }
    }
  }
  changeLogin = (value) => {
    this.setState({authenticate: value});
    console.log(value);
  }
  changeHealth = (value) => {
    this.setState({health: value});
    console.log(value);
  }

  render() {
  return (
    <DataContext.Provider value={ this.state }>
    <NavigationContainer>
      <Stack.Navigator>
      {this.state.authenticate ? (
        this.state.health ? (
          <>
          <Stack.Screen options={{headerShown: false}} name="healthHome" component={HealthHome} />
          <Stack.Screen name="修改密码" component={ChangePwd} />
          <Stack.Screen name="我的设置" component={Setting} />
          </>
        ):(
          <>
          <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <Stack.Screen options={{headerShown: false}} name="accountMain" component={AccountMain}/>
          <Stack.Screen name="简历" component={Resume} />
          <Stack.Screen name="订单" component={Orders} />
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
        <Stack.Screen options={{headerShown: false}} name="登陆" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="机构" component={Agency} />
        <Stack.Screen name="验证" component={Verify} />
        <Stack.Screen name="注册" component={Signup} />
        <Stack.Screen name="忘记密码" component={Forget}/>
        </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
    </DataContext.Provider>
  );}
}
