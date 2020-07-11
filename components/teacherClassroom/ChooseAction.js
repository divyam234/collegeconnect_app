import * as React from 'react';
import { View,StyleSheet,TouchableOpacity} from 'react-native';
import { Ionicons as Icon} from '@expo/vector-icons'
import {Text} from 'react-native-paper';
import CustomHeader from './Customheader'
class ChooseAction extends React.Component {
   
    static navigationOptions = props => {
     return{
        header:(<CustomHeader title={'College Connect'} type={'Home'} {...props} />)   
      }}
    render(){
         return(
            <View style={styles.main}>
            <TouchableOpacity style={styles.createButtton} onPress={()=>{
              this.props.navigation.navigate('Classform')
            }}>
            <Icon name={"md-add"}  size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.textStyle}>
              Create Class
            </Text>
            <TouchableOpacity style={styles.createButtton}
            onPress={()=>{
              this.props.navigation.navigate('ViewClass')
            }}>
                <Icon name={"md-stats"}  size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.textStyle}>
              View Classes
            </Text>
       </View>
        )
    }
}
const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    createButtton:{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       height:70,
       borderRadius:50,
       backgroundColor:'#6200ee',
       marginTop:50
    },
    textStyle:{
      fontSize:20
    }
  })

export default ChooseAction;
