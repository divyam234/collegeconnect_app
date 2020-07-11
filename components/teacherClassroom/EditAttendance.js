import React,{PureComponent } from 'react'
import {View,FlatList,StyleSheet } from "react-native";
import { Button,withTheme,Text} from 'react-native-paper';
import Headerform  from './Customheader'
import {connect} from 'react-redux'
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import AttendancelistComp from './AttendancelistComp'

class EditAttendace extends PureComponent {
      state = {
         selStudents:[]
      };

     static navigationOptions = props => {
        return{
           header: (<Headerform {...props} title='Edit Attendace'/>)
    }}
    addStudent=(item)=>{
     let data=this.state.selStudents
     data.push(item)
     this.setState({selStudents:data});
    }
    removeStudent=(item)=>{
    let data=this.state.selStudents
    let index =data.indexOf(item);
    if (index > -1) {
      data.splice(index, 1);
     this.setState({selStudents:data});
     }
    }
    submitAttendance=async ()=>{
      /*let absentDate=moment().utcOffset("+05:30").format("YYYY-MM-DD")
      let regList=this.state.selStudents
      let classcode=this.props.navigation.getParam('classCode')
      let semester=this.props.navigation.getParam('semester')
      let batchId=this.props.navigation.getParam('batchId')
      let professorId=this.props.navigation.getParam('professorId').split('@')[0]*/
      console.log(this.state.selStudents)
    }
    async componentDidMount() {

      this.setState({data:[...this.props.list].sort(this.compare)})
    }
    compare=(a,b) =>{
      const nameA= a['student.name'].toUpperCase();
      const nameB = b['student.name'].toUpperCase();
      let comp = 0;
      if (nameA > nameB) {
        comp = 1;
      }
      else if (nameA < nameB) {
        comp = -1;
      }
      return comp;
     }

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: "#CED0CE",
          }}
        />
      );
    };

    render() {
      let {list}=this.props
      list=[...list].sort(this.compare)
      return (
          <View style={styles.main}>
          {list.length===0 && <View style={styles.empty}><Text style={styles.text}> All Students Were Present</Text>
          <Text style={styles.text}> Nothing To Edit Here </Text></View>}
          {list.length>0 &&
           <React.Fragment>
           <FlatList
            data={list}
            renderItem={({ item }) => (
              <AttendancelistComp
                name={item['student.name']}
                regNo={item.regNo}
                add={this.addStudent}
                remove={this.removeStudent}
                mode={'A'}
              />
            )}
            keyExtractor={item => item.regNo}
            ItemSeparatorComponent={this.renderSeparator}
          />
        <Button mode="contained" style={styles.butt} onPress={this.submitAttendance}>Submit</Button>
        </React.Fragment>
        }
        </View>
      );
    }
  }
  const mapStateToProps=(state)=>{
    return{
      list:state.teacher.absenteeslist.list
    }
 }
 export default connect(mapStateToProps,null)(withTheme(EditAttendace));
 const styles = StyleSheet.create({
    main:{
        height:'90%',
        marginTop:'10%',
    },
    butt:{
    marginTop:'10%',
    width:'50%',
    marginLeft:'25%'
    },
    text:{
    fontSize:20,
    marginTop:10,
   },
   empty:{
    marginTop:'50%',
    marginLeft:'15%',
    width:'80%'
   }
  });