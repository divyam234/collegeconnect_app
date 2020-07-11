import {createMaterialTopTabNavigator} from 'react-navigation';
import {StatusBar} from 'react-native';
import SendRequests from './SendRequests'
export default createMaterialTopTabNavigator(
    {
      Pending:SendRequests,
      Scheduled:SendRequests,
      Rejected:SendRequests
    },
    { lazy:true,
          tabBarOptions: {
            style: {
              backgroundColor: 'white',
              marginTop:StatusBar.currentHeight,
              height:50,   
            },
            labelStyle:{
            color:'black',
            fontFamily:'open-sans-reg'
            },
            indicatorStyle:{
            backgroundColor:'#6200ee'
            }
          }
          
    }
  );