import React from 'react'
import { View, Platform,ScrollView, StyleSheet ,TouchableHighlight} from 'react-native';
import { createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import {
  Colors,
  Appbar,
  withTheme,
  Searchbar,
  List,
  Divider,
  TouchableRipple,
  ActivityIndicator
} from 'react-native-paper';
import Teacherprofile from './Teacherprofile'


class Stafflist extends React.Component{
  static title = 'Appbar';
  static navigationOptions = ({ navigation }) => {
     return {
      header: (
        <Appbar.Header>
         <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title="Professor List"
          />
         <Appbar.Action icon="more-vert" onPress={() => {}} />
        </Appbar.Header>
      ),
    };
  };
  state={
    firstQuery:'' ,
    deanList:[
      {'title':'AcademicAffairs'},
      {'title':'Faculty Welfare'},
      {'title':'Planning and Development'},
      {'title':'Research and Consultancy'},
      {'title':"Resource Generation and International Affairs"}
    ],
    deptList:[
      {'title':'Applied Mechanics'},
      {'title':'Biotechnology'},
      {'title':'Chemical Engineering'},
      {'title':'Civil Engineering'},
      {'title':'Computer Science & Engineering'},
      {'title':'Electrical Engineering'},
      {'title':'Electronics & Communication Engineering'},
      {'title':'Mechanical Engineering'}
    ] 
  }
  handleCheck(title){
    console.log('this is:', title);
    this.props.navigation.navigate('Teacherprofile',{
      deptName:title
    });
  }
  searchFilterFunction(text){

  }
  render(){

      return(
          <ScrollView style={styles.container}>
          <Searchbar
          placeholder="Search"
          onChangeText={text => this.searchFilterFunction(text)}
          value={this.state.firstQuery}
          style={styles.searchbar}
          />
          <List.Section title="Choose from options below">
          <List.Accordion
            left={props => <List.Icon {...props} icon="folder" />}
            title="Director"
          >
          </List.Accordion>
          <Divider style={styles.dividerStyle}/>
          <List.Accordion
            left={props => <List.Icon {...props} icon="folder" />}
            title="Deans"
          >
            { this.state.deanList.map(dean=>
            <TouchableHighlight key={dean.title}>
            <List.Item  title={dean.title} onPress={()=>this.handleCheck(dean.title)}/>
            </TouchableHighlight>
            )}
          </List.Accordion>
           <Divider style={styles.dividerStyle}/>
          <List.Accordion
            left={props => <List.Icon {...props} icon="folder" />}
            title="Head of Departments"
          >
            <List.Item title="Applied Mechanics" />
            <List.Item title="Biotechnology" />
            <List.Item title="Chemical Engineering" />
            <List.Item title="Chemistry" />
            <List.Item title="Civil Engineering" />
            <List.Item title="Computer Science & Engineering" />
            <List.Item title="Electrical Engineering" />
            <List.Item title="Electronics & Communication Engineering" />
            <List.Item title="Humanities & Social Science"/>
            <List.Item title="Mathematics" />
            <List.Item title="Mechanical Engineering" />
            <List.Item title="Physics" />
            <List.Icon title="School of Management Studies"/>
          </List.Accordion>
          <Divider style={styles.dividerStyle}/>
          <List.Accordion
            left={props => <List.Icon {...props} icon="folder" />}
            title="Departments"
            expanded={this.state.expanded}
            onPress={this._handlePress}
          >
                <List.Accordion
                left={props => <List.Icon {...props} icon="folder" />}
                title="Engineering"
                expanded={this.state.expanded}
                onPress={this._handlePress}
                style={styles.sectionStyle}
                >
                    { this.state.deptList.map(dept=>
                    <TouchableHighlight key={dept.title}>
                    <List.Item  title={dept.title} onPress={()=>this.handleCheck(dept.title)}/>
                    </TouchableHighlight>
                    )}
                </List.Accordion>
                 <Divider style={styles.dividerStyle}/>
                <List.Accordion
                left={props => <List.Icon {...props} icon="folder" />}
                title="Sciences"
                expanded={this.state.expanded}
                onPress={this._handlePress}
                style={styles.sectionStyle}
                >
                    <List.Item title="Chemistry" />
                    <List.Item title="Mathematics" />
                    <List.Item title="Physics" />
                </List.Accordion>
                <Divider style={styles.dividerStyle}/>
                <List.Accordion
                left={props => <List.Icon {...props} icon="folder" />}
                title="School of Management Studies"
                expanded={this.state.expanded}
                onPress={this._handlePress}
                style={styles.sectionStyle}
                >
                </List.Accordion>
                <Divider style={styles.dividerStyle}/>
                <List.Accordion
                left={props => <List.Icon {...props} icon="folder" />}
                title="Humanities & Social Science"
                expanded={this.state.expanded}
                onPress={this._handlePress}
                style={styles.sectionStyle}
                >
                </List.Accordion>
                <Divider style={styles.dividerStyle}/>
            <List.Item title="" />
          </List.Accordion>
           <Divider style={styles.dividerStyle}/>
        </List.Section>
         </ScrollView>
      )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.grey200,
    },
    searchbar: {
      margin: 4,
    },
    sectionStyle:{
      marginLeft:20,
    },
    dividerStyle:{
    },
  });
export default  createStackNavigator(
  {
    Stafflist:{screen:Stafflist},
    Teacherprofile:{screen:Teacherprofile}
  },
  {
  defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#6200ee',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
