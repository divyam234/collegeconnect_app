import  React from 'react';
import {View,StyleSheet,ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native'
import Headerform  from './Customheader'
import {createStackNavigator} from 'react-navigation';
import {Text,Button,Checkbox,Divider,IconButton,Chip,RadioButton } from 'react-native-paper';
import { DocumentPicker } from 'expo';
import uuid from 'uuid/v4'
import Modal from 'react-native-modal';
import dept from '../../constants/DeptMap'
import { handleUploadAttachment} from '../../services/auth'
import {connect} from 'react-redux'
import CustomSnackbar from '../shared/snackbar'

class Hostelselector extends React.PureComponent{
    state = {
        checked: false,
    };
     render(){
        const { checked } = this.state;
        const {add,remove,title} = this.props;
         return(
            <View style={styles.main}>
            <Text >{title}</Text>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => { 
                this.setState({ checked: !checked })
                 !checked ? add(title) : remove(title)
               }}
                color='#6200ee'
            />
            </View>
         )
     }
}
class Customselector extends React.Component{
 state={
     type:{show:false,value:''},
     hostel:{show:false},
     courses:{show:false,value:''},
     department:{show:true},
     year:{show:true},
 }
 hostellist=[]
 deptlist=[]
 year=[]
 initialise=()=>{
    this.hostellist=[]
    this.deptlist=[]
    this.year=[]
 }
 renderStudent=()=>{
     return(
        <View style={{flexDirection:'column'}}>
        <Button mode='outlined' style={{marginBottom:10}}
        onPress={() => {
        this.setState({hostel:{...this.state.hostel,...{show:!this.state.hostel.show}}})
       }}
        >Choose By Hostel</Button>
        {this.renderHostel()}
        <Button mode='outlined' style={{marginBottom:10}}
         onPress={() => { this.setState({courses:{show:!this.state.courses.show}}); }}
         >Choose By Courses</Button>
         {this.renderCourses()}
        </View>
     )
 }
 renderTeacher=()=>{
     return(
        <View style={{flexDirection:'column'}}>
            <Button mode='outlined' style={{marginBottom:10}}
            >Choose By Department</Button>
            {this.renderDepartment()}
        </View>
     )
 }
 renderDepartmentlist=()=>{
    const deptdata=Object.keys(dept).map((item,index)=>{
        return dept[item]
    })
    return(
        <View style={{flexDirection:'column'}}>
            <FlatList
             data={deptdata}
             renderItem={({ item }) => (
              <Hostelselector
               title={item}
               add={this.addDept}
               remove={this.removeDept}
              />
             )}
             keyExtractor={()=>uuid()}
           />
          </View>
    )
}
 renderDepartment=()=>{
    const {show} = this.state.department
    return(
       <React.Fragment>
       {show &&
           <View style={{flexDirection:'column'}}>
           {this.renderDepartmentlist()}
        </View>}
        </React.Fragment>
    )
}
 addHostel=(item)=>{
    let data=this.hostellist
    data.push(item)
   }
 removeHostel=(item)=>{
   let data=this.hostellist
   let index =data.indexOf(item);
   if (index > -1) {
    data.splice(index, 1);
    }
   }
   addDept=(item)=>{
    let data=this.deptlist
    data.push(item)
   }
  removeDept=(item)=>{
   let data=this.deptlist
   let index =data.indexOf(item);
   if (index > -1) {
    data.splice(index, 1);
    }
   }
    addYear=(item)=>{
    let data=this.year
    data.push(item)
   }
 removeYear=(item)=>{
   let data=this.year
   let index =data.indexOf(item);
   if (index > -1) {
    data.splice(index, 1);
    }
   }
uniq = a => [...new Set(a)];
componentWillUnmount(){
 const sel={type:this.state.type,hostel:{...this.state.hostel,...{list:this.uniq(this.hostellist)}},
         dept:{...this.state.department,...{list:this.uniq(this.deptlist)}},
         courses:this.state.courses,year:{...this.state.year,...{list:this.uniq(this.year)}}
  } 
  this.props.setData(sel)
}
 renderHostel=()=>{
    const {show} = this.state.hostel
    hosteldata=['Tilak','Tandon','Malviya','Raman','SVBH','Tagore','KNGH','SNGH','Patel','PG']
     return(
        <React.Fragment>
        {show &&
        <View style={{flexDirection:'column'}}>
           <FlatList
            data={hosteldata}
            renderItem={({ item }) => (
             <Hostelselector
              title={item}
              add={this.addHostel}
              remove={this.removeHostel}
             />
            )}
            keyExtractor={()=>uuid()}
          />
         </View>}
         </React.Fragment>
     )
 }
 renderCourses=()=>{
    const {value,show} = this.state.courses
    return(
       <React.Fragment>
       {show &&
           <View style={{flexDirection:'column'}}>
           <View style={styles.main}>
           <Text >BTech</Text>
           <RadioButton 
           value='btech'
           status={value==='btech'? 'checked' : 'unchecked'}
           onPress={() => { this.setState({courses:{...this.state.courses,...{value:'btech'}}}); 
           this.initialise()}}
           color='#6200ee'
          />
          </View>
          <View style={styles.main}>
          <Text >MTech</Text>
          <RadioButton 
          value='mtech'
          status={value==='mtech'? 'checked' : 'unchecked'}
          onPress={() => { this.setState({courses:{...this.state.courses,...{value:'mtech'}}});
          this.initialise()
          }}
          color='#6200ee'
         />
         </View>
         <View style={styles.main}>
         <Text >MBA</Text>
         <RadioButton 
         value='mba'
         status={value==='mba'? 'checked' : 'unchecked'}
         onPress={() => { this.setState({courses:{...this.state.courses,...{value:'mba'}}});
         this.initialise() }}
         color='#6200ee'
        />
        </View>
        <View style={styles.main}>
        <Text >MCA</Text>
        <RadioButton 
        value='mca'
        status={value==='mca'? 'checked' : 'unchecked'}
        onPress={() => { this.setState({courses:{...this.state.courses,...{value:'mca'}}});
        this.initialise() }}
        color='#6200ee'
       />
        </View>
        {this.renderCourseContent()}
        </View>}
        </React.Fragment>
    )
 }
 renderCourseContent=()=>{
    const {value} = this.state.courses
    const {show} = this.state.department
    const btechdata=Object.keys(dept).map((item,index)=>{
        return dept[item]
    })
    const mtechdata=[...btechdata,'GIS Cell']
    const yeardata=['First','Second','Third','Final']
    const content=()=>{
    if(value==='btech'){
        return(
            <View style={{flexDirection:'column'}}>
            <FlatList
             data={btechdata}
             renderItem={({ item }) => (
              <Hostelselector
               title={item}
               add={this.addDept}
               remove={this.removeDept}
              />
             )}
             keyExtractor={()=>uuid()}
           />
          </View>
          
        )
    }
    if(value==='mtech'){
        return(
            <View style={{flexDirection:'column'}}>
            <FlatList
             data={mtechdata}
             renderItem={({ item }) => (
              <Hostelselector
               title={item}
               add={this.addDept}
               remove={this.removeDept}
              />
             )}
             keyExtractor={()=>uuid()}
           />
          </View>
        )
    }
} 
const contenty=()=>{
    if(value==='btech'){
        return(
            <View style={{flexDirection:'column'}}>
            <FlatList
             data={yeardata}
             renderItem={({ item }) => (
              <Hostelselector
               title={item}
               add={this.addYear}
               remove={this.removeYear}
              />
             )}
             keyExtractor={()=>uuid()}
           />
          </View>
          
        )
    }
    if(value==='mca'){
        return (
            <View style={{flexDirection:'column'}}>
            <FlatList
             data={yeardata.slice(0, -2)}
             renderItem={({ item }) => (
              <Hostelselector
               title={item}
               add={this.addYear}
               remove={this.removeYear}
              />
             )}
             keyExtractor={()=>uuid()}
           />
          </View>
         )
        }
    if(value==='mba'){
    return (
        <View style={{flexDirection:'column'}}>
        <FlatList
         data={yeardata.slice(0, -2)}
         renderItem={({ item }) => (
          <Hostelselector
           title={item}
           add={this.addYear}
           remove={this.removeYear}
          />
         )}
         keyExtractor={()=>uuid()}
       />
      </View>
    )
    }
    if(value==='mtech'){
        return(
            <View style={{flexDirection:'column'}}>
            <FlatList
             data={yeardata}
             renderItem={({ item }) => (
              <Hostelselector
               title={item}
               add={this.addYear}
               remove={this.removeYear}
              />
             )}
             keyExtractor={()=>uuid()}
           />
          </View>
        )
    }
}
 return(
    <View style={{flexDirection:'column'}}>
       <React.Fragment>
      { (value==='btech' || value==='mtech') && <Button mode='outlined' style={{marginBottom:10}}
       >Choose By Department</Button>}
       {show &&  content()}
       {value && <Button mode='outlined' style={{marginBottom:10}}
        >Choose Year</Button>}
        { this.state.year.show &&  contenty()}
      </React.Fragment>
    </View>
  )
}
 render(){
    const {value,show} = this.state.type;
     return(
        <ScrollView contentContainerStyle={{'width':'100%'}}>
         <View style={{flexDirection:'column'}}>
         <Button mode='outlined' onPress={()=>{this.setState({type:{...this.state.type,...{show:!show}}})}}>Choose Type</Button>
         {show &&
         <View style={{flexDirection:'column'}}>
         <View style={styles.main}>
         <Text >Teacher</Text>
         <RadioButton 
          value='teacher'
          status={value==='teacher'? 'checked' : 'unchecked'}
          onPress={() => { this.setState({type:{...this.state.type,...{value:'teacher'}}});
          this.initialise() }}
          color='#6200ee'
         />
        </View>
         <View style={styles.main}>
         <Text >Student</Text>
         <RadioButton 
          value='student'
          status={value==='student'? 'checked' : 'unchecked'}
          onPress={() => { this.setState({type:{...this.state.type,...{value:'student'}}});
          this.initialise() }}
          color='#6200ee'
         />
        </View>
      </View>}
        {value==='student' &&
        <React.Fragment>
        {this.renderStudent()}
        </React.Fragment>
     }
        {value==='teacher' && 
        <React.Fragment>
        {this.renderTeacher()}
        </React.Fragment>
      }
      </View>
      </ScrollView>
     )
 }
}

