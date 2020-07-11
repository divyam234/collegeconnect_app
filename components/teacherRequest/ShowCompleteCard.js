import React, { Component } from 'react';
import {View ,TouchableOpacity,Image,ScrollView,StyleSheet} from 'react-native';
import {Text,TextInput,Button} from 'react-native-paper'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer';
import { Avatar } from 'react-native-paper';
import moment from 'moment'
import { Ionicons as Icon } from '@expo/vector-icons';
import Customheader  from '../teacherClassroom/Customheader'
class ShowCompleteCard extends Component {
	static navigationOptions = props => ({
		header: (<Customheader {...props} title={'Schedule Request'}/>)
		})
	 state={
		dateVisible: false,
		timeVisible:false,
		chosenDate:'Choose Date',
		chosenTime:'Choose Time',
		pmessage:''
	 }
	 showDatePicker = () => this.setState({ dateVisible: true });
	 showTimePicker = () => this.setState({ timeVisible: true });
     hideDatePicker = () => this.setState({ dateVisible: false });
	 hideTimePicker = () => this.setState({ timeVisible: false });
 
   handleDatePicked = (date) => {
		this.setState({ chosenDate:moment(date).format("DD/MM/YYYY")})
		this.hideDatePicker();
	};	 
	handleTimePicked = (time) => {
		this.setState({ chosenTime:moment(time).utcOffset("+05:30").format("hh:mm A")})
		this.hideTimePicker();
	};
  postRequest=async ()=>{
	let reqStatus=await sendPostRequestToServer1({requestId:this.props.navigation.getParam('requestId'),
	scheduleDate:this.state.chosenDate,
	scheduleTime:this.state.chosenTime,
	pmessage:this.state.pmessage
  },'professor/updatereq')
	
	if(reqStatus){
	alert(reqStatus.message);
	this.props.navigation.goBack()
	}
	 else{
	 alert("Error");
	 }
  }
   render(){
		 const {navigation}=this.props
	   return (
			<KeyboardAwareScrollView style={{flexGrow:1}} enableOnAndroid={true}>
			 <View style={styles.main}>
			 <View style={styles.details}>
					<Image style={{width: 50, height:50,borderRadius:20,marginLeft:0}} 
				   />
					<Avatar.Image size={50} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV0I6VDKQ3vmT9y2QFvx7UZ4aTK_HZUbbHyIvmr_sgoa3sIBB6cg'}} />	
					<Text style={{marginLeft:10,fontSize:20,color:'black'}}>{navigation.getParam('fromName')}</Text>
				</View>
				<View style={styles.details1}>
				<Text style={{padding:8}}>{navigation.getParam('requestText')}
				</Text> 
				</View>
				<TextInput multiline={true} numberOfLines={4} mode='outlined' placeholder='Enter your message' style={{width:'90%',marginTop:50}}
				value={this.state.pmessage} onChangeText={value => this.setState({pmessage:value})}/>
			
				<View style={styles.picker}>
				<View style={styles.item}>
				<Icon name='md-calendar' style={{color:"#6200ee",marginLeft:5}} size={22}/>
				<TouchableOpacity onPress={this.showDatePicker} style={{marginLeft:5}}>
					<Text>{this.state.chosenDate}</Text>
					</TouchableOpacity>
					<DateTimePicker
						isVisible={this.state.dateVisible}
						onConfirm={this.handleDatePicked}
						onCancel={this.hideDatePicker}
						minimumDate={new Date()}
						mode='date'
					/>
					</View>
					<View style={styles.item}>
					<Icon name='md-alarm' style={{color:"#6200ee",marginLeft:5}} size={22}/>
					<TouchableOpacity onPress={this.showTimePicker} style={{marginLeft:5}}>
						<Text>{this.state.chosenTime}</Text>
					</TouchableOpacity>
					<DateTimePicker
					isVisible={this.state.timeVisible}
					onConfirm={this.handleTimePicked}
					onCancel={this.hideTimePicker}
					mode='time'
					is24Hour={false}
				/>
				</View>
				</View>	
				<Button mode="contained" onPress={this.postRequest} style={styles.button}>Schedule</Button>
				</View>
			</KeyboardAwareScrollView>
		 )
	  }
	}
export default  ShowCompleteCard;
const styles=StyleSheet.create({
  main:{
	flex:1,
  flexDirection:"column",
  justifyContent:'center',
  alignItems:'center',
	},
	details:{
	 flexDirection:"row",
	 marginTop:10,
	 alignItems:'center',
	 justifyContent:'center'
	},
	details1:{
		height:120,
		marginTop:35,
		borderColor:"#6200ee",
		width:'90%',
		borderWidth:2,
		borderRadius:4,
		alignItems:'center',
	},
	picker:{
		flexDirection:"row",
		marginTop:35,
	  alignItems:'center',
		justifyContent:'space-between',
		width:'90%'
	},
	button:{
		marginTop:35,
		width:'40%'
	 },
	 item:{
		flexDirection:"row",
	  alignItems:'center',
		justifyContent:'center',
		marginLeft:0
	 }
})