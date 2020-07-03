import React,{Component} from 'react';
import {View, Text, ScrollView,StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {Card,Title,Paragraph} from 'react-native-paper';
class message extends Component {


    render() {
        return(
            <View style={this.props.msg.userId === this.props.user.id ? styles.rightContainer:styles.leftContainer}>
                <Card style = {this.props.msg.userId === this.props.user.id ? styles.right: styles.left}>
                    <Card.Content>
                        <Paragraph style = {this.props.msg.userId === this.props.user.id ? styles.right_para:styles.left_para}>{this.props.msg.content}</Paragraph>
                        </Card.Content>
                </Card>
            </View>
        )
    }




}


const styles = StyleSheet.create({
    leftContainer:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    rightContainer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    left :{
        backgroundColor:'#ddd',
        borderWidth:.25,
        maxWidth:'45%',
        marginVertical:10,
        marginLeft:5,
        borderTopRightRadius:25,
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25
    },
    right: {
        backgroundColor:'purple',
        borderWidth:.25,
        maxWidth:'45%',
        marginVertical:10,
        marginRight:5,
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
    },
    left_para:{
        color:'#000'
    },
    right_para:{
        color:'#fff'
    }
})

const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat

})

const mapDispatchToProps = dispatch =>({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(message);