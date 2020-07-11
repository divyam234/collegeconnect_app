import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { createAppContainer,createStackNavigator} from 'react-navigation';
import Loading from 'react-native-loader-overlay';
import AlbumDetail from './AlbumDetail';
import loadingPara from '../constants/Getloadingpara';
import {bindActionCreators } from 'redux'; 
import {loadDept} from '../actions/index'
import {connect} from 'react-redux'
class Teacherprofile extends React.Component{
    state={deptName:''}
      async componentDidMount() {
      this.loading = Loading.show(loadingPara)
      let deptName =this.props.navigation.getParam('deptName', 'NO-dept');
      this.setState({deptName})
      this.props.loadDept(deptName)
      Loading.hide(this.loading)
    }
    renderList=()=>{
      const l=Object.keys(this.props.teacherList).length
      if(l!==0){
        console.log(this.props.teacherList)
        return this.props.teacherList[this.state.deptName].map(teacher=>
          <AlbumDetail key={teacher.name} teacher={teacher} />)
      }
      return null  
    }
    render(){
    return(
      <ScrollView>
      {this.renderList()}
      </ScrollView>
      )
    }
}
const mapStateToProps = (state) => {
  return {
   teacherList:state.student.deptlist
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  loadDept
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Teacherprofile)