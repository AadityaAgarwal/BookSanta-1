import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class Settings extends React.Component {
    constructor(){
        super();
        this.state={
            Fname: '',
            Lname: '',
            address: '',
            MobileNo: '',
            email:'',
            docId:'',
        }
    }

   
    getDetails=()=>{
        var user= firebase.auth().currentUser;
        var email=user.email
        db.collection('Users').where('Email','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                this.setState({
                    email:data.Email,
                    Fname:data.FirstName,
                    Lname:data.LastName,
                    address:data.Address,
                    MobileNo:data.MobileNo,
                    docId:doc.id,
                })
                console.warn(data)
            })
        })
    }

    componentDidMount=()=>{
        this.getDetails()
    }

    updateDetails=()=>{
         db.collection('Users').doc(this.state.docId).update({
            'FirstName': this.state.Fname,
            'LastName': this.state.Lname,
            'Address': this.state.address,
            'MobileNo': this.state.MobileNo,
         })
        ToastAndroid.show("Profile Updated Successfully",ToastAndroid.SHORT)
    }

    render() {
        return (
            <View>
               <TextInput
               placeholder="First Name"
               onChangeText={(text)=>{
                   this.setState({
                       Fname:text
                   })
               }}
               value={this.state.Fname}
               />
                <TextInput
               placeholder="Last Name"
               onChangeText={(text)=>{
                   this.setState({
                       Lname:text
                   })
               }}
               value={this.state.Lname}
               />

                <TextInput
               placeholder="Mobile Number"
               keyboardType='numeric'
               onChangeText={(text)=>{
                   this.setState({
                       MobileNo:text
                   })
               }}
               value={this.state.MobileNo}
               />
                <TextInput
               placeholder="Address"
               multiline numberOfLines={10}
               onChangeText={(text)=>{
                   this.setState({
                       address:text
                   })
               }}
               value={this.state.address}
               />
               <TouchableOpacity onPress={()=>{
                   this.updateDetails()
               }}>
                   <Text>Save</Text>
               </TouchableOpacity>
            </View>
        )
    }
}