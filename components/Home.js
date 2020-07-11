import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import { Card, Icon ,Button } from 'react-native-elements'
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
import { ImagePicker } from 'expo';
import Separator from './profile/Separator'
import validate from '../validation/validation_wrapper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {sendPostRequestToServer} from '../services/sendPostRequestToServer'
import {handleUploadPhoto} from '../services/auth.js'
class Home extends React.Component {

    state = {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS0rikanm-OEchWDtCAWQ_s1hQq1nOlQUeJr242AdtgqcdEgm0Dg',
        phone:'',
        name:'',
        email:'',
        isModalVisible:false,
        messageError:'',
        editMode:false,
        roomNo:'275',
        hostel:'Tilak',
        regNo:'',
        visible: false
    }
    emailRef=React.createRef();
    telRef=React.createRef();
    nameRef=React.createRef();
    logout = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('AuthLoading');
      console.log('logout')
      }

    updateProfile = async() =>{
      let response=await sendPostRequestToServer({name:this.state.name,phone:this.state.phone,email:this.state.email,regNo:this.state.regNo},'student/update')
      console.log(response);
    }
    async componentDidMount(){
      this.props.navigation.setParams({logout:this.logout})
      this.props.navigation.setParams({updateProfile:this.updateProfile})
      let regNo=await AsyncStorage.getItem('userId')
      let studentDetails=await sendPostRequestToServer({regNo:regNo},'student/fetch')
      console.log(studentDetails);
      this.setState({name:studentDetails.name,phone:studentDetails.phone,email:studentDetails.email,regNo:studentDetails.regNo,image:studentDetails.imageuri})
    }

    _pickImage = async () => {
        console.log('image clicked');
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
          this.setState({image:result.uri})
          handleUploadPhoto(result.uri,this.state.regNo,'student/uploadimage')
        }
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

    renderTel = () => (
        <TouchableOpacity>
            <View style={styles.profileContainer}>
                <View style={styles.iconRow}>
                    <Icon
                      name="call"
                      underlayColor="transparent"
                      iconStyle={styles.profileIcon}
                      onPress={this.onPressTel}
                    />
                </View>
                <View style={styles.profileRow}>
                  <View style={styles.profileNumberColumn}>
                  <TextInput
                  style={styles.profileNumberText}
                  ref={this.telRef}
                  keyboardType = "number-pad"
                  onChangeText={value => this.setState({phone: value})}
                  onEndEditing={() => {
                    this.setState({
                      messageError: validate('phone',this.state.phone)
                    })
                  }}
                  underlineColorAndroid='black'
                  label={this.state.phone}
                  editable={true}
                  value={this.state.phone}/>
                  </View>
                  <View style={styles.profileNameColumn}>
                      <Text style={styles.profileNameText}>Number</Text>
                  </View>
                </View>
                <View style={styles.editRow}>
                  <Icon
                    name="edit"
                    underlayColor="transparent"
                    iconStyle={styles.editIcon}
                    onPress={()=>{this.onPressEdit(this.telRef)}}
                  />
                </View>
            </View>
        </TouchableOpacity>
      )

    renderEmail = () => (
        <TouchableOpacity>
            <View style={styles.profileContainer}>
                <View style={styles.iconRow}>
                    <Icon
                      name="email"
                      underlayColor="transparent"
                      iconStyle={styles.profileIcon}
                      onPress={this.onPressEmail}
                    />
                </View>
                <View style={styles.profileRow}>
                  <View style={styles.profileNumberColumn}>
                    <TextInput
                      style={styles.profileNumberText}
                      ref={this.emailRef}
                      onChangeText={value => this.setState({email: value})}
                      onEndEditing={() => {
                        this.setState({
                          messageError: validate('email',this.state.email)
                        })
                      }}
                      underlineColorAndroid='black'
                      label={this.state.email}
                      editable={true}
                      value={this.state.email}/>
                  </View>
                  <View style={styles.profileNameColumn}>
                      <Text style={styles.profileNameText}>Email</Text>
                  </View>
                </View>
                <View style={styles.editRow}>
                  <Icon
                    name="edit"
                    underlayColor="transparent"
                    iconStyle={styles.editIcon}
                    onPress={()=>{this.onPressEdit(this.emailRef)}}
                  />
                </View>
            </View>
        </TouchableOpacity>
      )
      renderName = () => (
        <TouchableOpacity>
            <View style={styles.profileContainer}>
                <View style={styles.iconRow}>
                    <Icon
                      name="person"
                      underlayColor="transparent"
                      iconStyle={styles.profileIcon}
                    />
                </View>
                <View style={styles.profileRow}>
                  <View style={styles.profileNumberColumn}>
                    <TextInput
                      style={styles.profileNumberText}
                      ref={this.nameRef}
                      onChangeText={value => this.setState({name: value})}
                      onEndEditing={() => {
                        this.setState({
                          messageError: validate('name',this.state.name)
                        })
                      }}
                      underlineColorAndroid='black'
                      label={this.state.name}
                      editable={true}
                      value={this.state.name}/>
                  </View>
                  <View style={styles.profileNameColumn}>
                      <Text style={styles.profileNameText}>Name</Text>
                  </View>
                </View>
                <View style={styles.editRow}>
                  <Icon
                    name="edit"
                    underlayColor="transparent"
                    iconStyle={styles.editIcon}
                    onPress={()=>{this.onPressEdit(this.nameRef)}}
                  />
                </View>
            </View>
        </TouchableOpacity>
      )
    renderAddress = () => (
        <TouchableOpacity>
            <View style={styles.profileContainer}>
                <View style={styles.iconRow}>
                    <Icon
                      name="place"
                      underlayColor="transparent"
                      iconStyle={styles.profileIcon}
                      onPress={this.onPressEmail}
                    />
                </View>
                <View style={styles.placeRow}>
                    <TextInput
                      style={styles.roomNumberText}
                      onChangeText={value => this.setState({roomNo: value})}
                      label={this.state.roomNo}
                      editable={true}
                      underlineColorAndroid='black'
                      keyboardType='numeric'
                      value={this.state.roomNo}
                      />
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.hostel}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({hostel: itemValue})
                          }>
                        <Picker.Item label="Tandon Hostel" value="tandon" />
                        <Picker.Item label="Tilak Hostel" value="tilak" />
                    </Picker>
                </View>
                <View style={styles.editRow}>
                  <Icon
                    name="edit"
                    underlayColor="transparent"
                    iconStyle={styles.editIcon}
                    onPress={this.onPressEdit}
                  />
                </View>
            </View>
        </TouchableOpacity>
      )
    

    render(){
        const {
          avatar,
          avatarBackground,
          name,
          address: { city, country },
        } = {
            "avatar": this.state.image,
            "avatarBackground":this.state.image,
            "name":this.state.name,
            "address": {
                "streetA": "Abbott Shoals",
                "streetB": "505 Winona Place",
                "streetC": "4306 Hudson Street Suite 875",
                "streetD": "Suite 489",
                "city": "Ginatown",
                "state": "Massachusetts",
                "country": "Nepal",
                "zipcode": "41428-0189",
                "geo": {
                  "lat": "-75.8513",
                  "lng": "81.3262"
                }
              },
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
                                        <Image
                                          style={styles.userImage}
                                          source={{
                                            uri: avatar,
                                          }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.userNameText}>{name}</Text>
                                    <Text style={styles.regNoText}>{this.state.regNo}</Text>
                                    <View style={styles.userAddressRow}>
                                      <View>
                                        <Icon
                                          name="place"
                                          underlayColor="transparent"
                                          iconStyle={styles.placeIcon}
                                          onPress={this.onPressPlace}
                                        />
                                      </View>
                                      <View style={styles.userCityRow}>
                                        <Text style={styles.userCityText}>
                                          {this.state.roomNo}, {this.state.hostel}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </ImageBackground>
                            </View>
                            {this.renderName()}
                            {Separator()}
                            {this.renderTel()}
                            {Separator()}
                            {this.renderEmail()}
                            {Separator()}
                            {this.renderAddress()}
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
    width:'70%'
  },
  profileIcon: {
    color: '#01C89E',
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
  placeRow: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
export default  createStackNavigator({Home})