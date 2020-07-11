import React,{PureComponent} from 'react';
import { DataTable,Text,ActivityIndicator} from 'react-native-paper';
import Headerform  from '../teacherClassroom/Customheader' 
import {sendPostRequestToServer1} from '../../services/sendPostRequestToServer'
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import {View,StyleSheet,ScrollView} from 'react-native'
class AttendaceTable extends PureComponent{
    state={
     data:{},
     loading:true
    }
    async componentDidMount(){
        let {navigation}=this.props
        let batchId=navigation.getParam('batchId')
        let classcode=navigation.getParam('classcode')
        let regNo=navigation.getParam('regNo')
        let professorId=navigation.getParam('professorId')
        let data=await sendPostRequestToServer1({batchId,classcode,regNo,professorId},'student/fetchabsent')
        this.setState({data:data,loading:false})
    }
    static navigationOptions = props => {
        return{
           header: (<Headerform {...props} title={props.navigation.getParam('classTitle')}/>)
    }}
    renderTableRow=()=>{
        let scheduledData=this.state.data.scheduledData
        let absentdata=this.state.data.absentData
        return scheduledData.map((item,index)=>{
          let status=this.checkStatus(absentdata,item.scheduleDate)
          let style={backgroundColor:'#ffffff'}
           if(status ==='Absent')
             style={backgroundColor:'#ffcdd2'}
             return(
               <View style={{flexDirection:'row'}} key={uuidv4()}>
                <DataTable.Row style={style} >
                <View style={{width:'40%'}}>
                <DataTable.Cell >{moment(item.scheduleDate).utcOffset("+05:30").format("MMMM Do, YYYY")}</DataTable.Cell>
                </View>
               <View style={{width:'30%',marginLeft:10}}>
                <DataTable.Cell>{status}</DataTable.Cell>
                </View>
                <View style={{width:'30%'}}>
                <DataTable.Cell>{item.message}</DataTable.Cell>
                </View>
              </DataTable.Row>
              </View>
             )
        })
      
    }
     checkStatus=(data,date)=>{
       let obj=data.find(item=> item.absentDate===date)
       if(obj)
       return 'Absent'
       return 'Present'
    }
    calPercentage=()=>{
        let l1=this.state.data.scheduledData.length
        let l2=this.state.data.absentData.length
        if(l2==0)
         l2=l1
        let per=((l2/l1)*100).toFixed(2)
        return per
    }
    renderStyle=(val)=>{
       if(val>=75)
       return {'color':'green'}
       if(val<75 && val>=50)
       return {'color':'orange'}
       if(val<50)
       return {'color':'red'}
    }
    renderPercent=()=>{
    let p=this.calPercentage()
     return(
      <View style={styles.text}>
      <Text style={{'fontSize':20}}>Attendance Percentage -</Text>
      <Text style={{...{'fontSize':20},...this.renderStyle(p)}}>{p}</Text>
    </View>
     )
    }
    render() {
        return (
          <React.Fragment>
          {this.state.loading && <ActivityIndicator animating={true} size='large' style={styles.indicator} />} 
          {! this.state.loading &&
          <React.Fragment>
          <View style={styles.text}>
          <Text style={{'fontSize':20}}>{`Total Classes - ${this.state.data.scheduledData.length}`}</Text>
          </View>
           {this.renderPercent()}
          <ScrollView>
          <DataTable>
          <View style={{flexDirection:'row'}}>
            <DataTable.Header>
            <View style={{width:'100%'}}>
              <DataTable.Title style={{marginLeft:'25%'}}><Text style={{'fontSize':16}}>{'Scheduled Class Dates'}</Text></DataTable.Title>
              </View>
            </DataTable.Header>
            </View>
            {this.renderTableRow()}
          </DataTable>
          </ScrollView>
          </React.Fragment>}
          </React.Fragment>
        );
      }
}
export default AttendaceTable;
const styles=StyleSheet.create({
   text:{
    'flexDirection':'row',
   'alignItems':'center',
   'justifyContent':'center',
    marginTop:'5%'
  },
  indicator:{
    position: 'absolute', 
    top:'50%', 
    left: '50%', 
    marginLeft: -25,
    marginTop: -25
  }
})