class TeacherNotice extends React.Component{
    
    state={
        filearray:[],
        subject:'',
        noticeMessage:'',
        visibleModal:false,
        activeSections: [],
        seldata:{}
    }
    snackFun=null
    componentDidMount(){
        this.props.navigation.setParams({'pickdoc':this.pickFromDocument})
        this.props.navigation.setParams({'submitData':this.submitData})
    }
    static navigationOptions = props => {
        return{
           header: (<Headerform {...props} title='Notice Manager' screen='create'/>)
    }}

    showModal=()=>{
        this.setState({visibleModal:true })
       }
    hideModal=()=>{
        this.setState({visibleModal:false })
    }
    setData=(data)=>{
    this.state.seldata=data
    }
      
    pickFromDocument=async ()=> {
        try{
            const result = await DocumentPicker.getDocumentAsync({});
            if (!result.cancelled && result.type !== 'cancel' ) {
            this.setState({filearray:[...this.state.filearray,result]},()=>{
            console.log(this.state.filearray)          
            })
            }
        }
        catch(e){
            console.log(e)
        }
      }
    bytesToSize=(bytes)=> {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i),2) + ' ' + sizes[i];
    };
   renderPicklist=()=>{
    let list= this.state.filearray
    if(list.length===0)
    return null
    else{
      return list.map((item,index)=>{
         return(
            <View key={uuid()} style={{backgroundColor:'#eeeeee',width:'90%',marginTop:10,flexDirection:'row',marginLeft:'5%',justifyContent:'space-around'}}>
            <View style={{padding:10,flexDirection:'column',width:'70%'}}>
            <Text>{item.name}</Text>
            <Text style={{'fontSize':12}}>{this.bytesToSize(item.size)}</Text>
            </View>
            <IconButton
               icon="close"
               size={20}
               onPress={() =>this.removeItemfromlist(item.name)}
           />
           </View>
         )
      })
     }
   }
  removeItemfromlist=(name)=>{
     let data=this.state.filearray.filter(item=>item.name!==name)
     this.setState({filearray:data})
  }
   renderModalContent = () => (
    <View style={styles.modalContent}>
    <Customselector setData={this.setData}  />
    <Button mode='contained' style={{marginTop:20}} onPress={()=>{  
        this.hideModal()
      }}>Ok</Button>
    </View>
    );
    
    submitData=async ()=>{
        let body={files:this.state.filearray,main:
            {'professorId':this.props.professorId.split('@')[0],'subject':this.state.subject,'composedMessage':this.state.noticeMessage},
             to:this.state.seldata
         }
        console.log(body)
        await handleUploadAttachment(body,'professor/handlenotice')
        this.snackFun.show()
    }
    render(){
		return(
            <View style={styles.containerMain}>
            <ScrollView>
                <View style={styles.main2}>
                    <View style={styles.firstRow}>
                        <View style={{'padding':8,'marginLeft':10}}>
                        <Text style={styles.textStyle}>
                            From 
                        </Text>
                        </View>
                        <TouchableOpacity style={{'padding':8}}>
                            <Text style={{'fontSize':18}}>
                                {this.props.professorName}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Divider style={styles.divider}/>
                    <View style={styles.firstRow}>
                        <View style={{'padding':8,'marginLeft':10}}>
                        <TouchableOpacity onPress={this.showModal}>
                        <Text style={styles.textStyle}>
                            To 
                        </Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.chipStyle}>
                        </View>
                    </View>
                    <Divider style={styles.divider}/>
                    <View style={[styles.firstRow,{'padding':8}]}>
                        <TextInput
                        style={{'flex':1,'fontSize':20,'marginLeft':10,fontFamily:'open-sans-reg'}}
                        placeholder = "Subject"
                        placeholderTextColor = "gray"
                        autoCapitalize = "none"
                        value={this.state.subject}
                        onChangeText={text=>this.setState({subject:text})}/>
                    </View>
                    <Divider style={styles.divider}/>
                    <View style={{'padding':8}}>
                    <TextInput
                        onChangeText={this.state.noticeMessage}
                        multiline={true}
                        style={{'flex':1,'fontSize':20,'marginLeft':10,fontFamily:'open-sans-reg'}}
                        placeholder='Compose Notice'
                        placeholderTextColor='gray'
                        underlineColorAndroid='transparent'
                        onChangeText={text=>this.setState({noticeMessage:text})}
                        value={this.state.noticeMessage}
                    />
                    </View>
                   {this.renderPicklist()}
                   <Modal isVisible={this.state.visibleModal}
                        onBackButtonPress={this.hideModal}
                        animationIn={'slideInLeft'}
                        animationOut={'slideOutRight'}
                        style={{'width':'100%',marginLeft:0}}>
                        {this.renderModalContent()}
                    </Modal>
                </View>
            </ScrollView>
          <View styles={styles.bottomView}>
          <CustomSnackbar snack={t=>this.snackFun=t} title={'Notice Submitted'}></CustomSnackbar>
          </View>
          </View>
        )
    }
}
const mapstatetoProps=(state)=>{
    return{
    professorId:state.auth.id,
    professorName:state.teacher.profileDetails['name']
   }  
  }
const TeacherNotice1= connect(mapstatetoProps,null)(TeacherNotice);
export default TeacherNotice1;

const styles=StyleSheet.create({
    main2:{
        flex:1,
        flexDirection:'column',
        marginTop:10
    },
    firstRow:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:10
    },
    textStyle:{
        fontSize:20,
        color:'gray'
    },
    surface: {
        padding:8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        marginBottom:2,
        marginLeft:5
      },
    divider:{
        backgroundColor:'gray',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    chipStyle:{
        padding:8,
        flexDirection:'row',
        flexWrap:'wrap',
        width:'90%',
        justifyContent:'flex-start',
        alignContent:'flex-start',
        alignItems:'flex-start',
    },
    chip:{
        padding:2,
        margin:3
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
    fontSize: 16,
    },
    content: {
    padding: 20,
    backgroundColor: '#fff',
    height:200,
    marginTop: 10,
    },
    main:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems: 'center',
    },
    main1:{
    flex:1,
    flexDirection:"column",
    justifyContent:'space-between',
    alignItems: 'center',
    },
    containerMain: {
        flex: 1,
        flexDirection:'column',
      },
      bottomView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        bottom: 0,
      },
 })