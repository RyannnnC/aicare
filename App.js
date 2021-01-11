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
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="consumerIcon">
        <Stack.Screen name="consumerIcon" component={ConsumerIcon} />
        <Stack.Screen name="consumerOrder" component={ConsumerOrder} />
        <Stack.Screen name="consumerInfo" component={Info} />
        <Stack.Screen name="consumerDate" component={ConsumerDate} />
        <Stack.Screen name="consumerAddress" component={ConsumerAddress} />
        <Stack.Screen name="consumerPayInfo" component={ConsumerPayInfo} />
        <Stack.Screen name="consumerPaySuccess" component={ConsumerPaySuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;