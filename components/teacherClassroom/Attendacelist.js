import React,{PureComponent } from 'react'
import { View,FlatList,StyleSheet } from "react-native";
import { Button,withTheme,Searchbar ,Text,Checkbox, ActivityIndicator} from 'react-native-paper';
import Headerform  from './Customheader'
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'; 
import {loadattendance} from '../../actions/index'
import moment from 'moment'
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import AttendancelistComp from './AttendancelistComp'
 class Attendancelist extends PureComponent {
      state = {
         data: [],
         refreshing: false,
         selStudents:[]
      };
      i=0
      static navigationOptions = props => {
        let date=moment().utcOffset("+05:30").format("dddd, MMMM Do")
        return{
           header: (<Headerform {...props} title={date}/>)
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
      let absentDate=moment().utcOffset("+05:30").format("YYYY-MM-DD")
      let regList=this.state.selStudents
      let classcode=this.props.navigation.getParam('classCode')
      let semester=this.props.navigation.getParam('semester')
      let batchId=this.props.navigation.getParam('batchId')
      let professorId=this.props.navigation.getParam('professorId').split('@')[0]
      let data=await sendPostRequestToServer1({absentDate,regList,classcode,semester,professorId,batchId,message:'scheduled'},'professor/addattendance')
      this.props.navigation.goBack();
    }
    async componentDidMount() {
      let {loadattendance,navigation}=this.props
      await loadattendance(navigation.getParam('batchId'));
      this.setState({data:[...this.props.list].sort(this.compare)})
    }
    compare=(a,b) =>{
      const nameA= a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      let comp = 0;
      if (nameA > nameB) {
        comp = 1;
      }
      else if (nameA < nameB) {
        comp = -1;
      }
      return comp;
     }
    componentDidUpdate(){
      console.log('Updated')
      console.log(this.i++)
    }
    handleRefresh = () => {
      this.setState({ refreshing: true},
        async () => {
         await this.props.loadattendance(this.props.navigation.getParam('batchId'));
         this.setState({data:this.props.list,refreshing:false,selStudents:[]})
        }
      );
    };
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
    searchFilterFunction = text => {    
        const newData = this.props.list.filter(item => {      
        const itemData = `${item.name.toUpperCase()}   
        ${item.regNo.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;    
       });    
        this.setState({ data:newData });  
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
           { !loading &&
           <React.Fragment>
            {this.renderSearchbar()}
           <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <AttendancelistComp
                name={item.name}
                regNo={item.regNo}
                add={this.addStudent}
                remove={this.removeStudent}
                mode={'P'}
              />
            )}
            keyExtractor={item => item.regNo}
            ItemSeparatorComponent={this.renderSeparator}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
          />
          <Button mode="contained" onPress={this.submitAttendance}>Submit</Button>
          </React.Fragment>
         }
        </View>
      );
    }
  }
  const mapStateToProps=(state)=>{
    return{
      loading:state.teacher.attendancelist.loading,
      list:state.teacher.attendancelist.list,
    }
 }
 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
    loadattendance
   }, dispatch);
 }
 export default connect(mapStateToProps,mapDispatchToProps)(withTheme(Attendancelist));