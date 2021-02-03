import React ,{Component}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import {styles} from '../../style';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';

const data =["服务热情","细致认真","工作专业","打扫干净","上门准时","做饭好吃","照顾体贴"];


export default class consumerRating extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        //secondsElapsed: 3600,
        stars:0,
        buttons: [
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
          { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
      ]
      };
     
    }

    changeColor(index){
      let but = this.state.buttons;
      if(!but[index].pressed){
         but[index].pressed = true;
         but[index].backgroundColor = '#FF7E67';
         but[index].borderWidth = 0;
         but[index].fontColor = '#FFFFFF';
         this.setState({buttons: but});
      } else {
        but[index].pressed = false;
        but[index].backgroundColor = 'transparent';
        but[index].borderWidth = 1;
        but[index].fontColor = '#999999';
        this.setState({buttons: but});
      }
  }

  ratingCompleted = (value) => {
    this.setState({
        stars: value
    });
  }

  
  render () {
    const orders = data.map((item,index) => {
      return (
        <TouchableOpacity key = {index} style={{
          backgroundColor:this.state.buttons[index].backgroundColor,
          borderWidth: this.state.buttons[index].borderWidth,
          height:40,
          width:'auto',
          marginTop:5,
          marginBottom:5,
          marginLeft: 10,
          marginRight: 10,
          borderRadius:10,
          paddingLeft:15,
          paddingTop:10,
          paddingBottom:10,
          paddingRight:15,
        }}
        onPress={()=>this.changeColor(index)}>
          <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[index].fontColor }}>{item}</Text>
        </TouchableOpacity>
      )
    })
    return (
      <View style={{ flex:1,backgroundColor:"white"  }}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
          <Image
          style = {{height:30,width:30,marginTop:50,marginLeft:20}}
          source={require('../../images/icon/2/Arrow_left.png')}
          />
        </TouchableOpacity>
        <Text style = {{color:'#006A71',fontSize:16,marginLeft:160}}>服务评价</Text>
        <Image
          style ={{width:110,height:110,borderRadius:60,marginTop:10,marginLeft:145}}
          source = {require("../../images/home_img_person.png")}
        />
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{marginLeft:85,marginTop:10}}>请问您对</Text><Text style ={{color:"#FF7E67",marginTop:10}}>罗女士</Text><Text style={{marginTop:10}}>的服务满意吗？</Text>
        </View>

        <Rating
            type ={"custom"}
            ratingCount={5}
            //imageSize={60}
            //showRating
            onFinishRating={this.ratingCompleted}
            startingValue	={0}
            //ratingColor={"#FF7E67"}
            //ratingBackgroundColor={"#DDDDDD"}
            imageSize={40}
            
        />
        <Text style={{marginTop:30,marginLeft:43}}>来评价一下这次服务吧!</Text>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10,marginLeft:35}}>
        {orders.slice(0,3)}
        </View >
        <View style={{flexDirection: 'row',  marginBottom:10,marginLeft:35}}>
        {orders.slice(3,6)}
        </View >
        <TextInput placeholder={"请填写需要添加的评价"} style = {{height: 35,
        width: 340,
        borderBottomColor: '#999999',
        borderBottomWidth:1,
        marginLeft:40,
        marginBottom:55,
        borderColor:"#EEEEEE"}}>
        </TextInput>
        <TouchableOpacity style={styles.next_wrapper} onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
          <Text style={styles.onsite_text}>提交</Text>
        </TouchableOpacity>
      </View>
    )
  }
}