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
import Benefit from './Scene/Account/benefit';
import Comment from './Scene/Account/comment';
import AccountInfo from './Scene/Account/accountInfo';
import ChangePwd from './Scene/Account/changePwd';
import Setting from './Scene/Account/setting';

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
            name="行程"
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
        <Stack.Screen options={{headerShown: false}} name="请选择服务类型" component={ProviderType} />
        <Stack.Screen options={{headerShown: false}} name="登陆" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="accountMain" component={AccountMain}/>
        <Stack.Screen name="简历" component={Resume} />
        <Stack.Screen name="订单" component={Orders} />
        <Stack.Screen name="收益" component={Benefit} />
        <Stack.Screen name="评价" component={Comment} />
        <Stack.Screen name="账户信息" component={AccountInfo} />
        <Stack.Screen name="修改密码" component={ChangePwd} />
        <Stack.Screen name="我的设置" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
