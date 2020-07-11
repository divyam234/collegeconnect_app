import StudentScreen from './studentstack'
import TeacherScreen from './teacherstack'
import SignInScreen from './signin' 
import AuthLoading from './authload'
import { createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
const StudentStack =createStackNavigator({StudentHome:StudentScreen},{
  headerMode: 'none'
});
const Teacherstack =createStackNavigator({TeacherHome:TeacherScreen}, {
  headerMode:'none'
});
const AuthStack = createStackNavigator({SignIn: SignInScreen },{
  headerMode: 'none'
});
const Appstack= createAppContainer(createSwitchNavigator(
  {
    AuthLoading,
    StudentStack,
    AuthStack,
    Teacherstack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
export default Appstack;