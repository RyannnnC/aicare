import { StyleSheet,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput ,ScrollView} from 'react-native';

import React from 'react';


//import {styles} from './style';
import { StackActions } from '@react-navigation/native';

export default function TermOfUse({navigation}){
    const goBack= () => {
        navigation.dispatch(StackActions.pop(1))
    }

  return(
    <ScrollView style={{backgroundColor:"white",height:1000}}>
      <Text>
      Collection Statement
This Collection Statement describes how Aicare health collects and handles personal information. This notice is provided pursuant to Australian Privacy Principle 5.

Booking Services and Personal Profiles
Aicare Health collects and uses your personal information to provide online booking services to you, to facilitate appointments with medical practices, and to communicate with you about these appointments.

Why we collect your booking information
Aicare Health collects your name, date of birth and contact details (address, email address and contact number), from you at the time that you use our online booking services, usually via our website or mobile applications (Aicare health Network).

If you decide to create a personal profile on the Aicare health Network we will store that information securely on those platforms for the purpose of making your future interactions with Aicare health more convenient.

The primary reason Aicare health uses your personal information is to provide the services you have elected to receive.

Aicare health may also use your personal information:

to contact you about your use of the Aicare health Network;
to facilitate communications between you and health professionals and their practices such as to remind you of an upcoming appointment, to confirm a booking, or to request feedback or participate in a survey or questionnaire;
when you have provided prior agreement, for communication with you about our products and services and those of third parties which we believe may be of interest to you.
By providing us with your contact details, your consent to receive communications and direct marketing will remain current until you advise us otherwise. However, you can opt out of receiving these communications at any time by:


Who do we disclose your booking information to
Aicare health discloses your personal information to medical practices so that appointments can take place. Aicare health also collects personal information from medical practices, for the purpose of communicating with you about your appointments at those practices.

Aicare health may disclose your personal information, for secondary purposes, to third party service providers who support our business activities (such as IT and software service providers, providers of research services, payment processing service providers, third parties that collect and process data such as Nielsen, Google Analytics and Hotjar, security entities that minimise risks and block suspicious behaviour such as Google reCAPTCHA, and our professional advisers such as lawyers and auditors).

Some third party service providers used by Aicare health may store your personal information on servers located overseas, however, they must also meet our requirements for privacy and data security.

If you do not want us to collect your booking information
You are under no obligation to provide us with your booking information, and you can continue to use the other features of our app without doing so. If you do not provide your personal information to HealthEngine, we may be unable to provide you with our online booking services.

Our Contact Details
You can contact us by email to chrisding@aicare.ai.
      </Text>
    </ScrollView>
  )
}