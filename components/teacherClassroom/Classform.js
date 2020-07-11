import React from 'react';

import { StyleSheet,View,StatusBar} from 'react-native'
import { TextInput,Button,withTheme,Text,List,Checkbox} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Headerform  from './Customheader'
import Modal from 'react-native-modal';
import DeptChooser from './DeptChooser'
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import {connect} from 'react-redux'
class Classform extends React.Component{
  state={
    classcode:'',
    semester:'',
    modalValue: 'Choose Batch',
    batchid:'',
    classTitle:'',
    visibleModal:false,
   }
  chosenItems={}
  setDeptData=(data)=>{
   this.chosenItems=data
  }
  renderModalContent = () => (
    <View style={styles.modalContent}>
    <View style={styles.btechlist}>
    <DeptChooser setDeptData={this.setDeptData}/>
    <View style={{flexDirection:"row",justifyContent:'flex-end',alignItems: 'center','marginTop':40,'marginRight':-10}}>
    <Button mode="text" onPress={this.hideModal}>Ok</Button>
    </View>
    </View>
    </View>
  );

  showModal=()=>{
   this.setState({visibleModal:true })
  }
  hideModal=()=>{
    this.setState({visibleModal:false })
   }
   static navigationOptions = props => {
    return{
       header: (<Headerform {...props} title={'Register New Course'}/>)
  }}
  render(){
    return(
       <KeyboardAwareScrollView style={{flexGrow:1}} enableOnAndroid={true}>
        <View style={styles.main}>
        <TextInput
          onChangeText={value => this.setState({classcode:value})}
          style={styles.child}
          label='ClassCode'
          mode='outlined'
          value={this.state.classcode}/>
        <TextInput
          onChangeText={value => this.setState({classTitle:value})}
          style={styles.child}
          label='ClassTitle'
          mode='outlined'
          value={this.state.classTitle}/>
         <TextInput
          onChangeText={value => this.setState({semester:value})}
          style={styles.child}
          mode='outlined'
          label='Semester'
          keyboardType = "number-pad"
          value={this.state.semester}/>
         <Modal isVisible={this.state.visibleModal}
          onBackButtonPress={this.hideModal}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}>
          {this.renderModalContent()}
        </Modal>
      <Button style={styles.button} mode="contained" onPress={this.showModal}>Choose Batches</Button>
      <Button style={styles.button} mode="contained" onPress={() =>{sendPostRequestToServer1({'batchId':this.chosenItems,'classcode':this.state.classcode,
            'classTitle':this.state.classTitle,'semester':this.state.semester,'professorId':this.props.professorId.split('@')[0]},'professor/registercourse')}}>Save</Button>
      </View>
      </KeyboardAwareScrollView>
     )
    
  }
}
const mapstatetoProps=(state)=>{
  return{
  professorId:state.auth.id
 }  
}
export default connect(mapstatetoProps,null)(withTheme(Classform));
 const styles=StyleSheet.create({
  main:{
  flex:1,
  flexDirection:"column",
  justifyContent:'center',
  alignItems: 'center',
  marginTop:20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  child:{
  width:'85%',
  marginTop:20,
  },
  button:{
  marginTop:35,
  width:'60%'
 },
 btechlist:{
   width:'90%'
 }
})