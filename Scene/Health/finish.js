import React ,{Component}from 'react';
import { Text,  View,TouchableOpacity,SafeAreaView } from 'react-native';
import I18n from '../switchLanguage';
export default class Finish extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  render() {
  return (
    <SafeAreaView style={{ flex:1, alignItems: "center",justifyContent:'center'}}>
      <Text style={{ fontSize:24, fontWeight: '500', color: 'rgb(33,192,196)' }}>{I18n.t('ftitle')} </Text>
      <Text style={{ fontSize:22, fontWeight: '500' ,color: 'rgb(33,192,196)' ,marginTop:'3%'}}>{I18n.t('fsend')}</Text>
      <TouchableOpacity
        style={{
          width: '30%',
          height: 40,
          backgroundColor: 'rgb(33,192,196)',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: "center",
          marginTop:'10%'}}
      onPress={() => {this.props.navigation.navigate('预约')}}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('btf')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )}
}
