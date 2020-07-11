import React from 'react';
import { StyleSheet,View,Image,ScrollView} from 'react-native'
import {TextInput,Button,HelperText,Text,Checkbox,withTheme} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validate from '../../validation/validation_wrapper'
import {Bubbles } from 'react-native-loader';
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'; 
import {performSignIn} from '../../actions/index'
class Login extends React.Component{
  state={
	  email: '',
	  emailError: '',
	  password: '',
	  passwordError: '',
    mode:false,
  }
  static navigationOptions={
    header:null
  }
  signInAsync = async () => {
  	const emailError = validate('email', this.state.email)
    const passwordError = validate('password', this.state.password)

    this.setState({
      emailError: emailError,
      passwordError: passwordError
    })

    if (!emailError && !passwordError) {
      if(!this.state.mode){
        try{
          await this.props.performSignIn({password:this.state.password,email:this.state.email},'student')
          this.props.navigation.navigate('AuthLoading');
        }  
        catch(err){
          console.log(err.message)
        }
     }
      else{
        try{
          await this.props.performSignIn({password:this.state.password,email:this.state.email},'teacher')
          this.props.navigation.navigate('AuthLoading');
        }  
        catch(err){
          console.log(err.message)
        }
     }
    }
  };
  render(){
   return(
      <KeyboardAwareScrollView style={{flexGrow:1}}  enableOnAndroid={true}>
      <View style={styles.main}>
        <Image
          source={require('../../assets/images/cc.png')}
        />
        <TextInput
          onChangeText={value => this.setState({email: value.trim()})}
          onEndEditing={() => {
            this.setState({
              emailError: validate('email', this.state.email)
            })
          }}
          style={styles.child}
          label='Email'
          mode='outlined'
          value={this.state.email}/>
        <HelperText
          type="error" >
          {this.state.emailError}
        </HelperText>
        <TextInput
          onChangeText={value => this.setState({password: value.trim()})}
          onBlur={() => {
            this.setState({
              passwordError: validate('password', this.state.password)
            })
          }}
          secureTextEntry={true}
          style={styles.child}
          mode='outlined'
          label='Password'
          value={this.state.password}/>
        <HelperText
        type="error">
        {this.state.passwordError}
         </HelperText>
         <HelperText
        type="error">
        {this.state.serverError}
         </HelperText>
         <View style={{flexDirection:'row','justifyContent':'space-around','alignItems':'center'}}>
          <Checkbox
          status={this.state.mode ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ mode: !this.state.mode })}}
          color={this.props.theme.colors.primary}
        />
        <Text style={{marginTop:3}}>
          Login as Teacher
        </Text>
        </View>
        <Button style={styles.button} mode="contained" onPress={() =>{
          this.signInAsync()}}>
          Login
        </Button>
        {
          this.state.showloader?<View><Bubbles size={13} color="#6200ee"/></View>:null
        }
	    <Button  mode="text" style={{marginTop:25}} onPress={()=>this.props.navigation.navigate('ForgotPass')}>
	    Forgot Password
	    </Button>
	    <View style={styles.sign}>
	    <Text>Don't have an Account ?</Text>
	    <Button  mode="text" onPress={()=>this.props.navigation.navigate('Signup')}>
	      Sign Up Now
	    </Button>
      </View>
      </View>
      </KeyboardAwareScrollView>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
   performSignIn
  }, dispatch);
}

export default connect(null,mapDispatchToProps)(withTheme(Login));
 const styles=StyleSheet.create({
  main:{
  flex:1,
  flexDirection:"column",
  justifyContent:'center',
  alignItems: 'center',
  marginTop:50
  },
  child:{
  width:'85%',
  marginTop:20,
  },
  button:{
  marginTop:35,
  width:'60%',
  marginBottom:30
 },
  sign:{
  marginTop:10,
  flexDirection:'row',
  alignItems:'center'
 }
})