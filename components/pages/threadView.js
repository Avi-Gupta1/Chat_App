import React,{Component} from 'react';
import {PlatForm,View,Text, StyleSheet} from 'react-native';
import {Appbar, Avatar, Button} from 'react-native-paper';
import {Input} from 'galio-framework';
import {connect} from 'react-redux';
import Message from './message';
import { ScrollView } from 'react-native-gesture-handler';
 


class threadView extends Component {
        constructor(props) {
            super(props);

            this.state = {
                content:''
            }

            // this.init();
        }

        componenDidUpdate(props) {
            this.init();
        }

        init = () => {
            let currentThread = this.props.threads.filter(t => t.id === this.props.route.name)[0];
            // console.log(thread_ID);
            if(currentThread && this.props.socket.readyState) {
                console.log("SOCKET", this.props.socket);
                let skip = currentThread.Messages || 0;    
                
                this.props.socket.send(JSON.stringify({
                    type:'THREAD_LOAD',
                    data: {
                        threadId: this.props.route.name,
                        skip: skip
                    }
                }));
            }
        }


   
    
    
    sendMessage = (e) => {
        e.preventDefault();



        const msg = {
            threadId: this.props.route.name,
            userId: this.props.user.id,
            content : this.state.content,
            date: new Date() 
        }

        if(msg.content.length != 0) {
        this.props.socket.send(JSON.stringify({
            type:  'ADD_MESSAGE',
            threadId: msg.threadId, 
            message: msg
        }));

        // console.log("Message is sent ", msg.content);

        this.setState({
            content:''
        });
    }

    }   






    render(){
        console.log("Route Name ",this.props.route.name);
        return(
        <View style = {styles.mainView}>
            
            <Appbar.Header style = {styles.navbar}>
                <Appbar.BackAction
                onPress = {e => {
                    e.preventDefault();
                    this.props.navigation.goBack();
                }}

                />
                <Avatar.Icon 
                   icon = "account"
                   size = {48}
                   backgroundColor = "purple"
                />
                <Appbar.Content
                title = {this.props.route.name}
                />
            </Appbar.Header>
            <ScrollView> 
                {

                this.props.threads.filter(t => t.id === this.props.route.name).map((thread,id) => {
                    return(
                    <View style ={{flexDirection:'column', marginBottom:50}} key = {id}>
                        {thread.Messages.map((msg,mi)=>{
                           console.log("Thread Name :", thread.id);
                           return (
                                    <Message key={mi} msg = {msg} />
                                )
                            })}
                    </View>
                    )
                })   
                }
            </ScrollView>
              <View style = {styles.bottom}>
                <View style = {{flexDirection:'row', width: '100%'}}>
                    <View style = {{width:'100%'}}>
                        <Input
                            placeholder = "Type your message here"
                            value = {this.state.content}
                            onChangeText = {(content)=> this.setState({content})}
                        />
                    </View>
                    <View>
                        <Button style = {{position:'absolute' ,right:0,padding:10, width:'10%'}}
                            icon = "send"
                            onPress = {e => {
                                this.sendMessage(e);
                            }}
                        />
                    </View>
               </View>
              </View>
        </View>
        )


    }



}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,

    },
    navbar : {
        backgroundColor :'purple'
    },
    bottom: {
        width: '100%', 
        height: 50, 
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems:'flex-start',
        position: 'absolute',
        bottom: 0
    },
   
});

const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({

})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(threadView);

