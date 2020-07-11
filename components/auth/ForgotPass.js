import React from 'react';
import { StyleSheet,View} from 'react-native'
import { TextInput,Button} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class ForgotPassword extends React.Component{
  
  render(){
    return(
        <KeyboardAwareScrollView style={{flexGrow:1}}  enableOnAndroid={true}>
        <View style={styles.main}>
        <TextInput
        style={styles.child}
        label='Email'
        mode='outlined'
        />
     <Button style={styles.button} mode="contained">
      Confirm
    </Button>
    </View>
    </KeyboardAwareScrollView>
     )
  }
}
export default  ForgotPassword;
 const styles=StyleSheet.create({
  main:{
  flex:1,
  flexDirection:"column",
  justifyContent:'center',
  alignItems: 'center'
  },
  child:{
  width:'85%',
  marginTop:'50%',
  },
  button:{
  marginTop:35,
  width:'60%'
 },
})