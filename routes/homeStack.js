import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Consumer from '../components/Consumer';
import Provider from '../components/Ponsumer';

const screens = {
    Cons: {
      screen: Consumer
    },
    Prov: {
      screen: Provider
    }
}


const Homestack = createStackNavigator (screens);

export default createAppContainer(HomeStack);
