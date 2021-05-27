import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome,AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import moment from 'moment-timezone';
import DataContext from '../../providerContext';
import * as Localization from 'expo-localization';
import I18n from '../switchLanguage';

export default class Enotes extends Component {
    constructor(props) {
      super(props);
      this.state={
      pressed:false,
      pressed1:false,
      complaint:'',
      id:null,
      }
    }
  async componentDidMount(){
      this.setState({id:this.props.route.params.id});
  }


  render() {
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <View style={{width:'90%'}}>
      <ScrollView style={{height:'90%'}}>


        <View style={{flexDirection: 'row',marginBottom:10}}>
            <Text style={{ fontSize:18, fontWeight: '500' , marginRight: 20}}>{I18n.t('currentPatient')}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Image
            style = {{width: 20,
            height: 20,
            marginRight:5}}
            source={require('../../images/providerImg/singup_icon_name.png')}
          />
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('name')}</Text>
          <TextInput style={{width:'30%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}} placeholder= "Kingsford Clinic"
          value={this.context.name}/>
          <MaterialCommunityIcons name="gender-male-female" size={20} color="black" style={{marginRight:5}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('gender')}</Text>
          <TextInput style={{
            width:'30%',
            height: 22,
            marginLeft: 5,
            borderBottomWidth:1,
            borderBottomColor:'#EEEEEE'}} placeholder= "0403571833"
          value={this.context.phone}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <MaterialCommunityIcons name="human-male-child" size={20} color="black" style={{marginRight:5}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('age')}</Text>
          <TextInput style={{width:'30%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}} placeholder= "657416708xy@gmail.com"
          value={this.context.email}/>
          <FontAwesome name="calendar-o" size={20} color="black" style={{marginRight:5}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('dateofBirth')}</Text>
          <TextInput
          style={{width:'30%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}}
          placeholder= "1001/1 Mooltan Avanue"
          value = {this.context.street}
          />
        </View>


        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500'}}>{I18n.t('patientComplaint')}</Text>
        </View>

        <View style={{width:'100%', height:250,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <TextInput style={{width:'90%',height:60,marginTop:15,marginLeft:20,marginRight:20}}
            placeholder={this.context.intro}
            value={this.state.complaint}
            onChangeText={(text) => {this.setState({complaint:text})}}
            multiline={true}
          />
        </View>

        <View style={{marginTop:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('emRecord')}</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('basicMedicalHistory')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        {this.state.pressed &&
        <View>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('orginfo')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('personalRecord')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('personalMedicine')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        </View>
        }
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed1:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('historyRecord')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>


      </ScrollView>
      <View  style={{ height:'10%',flex:1, justifyContent: "center", alignItems: "center"}}>
      <TouchableOpacity style={{
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom:20,
      backgroundColor: '#68B0AB',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: "center",}} onPress={() => {this.props.navigation.navigate(I18n.t('enote3'),{id: this.state.id,patientComplaint:this.state.complaint})}}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
      </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );}}
}
Enotes.contextType = DataContext;
