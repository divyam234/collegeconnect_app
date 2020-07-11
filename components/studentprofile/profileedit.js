import React,{Component} from 'react'
import {StyleSheet,View,Keyboard} from 'react-native'
import {Text,TextInput,Appbar,Button} from 'react-native-paper'
import Headerform from './Customheader'
import dept from '../../constants/DeptMap';
import { SinglePickerMaterialDialog} from 'react-native-material-dialog';
import { withTheme,IconButton } from 'react-native-paper';
import {connect} from 'react-redux'
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import {loadprofile} from '../../actions/index'
import {bindActionCreators } from 'redux'; 
import CustomSnackbar from '../shared/snackbar'
class Profile extends Component {
   state={
    deptPicker:false,
    coursePicker:false,
    hostelPicker:false,
    deptItem:{value:'none',label:''},
    course:'',
    name:'',
    email:'',
    phone:'',
    regNo:'',
    hostel:'',
    semester:'',
    batchid:''
   }
   snackFun=null
    static navigationOptions = props=>{
        return {
         header:(<Headerform {...props} title='Edit Profile'/>)
   }}
   componentDidMount(){
   let{email,name,phone,deptname,deptId}=this.props
   this.setState({
      email,name,phone,
      deptItem:{value:deptId,label:deptname}
    })
   }
   updateProfile = async() =>{
     let{email,name,phone,deptItem}=this.state
     let response=await sendPostRequestToServer1({name,phone,email,deptId:deptItem['value']},'professor/update')
     await this.props.loadprofile(response.user,this.props.type)
     this.snackFun.show()
    }
 render(){
   let{email,name,phone,regNo,batchid,course,hostel,semester}=this.state
    return(
     <View style={styles.main}>
     <Text style={styles.text}>Edit Profile</Text>
     <TextInput
        label='Name'
        value={name}
        style={styles.textIn}
        onChangeText={value => this.setState({name: value})}
      />
     <TextInput
        label='Phone'
        value={phone}
        style={styles.textIn}
        onChangeText={value => this.setState({phone: value})}
        keyboardType='number-pad'
     />
     <View pointerEvents="none">
     <TextInput
        label='Email'
        value={email}
        editable={false}
        style={styles.textIn}
     />
     </View>
     <View pointerEvents="none">
     <TextInput
        label='Registration No'
        value={regNo}
        editable={false}
        style={styles.textIn}
     />
     </View>
     <View  style={{flexDirection:'row',alignItems:'center'}}>
      <View pointerEvents="none" style={{width:'85%'}}><TextInput
        label='Course'
        value={course}
        style={styles.textIn}
        editable={false}
     />
     </View>
     <IconButton
     icon="arrow-drop-down-circle"
     color={this.props.theme.colors.primary}
     style={{marginTop:50}}
     size={25}
     onPress={() => this.setState({deptPicker:true})}
    />
    </View>
     <TextInput
        label='Batch'
        value={batchid}
        style={styles.textIn}
     />
     <TextInput
        label='Semester'
        value={semester}
        style={styles.textIn}
        keyboardType='number-pad'
     />
     <View  style={{flexDirection:'row',alignItems:'center'}}>
      <View pointerEvents="none" style={{width:'85%'}}><TextInput
        label='Dept'
        value={deptItem.label}
        style={styles.textIn}
        editable={false}
     />
     </View>
     <IconButton
     icon="arrow-drop-down-circle"
     color={this.props.theme.colors.primary}
     style={{marginTop:50}}
     size={25}
     onPress={() => this.setState({deptPicker:true})}
    />
     </View>
     <SinglePickerMaterialDialog
      title={'Choose Department'}
      items={Object.keys(dept).map((item,index) => {
      return { value:item, label:dept[item]};
   })}
      colorAccent={this.props.theme.colors.primary}
      visible={this.state.deptPicker}
      scrolled={true}
      selectedItems={this.state.deptItem}
      onCancel={() => this.setState({deptPicker:false })}
      onOk={result => {
       this.setState({deptPicker:false });
       this.setState({deptItem:result.selectedItem});
     }}/>
    <Button style={{marginTop:40}} mode="contained" onPress={() =>this.updateProfile()}>
    Save Changes
    </Button>
    <CustomSnackbar snack={t=>this.snackFun=t} title={'Profile Updated'}></CustomSnackbar>
     </View>
    )
 }
}
const mapStateToProps = (state) => {
   return {
      type:state.auth.type,
      email:state.student.profileDetails.email,
      regNo:state.student.profileDetails.regNo,
      name:state.student.profileDetails.name,
      phone:state.student.profileDetails.phone,
      imageuri:state.student.profileDetails.imageuri,
      batchid:state.student.profileDetails.batchid,
      semester:state.student.profileDetails.semester,
      hostel:state.student.profileDetails.hostel,
      course:state.student.profileDetails.course,
   }
 }
 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     loadprofile
   }, dispatch);
 }
export default connect(mapStateToProps,mapDispatchToProps)(withTheme(Profile));
const styles=StyleSheet.create({
    main:{
    flexGrow:1,
    flexDirection:'column',
    marginTop:20,
    width:'95%',
    marginLeft:10
    },
    textIn:{
    backgroundColor:'white',
    marginTop:10,
    },
    text:{
    fontSize:20,
    },
    butt:{
    position:'absolute',
    bottom:120,
    width:'100%'
    }
  })