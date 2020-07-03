import 'react-native-gesture-handler';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './components/store/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import Rootnavi from './Rootnavi';



const {store,persistor} = configureStore();
class App extends React.Component {
 

  constructor(props){
    super(props);  
  }



  render(){
  return (
    <Provider store ={store}>
      <PersistGate loading ={null} persistor ={persistor}>
        <Rootnavi/>
      </PersistGate>
    </Provider>


  );
 }
}




export default App;


