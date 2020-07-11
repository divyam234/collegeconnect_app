import React,{PureComponent} from 'react'
import { View,FlatList ,StyleSheet} from "react-native";
import {Button, Card, Title,Searchbar,ActivityIndicator,Surface } from 'react-native-paper';
import Headerform  from '../teacherClassroom/Customheader' 
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'; 
import {loadstudentcourses} from '../../actions/index'
import uuidv4 from'uuid/v4'
const AttendanceCard = (props) => {
    return (
      <Surface style={styles.card}>
      <Card>
        <Card.Content>
          <View style={{'flexDirection':'row','justifyContent':'space-between','flex':1}}>
            <Title style={{'fontSize':17,fontWeight:"bold",'width':'60%'}}>{props.classTitle}</Title>
            {/*<Title style={[styles.textStyle,{'width':'40%','marginLeft':25}]}>Total classes scheduled: 30</Title>*/}
          </View>
          <Title style={styles.textStyle}>{props.classCode} </Title>
          <Title style={styles.textStyle}>{props.batchId} </Title>
          <View style={{'flexDirection':'row','alignItems':'center','justifyContent':'flex-start'}}>
            <Title style={styles.textStyle}>Taken by:</Title>
            <Title style={[{'fontSize':16,'marginLeft':3,'fontWeight':'bold'}]}>{props.name}</Title>
          </View>
          
        </Card.Content>
        <Card.Actions style={{'marginTop':20}}>
        <Button style={{'position':'absolute',bottom:10,right:10}} mode="contained" icon="arrow-forward" 
        onPress={()=>{props.navigation.navigate('AttendanceTable',{'classTitle':props.classTitle,
        'batchId':props.batchId,'regNo':props.regNo,'professorId':props.professorId,'classcode':props.classCode})}}>View</Button>
        </Card.Actions>
      </Card>
      </Surface>
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
     let {loadstudentcourses,batchId}=this.props
     await loadstudentcourses(batchId);
     this.setState({data:this.props.list})
  }
  
  handleRefresh = () => {
    this.setState({ refreshing: true},
      async () => {
       await this.props.loadstudentcourses(this.props.batchId);
       this.setState({data:this.props.list,refreshing:false})
      }
    );
  };
 
   renderSeparator = () => {
    return (
      <View
        style={{
          height: 4,
          width: "90%",
          backgroundColor: "#ffffff",
        }}
      />
    );
  };
  searchFilterFunction = text => {    
    const newData = this.props.list.filter(item => {      
    const itemData = `${item.classcode.toUpperCase()}   
    ${item.classTitle.toUpperCase()} ${item.batchId.toUpperCase()} ${item['professor.name'].toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;    
     });    
      this.setState({ data: newData });  
    };
    renderSearchbar = () => {
    return <Searchbar style={{'marginBottom':20}} placeholder="Search..." onChangeText={text => this.searchFilterFunction(text)} />;
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
              regNo={this.props.regNo}
              name={item['professor.name']}
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
     loading:state.student.courselist.loading,
     list:state.student.courselist.list,
     batchId:state.student.profileDetails.batchid,
     regNo:state.auth.id
   }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadstudentcourses
  }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CourseList);

const styles=StyleSheet.create({
  text:{
   fontFamily:'open-sans-reg'
  },
  card:{
    elevation:4,
    marginLeft:'5%',
    width:'90%',
    marginBottom:10,
    marginTop:2
  },
  textStyle:{
    fontSize:15
  }
})