import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import ForgotPass from '../components/auth/ForgotPass'
import CustomHeader from '../components/auth/Customheader'
export default createStackNavigator({
     Login:{
      screen:Login,
    },
    Signup:{
      screen:Signup,
    },
    ForgotPass
  },
  {
    defaultNavigationOptions:props => {
      let title=''
      if(props.navigation.state.routeName==='Signup')
         title='Signup'
      if(props.navigation.state.routeName==='ForgotPass')
         title='Forgot Password'
        return{
          header: (<CustomHeader {...props} title={title}/>)
         }
     }
  })