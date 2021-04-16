import React ,{Component,useContext}from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import {styles} from '../../style';
import {data} from './docdata';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import DataContext from "../../consumerContext";

//import moment from "moment"

class DocRecommend extends Component {
    constructor(props) {
      super(props);
      //date: new Date();
      this.state={
        //secondsElapsed: 3600,
        search:"",
        candidates:[]
      };
    }

  setChange(value){
    this.setState({search:value});
  }
  splitString=(string)=>{
    let res = string.split(",").map(Number);
    return res;
  }
  render () {
    //console.log (this.state);
    if (this.props.route.params.docList.length >0) {
    const orders = this.props.route.params.docList.map((item) => {
      const types = item.serviceClass?this.splitString(item.serviceClass).map((sth) => {
        return (
            <Text style={{ marginTop:2,marginRight:5,fontSize:12, fontWeight: '400',color:'#666666'}}>{this.context.deptType[sth]}</Text>

        )
      }):null;
      return (
        <View style={styles.card} key={item.employerId}>
          <TouchableOpacity onPress={() =>{
            this.props.navigation.navigate("docInfo",{orgId:item.orgId,docId:item.businessUserId,docType:"全科",address:item.orgAddress,docName:item.employerName,queryId:item.employerId})}}>
            <View style={{flexDirection: 'row', marginTop:5,  marginLeft:25}}>

            <Image
            style = {{height:50,width:50,marginRight:15,marginLeft:-10}}
            source = {item.headPortrait?{uri:item.headPortrait}:require('../../images/telehealth_icon/service_doctor_img1.png')}
            />
          <View >
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.employerName}</Text>
            <View style={{flexDirection:"row"}}>
            {types}</View>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400',marginLeft:0}}>{item.orgName}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row',paddingBottom: 15, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
            <Image
              style = {{width: 20, height:20 , marginLeft:75, marginRight:1}}
              source = {require('../../images/telehealth_icon/stars.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{5+" ("+1+"条评价)"}</Text>
            
          </View>
          </TouchableOpacity>    

        </View>
      )
    })
    return (
      <View style={{ flex:1, backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:10,marginTop:10}}>
        <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{
        fontSize:16,
        marginLeft:125,
        marginTop:23}}>名医推荐</Text>
        </View>
        <View style={{marginTop:10}}>
        <Image
            style = {styles.topping_image}
            source={require('../../images/order_img.png')}
        />
        </View>
        <View style={{alignItems:'center',marginTop:20}}>
        <SearchBar
          round
          //searchIcon={{ size: 24 }}
          //onChangeText={(text) => searchFilterFunction(text)}
          //onClear={(text) => searchFilterFunction('')}
          containerStyle={{backgroundColor:'white',width:355,height:40,shadowColor:"000000",shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
            borderRadius:25}}
          inputStyle={{color:'black',fontSize:14}}
          inputContainerStyle={{backgroundColor:'white',height:15}}
          lightTheme={true}
          placeholder="搜索医生..."
          onChangeText={this.setChange}
          
          value={this.state.search}
        />
        </View>
        <ScrollView style={{ flex:1,marginTop:30,marginLeft:-30,maxHeight:500}}>
          <View  style={{alignItems:'center'}}>
          {orders}
          </View>
        </ScrollView>
      </View>
    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/complete_empty.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>目前没有可服务人员！</Text>
     </View>
    )
  }
  }
}
DocRecommend.contextType = DataContext;
export default DocRecommend;