import React, { Component,Fragment } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View,StyleSheet,ScrollView} from 'react-native'
import {Text,Surface,Button,ActivityIndicator} from 'react-native-paper';
import Headerform  from './Customheader' 
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'; 
import {loadscheduledclasses,loadabsentees} from '../../actions/index'
import moment from 'moment'

class Content extends Component{
  async componentDidMount(){
    let {data,loadabsentees}=this.props
    await loadabsentees(data)
  }
   render(){
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>
        {`No of Abseentes :${this.props.list.length}`}
        </Text>
        <Button style={styles.containerButton} onPress={()=>{this.props.navigation.navigate('EditAttendance')}} icon="edit" mode='outlined'>
            Edit
        </Button>
      </View>
    ) 
   }
}
const mapStateToProps1=(state)=>{
  return{
    list:state.teacher.absenteeslist.list,
  }
}
const mapDispatchToProps1 = (dispatch) => {
 return bindActionCreators({
loadabsentees
 }, dispatch);
}
const Content1=connect(mapStateToProps1,mapDispatchToProps1)(withNavigation(Content));
class ViewAttendance extends Component{
    state = {
        activeSections: [],
      }

      static navigationOptions = props => {
        return{
           header: (<Headerform {...props} title={props.navigation.getParam('classTitle')}/>)
    }}

       async  componentDidMount(){
        let {loadscheduledclasses,professorId,navigation}=this.props
        await loadscheduledclasses({batchId:navigation.getParam('batchId'),professorId:professorId.split('@')[0],
        classcode:navigation.getParam('classCode')
       })
     }
      _renderHeader = section => {
        return (
          <Surface style={styles.header}>
            <Text style={styles.headerText}>{moment(section.scheduleDate).format("dddd, Do MMMM YYYY ")}</Text>
          </Surface>
        );
      };
      
      _renderContent =(content, index, isActive, section) => {
          if(isActive){
            let {professorId,navigation}=this.props
            let absentDate=content.scheduleDate
            let batchId=navigation.getParam('batchId')
            let classcode=navigation.getParam('classCode')
            professorId=professorId.split('@')[0]
             return (
                <Content1 data={{batchId,classcode,professorId,absentDate}}/>
             )  
          }
         return null
      }
       
      _updateSections = activeSections => {
        this.setState({ activeSections });
      };
     
      render() {
        let {loading}=this.props
        return (
         <React.Fragment>
          {loading && <ActivityIndicator animating={true} size='large' style=
          {{position: 'absolute', top:'50%', left: '50%', marginLeft: -25,marginTop: -25}} />} 
          {!loading && 
           <ScrollView contentContainerStyle={{marginBottom:20}}>
            <Accordion
            sections={this.props.list}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
            containerStyle={styles.container}
            underlayColor={'#ffffff00'}
          /></ScrollView>}
          </React.Fragment>
        );
      }
}
const mapStateToProps=(state)=>{
    return{
      loading:state.teacher.scheduleDatelist.loading,
      list:state.teacher.scheduleDatelist.list,
      professorId:state.auth.id
    }
 }
 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
    loadscheduledclasses
   }, dispatch);
 }
export default connect(mapStateToProps,mapDispatchToProps)(ViewAttendance);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'80%',
    marginLeft:'10%'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  headerText: {
    textAlign: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    alignItems:'center',
  },
  contentText:{
      fontSize:15,
      flexDirection:'column',
  },
  main:{
    flex:1,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems: 'center',
  },
   left:{
    marginLeft:20,
    width:'70%'
   },
   right:{
   flex:1,
   justifyContent:'flex-end',
   marginRight:10,
   width:'30%',
   alignItems: 'center',
   },
   containerButton:{
    marginTop:20,
    borderColor:'#6200ee',
    borderWidth:2,
   }
});