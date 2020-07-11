import React from 'react';
import { StyleSheet,View,AsyncStorage} from 'react-native'
import { TextInput,Button,HelperText} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validate,{validatePassword} from '../../validation/validation_wrapper'
import { Bubbles } from 'react-native-loader';
import {signIn} from '../../services/auth'
import {createMaterialTopTabNavigator} from 'react-navigation';
import {StatusBar} from 'react-native';
import {sendPostRequestToServer1 as sendPostRequestToServer} from '../../services/sendPostRequestToServer'
class Signups extends React.Component{
  state={
   regno:'',
   email:'',
   password:'',
   confirmPassword:'',
   regnoError:'',
   emailError:'',
   passwordError:'',
   confirmPasswordError:'',
   showloader:false
  }

  signUpStudentAsync = async () => {
    const regnoError=validate('regno',this.state.regno)
    const emailError = validate('email', this.state.email)
    const passwordError = validate('password', this.state.password)
    const confirmPasswordError=validatePassword(this.state.password,this.state.confirmPassword)
    this.setState({
      emailError: emailError,
      passwordError: passwordError,
      regnoError:regnoError,
      confirmPasswordError:confirmPasswordError
    })

    if (!emailError && !passwordError && !confirmPasswordError && !regnoError) {
      this.setState({showloader:true})
      var signInToken;
      let tokenobj=await signIn({password:this.state.password,email:this.state.email,regNo:this.state.regno},'student_register')
      if(tokenobj.message)
        {
        signInToken=await signIn({password:this.state.password,email:this.state.email},'login')
        console.log(signInToken)
        await AsyncStorage.setItem('userToken',signInToken.token);
        await AsyncStorage.setItem('userId',signInToken.user);
        await AsyncStorage.setItem('mode','student');
        this.setState({showloader:false})
        this.props.navigation.navigate('AuthLoading');
      }
      else
      {
       /* showMessage({
          message: tokenobj.message,
          type: "danger",
        });
        this.state.confirmPasswordError=tokenobj.message
        this.setState({showloader:false})*/
      }
    }
  };

  render(){
    return(
       <KeyboardAwareScrollView style={{flexGrow:1}} enableOnAndroid={true}>
        <View style={styles.main}>
        <TextInput
          onChangeText={value => this.setState({regno: value.trim()})}
          onBlur={() => {
            this.setState({
              regnoError: validate('regno', this.state.regno)
            })
          }}
          style={styles.child}
          label='Registration No.'
          mode='outlined'
          value={this.state.regno}/>
        <HelperText
          type="error" >
          {this.state.regnoError}
        </HelperText>    
        <TextInput
          onChangeText={value => this.setState({email: value.trim()})}
          onBlur={() => {
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
        <TextInput
          onChangeText={value => this.setState({confirmPassword: value.trim()})}
          onBlur={() => {
            this.setState({
              confirmPasswordError:validatePassword(this.state.password,this.state.confirmPassword)
            })
          }}
          secureTextEntry={true}
          style={styles.child}
          mode='outlined'
          label='Confirm Password'
          value={this.state.confirmPassword}/>
        <HelperText
        type="error">
        {this.state.confirmPasswordError}
        </HelperText>
        {
          this.state.showloader?<View><Bubbles size={13} color="#6200ee"/></View>:null
        }
     <Button style={styles.button} mode="contained" onPress={() =>{console.log('Signup clicked')
          this.signUpStudentAsync()}}>
      Register
    </Button>
    </View>
    </KeyboardAwareScrollView>
     )
    
  }
}

class Signupt extends React.Component{
  state={
    email:'',
    password:'',
    confirmPassword:'',
    emailError:'',
    passwordError:'',
    confirmPasswordError:'',
    showloader:false
   }
  signUpTeacherAsync = async () => {
    const emailError = validate('email', this.state.email)
    const passwordError = validate('password', this.state.password)
    const confirmPasswordError=validatePassword(this.state.password,this.state.confirmPassword)
    this.setState({
      emailError: emailError,
      passwordError: passwordError,
      confirmPasswordError:confirmPasswordError
    })

    if (!emailError && !passwordError && !confirmPasswordError) {
      this.setState({showloader:true})
      let tokenobj=await sendPostRequestToServer({password:this.state.password,email:this.state.email},'professor/register')
      console.log(tokenobj)
      if(tokenobj.message)
        {
        const signInToken=await sendPostRequestToServer({password:this.state.password,email:this.state.email},'professor/login')
        await AsyncStorage.setItem('userToken',signInToken.token);
        await AsyncStorage.setItem('userId',signInToken.user);
        await AsyncStorage.setItem('type','teacher');
        console.log(signInToken)
        this.setState({showloader:false})
        this.props.navigation.navigate('Authloading');
      }
      else
      {
        this.state.confirmPasswordError=tokenobj.message
        this.setState({showloader:false})
      }
    }
  };
  render(){
    return(
       <KeyboardAwareScrollView style={{flexGrow:1}} enableOnAndroid={true}>
        <View style={styles.main}>
        <TextInput
          onChangeText={value => this.setState({email: value.trim()})}
          onBlur={() => {
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
        <TextInput
          onChangeText={value => this.setState({confirmPassword: value.trim()})}
          onBlur={() => {
            this.setState({
              confirmPasswordError: validatePassword(this.state.password,this.state.confirmPassword)
            })
          }}
          secureTextEntry={true}
          style={styles.child}
          mode='outlined'
          label='Confirm Password'
          value={this.state.confirmPassword}/>
        <HelperText
        type="error">
        {this.state.confirmPasswordError}
        </HelperText>
        {
          this.state.showloader?<View><Bubbles size={13} color="#6200ee"/></View>:null
        }
     <Button style={styles.button} mode="contained" onPress={() =>{console.log('Signup clicked')
     this.signUpTeacherAsync()}}>
      Register
    </Button>
    </View>
    </KeyboardAwareScrollView>
     )
    
  }
}
 const styles=StyleSheet.create({
  main:{
  flex:1,
  flexDirection:"column",
  justifyContent:'center',
  alignItems: 'center',
  marginTop:20
  },
  child:{
  width:'85%',
  marginTop:20,
  },
  button:{
  marginTop:35,
  width:'60%'
 }
})

export default createMaterialTopTabNavigator(
    {
      Student:Signups,
      Teacher:Signupt
    },
    {
        tabBarOptions: {
            style: {
              backgroundColor: 'white',
              height:50,
              
            },
            labelStyle:{
            color:'black',
            fontFamily:'open-sans-reg'
            },
            indicatorStyle:{
            backgroundColor:'#6200ee'
            }
          },
          lazy:true,
    }
  )