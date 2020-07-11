
import  React from 'react';
import {View,StyleSheet,ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native'
import Headerform  from './Customheader'
import {Text,Button,Surface,Card,Divider,IconButton,Chip,RadioButton } from 'react-native-paper';
import uuid from 'uuid/v4'
import {WebBrowser} from 'expo'
class NoticeView extends React.Component{
    
    state={
    }
    static navigationOptions = props => {
        return{
           header: (<Headerform {...props} title='Notice Manager' screen='view'/>)
    }}

    bytesToSize=(bytes)=> {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i),2) + ' ' + sizes[i];
    };

    addAttachments = (list)=>{
        return list.map((item,index)=>{
            return(
                <View key={uuid()} style={{backgroundColor:'#eeeeee',width:'90%',marginTop:10,flexDirection:'row',marginLeft:'5%',justifyContent:'space-around'}}>
                <View style={{padding:10,flexDirection:'column',width:'70%'}}>
                <Text>{item.fileName}</Text>
                <Text style={{'fontSize':12}}>{this.bytesToSize(item.fileSize)}</Text>
                </View>
                <IconButton
                icon="file-download"
                size={20}
                onPress={() =>{
                 WebBrowser.openBrowserAsync(item.attachmentPath)
                }}
            />
            </View>
            )
        })
    }
    render(){
        const item=this.props.navigation.getParam('item')
		return(
            <ScrollView>
                <View style={styles.main2}>
                    <View style={styles.firstRow}>
                        <View style={{'padding':8,'marginLeft':10}}>
                        <Text style={styles.textStyle}>
                            From 
                        </Text>
                        </View>
                        <Surface style={styles.card}>
                            <Card>
                                <Card.Content>
                                <Text>
                                {item.notice.professor.name} 
                                  </Text>
                                </Card.Content>
                            </Card>
                        </Surface>
                    </View>
                    <Divider style={styles.divider}/>
                    <View style={styles.firstRow}>
                        <View style={{'padding':8,'marginLeft':10}}>
                        <Text style={styles.textStyle}>
                            Subject
                        </Text>
                        </View>
                        <Surface style={styles.card}>
                            <Card>
                                <Card.Content>
                                <Text>
                                {item.notice.subject}
                                </Text>
                                </Card.Content>
                            </Card>
                        </Surface>
                    </View>
                    <Divider style={styles.divider}/>
                    <View style={styles.firstRow}>
                        <View style={{'padding':8,'marginLeft':10}}>
                        <Text style={styles.textStyle}>
                            Composed Message
                        </Text>
                        </View>
                        <Surface style={styles.card}>
                            <Card>
                                <Card.Content>
                                <Text>
                                {item.notice.composedMessage}
                                </Text>
                                </Card.Content>
                            </Card>
                        </Surface>
                    </View>
                    <View style={{'padding':8,'marginLeft':10}}>
                        <Text style={styles.textStyle}>
                            Attachments
                        </Text>
                        </View>
                        <Surface style={styles.card}>
                            <Card>
                                <Card.Content>
                                {this.addAttachments(item.notice.attachments)}
                               </Card.Content>
                            </Card>
                        </Surface>
                </View>
            </ScrollView>
        )
    }
}

export default NoticeView;
const styles=StyleSheet.create({
    main2:{
        flex:1,
        flexDirection:'column',
        marginTop:10
    },
    card:{
        elevation:4,
        marginLeft:'5%',
        width:'90%',
        marginBottom:10,
        marginTop:2
      },
    firstRow:{
        flexDirection:'column',
        justifyContent:'space-between',
        marginBottom:10
    },
    textStyle:{
        fontSize:20,
        color:'gray'
    },
    divider:{
        backgroundColor:'gray',
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
 })