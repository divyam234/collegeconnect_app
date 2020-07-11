import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Card,Title,Surface} from 'react-native-paper';
import moment from 'moment'
const RequestCard = ({requestText,date,toName}) => {
	return (
		<Surface style={styles.card}>
		<Card>
			<Card.Content>
				<View style={styles.toprow}>
					<Title style={{'fontSize':17,fontWeight:"bold",'width':'70%'}}>{requestText}</Title>
					{<Title style={[styles.textStyle,{'width':'30%','marginLeft':15}]}>{moment(date).format("MMMM Do, YYYY")}</Title>}
				</View>
				<View style={styles.lastrow}>
					<Title style={styles.textStyle}>Sent To:</Title>
					<Title style={[{'fontSize':16,'marginLeft':3,'fontWeight':'bold'}]}>{toName}</Title>
				</View>
			</Card.Content>
			<Card.Actions style={{'marginTop':20}}>
			<Button style={styles.butt} mode="contained" icon="arrow-forward" >View</Button>
			</Card.Actions>
		</Card>
		</Surface>
	)
};
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
	butt:{
	'position':'absolute',
	bottom:10,
	right:10
	}
})
export default RequestCard