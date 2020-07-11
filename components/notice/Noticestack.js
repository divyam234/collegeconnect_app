import {createStackNavigator} from 'react-navigation';
import Noticelist from './noticelist'
import NoticeCreate  from './TeacherNotice'
import NoticeView from './NoticeView'
import StudentNotice from './StudentNoticeList'
const NoticeStack= createStackNavigator({
     NoticeMain:{
      screen:Noticelist
    },
    NoticeCreate:{
      screen:NoticeCreate
    },
    NoticeView:{
      screen:NoticeView
    },
    StudentNotice:{
      screen:StudentNotice
    }
  },{
  })
   NoticeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
export default NoticeStack