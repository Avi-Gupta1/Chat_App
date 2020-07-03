import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Input, Button} from 'galio-framework';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
class signup extends Component {
    constructor(props) {
        super(props);


        this.state = {
            email :'',
            password:'',
            passwordAgain:'',
            name:'',        
            username:''

        }


    }

    signup = (e) => {
        e.preventDefault();
        if(this.props.socket){    
            this.props.socket.send(JSON.stringify({
                type:'SIGNUP',
                data:{
                email: this.state.email,
                password: this.state.password,
                name:this.state.name,
                username:this.state.username
                }
            }))
        }
    }

    render = () => {

        return(
            <View  style={{flex:1}}>
                <Appbar.Header style = {{backgroundColor:'purple'}}>
                    <Appbar.Content
                        title = "Sign Up"
                    /> 
                </Appbar.Header>

            <ScrollView>
                <View >  
                    <View style = {{alignItems:'center'}}>
                        <Input
                        placeholder = "Name"
                        style = {style.input}
                        value = {this.state.name}
                        onChangeText = { (name) => this.setState({name})}
                        />

                        <Input
                        placeholder = "Username"
                        style = {style.input}
                        value = {this.state.username}
                        onChangeText = { (username) => this.setState({username})}
                        />

                        <Input
                        placeholder = "Email"
                        style = {style.input}
                        value = {this.state.email}
                        type = "email-address"
                        onChangeText = { (email) => this.setState({email})}


                        />

                        <Input
                        password viewPass
                        placeholder = "Password"
                        style = {style.input}
                        value = {this.state.password}
                        onChangeText = {(password )=> this.setState({password})}


                        />

                        <Input
                        password viewPass
                        placeholder = "Comfirm Password"
                        style = {style.input}
                        value = {this.state.passwordAgain}
                        onChangeText = { (passwordAgain) => this.setState({passwordAgain})}
                        />

                    </View>
                    
                 </View>
              </ScrollView>  
                <View style = {{flexDirection:'row', bottom:0}}>
                        <Button
                        style = {{backgroundColor:'purple',width:'45%',position:'relative',left:0 }}
                        onPress = {e => {
                            this.signup(e);
                        }}
                        >Sign up</Button>

                        <Button
                            style = {{backgroundColor:'purple',width:'45%',position:'absolute',right:0}}
                            onPress = {e => {e.preventDefault();
                                    this.props.navigation.navigate('Login');
                            }}
                        >
                        Login   
                        </Button>
             </View>

            </View>
        )
    }
}

const style = StyleSheet.create({
    input:{
        width:'95%',
    }
})


const mapStateToProps = state => ({
 ...state.auth,
 ...state.chat
})


const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(signup);