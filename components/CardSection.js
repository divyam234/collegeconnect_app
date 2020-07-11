import React from 'react';
import { View, Text } from 'react-native';

const CardSection=(props) =>{
	return(
		<View style={styles.containerStyle}>
		{props.children}
		</View>
	)
}
const styles={
	containerStyle:{
		 backgroundColor:'#fff',
		 padding:5,
		 borderBottomWidth:1,
		 justifyContent:'space-between',
		 flexDirection:'row',
		 borderColor:'#ddd',
		 position:'relative'
	}
}
export default CardSection;