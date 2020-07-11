import React from 'react';
import {Image,Linking,ScrollView,StyleSheet,View,TouchableOpacity} from 'react-native'
import {Button,Card,Surface,Text,Divider} from 'react-native-paper';
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
          let data=await handleUploadPhoto(this.state.imageuri,this.props.email,'professor/uploadimage')
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
        let{email,name,phone,deptname,navigation}=this.props
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
            <Divider style={styles.divider}/>
            <View style={styles.item}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.text}>{phone}</Text>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>{email}</Text>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.item}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.text}>{deptname}</Text>
            </View>
            <Divider style={styles.divider}/>
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
        marginTop:30,
      },
      profilecontent:{
      'flexDirection':'column',
      'alignItems':'center',
      justifyContent:'flex-start'
      },
      label:{
      color:'grey',
      marginBottom:8,
      fontSize:15
      },
      text:{
      fontSize:16,
      },
      item:{
      width:'100%',
      marginBottom:10,
      marginTop:10
    },
    edit:{
    position:'absolute',
    top:3,
    right:5
    },
    divider:{
      width:'100%',
      borderWidth:0.5,
      borderColor:'rgba(0, 0, 0, 0.10)'
    }
  })
  const mapStateToProps = (state) => {
    return {
       type:state.auth.type,
       email:state.teacher.profileDetails.email,
       name:state.teacher.profileDetails.name,
       phone:state.teacher.profileDetails.phone,
       deptname:state.teacher.profileDetails['department.deptName'],
       imageuri:state.teacher.profileDetails.imageuri
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      loadprofile
    }, dispatch);
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Profile)