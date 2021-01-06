import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import ProviderOrder from './providerOrder.js'
import ProviderMain from './providerMain.js'
import Login from './login.js'
import Home from './Home.js'
import Consumer from './consumerOrder.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Home} title = "Home" initial = {true} />
         <Scene key = "providerOrder" component = {ProviderOrder} title = "订单" />
         <Scene key = "providerMain" component = {ProviderMain} title = "主页" />
         <Scene key = "login" component = {Login} title = "login" />
         <Scene key = "consumer" component = {Consumer} title = "consumer" />
      </Scene>
   </Router>
)
export default Routes
