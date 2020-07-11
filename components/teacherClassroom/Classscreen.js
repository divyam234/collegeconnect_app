import {createStackNavigator} from 'react-navigation';
import ChooseAction from './ChooseAction'
import Classform  from './Classform'
import Viewclass from './ViewClass'
import Attendancelist  from './Attendacelist'
import ViewAttendance from './ViewAttendance'
import EditAttendance from './EditAttendance'
const ClassStack= createStackNavigator({
    Classhome:{
      screen: ChooseAction
    },
    Classform:{
      screen:Classform
    },
    ViewClass:{
     screen:Viewclass
    },
    Attendancelist:{
    screen: Attendancelist
    },
    ViewAttendance:{
      screen: ViewAttendance
    },
    EditAttendance:{
      screen: EditAttendance
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