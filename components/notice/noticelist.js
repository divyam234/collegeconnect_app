import React,{PureComponent} from 'react'
import { View,FlatList ,StyleSheet} from "react-native";
import {Button, Card, Title,Searchbar,ActivityIndicator,Surface } from 'react-native-paper';
import Headerform  from './Customheader' 
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'; 
import {loadnoticedata} from '../../actions/index'
import uuidv4 from'uuid/v4'
import moment from 'moment'
import { FAB } from 'react-native-paper';
const AttendanceCard = (props) => {
    let item=props.item
    return (
      <Surface style={styles.card}>
      <Card>
        <Card.Content>
          <View style={{'flexDirection':'row','justifyContent':'space-between','flex':1}}>
            <Title style={{'fontSize':17,fontWeight:"bold",'width':'60%'}}>{item.notice.subject}</Title>
            {<Title style={[styles.textStyle,{'width':'40%','marginLeft':15}]}>{
                moment(item.notice.createdAt).utcOffset("+05:30").format("MMMM Do, YYYY")
                }</Title>}
          </View>
          <View style={{'flexDirection':'row','alignItems':'center','justifyContent':'flex-start'}}>
            <Title style={styles.textStyle}>From:</Title>
            <Title style={[{'fontSize':16,'marginLeft':3,'fontWeight':'bold'}]}>{item.notice.professor.name}</Title>
          </View>
          
        </Card.Content>
        <Card.Actions style={{'marginTop':20}}>
        <Button style={{'position':'absolute',bottom:10,right:10}} mode="contained" icon="arrow-forward" 
        onPress={() => props.navigation.navigate('NoticeView',{item})} >View</Button>
        </Card.Actions>
       </Card>
      </Surface>
    )
  };

  class NoticeList extends PureComponent {
    state = {
      data: [],
      refreshing: false
    };
    static navigationOptions = props => {
      return{
         header: (<Headerform {...props} title='Notice Manager' screen='main'/>)
  }}
  async componentDidMount() {
     let {loadnoticedata,dept,type}=this.props
     await loadnoticedata(type,{dept});
     this.setState({data:this.props.list})
  }
  
  handleRefresh = () => {
    this.setState({ refreshing: true},
      async () => {
        let {loadnoticedata,dept,type}=this.props
        await loadnoticedata(type,{dept});
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
    const itemData = `${item.notice.subject.toUpperCase()}`;
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
              item={item}
              {...this.props}
            />
          )}
          keyExtractor={item => uuidv4()}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
         />
         </React.Fragment>}
         <FAB
         style={styles.fab}
         icon="add"
         onPress={() => this.props.navigation.navigate('NoticeCreate')}
         color='#6200ee'
         />
        </View>
    );
  }
}
const mapStateToProps=(state)=>{
   return{
     loading:state.teacher.noticelist.loading,
     list:state.teacher.noticelist.list,
     dept:state.teacher.profileDetails['department.deptName'],
     email:state.auth.id,
     type:state.auth.type
   }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadnoticedata
  }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(NoticeList);

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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'white'
  }
})