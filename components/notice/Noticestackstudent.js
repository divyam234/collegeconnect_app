import {createStackNavigator} from 'react-navigation';
import Noticelist from './StudentNoticeList'
import NoticeView from './NoticeView'
const NoticeStack= createStackNavigator({
     StudentNoticeMain:{
      screen:Noticelist
    },
    StudentNoticeView:{
      screen:NoticeView
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