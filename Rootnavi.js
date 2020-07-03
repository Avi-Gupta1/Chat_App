import React from 'react';
import {connect} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Thread_View from './components/pages/threadView';
import * as ChatActions from './components/store/action/chatAction';
import * as AuthActions from './components/store/action/authAction';
// import {View,Text} from 'react-native';

const Stack = createStackNavigator();

class Rootnavi extends React.Component {

    componentDidMount() {
        
        this.props.setupSocket(this.props.token, this.props.user.id);
       

    }
    

    render() {

        return(
        <NavigationContainer>
            <Stack.Navigator  initialRouteName = {this.props.token ? 'Home' :'Login'}  screenOptions ={{headerShown : false}} >
                 <Stack.Screen name = "Login" component = {Login}/>
                 <Stack.Screen name = "Home" component = {Home}/> 
                 <Stack.Screen name = "Signup" component = {Signup}/>
                 {this.props.threads && this.props.threads.filter(t => t.id !== this.props.threads.id).map((thread,id) => {
                        //  console.log("Check it out ,",thread.id);
                    return(
                        <Stack.Screen key ={id} name = {thread.id} component = {Thread_View}  />
                    )
                       
                 })}
          
            </Stack.Navigator>
         </NavigationContainer>
        )



    }


}


const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
});

const mapDispatchToProps = dispatch => ({
    setupSocket: (token, userId) => {
        dispatch(ChatActions.setupSocket(token, userId));
      },
      logout: () => {
        dispatch(AuthActions.logout());
      }
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rootnavi);