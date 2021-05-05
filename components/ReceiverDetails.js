import * as React from 'react'
import {Text,View} from 'react-native'

export default class ReceiverDetails extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            requestId:this.props.navigation.getParam('Details')["Request_Id"],
        }
    }
    render(){
        return(
            <View>
                
            </View>
        )
    }
}