import * as React from 'react'
import { KeyboardAvoidingView, Text, TextInput, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class Request extends React.Component {
    constructor() {
        super();
        this.state = {
            bookName: '',
            bookReason: '',
            userId:firebase.auth().currentUser.email
        }
    }
    addRequest=(bookName,bookReason)=>{
        var UserID=this.state.userId
        var randomRequestId=Math.random().toString(36).substring(7)

        db.collection('Requested_Books').add({
            'User_Id':UserID,
            'Book_Name':bookName,
            'Book_Reason':bookReason,
            'Request_ID':randomRequestId
        })

        this.setState({
            bookName: '',
            bookReason: '',
        })
        return ToastAndroid.show("Book Requested",ToastAndroid.SHORT)
    }
    render() {
        return (
            <View>
                <KeyboardAvoidingView>
                    <TextInput
                        placeholder="Book Name"
                        onChangeText={(text) => {
                            this.setState({
                                bookName: text
                            })
                        }}
                        style={{marginTop:100}}
                        value={this.state.bookName}
                    />
                    <TextInput
                        placeholder="Reason For Issue"
                        multiline numberOfLines={10}
                        onChangeText={(text) => {
                            this.setState({
                                bookReason: text
                            })
                        }}
                        value={this.state.bookReason}
                    />
                    <TouchableOpacity onPress={()=>{
                        this.addRequest(this.state.bookName,this.state.bookReason)
                    }}>
                        <Text>
                            Submit Request
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}