import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'; 
import {loadAuthDetails,loadprofiledetails} from '../actions/index'
import {View} from 'react-native';

class AuthLoadingScreen extends React.Component {
  static navigationOptions={
    header:null
  }
  async componentDidMount(){
    let {loadAuthDetails}=this.props
    await loadAuthDetails();
    this.handleAuth()
  }
  
  handleAuth =async () => {
    let {token,type}=this.props
    console.log(type)
    if(token && type==='student'){
    this.props.navigation.navigate('StudentStack');
    }
    else if(token && type==='teacher'){
    this.props.navigation.navigate('Teacherstack');
    }
    else
    this.props.navigation.navigate('AuthStack');
    console.log('In Authload')
  };
  render() {
    return (
      <View style={{flex:1}}>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
     token:state.auth.token,
     id:state.auth.id,
     type:state.auth.type
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  loadAuthDetails,
  loadprofiledetails
  }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthLoadingScreen);
