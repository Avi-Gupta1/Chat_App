import {Input,NavBar,Icon, Button} from 'galio-framework';
import {Appbar} from 'react-native-paper';
import React,{Component} from 'react';
import { StyleSheet, View,Text } from 'react-native';
import {connect} from 'react-redux';

class login extends Component{
   
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }

componentDidUpdate(){
    this.props.token ? this.props.navigation.navigate('Home'):null;   
}



render(){
    // const {id} = this.props.route.params;
    // const {other_param} = this.props.route.params;
    return(
        <View>
            <Appbar.Header style={style.navbar}>
                <Appbar.Content title="Login" subtitle="Please Enter the details"/>
            </Appbar.Header>
            <View style = {style.form}>
                <Input 
                    label = "   Email"
                    type = "email-address"
                    style = {style.input}
                    placeholder = "Email"
                    value = {this.state.email}
                    onChangeText = {(email) => this.setState({email})}    
                    // borderless
                />

                <Input
                    label = "   Password"
                    style = {style.input}
                    placeholder = "Password"
                    password viewPass
                    onChangeText = {(password) => this.setState({password})}
                    // borderless
                />
                
                {/* <Button>Login</Button> */}
              <View style = {{flexDirection:'row'}}>  
            <Button onlyIcon icon="login" iconFamily="Entypo"  iconSize={30} 
                color="purple" 
                iconColor="#fff" 
                style={style.button}
            
                onPress = {e => {
                    e.preventDefault();
                    if(this.props.socket) {
                        this.props.socket.send(JSON.stringify({
                            type : 'LOGIN',
                            data: {
                                email: this.state.email,
                                password: this.state.password
                            }
                        })
                        );
                        }
                    }

                    
                }
            />

            <Button 
            color = "purple"
            style = {style.signUp}
            onPress = {e => {
                e.preventDefault();
                this.props.navigation.navigate('Signup')}}
            >Sign up</Button>
            </View> 
            </View>
        </View> 
        );
    }
}

const style = StyleSheet.create({
    signUp:{
        width:'25%',
        position:'absolute',
        right:0,
        marginTop:12
    },
    navbar:{
       padding:10,
       backgroundColor:'purple',      
    },
    form :{
        marginTop:50,
        justifyContent:'center',
        alignItems:'stretch',
        marginHorizontal:10
    },
    input :{
        padding:12,
        marginVertical:10
    },
    button :{
        height:50,
        width:50,
        marginTop:12,
        position:'absolute',
        left:0
    }
})


const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(login);