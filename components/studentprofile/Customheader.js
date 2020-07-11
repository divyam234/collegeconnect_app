import React from 'react';
import { Appbar } from 'react-native-paper';
import {AsyncStorage} from 'react-native'
import Menu, { MenuItem} from 'react-native-material-menu';
class Header extends React.Component {
    menu = null;
    setMenuRef = ref => {
    this.menu = ref;
    };
    
    hideMenu = () => {
   this.menu.hide();
   };
 
   showMenu = () => {
   this.menu.show();
  };
    render() {
      return (
        <Appbar.Header style={{backgroundColor:'white'}}>
        <Appbar.BackAction onPress={() =>this.props.navigation.goBack(null)} />
         <Appbar.Content title={this.props.title} />
         <Menu
         ref={this.setMenuRef}
         button={<Appbar.Action icon="more-vert" onPress={this.showMenu} color='black' />}
         >
         <MenuItem onPress={async ()=>{
          this.hideMenu()
          await AsyncStorage.clear();
          this.props.navigation.navigate('AuthLoading')
        }}>Logout</MenuItem>
         </Menu>
       </Appbar.Header>
      );
    }
  }
  export default Header