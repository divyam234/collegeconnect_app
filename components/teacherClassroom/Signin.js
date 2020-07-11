import {createStackNavigator} from 'react-navigation';
import Login from '../components/Login'
import Signup from '../screens/Signup'
import Forgot from '../components/ForgotPass'
export default createStackNavigator({
     Login:{
      screen:Login
    },
    Signup:{
      screen:Signup,
    },
    Forgot
  },
  {
    headerMode: 'none'
  })