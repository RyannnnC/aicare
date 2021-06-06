import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View,Image,TouchableOpacity,AsyncStorage } from 'react-native'
import DataContext from "./consumerContext";
import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F1FDFC'
  },
  slide2: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F1FDFC'
  },
  slide3: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F1FDFC'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

class Intro extends Component {
  constructor(props) {
    super(props);      
    this.state={
        first_time:null,
    }
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("firsttime");
      //let id = await AsyncStorage.getItem("id");
      /*if(id) {
        this.setState({employerId:JSON.parse(id)});
        console.log("Get id success");
      }*/
      if(userData){
        //this.setState({token:userData})
        this.setState({first_time:userData})
        
        this.props.navigation.navigate("登陆")
        
        console.log("Not first time");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  storeToken = async () => {
    try {
       await AsyncStorage.setItem("firsttime","1");
       console.log("Store token success");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  componentDidMount(){
    this.getToken();
  }
  goSignUp(){
    this.storeToken();
    this.context.action.changetoken(-1);
  }
  render() {
    
    return (
      <Swiper style={styles.wrapper} showsButtons={true} autoplay={true} autoplayTimeout={3} style={{backgroundColor:"white"}}
      //buttonWrapperStyle={{color:"green",}}
      nextButton={<Text style={{color:"#68B0AB",fontSize:50}}>›</Text>}
      prevButton={<Text style={{color:"#68B0AB",fontSize:50}}>‹</Text>}

      > 
        <View style={styles.slide1}>
        <Image style = {{marginTop:30,
          width:430,
          height:700,
        }}
          source = {require('./images/turn3.png')}
      />
      <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:280,
              marginTop:-60,
              height:45,
              alignItems: 'center',
              borderRadius:25,}}
              onPress = {()=>this.goSignUp()}>
        <Text style={{color:"white"}}>开始体验</Text>
      </TouchableOpacity>
        </View>
        <View style={styles.slide2}>
        <Image style = {{marginTop:30,
          width:430,
          height:700,
        }}
          source = {require('./images/turn1.png')}
      />
      <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:280,
              marginTop:-60,
              height:45,
              alignItems: 'center',
              borderRadius:25,}}
              onPress = {()=>this.goSignUp()}>
        <Text style={{color:"white"}}>开始体验</Text>
      </TouchableOpacity>
        </View>
        <View style={styles.slide3}>
        <Image style = {{marginTop:30,
          width:430,
          height:700,
        }}
          source = {require('./images/turn2.png')}
      />
      <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:280,
              marginTop:-60,
              height:45,
              alignItems: 'center',
              borderRadius:25,}}
              onPress = {()=>this.goSignUp()}>
        <Text style={{color:"white"}}>开始体验</Text>
      </TouchableOpacity>
        </View>
      </Swiper>
    )
  }
}

AppRegistry.registerComponent('myproject', () => Intro)
Intro.contextType = DataContext;
export default Intro;