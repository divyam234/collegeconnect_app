import React from 'react';
import {View,FlatList} from 'react-native';
import SendRequestCard from './SendRequestCard'
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import uuidv4 from 'uuid/v4'
import {connect} from 'react-redux'
class SendRequests extends React.Component {
	 static navigationOptions = props => ({
        header: null
   })
	 state={
		requestList:[],
		refreshing: false,
	}
	componentDidMount(){
		this.fetchData()
	 }
	fetchData= async()=> {
		let regNo=this.props.regNo
		if(this.props.navigation.state.routeName==='Pending'){
			let requests=await sendPostRequestToServer1({regNo:regNo,status:'open'},'student/fetchreq')
		    this.setState({requestList:requests});
		}
		if(this.props.navigation.state.routeName==='Rejected'){
			let requests=await sendPostRequestToServer1({regNo:regNo,status:'rejected'},'student/fetchreq')
		    this.setState({requestList:requests});
		}
		if(this.props.navigation.state.routeName==='Scheduled'){
			let requests=await sendPostRequestToServer1({regNo:regNo,status:'accepted'},'student/fetchreq')
		    this.setState({requestList:requests});
		}
	}
	 handleRefresh = () => {
		this.setState({refreshing: true});
		this.fetchData().then(() => {
		  this.setState({refreshing: false});
		});
	 }
	render(){
		return(
			<View style={{flex:1,marginTop:10}}>
	    <FlatList
			 data={this.state.requestList}
			 renderItem={({ item }) => (
				 <SendRequestCard 
					 requestText={item.message}
					 date={item.date.split('T')[0]}
					 toName={item.professorName}
					 {...this.props}
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
		regNo:state.auth.id
	}
}
export default connect(mapStateToProps,null)(SendRequests);
