import React from 'react';
import { Appbar,Text} from 'react-native-paper';
import {AsyncStorage,StyleSheet} from 'react-native'
import Menu, { MenuItem} from 'react-native-material-menu';
class Header extends React.PureComponent {
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
        {this.props.screen !=='main' && <Appbar.BackAction onPress={() =>this.props.navigation.goBack()} />}
         <Appbar.Content title={this.props.title} />
          {this.props.screen==='create' &&
          <React.Fragment>
          <Appbar.Action icon="attach-file" onPress={this.props.navigation.getParam('pickdoc')} color='black' />
          <Appbar.Action icon="send" onPress={this.props.navigation.getParam('submitData')} color='black' />
          </React.Fragment>
          } 
         <Menu
         ref={this.setMenuRef}
         button={<Appbar.Action icon="more-vert" onPress={this.showMenu} color='black' />}
         >
         <MenuItem onPress={async ()=>{
          this.hideMenu()
          await AsyncStorage.clear();
          this.props.navigation.navigate('AuthLoading')
         }} textStyle={styles.text}>Logout</MenuItem>
         </Menu>
       </Appbar.Header>
      );
    }
  }
  export default Header;
  
  const styles=StyleSheet.create({
    text:{
     fontFamily:'open-sans-reg'
    }
  })