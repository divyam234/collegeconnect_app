import * as React from 'react';
import { StyleSheet} from 'react-native';
import { Snackbar,Text } from 'react-native-paper';
export default class CustomSnackbar extends React.Component {
  state = {
    visible: false,
  };
  
  showbar=()=>{
  this.setState({ visible: true })
  }
  hidebar=()=>{
    this.setState({ visible: false })
  }
  componentDidMount(){
   this.props.snack({
     show:()=>{this.showbar()},
     hide:()=>{this.hidebar()}
   })
  }
  componentWillUnmount(){
    this.props.snack(null)
  }
  render() {
    return (
        <Snackbar style={styles.snack}
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          duration={4000}
        >
         <Text style={{color:'white'}}>{this.props.title}</Text>
        </Snackbar>
    );
  }
}
const styles = StyleSheet.create({
  snack:{
    backgroundColor:'#6200ee'
  }
});