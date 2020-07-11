import React from 'react';
import { Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native'
class Header extends React.PureComponent {
    render() {
      return (
        <Appbar.Header style={{backgroundColor:'white'}}>
        <Appbar.BackAction onPress={() =>this.props.navigation.goBack()} />
         <Appbar.Content title={this.props.title} />
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