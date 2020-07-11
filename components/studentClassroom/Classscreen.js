import {createStackNavigator} from 'react-navigation';
import Viewclass from './ViewClass'
import AttendanceTable from './AttendanceTable'
const ClassStack= createStackNavigator({
    ViewClass:{
     screen:Viewclass
    },
    AttendanceTable:{
     screen:AttendanceTable
    }
  },{
  })
  ClassStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
export default ClassStack