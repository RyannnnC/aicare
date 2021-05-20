import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import moment from 'moment-timezone';
import DataContext from '../../providerContext';
import * as Localization from 'expo-localization';
import I18n from '../switchLanguage';

export default class Enotes extends Component {
    constructor(props) {
      super(props);
      this.state={
      show: false,
      image:null,
      isLoading:false,
      hasCameraPermission: null,
      checked3:true,
    }
    }
  async componentDidMount(){
    if (this.context.time.length>0){
      let i;
      for (i=0;i<this.context.time.length;i++){
        if (this.context.time[i].status != 0){
          let but = this.state.buttons;
          but[i].pressed = true;
          but[i].backgroundColor = '#FF7E67';
          but[i].borderWidth = 0;
          but[i].fontColor = '#FFFFFF';
          this.setState({buttons: but});
          let t = this.state.times;
          t[i].time1 = this.context.time[i].startTime;
          t[i].time2 = this.context.time[i].endTime;
          this.setState({times:t})
        }
      }
    }
    if (this.context.typeList.length>0){
      this.setState({service:this.context.typeList})
    }
  }


  render() {
    let service =[];
    if(this.context.serviceclass.length>0) {
    service = this.context.serviceclass.map((item) => {
      if (item.status == 1) {
      return (
        <TouchableOpacity style={styles.resumeTag} key={item.value}>
          <Text style={{ fontSize:12, fontWeight: '300' }}>{item.name}</Text>
        </TouchableOpacity>
      )
      }
    })};
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <ScrollView style={{ flex: 1}}>
        <View style={{flex:1,width:'90%'}}>

        <View style={{flexDirection: 'row',marginTop:20}}>
            <Text style={{ fontSize:18, fontWeight: '500' , marginRight: 20}}>{I18n.t('basicInformation')}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('name')}</Text>
          <TextInput style={{width:'35%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}} placeholder= "Kingsford Clinic"
          value={this.context.name}
          onChangeText={(text) => {this.context.action.changename(text)}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('gender')}</Text>
          <TextInput style={{
            width: '35%',
            height: 22,
            marginLeft: 5,
            borderBottomWidth:1,
            borderBottomColor:'#EEEEEE'}} placeholder= "0403571833"
          value={this.context.phone}
          onChangeText={(text) => {this.context.action.changephone(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>

          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('age')}</Text>
          <TextInput style={{width: '35%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}} placeholder= "657416708xy@gmail.com"
          value={this.context.email}
          onChangeText={(text) => {this.context.action.changeemail(text)}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('dateofBirth')}</Text>
          <TextInput
          style={{width: '35%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}}
          placeholder= "1001/1 Mooltan Avanue"
          value = {this.context.street}
          onChangeText={(text) => {this.context.action.changestreet(text)}}
          />
        </View>


        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('patientComplaint')}</Text>
        </View>

        <View style={{width:'100%', height:120,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <TextInput style={{width:'90%',height:60,marginTop:15,marginLeft:20,marginRight:20}}
            placeholder={this.context.intro}
            value={this.context.intro}
            onChangeText={(text) => {this.context.action.changeintro(text)}}
            multiline={true}
          />
        </View>

        <View style={{marginTop:15}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('emRecord')}</Text>
        </View>

        <View  style={{ flex:1, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity style={{
          width: '100%',
          height: 40,
          marginTop: 10,
          marginBottom:20,
        backgroundColor: '#68B0AB',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center",}} onPress={() => {this.props.navigation.navigate(I18n.t('enote2'))}}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
        </TouchableOpacity>
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );}}
}
Enotes.contextType = DataContext;
