import React from 'react'
import { StyleSheet,View} from 'react-native'
import { TextInput,HelperText} from 'react-native-paper'
const TextField = props => (
  <View>
    <TextInput
        mode='outlined'
        style={styles.child}
        label={this.props.label}
        />
    <HelperText
          type="error">
         'error'
    </HelperText> 
  </View>
)

export default TextField

const styles=StyleSheet.create({
  child:{
  width:'85%',
  marginTop:20,
  }
})