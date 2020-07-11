import  React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View,FlatList} from 'react-native';
import ReceivedRequestCard from './ReceivedRequestCard'
import uuidv4 from 'uuid/v4'
import {connect} from 'react-redux'
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import Customheader  from '../teacherClassroom/Customheader'
import ShowCompleteCard from './ShowCompleteCard'
class ReceivedRequests extends React.Component {
	static navigationOptions = props => ({
		 header: (<Customheader {...props} title={'Requests List'}/>)
			
		})
	state={
		requestList:[],
		refreshing: false,
	}
	componentDidMount(){
		this.fetchData()
	 }
	fetchData= async()=> {
		let email=this.props.email
		let requests=await sendPostRequestToServer1({email:email,status:'open'},'professor/fetchreq')
	  this.setState({requestList:requests});
	}
	
	handleRefresh = () => {
		this.setState({refreshing: true});
		this.fetchData().then(() => {
		  this.setState({refreshing: false});
		});
	  }
	reqDelete=(index)=>{
		let temp=[...this.state.requestList]
		if (index !== -1) {
		temp.splice(index, 1)
		this.setState({requestList:temp});
		}
	}
	render(){
		return(
			<View style={{flex:1,marginTop:10}}>
	    <FlatList
			 data={this.state.requestList}
			 renderItem={({ item,index }) => (
				 <ReceivedRequestCard 
				 requestText={item.message}
				 date={item.date.split('T')[0]}
				 fromName={item.studentName}
				 requestId={item.requestId}
				 id={index}
				 delReq={this.reqDelete}
				 />
			 )}
			 keyExtractor={() => uuidv4()}
			 refreshing={this.state.refreshing}
			 onRefresh={this.handleRefresh}
			/>
		 </View>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		email:state.auth.id
	}
}
const ReceivedRequests1= connect(mapStateToProps,null)(ReceivedRequests);
const RequestStack= createStackNavigator(
	{
		ReceivedRequests:{screen:ReceivedRequests1},
		ShowCompleteCard:{screen:ShowCompleteCard}
	}
 )
 RequestStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
export default RequestStack