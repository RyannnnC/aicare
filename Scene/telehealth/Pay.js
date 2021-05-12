import React, { Component } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default class Pay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    this.webview = null;
    return <WebView style={{marginTop:0}}
    /*onShouldStartLoadWithRequest={(request) => {
      // Only allow navigating within this website
      return request.url.startsWith('alipay');
    }}*/
    ref={(ref) => (this.webview = ref)}
    /*onShouldStartLoadWithRequest={(event)=>{
        let reqUrl =event.url;
        if(reqUrl.indexOf("alipay://alipayclient")>-1 || reqUrl.indexOf("alipays://alipayclient")>-1) {
            let  strUrl = reqUrl.replace("alipays", "aicarehealthau");
            Linking.openURL(strUrl);
            return false; //这一行是新加入了，必须加，如果不加，就返回不了app
        }
        return true;
    }}*/
    onNavigationStateChange={(newNavState) => {
      // Keep track of going back navigation within component
      console.log(newNavState.url);
      if (newNavState.url=="http://3.104.87.14:8085/aicare-customer-api/pay.html"){
        
        this.webview.stopLoading();
        this.props.navigation.navigate("teleSuccess")
    }
    /*if (newNavState.url.startsWith("https://mpay.royalpay.com.au/api/v1.0/rpaypmt_svc/deductions/")){
        
        this.webview.stopLoading();
        Alert.alert("支付失败","请检查您的账户余额是否足够以及卡信息是否填写正确并重新支付。",[{ text: "确认", onPress: () => {this.props.navigation.navigate("teleConfirm")}
      }]
        )
        //this.props.navigation.navigate("teleconfirm")
    }*/
      /*if (newNavState.url.includes('?message=success')) {
        this.webview.stopLoading();
        // maybe close this view?
      }*/
      if (newNavState.url.includes('?errors=true')) {
        this.webview.stopLoading();
        this.props.navigation.navigate("teleConfirm")
      }
      /*const { url } = newNavState;
      if (!url) return;
      
      if (url.includes('?message=success')) {
        this.webview.stopLoading();
        // maybe close this view?
      }*/
    }}
    //redirect=http://3.104.87.14:8085/aicare-customer-api/pay.html&directpay=true
    source={{ uri: this.props.route.params.url }} />;
  }
}