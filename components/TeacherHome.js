import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import { Card, Icon ,Button } from 'react-native-elements'
import Menu, { MenuItem} from 'react-native-material-menu';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import { ImagePicker,ImageManipulator } from 'expo';
import mainColor from './profile/constants'
import Separator from './profile/Separator'
import validate from '../validation/validation_wrapper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {sendPostRequestToServer} from '../services/sendPostRequestToServer'
import {handleUploadPhoto} from '../services/auth.js'
import dept from '../constants/DeptMap';
class TeacherHome extends React.Component {

    state = {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS0rikanm-OEchWDtCAWQ_s1hQq1nOlQUeJr242AdtgqcdEgm0Dg',
        phone:'',
        name:'',
        email:'',
        isModalVisible:false,
        messageError:'',
        editMode:false,
        department:'',
        visible: false,
        visiblemenu: false,
    }
   

    updateProfile = async() =>{
      let response=await sendPostRequestToServer({name:this.state.name,phone:this.state.phone,email:this.state.email,deptId:this.state.department},'professor/update')
      console.log(response);
    }
    async componentDidMount(){
      /*this.props.navigation.setParams({setMenuRef:this.setMenuRef})
      this.props.navigation.setParams({showMenu:this.showMenu})
      this.props.navigation.setParams({hideMenu:this.hideMenu})
      this.props.navigation.setParams({updateProfile:this.updateProfile})
      let email=await AsyncStorage.getItem('userId')
      let teacherDetails=await sendPostRequestToServer({email:email},'professor/fetch')
      console.log(teacherDetails);
      this.setState({name:teacherDetails.name || '',phone:teacherDetails.phone || '',email:teacherDetails.email,department:teacherDetails.deptId || '',image:teacherDetails.imageuri || ''})*/

    }
    static navigationOptions = props => {
      return{
         header: (
              <Appbar.Header style={{backgroundColor:'white'}}>
              <Appbar.BackAction onPress={() =>props.navigation.goBack()} />
               <Appbar.Content title="College Connect" />
               <Menu
               ref={props.navigation.getParam('setMenuRef')}
               button={<Appbar.Action icon="more-vert" onPress={props.navigation.getParam('showMenu')} color='black' />}
               >
               <MenuItem onPress={()=>{
                props.navigation.getParam('hideMenu')()
                props.navigation.getParam('updateProfile')()
              }}>Save</MenuItem>
               <MenuItem onPress={async  ()=>{
                   props.navigation.getParam('hideMenu')()
                   await AsyncStorage.clear();
                   props.navigation.navigate('AuthLoading')
                 }}>Logout</MenuItem>
               </Menu>
             </Appbar.Header>
          )
        }}
    _pickImage = async () => {
        console.log('image clicked');
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3]
        });

        if (!result.cancelled) {
          await this.editImage(result.uri)
          handleUploadPhoto(this.state.image,this.state.email,'professor/uploadimage')
        }
      }
      editImage = (uri) => {
        return new Promise(async (resolve,reject)=>{
          const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{resize:{width:500,height:500}}],
           {compress:0.8,format:'png'}
          );
          this.setState({image:manipResult.uri});
          resolve()
        }) 
     }
    onPressTel = number => {
        Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
      }

    onPressEdit = (ref) => {
       ref.current.focus()
      }

    onPressEmail = email => {
        Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
          console.log('Error:', err)
        )
      }

 renderDepartmentlist=()=>{
      return Object.keys(dept).map((item,index)=>{
        return <Picker.Item label={dept[item]} value={item} key={index} />  
      })
 }
    render(){
        const {
          avatar,
          avatarBackground,
          name
        } = {
            "avatar": this.state.image,
            "avatarBackground":this.state.image,
            "name":this.state.name
        }
        return(
            <View style={{flexGrow: 1}}>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
                    <ScrollView style={styles.scroll} enableOnAndroid={true}>
                    <View style={styles.container}>
                        <Card containerStyle={styles.cardContainer}>
                            <View style={styles.headerContainer}>
                                <ImageBackground
                                  style={styles.headerBackgroundImage}
                                  blurRadius={10}
                                  source={{
                                    uri: avatarBackground,
                                  }}
                                >
                                  <View style={styles.headerColumn}>
                                    <TouchableOpacity onPress={this._pickImage}>
                                        <Image style={styles.userImage} source={{uri:avatar}}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.userNameText}>{name}</Text>
                                    <Text style={styles.regNoText}>{dept[this.state.department]}</Text>
                                  </View>
                                </ImageBackground>
                            </View>
                            {this.renderName()}
                            {Separator()}
                            {this.renderTel()}
                            {Separator()}
                            {this.renderEmail()}
                            {Separator()}
                            {this.renderDepartment()}
                        </Card>
                    </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
    flexGrow:1
  },
  profileContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  roomNumberText:{
    color: 'black',
    fontSize: 20,
    fontWeight: '200',
    width:'30%',
    justifyContent:'center'
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#01C89E',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  regNoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 6,
    textAlign: 'center',
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  editIcon: {
    color: 'gray',
    fontSize: 30,
  },
  editRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  pickerStyle:{
    width:'100%'
  },
  profileIcon: {
    color: mainColor,
    fontSize: 30,
  },
  profileNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  profileNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  profileNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  profileNumberText: {
    fontSize: 16,
    paddingBottom:10,
    width:'90%'
  },
  profileRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  deptRow: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
export default  TeacherHome