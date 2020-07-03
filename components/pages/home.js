import React,{Component} from 'react';
import { StyleSheet, View ,ScrollView} from 'react-native';
import { Text } from 'react-native-paper';
import {Input} from 'galio-framework';
import { Appbar, Card,Avatar, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import * as AuthAction from '../store/action/authAction';

class home extends Component{
    constructor(props) {
        super(props);

        this.state = {
            search:''
        }
    }


    findorCreateThread = (id) => {
        console.log("Created Or finded");
        this.props.socket.send(JSON.stringify({
            type:'FIND_THREAD',
            data: [this.props.user.id, id]
        }))
    }


    search = () => {
        this.props.socket.send(JSON.stringify({
            type:'SEARCH',
            data: this.state.search
        }))

}




render(){
    return(
        
        <View style={{flex:1}}>
         
            <Appbar.Header style = {styles.navbar}>
                
                <Appbar.Content
                title="Friends"
                />

                        {/* <Appbar.Action icon="magnify" onPress={this._handleSearch} /> */}
                </Appbar.Header>
                <Input
                placeholder = "search"
                right
                icon = "search"
                family = "FontAwesome"
                value = {this.state.search}
                onChangeText = {(search => this.setState({search}))}
                />
                <ScrollView>

                {this.state.search?
                <View>
                      <Button icon="magnify" style={{backgroundColor:"purple"}} color="white" onPress={(e) => this.search() }>Search</Button>
                {this.props.users && this.props.users.filter(u => u.id !== this.props.user.id).map((user,uid) => {
                    return(
                        <Card 
                        key = {uid}
                        onPress ={ e => { 
                            e.preventDefault();
                            this.findorCreateThread(user.id);   
                        }}
                        style = {styles.Card}
                        >
                        
                            <Card.Title           
                            style = {styles.Card}
                            title={user.name}
                            subtitle={user.email}
                            left={(props) => <Avatar.Icon {...props} icon="account" style={{backgroundColor:'purple'}} 
                            onPress = {e => {
                                e.preventDefault();
                                // console.log("Pressed")
                            }}
                            />}
                            
                        />
                      </Card>
                    )


                })}
                </View>
               
                :
                 this.props.threads.map((thread, threadIdx) => {
                    return(
                    <Card 
                     key ={threadIdx}
                     style = {styles.Card}
                     onPress ={e => {
                        e.preventDefault();
                        this.props.navigation.navigate(thread.id,{
                            thread_ID : thread.id
                        });}
                        }
                    >
                       <Card.Title
                     
                       title={thread.id}
                       subtitle="This is the last message"
                       left={(props) => <Avatar.Icon {...props} icon="account" style={{backgroundColor:'purple'}}/> }
                      
                       />
                     </Card>
                    )})}

                   { 
                  }
                </ScrollView>    
                     
    <Button icon="logout" style = {styles.bottom} size={45} color = "#fff" onPress={e => {e.preventDefault();
                                                                                          this.props.logout();
                                                                                        this.props.navigation.navigate('Login');
                                                                                        }}> LogOut</Button>  
    </View>

 );
 }
}

const styles = StyleSheet.create({
    bottom:{
            width: '100%', 
            height: 50, 
            justifyContent: 'center', 
            alignItems:'center',
            position: 'absolute',
            bottom: 0,
            backgroundColor:"purple"

    },
    Card:{
            borderBottomWidth:0.167,
            backgroundColor:'#fff'
    },
    list: {
            borderRadius : 5,
            borderBottomWidth:0.25
    },
    navbar:{
            backgroundColor:'purple'
    },
    container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({
    logout : () => dispatch(AuthAction.logout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(home);