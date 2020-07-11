import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Modal from "react-native-modal";
import {TextInput,HelperText} from 'react-native-paper';
import validate from '../validation/validation_wrapper'
import {sendPostRequestToServer} from '../services/sendPostRequestToServer';
import FlashMessage,{ showMessage, hideMessage } from "react-native-flash-message";
import { Bubbles } from 'react-native-loader';
import {AsyncStorage} from 'react-native';

export default class AlbumDetail extends React.Component {
  state = {
    isModalVisible: false,
    message:'',
    messageError:'',
    showloader:false
  };
 
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
 
  sendRequest = async () => {
  	if(!this.state.messageError && this.state.message)
  	{
  		console.log('send request')
  		const user = await AsyncStorage.getItem('userId');
  		console.log(user);
	  	var data={
	  		from:user,
	  		to:this.props.teacher.professorId,
	  		message:this.state.message
	  	}
	  	this.setState({showloader:true})
	  	let ans=await sendPostRequestToServer(data,'student/request')
	  	this.setState({showloader:false})
	  	this.setState({ isModalVisible: false});
	  	showMessage({
		  message:ans.message,
		  description: "Wait for confirmation from Professor",
		  type: "success",
		  duration:4000
		});
    }
  }
  render() {
  	return(
		<Card>
			<CardSection>
				<View style={styles.containerStyle}>
					<View style={styles.thumbnailContainerStyle}>
						<Image 
						style={styles.thumbnailStyle}
						source={{uri:this.props.teacher.imageuri}}/>
					</View>
					<View style={styles.headerContentStyle}>
						<Text style={styles.headerTextStyle}>{this.props.teacher.name}</Text>
						<Text>{this.props.teacher.email}</Text>
					</View>
				</View> 
					<TouchableOpacity style={styles.buttonStyle} onPress={this._toggleModal}>
						<Text style={styles.textStyle}>
							Request
						</Text>
					</TouchableOpacity>
			</CardSection> 
			<Modal
	          isVisible={this.state.isModalVisible}
	          animationIn="slideInLeft"
	          onBackdropPress={this._toggleModal}
	          animationOut="slideOutRight">
	          	<ScrollView>
					<View style={styles.modalContent}>
				        <Text style={styles.modalTextStyle}>Leave a message to {this.props.teacher.name}</Text>
					    <View style={styles.textInputStyle}>
					    	<TextInput
					          onChangeText={value => this.setState({message: value})}
					          onEndEditing={() => {
					            this.setState({
					              messageError: validate('requestMessage', this.state.message)
					            })
					          }}
					          multiline={true}
	   						  numberOfLines={4}
					          label='Enter constructive message'
					          mode='outlined'
					          value={this.state.message}/>
					        <HelperText
					          type="error" >
					          {this.state.messageError}
					        </HelperText>
					    </View>
					    <View>
					    {
				          this.state.showloader?<View><Bubbles size={13} color="#6200ee"/></View>:null
				        }
				        </View>
					    <View style={{'justifyContent':'space-around','flexDirection':'row'}}>
						    <TouchableOpacity onPress={this._toggleModal}>
						      <View style={styles.button}>
						        <Text style={{'color':'white'}}>Close</Text>
						      </View>
						    </TouchableOpacity>
						    <TouchableOpacity onPress={this.sendRequest}>
						      <View style={styles.sendButton}>
						        <Text style={{'color':'white'}}>Send</Text>
						      </View>
						    </TouchableOpacity>
					    </View>
				    </View>
				</ScrollView>
	        </Modal>
	        <FlashMessage  position="top" />
		</Card>
		)
  	}
}
const styles={
	containerStyle:{
		justifyContent:'space-around',
		flexDirection:'row'
	},
	headerContentStyle:{
		justifyContent:'space-around',
		flexDirection:'column'
	},
	headerTextStyle:{
		fontSize:18,
		fontWeight:'bold'
	},
	thumbnailStyle:{
		width:50,
		height:50
	},
	thumbnailContainerStyle:{
		justifyContent:'center',
		alignItems:'center',
		marginLeft:10,
		marginRight:10
	},
	buttonStyle:{
		borderRadius:5,
		borderWidth:1,
		padding:5,
		borderColor:'#6200ee',
		marginLeft:5,
		marginRight:5,
	},
	textStyle:{
		alignSelf:'center',
		color:'#6200ee',
		fontSize:16,
		fontWeight:'600',
		paddingTop:10,
		paddingBottom:10	
	},
	button: {
	    backgroundColor: "#555555",
	    padding: 12,
	    margin: 16,
	    justifyContent: "center",
	    alignItems: "center",
	    borderRadius: 4,
	    borderColor: "rgba(0, 0, 0, 0.1)",
	},
	sendButton:{
		backgroundColor: "#4CAF50",
	    padding: 12,
	    margin: 16,
	    justifyContent: "center",
	    alignItems: "center",
	    borderRadius: 4,
	    borderColor: "rgba(0, 0, 0, 0.1)",
	},
    modalContent: {
	    backgroundColor: "white",
	    padding: 22,
	    justifyContent: "center",
	    alignItems: "center",
	    borderRadius: 4,
	    height:'auto',
	    borderColor: "rgba(0, 0, 0, 0.1)",
    },
    modalTextStyle:{
    	alignSelf:'center',
		color:'black',
		fontSize:16,
		fontWeight:'600',
		paddingBottom:10
    },
    textInputStyle:{
    	width:'100%'
    }
}