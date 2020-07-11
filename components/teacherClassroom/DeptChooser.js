import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View,StyleSheet,FlatList} from 'react-native'
import {Text,Checkbox,Surface,Button} from 'react-native-paper'
import Modal from 'react-native-modal';

const SECTIONS = [
  {
    title: 'B.Tech',
    content:[
      {'name':'CSA'},
      {'name':'CSB'},
      {'name':'IT'},
      {'name':'ECEA'},
      {'name':'ECEB'},
      {'name':'MEA'},
      {'name':'MEB'},
      {'name':'PIE'},
      {'name':'CHE'},
      {'name':'CE'},
      {'name':'BT'},
    ]
  },
  {
    title: 'M.Tech',
    content:[
      {'name':'CSA'},
      {'name':'CSB'},
      {'name':'IT'},
      {'name':'ECEA'},
      {'name':'ECEB'},
      {'name':'MEA'},
      {'name':'MEB'},
      {'name':'PIE'},
      {'name':'CHE'},
      {'name':'CE'},
      {'name':'BT'},
    ]
  }
];
class ListComp extends Component {
  state = {
      checked: false,
      visibleModal:false
 };
 showModal=()=>{
  this.setState({visibleModal:true })
 }
 hideModal=()=>{
   this.setState({visibleModal:false })
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
    <Button>Hello</Button>
    </View>
  );

 renderExtraContent=()=>{
     if(!this.state.checked)
     return null
     else{
       return(
        <Button mode="outlined" style={{'marginBottom':20,borderRadius:5,borderWidth:2,borderColor:'#6200ee'}} onPress={this.showModal}> Timing </Button>)
      }
 }
 render(){
  const { checked} = this.state;
  const {fun,name} = this.props;
  return(
    <View style={styles.main1}>
    <View style={styles.main}>
    <Text style={styles.left}>{name}</Text>
    <View style={styles.right}>
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => { this.setState({ checked: !checked },()=>{
         if(this.state.checked){
          fun.add(name)
         }
         if(!this.state.checked){
          fun.remove(name)
         }
      })}}
      color='#6200ee'
    />
    </View>
    </View>
    {this.renderExtraContent()}
    <Modal isVisible={this.state.visibleModal}
    onBackButtonPress={this.hideModal}
    animationIn={'slideInLeft'}
    animationOut={'slideOutRight'}>
    {this.renderModalContent()}
  </Modal>
    </View>
  )
 }
}
class AccordionView extends Component {
  state = {
    activeSections: [],
  }
  chosenItems={}
  componentDidMount(){
    const {setDeptData} = this.props;
    setDeptData(this.chosenItems)
  }
  addItems=(item)=>{
    const {activeSections} = this.state;
    const {setDeptData} = this.props;
    this.chosenItems[SECTIONS[activeSections].title]= this.chosenItems[SECTIONS[activeSections].title] || []
    this.chosenItems[SECTIONS[activeSections].title].push(item)
    setDeptData(this.chosenItems)
 }
   removeItems=(item)=>{
    const {activeSections} = this.state;
    const {setDeptData} = this.props;
    let index = this.chosenItems[SECTIONS[activeSections].title].indexOf(item);
    if (index > -1) {
    this.chosenItems[SECTIONS[activeSections].title].splice(index, 1);
    setDeptData(this.chosenItems)
    }
   }
  _renderHeader = section => {
    return (
      <Surface style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        </Surface>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
  _renderContent = section => {
    return (
      <View style={styles.content}>
      <FlatList
      data={section.content}
      renderItem={({ item }) => (
        <ListComp
          name={item.name}
          fun={{add:this.addItems,remove:this.removeItems}}
        />
      )}
      ItemSeparatorComponent={this.renderSeparator}
      keyExtractor={item => item.name}
      />
      </View>
    )
  }
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
 
  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        underlayColor={'#ffffff00'}
      />
    );
  }
}
export default AccordionView;
const styles = StyleSheet.create({
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
   main1:{
    flex:1,
    flexDirection:"column",
    justifyContent:'space-between',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});