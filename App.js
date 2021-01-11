import React ,{Component}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Scene/Home';
import Welcome from './Scene/welcome';
import ProviderType from './Scene/providerType';
import Login from './Scene/login';

export default function App() {
  const RootStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Welcome" component={Welcome} />
        <RootStack.Screen name="请选择服务类型" component={ProviderType} />
        <RootStack.Screen name="登陆" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
