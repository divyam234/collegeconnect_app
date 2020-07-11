  import React from 'react';
  import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';
  import tabBarIcon from './shared/tabBarIcon';
  import Profile from '../components/teacherprofile/profilestack'
  import ClassRoom from '../components/teacherClassroom/Classscreen'
  import ReceivedRequests from '../components/teacherRequest/ReceivedRequests'
  import NoticeManager from '../components/notice/Noticestack'
  import {View} from 'react-native'
  import {ActivityIndicator} from 'react-native-paper';
  import {connect} from 'react-redux'
  import {bindActionCreators } from 'redux'; 
  import {loadprofiledetails} from '../actions/index'
  import {setToken,registerForPushNotificationsAsync} from '../services/utility'
  import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce'
 const TeacherMain=createBottomTabNavigator(
  {
    Home: {
      screen:ClassRoom,
      navigationOptions: {
        tabBarIcon: tabBarIcon('home'),
      }
    },
    Notice:{
      screen:NoticeManager,
      navigationOptions:{
        tabBarIcon: tabBarIcon('notifications'),
      }
    },
     Requests:{
      screen:ReceivedRequests,
      navigationOptions:{
        tabBarIcon: tabBarIcon('person'),
      }
    },
    Received:{
      screen:ReceivedRequests,
      navigationOptions:{
        tabBarIcon: tabBarIcon('favorite'),
      }
    },
  },
  {
    navigationOptions: {
     header:null,
    },
    defaultNavigationOptions:{
      tabBarButtonComponent:TouchableBounce
    },

    tabBarOptions:{
    activeTintColor: '#6200ee',
    inactiveColor: 'grey',
    tabstyle:{borderTopWidth:2},
    style: { backgroundColor: '#ffffff',borderTopColor:'white',shadowRadius: 2,shadowOffset: { width: 0,height: -3,},
    shadowColor: '#000000',
    elevation: 4},
    labelStyle:{fontFamily:'open-sans-reg'},
    showLabel:false
    }
  }
)
const Maincomp= createStackNavigator({
  TeacherHome:{
   screen:TeacherMain
 },
 TeacherProfile:{
   screen:Profile,
 }
},{
  headerMode: 'none',
})

class TeacherStack extends React.Component{
  static router = Maincomp.router;
  state={
   loading:true
  }
  async componentDidMount(){
  let {type,id,loadprofiledetails}=this.props
  let deviceToken=await registerForPushNotificationsAsync()
  await setToken({email:id,deviceToken},'professor/setdevicetoken')
  await loadprofiledetails(id,type)
  this.setState({loading:false})
  }
  
  render(){
   const { navigation } = this.props;
    return(
      <View style={{flex:1}}>
       {this.state.loading && <ActivityIndicator animating={true} size='large' style=
       {{position: 'absolute', top:'50%', left: '50%', marginLeft: -25,marginTop: -25}} />} 
       {!this.state.loading && <Maincomp navigation={navigation}/> }
       </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
     id:state.auth.id,
     type:state.auth.type
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  loadprofiledetails
  }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(TeacherStack);