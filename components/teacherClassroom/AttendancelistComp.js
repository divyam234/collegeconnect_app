import React,{PureComponent } from 'react'
import { View,StyleSheet } from "react-native";
import { Text,Checkbox} from 'react-native-paper';
class AttendancelistComp extends PureComponent  {
    state = {
        checked: false,
    };
  render(){
    const { checked } = this.state;
    const {name,regNo,add,remove,mode} = this.props;
    let map={'A':'P','P':'A'}
    return(
      <View style={styles.main}>
      <Text style={styles.left}>{name}</Text>
      <Text style={styles.mid}>{regNo}</Text>
      <Text style={styles.center}>{checked ? map[mode] :mode}</Text>
      <View style={styles.right}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => { this.setState({ checked: !checked },()=>{
          if(this.state.checked){
            add(regNo)
           }
           if(!this.state.checked){
            remove(regNo)
           }
       })}}
        color='#6200ee'
      />
      </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    main:{
    flex:1,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems: 'center',
    },
    left:{
     marginLeft:20,
     width:'30%'
    },
    mid:{
     width:'30%'
    },
    center:{
     width:'10%'
    },
    right:{
    flex:1,
    justifyContent:'flex-end',
    marginRight:10,
    width:'30%',
    alignItems: 'center',
    }
  })

export default AttendancelistComp