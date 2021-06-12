import React ,{Component}from 'react';
import { Modal,Text, View, TouchableOpacity,ScrollView,SafeAreaView,TextInput,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import { CheckBox } from 'react-native-elements';

export default class Enotes3 extends Component {
    constructor(props) {
      super(props);
      this.state={
      pressed:false,
      pressed1:false,
      complaint:'',
      doctorComment:'',
      id:null,
      medicine:[],
      times:0,
      name:'',
      usage:'',
      visible:false,
      result:[],
      norp:true,
      rp:false,
      mid:null,
      }
    }
  async componentDidMount(){
    this.setState({
      id:this.props.route.params.id,
      complaint:this.props.route.params.patientComplaint});
  }

  addMedicine(){
    if (this.state.name =='') {
      return false
    }
    if (this.state.usage == '') {
      return false
    }
    if (this.state.rp && this.state.times == 0) {
      return false
    }
    this.state.medicine.push({
      name:this.state.name,
      usage:this.state.usage,
      times:this.state.times,
      id:this.state.mid
    })
    this.setState({
      times:0,
      name:'',
      usage:'',
      mid:null
    })
    return true
  }

  /*  <View style={{flexDirection: 'row', marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('diagnosisSuggestion')}</Text>
        </View>
        <View style={{width:'100%', height:150,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <TextInput style={{width:'90%',height:60,marginTop:15,marginLeft:20,marginRight:20}}
            placeholder={this.context.intro}
            value={this.state.doctorComment}
            onChangeText={(text) => {this.setState({doctorComment:text})}}
            multiline={true}
          />
        </View>*/
  _onChangeText(text) {
      if (text) {
        this.setState({ name: text,visible:true })  //实时变化值
        clearTimeout(this.settimeId);       //如搜索的内容变化在1秒之中，可以清除变化前的fetch请求，继而减少fetch请求。但不能中断fetch请求
        this.settimeId = setTimeout(() => {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/shop/medicinedata?'
          +'enName='+this.state.name;
            fetch(url,{
              method: 'POST',
              mode: 'cors',
              credentials: 'include',
              headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
              'sso-auth-token': this.context.token,
              'sso-refresh-token': this.context.refresh_token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code === 0) {
                this.setState({result:json.list})
              } else {
                console.log(json.msg)
              }
            })
            .catch(error => console.warn(error));
        }, 800);
      } else {
        this.setState({name:'',visible:false})
      }
  }
  render() {
    let medicine = []
    if (this.state.medicine.length >0) {
    medicine = this.state.medicine.map((item) => {
      return (
        <View key = {item.id} style={{alignItems:'center',justifyContent:'center',width:'90%',margin:'5%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
          <Text style={{ color: 'black', fontSize: 21, fontWeight: '600'}}>{item.name}</Text>
          <Text style={{ color: '#696969', fontSize: 16, fontWeight: '400'}}>用法用量：{item.usage}</Text>
        </View>
      )
    })}
    let result = []
    if (this.state.result.length >0) {
    result = this.state.result.map((item) => {
      let mname
      if (item.norms == null) {
         mname = item.enName
      } else if (item.number == null){
         mname = item.enName + ' ' + item.norms
      } else {
         mname = item.enName + ' ' + item.norms + '*' + item.number
      }
      return (
        <TouchableOpacity key={item.id} style={{alignItems:'center',justifyContent:'center',width:'90%',margin:'1%',height:40,borderRadius:5,backgroundColor:'#EBEBEB'}}
        onPress={() => {this.setState({mid:item.id,name:mname,visible:false})}}>
          <Text style={{ fontSize: 16, fontWeight: '400'}}>{mname}</Text>
        </TouchableOpacity>
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
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <View style={{height:'90%',width:'90%',flexDirection:'row',justifyContent: "center", alignItems: "center"}}>
        <ScrollView style={{height:'90%',width:'50%',borderRightWidth:1}}>
          {this.state.medicine.length>0 ? medicine
          :
            <View style={{alignItems:'center',justifyContent:'center',width:'90%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>暂无药品，请添加</Text>
            </View>
          }
        </ScrollView>
        <View style={{height:'90%',width:'50%',alignItems:'center'}}>
          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>药品名称</Text>
            <View style={{width:'70%'}}>
              <TextInput
              style={{width:'100%',borderWidth:1,fontSize: 16, fontWeight: '400',marginLeft:'5%'}}
              placeholder={I18n.t('enterName')}
              value={this.state.name}
              onChangeText={this._onChangeText.bind(this)}/>
              {this.state.visible  &&
                <ScrollView
                  style={{width:'100%',height:'35%',borderWidth:1 ,marginLeft:'5%'}}
                  >
                  {this.state.result.length>0 ? result
                  :
                    <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:30,borderRadius:10}}>
                      <Text>暂无结果</Text>
                    </View>
                  }
                </ScrollView>
              }
            </View>
          </View>

          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>用法用量</Text>
            <View style={{width:'70%'}}>
              <TextInput
              style={{width:'100%',borderWidth:1,fontSize: 16, fontWeight: '400',marginLeft:'5%'}}
              value={this.state.usage}
              onChangeText={(text) => {this.setState({usage:text})}}/>

            </View>
          </View>
          <View style={{width:'90%',flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('repeatyn')}</Text>
          <CheckBox
            center
            title={I18n.t('rp')}
            checkedIcon='check-circle-o'
            uncheckedIcon='circle-o'
            checkedColor='red'
            containerStyle={{borderWidth:0,backgroundColor:'white',marginLeft:'5%'}}
            checked={this.state.rp}
            onPress={() => {
              this.setState({
                rp: true,
                norp:false,
              })
            }}
           />
           <CheckBox
             center
             title={I18n.t('norp')}
             checkedIcon='check-circle-o'
             uncheckedIcon='circle-o'
             checkedColor='red'
             containerStyle={{borderWidth:0,backgroundColor:'white',marginLeft:'5%'}}
             checked={this.state.norp}
             onPress={() => {
               this.setState({
                 rp: false,
                 norp:true,
               })
             }}
            />
          </View>
          {this.state.rp &&
          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('repeattime')}</Text>
            <TextInput
              style={{width:'20%',borderWidth:1,marginLeft:'5%'}}
              value={this.state.times.toString()}
              keyboardType='numeric'
              onChangeText={(text) => {this.setState({times:text})}}
            />
            <Text style={{fontSize: 16, fontWeight: '400',marginLeft:'5%'}}>{I18n.t('times')}</Text>
          </View>
          }
          <View  style={{ height:'15%', width:'80%',justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity style={{
              width: '100%',
              height: 40,
              marginTop: 10,
              marginBottom:20,
              backgroundColor: '#68B0AB',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: "center",}} onPress={() => {
                if (!this.addMedicine()){
                  alert('请填写完整')
                } else {
                  console.log('ok')
                }
              }}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
          <View  style={{ height:'10%', width:'80%',justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity style={{
              width: '100%',
              height: 40,
              marginTop: 10,
              marginBottom:20,
              backgroundColor: '#68B0AB',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: "center",}} onPress={() => {this.props.navigation.navigate(I18n.t('prescription'),{
                id:this.props.route.params.id,
                patientComplaint:this.props.route.params.patientComplaint,
                doctorComplaint:this.props.route.params.doctorComplaint,
                medicine:this.state.medicine})}}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );}}
}
Enotes3.contextType = DataContext;
