import { createStackNavigator } from 'react-navigation';
import Profile from './profile'
import ProfileEdit from './profileedit'
const ProfileStack= createStackNavigator({
   TeacherProfile:{
     screen:Profile,
   },
   TeacherProfileEdit:{
    screen:ProfileEdit,
   }
  })
export default ProfileStack