import { createStackNavigator } from 'react-navigation';
import Profile from './profile'
import ProfileEdit from './profileedit'
const ProfileStack= createStackNavigator({
   StudentProfile:{
     screen:Profile,
   },
   StudentProfileEdit:{
    screen:ProfileEdit,
   }
  })
export default ProfileStack