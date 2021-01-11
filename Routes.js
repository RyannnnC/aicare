import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import ProviderOrder from './Scene/providerOrder.js'
import ProviderMain from './Scene/providerMain.js'
import Login from './Scene/login.js'
import Home from './Scene/Home.js'
import Consumer from './Scene/consumerOrder.js'
import ConsumerInfo from "./Scene/consumerInfo.js"
import ConsumerDate from "./Scene/consumerDate.js"
import ConsumerAddress from "./Scene/consumerAdrress.js"
import ConsumerPayInfo from "./Scene/consumerPayInfo"
import ConsumerPaySuccess from "./Scene/consumerPaySuccess"
const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Home} title = "Home" initial = {true} />
         <Scene key = "providerOrder" component = {ProviderOrder} title = "订单" />
         <Scene key = "providerMain" component = {ProviderMain} title = "主页" />
         <Scene key = "login" component = {Login} title = "login" />
         <Scene key = "consumer" component = {Consumer} title = "consumer" />
         <Scene key = "consumerInfo" componenet = {ConsumerInfo} title = "consumerInfo"/>
         <Scene key = "consumerDate" component ={ConsumerDate} title = "consumerDate"/>
         <Scene key = "consumerAddress" component = {ConsumerAddress} title = "consumerAddress"/>
         <Scene key = "consumerPayInfo" component = {ConsumerPayInfo} title = "consumerPayInfo"/>
         <Scene key = "consumerPaySuccess" component = {ConsumerPaySuccess} title = "consumerPaySuccess"/>
      </Scene>
   </Router>
)
export default Routes
