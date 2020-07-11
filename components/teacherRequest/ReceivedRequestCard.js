import React from 'react';
import {Button,Card,Title,Surface} from 'react-native-paper';
import {StyleSheet,View,Alert} from 'react-native';
import { withNavigation } from 'react-navigation';
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer';
import moment from 'moment'

const ReceivedRequestCard = ({requestText,date,requestId,fromName,navigation,id,delReq}) =>{
	const deleteCard=async()=>{
		Alert.alert(
			'Are you sure you want to delete this request?',
			'',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{text: 'OK', onPress: async() =>{
					let reqStatus=await sendPostRequestToServer1({requestId},'professor/deletereq')
					if(reqStatus){
					delReq(id)
					}
				}},
			],
			{cancelable: false},
		);
		
		
	}
	const showCard=()=>{
		navigation.navigate('ShowCompleteCard',{requestText,fromName,requestId})
	}
	return(
		<Card>
		    <Surface style={styles.card}>
		  <Card>
			<Card.Content>
				<View style={styles.toprow}>
					<Title style={{'fontSize':17,fontWeight:"bold",'width':'70%'}}>{requestText}</Title>
					{<Title style={[styles.textStyle,{'width':'30%','marginLeft':15}]}>{moment(date).format("MMMM Do, YYYY")}</Title>}
				</View>
				<View style={styles.lastrow}>
					<Title style={styles.textStyle}>From:</Title>
					<Title style={[{'fontSize':16,'marginLeft':3,'fontWeight':'bold'}]}>{fromName}</Title>
				</View>
			</Card.Content>
			<Card.Actions style={{'marginTop':20}}>
			<View style={styles.toprow}>
			<Button  mode="contained" icon="cancel" onPress={() => deleteCard()}>Deny</Button>
			<Button  mode="contained" icon="access-time" onPress={() =>showCard()} >Schedule</Button>
		 </View>
			</Card.Actions>
		</Card>
		</Surface>
		</Card>
	)
}
const styles=StyleSheet.create({
  text:{
   fontFamily:'open-sans-reg'
  },
  card:{
    elevation:4,
    marginLeft:'5%',
    width:'90%',
    marginBottom:10,
    marginTop:5
  },
  textStyle:{
    fontSize:15
	},
	toprow:{
	'flexDirection':'row',
	'justifyContent':'space-between',
	'flex':1
	},
	lastrow:{
	'flexDirection':'row',
	'alignItems':'center',
	'justifyContent':'flex-start'
	},
})
export default withNavigation(ReceivedRequestCard)