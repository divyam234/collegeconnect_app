  import React from 'react';
  import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';
  import tabBarIcon from './shared/tabBarIcon';
  import Home from '../components/Home'
  import Stafflist from '../components/Stafflist'
  import RequestTabs from '../components/studentrequest/RequestTabs'
  import ClassRoom from '../components/studentClassroom/Classscreen'
  import {View} from 'react-native'
  import {ActivityIndicator} from 'react-native-paper';
  import {connect} from 'react-redux'
  import {bindActionCreators } from 'redux'; 
  import {loadprofiledetails} from '../actions/index'
  import Notice from '../components/notice/Noticestackstudent'
  import {setToken,registerForPushNotificationsAsync} from '../services/utility'
  import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce'
  const  StudentMain= createBottomTabNavigator(
    {
      Home: {
        screen: ClassRoom,
        navigationOptions: {
          tabBarIcon: tabBarIcon('home'),
        }
      },
      Notice:{
        screen:Notice,
        navigationOptions:{
          tabBarIcon: tabBarIcon('notifications'),
        }
      },
      Stafflist:{
        screen:Stafflist,
        navigationOptions:{
          tabBarIcon: tabBarIcon('person'),
        }
      },
      Request:{
        screen:RequestTabs,
        navigationOptions:{
          tabBarIcon: tabBarIcon('send'),
        }
      },
      Profile:{
        screen:Home,
        navigationOptions:{
          tabBarIcon: tabBarIcon('account-circle'),
        }
      }
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
        style: { backgroundColor: '#ffffff',borderTopColor:'white',shadowRadius: 2,shadowOffset: { width: 0,height: -3,},
        shadowColor: '#000000',
        elevation: 4},
        labelStyle:{fontFamily:'open-sans-reg'},
        showLabel:false
      }
    }
  );
  const Maincomp= createStackNavigator({
    StudentrHome:{
     screen:StudentMain
   },
   StudentProfile:{
     screen:Home,
   }
  })
  class StudentStack extends React.Component{
    static router = Maincomp.router;
    state={
     loading:true
    }
    async componentDidMount(){
    let {type,id,loadprofiledetails}=this.props
    let deviceToken=await registerForPushNotificationsAsync()
    await setToken({regNo:id,deviceToken},'student/setdevicetoken')
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
export default connect(mapStateToProps,mapDispatchToProps)(StudentStack);