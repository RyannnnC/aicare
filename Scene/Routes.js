import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Provider from './Provider.js'
import Login from './Login.js'
import Home from './Home.js'
import Consumer from './consumerOrder.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Home} title = "Home" initial = {true} />
         <Scene key = "provider" component = {Provider} title = "订单" />
         <Scene key = "login" component = {Login} title = "login" />
         <Scene key = "consumer" component = {Consumer} title = "consumer" />
      </Scene>
   </Router>
)
export default Routes
