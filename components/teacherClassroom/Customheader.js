import React from 'react';
import { Appbar,Avatar} from 'react-native-paper';
import {AsyncStorage,StyleSheet} from 'react-native'
import Menu, { MenuItem} from 'react-native-material-menu';
import {connect} from 'react-redux'
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
      const {navigation,type,title,timageuri}=this.props
      return (
        <Appbar.Header style={{backgroundColor:'white'}}>
         {type==='Home' &&
         <Appbar.Action icon={({ size, color}) => (
          <Avatar.Image size={size} source={{uri:timageuri}}/>
          )} onPress={()=>{navigation.navigate('TeacherProfile')}}/>
         }
         {type!=='Home' &&
         <Appbar.BackAction onPress={() =>this.props.navigation.goBack()} />
         }
        <Appbar.Content title={title} />
         <Menu
         ref={this.setMenuRef}
         button={<Appbar.Action icon="more-vert" onPress={this.showMenu} color='black' />}
         >
         <MenuItem onPress={async ()=>{
          this.hideMenu()
          await AsyncStorage.clear();
           navigation.navigate('AuthLoading')
         }} textStyle={styles.text}>Logout</MenuItem>
         </Menu>
       </Appbar.Header>
      );
    }
  }
  
 const mapStateToProps=(state)=>{
    return{
     timageuri:state.teacher.profileDetails.imageuri
    }
 }
  export default  connect(mapStateToProps,null)(Header);

  const styles=StyleSheet.create({
    text:{
     fontFamily:'open-sans-reg'
    }
  })