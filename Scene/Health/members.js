import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DateSelect from "./dateSelect";
import Category from "./category";
import DataContext from '../../providerContext';

export default class Members extends Component {
    constructor(props) {
      super(props);
      this.state={
        buttons: [],
        doctors:[],
        isLoading:true,
      };
    }

  componentDidMount() {
    this.setState({isLoading:true})
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = 'http://'
        +this.context.url
        +'/aicare-business-api/business/employer/employerlist';
        fetch(url,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'sso-auth-token': this.context.token,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
        }})
        .then((response) => response.json())
        .then((json) => {
          this.setState({isLoading:false})
          if (json.code === 0) {
            console.log(json.msg);
            this.context.action.changedoctors(json.employerlist)
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  deleteDoctor(id) {
    Alert.alert(
      '提醒',
      '您确定要删除这位成员吗？',
      [
        {text: '确定', onPress: () => {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/employer/delete'
          + '?employerId=' + id;
            fetch(url,{
              method: 'POST',
              mode: 'cors',
              credentials: 'include',
              headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
              'sso-auth-token': this.context.token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code === 0) {
                console.log(json.msg);
                Alert.alert('删除成功');
                this.componentDidMount();
              } else {
                console.log(json.msg);
                Alert.alert('删除失败');
              }
            }).catch(error => console.warn(error));}},
        {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }
  render () {
    let docs = [];
    if (this.context.doctors.length >0) {
    docs = this.context.doctors.map((item) => {
      return (
        <View style={styles.doctorHolder} key={item.employerId}>
          <TouchableOpacity style={{ marginRight:10}} onPress={() => this.props.navigation.navigate('成员信息', {id: item.employerId})}>
          <Image
            style = {{width: 40, height:40,marginRight:15}}
            source = {item.imgUrl?{uri:item.imgUrl}:require('../../images/providerImg/service_doctor_img1.png')}
          />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>全科医生 - 9年工作经验</Text>
          </View>
          <TouchableOpacity style={{marginLeft:68, marginRight:10}} onPress={() => this.props.navigation.navigate('成员信息', {id: item.employerId})}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.deleteDoctor(item.employerId)}}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_delete.png')}
            />
          </TouchableOpacity>
        </View>
      )
    })}
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
      <SafeAreaView style={{ flex:1, alignItems: "center",backgroundColor:'white' }}>
        <View style={{width:'85%'}}>
        <TouchableOpacity style={{borderRadius:15,marginTop:20,width:'100%',height:70,justifyContent: "center", alignItems: "center",backgroundColor:'#ECF4F3'}}
        onPress={() => this.props.navigation.navigate('成员添加', {id: null})}>
          <Text style={{ color: '#68B0AB', fontSize: 18, fontWeight: '400'}}>添加新成员</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',marginTop:30,marginBottom:6}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '500'}}>我的成员</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom:10}}>
        <ScrollView horizontal={true}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,backgroundColor:'#FF816B',width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '400'}}>全部(24)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>全科(12)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>儿科(4)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>牙科(6)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>心理(2)</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
        <ScrollView>
          <View>
          {this.context.doctors.length >0 ? docs :
          <View>
            <Image
              style = {{width:280,height:280}}
              source = {require('../../images/providerImg/splash_img3.png')}
            />
            <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您的诊所还没有医生哦，请在上面添加吧！</Text>
          </View>
          }
          </View>
        </ScrollView>
        </View>
      </SafeAreaView>
    )
  }}
}
Members.contextType = DataContext;
