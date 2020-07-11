import React from 'react';
import {Image,Linking,ScrollView,StyleSheet,View,TouchableOpacity} from 'react-native'
import {Button,Card,Surface,Text} from 'react-native-paper';
import Headerform from './Customheader'
import {connect} from 'react-redux'
import { ImagePicker,ImageManipulator } from 'expo';
import {handleUploadPhoto} from '../../services/auth'
import {loadprofile} from '../../actions/index'
import {bindActionCreators } from 'redux'; 
class Profile extends React.Component{
    state={
     imageuri:null
    }
    static navigationOptions = props => {
        return{
           header: (<Headerform {...props} title='Profile'/>)
       }}
        pickImage = async () => {
        let{loadprofile,type}=this.props
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3]
        });

        if (!result.cancelled) {
          await this.editImage(result.uri)
          let data=await handleUploadPhoto(this.state.imageuri,this.props.regNo,'student/uploadimage')
          loadprofile(data,type)
        }
      }
      editImage = (uri) => {
        return new Promise(async (resolve,reject)=>{
          const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{resize:{width:500,height:500}}],
           {compress:0.8,format:'png'}
          );
          this.setState({imageuri:manipResult.uri});
          resolve()
        }) 
     }
     componentDidMount(){
      this.setState({imageuri:this.props.imageuri})
     }
    render(){
        let{email,name,phone,navigation,regNo,batchid,course,hostel,semester}=this.props
    return(
      <ScrollView>
      <View style={styles.main}>
      <Button mode='contained' style={styles.edit} onPress={()=>{navigation.navigate('TeacherProfileEdit')}}>Edit</Button>
      <View >
      <TouchableOpacity onPress={this.pickImage}>
      <Image style={styles.userImage} source={{uri:this.state.imageuri}} />
      </TouchableOpacity>
      </View>
      <Surface style={styles.card}>
      <Card>
        <Card.Content>
            <View style={styles.profilecontent}>
            <View style={styles.item}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.text}>{phone}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.label}>Registration No</Text>
            <Text style={styles.text}>{regNo}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.label}>Course</Text>
            <Text style={styles.text}>{course}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.label}>Batch</Text>
            <Text style={styles.text}>{batchid}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.label}>Semester</Text>
            <Text style={styles.text}>{semester}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.label}>Hostel</Text>
            <Text style={styles.text}>{hostel}</Text>
            </View>
          </View>
        </Card.Content>
       </Card>
       </Surface>
      </View>
      </ScrollView>
     )
    }
}
const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    },
     userImage: {
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        width: 170,
        marginTop:30,
        borderColor: '#6200ee',
      },
      card:{
        elevation:4,
        width:'90%',
        marginBottom:10,
        marginTop:30
      },
      profilecontent:{
      'flexDirection':'column',
      'alignItems':'center',
      justifyContent:'flex-start'
      },
      label:{
      color:'grey',
      fontSize:15
      },
      text:{
      fontSize:20,
      fontWeight:'bold'
      },
      item:{
      width:'100%',
      marginBottom:20
    },
    edit:{
    position:'absolute',
    top:3,
    right:5
    }
  })
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
  export default connect(mapStateToProps,mapDispatchToProps)(Profile)