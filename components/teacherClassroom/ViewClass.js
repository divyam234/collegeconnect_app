import React,{PureComponent} from 'react'
import { View,FlatList ,StyleSheet} from "react-native";
import {  Button, Card, Title,Searchbar,ActivityIndicator,IconButton } from 'react-native-paper';
import Headerform  from './Customheader' 
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'; 
import {loadcourses} from '../../actions/index'
import Menu, { MenuItem} from 'react-native-material-menu';
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import moment from 'moment'
import uuidv4 from'uuid/v4'
class ScheduledMenu extends React.Component {
  menu = null;
  setMenuRef = ref => {
  this.menu = ref;
  };
  
  hideMenu = () => {
 this.menu.hide();
 };

 showMenu = () => {
 this.menu.show();
};
 
  render() {
    return (
      <Menu
       ref={this.setMenuRef}
       button={<IconButton icon="more-vert" onPress={this.showMenu} color='black' />}
       >
       <MenuItem onPress={async ()=>{
        await this.props.markscheduleclass('scheduled')
        this.hideMenu()
      }} textStyle={styles.text}>Mark as Scheduled</MenuItem>
      <MenuItem onPress={async ()=>{
        await this.props.markscheduleclass('bunked')
        this.hideMenu()
      }} textStyle={styles.text}>Mark as Bunk</MenuItem>
      <MenuItem onPress={async ()=>{
        await this.props.markscheduleclass('bunked')
        await this.props.markAttendanceByBatchId()
        this.hideMenu()
      }} textStyle={styles.text}>Mark all absent</MenuItem>
     </Menu>
    );
  }
}

const AttendanceCard = (props) => {
  const markAttendanceByBatchId=async()=>{
   let absentDate=moment().utcOffset("+05:30").format("YYYY-MM-DD")
   let res= await sendPostRequestToServer1({absentDate,batchId:props.batchId,classcode:props.classCode},'professor/markattendance')
  }
  const markscheduleclass=async (message)=>{
  let scheduleDate=moment().utcOffset("+05:30").format("YYYY-MM-DD")
  let data=await sendPostRequestToServer1({scheduleDate,classcode:props.classCode,semester:props.semester,batchId:props.batchId,
      professorId:props.professorId.split('@')[0],message:message},'professor/scheduleclass')
}
 
  return (
    <Card>
      <Card.Content>
        <Title>{props.classTitle} </Title>
        <Title>{props.classCode} </Title>
        <Title>{props.batchId} </Title>
        <View style={{position:"absolute",top:5,right:5}}>
        <ScheduledMenu markscheduleclass={markscheduleclass} markAttendanceByBatchId={markAttendanceByBatchId} />
        </View>
        
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={()=>props.navigation.navigate('Attendancelist',{batchId:props.batchId,classCode:props.classCode,semester:props.semester,
          professorId:props.professorId
        })}>Take Attendance</Button>
        <Button mode="text" onPress={()=>props.navigation.navigate('ViewAttendance',{classCode:props.classCode,classTitle:props.classTitle,batchId:props.batchId
        })}>View Attendance</Button>
      </Card.Actions>
    </Card>
  )
};
class CourseList extends PureComponent {
      state = {
        data: [],
        refreshing: false
      };
      static navigationOptions = props => {
        return{
           header: (<Headerform {...props} title={'Current Classes'}/>)
    }}
    async componentDidMount() {
      let {loadcourses,professorId}=this.props
      await loadcourses(professorId.split('@')[0]);
      this.setState({data:this.props.list})
    }
    
    handleRefresh = () => {
      this.setState({ refreshing: true},
        async () => {
         await this.props.loadcourses(this.props.professorId.split('@')[0]);
         this.setState({data:this.props.list,refreshing:false})
        }
      );
    };
   
     renderSeparator = () => {
      return (
        <View
          style={{
            height: 4,
            width: "100%",
            backgroundColor: "#CED0CE",
          }}
        />
      );
    };
    searchFilterFunction = text => {    
      const newData = this.props.list.filter(item => {      
      const itemData = `${item.classcode.toUpperCase()}   
      ${item.classTitle.toUpperCase()} ${item.batchId.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;    
       });    
        this.setState({ data: newData });  
      };
      renderSearchbar = () => {
      return <Searchbar placeholder="Search..." onChangeText={text => this.searchFilterFunction(text)} />;
    };
  
    render() {
      let {loading}=this.props
      return (
          <View style={{flex:1}}>
           {loading && !this.state.refreshing && <ActivityIndicator animating={true} size='large' style=
           {{position: 'absolute', top:'50%', left: '50%', marginLeft: -25,marginTop: -25}} />} 
           {!loading && 
            <React.Fragment>
           {this.renderSearchbar()}
           <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <AttendanceCard 
                course={item.course}
                classTitle={item.classTitle}
                classCode={item.classcode}
                batchId={item.batchId}
                semester={item.semester}
                professorId={item.professorId}
                id={item.classcode}
                {...this.props}
              />
            )}
            keyExtractor={item => uuidv4()}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
           />
           </React.Fragment>}
          </View>
      );
    }
  }
  const mapStateToProps=(state)=>{
     return{
       loading:state.teacher.courselist.loading,
       list:state.teacher.courselist.list,
       professorId:state.auth.id
     }
  }
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    loadcourses
    }, dispatch);
  }
  export default connect(mapStateToProps,mapDispatchToProps)(CourseList);
  
  const styles=StyleSheet.create({
    text:{
     fontFamily:'open-sans-reg'
    }
  })