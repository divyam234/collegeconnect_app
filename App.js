import React from 'react';
import {View } from 'react-native';
import {configureStore,getDefaultMiddleware} from 'redux-starter-kit'
import logger from 'redux-logger'
import Appstack from './screens/index'
import rootReducer from './reducers/index'
import {Font} from 'expo'
import {Provider as PaperProvider,DefaultTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { useScreens } from 'react-native-screens';
useScreens();
const store = configureStore({
  reducer: rootReducer,
  middleware: [logger,...getDefaultMiddleware()]
})
const theme = {
  ...DefaultTheme,
  roundness: 2,
  fonts:{
   regular:'open-sans-reg',
   medium:'open-sans-med'
  }
}
export default class App extends React.Component {
  state={
    fontLoaded: false,
  }
  async componentDidMount(){
    await Font.loadAsync({
      'open-sans-reg': require('./assets/fonts/googlesansmed.ttf'),
      'open-sans-med': require('./assets/fonts/googlesansreg.ttf'),
    })
   this.setState({ fontLoaded: true });
  }
  render() {
    return (
          <StoreProvider store={store}>
          <PaperProvider theme={theme}>
           <View style={{flex:1}}>
           {this.state.fontLoaded && <Appstack/>}  
           </View>
           </PaperProvider>
           </StoreProvider>

     )
  }
}