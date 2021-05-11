import * as React from 'react';
import {View,Text,FlatList} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class MyDonations extends React.Component{

    constructor(){
        super();
        this.state={
            allDonations:[],
            donorId:firebase.auth().currentUser.Email,
        }
        this.requestRef=null;
    }
    getDonations=()=>{
      this.requestRef = db.collection('AllDonations').where("EmailId",'==',this.state.donorId)
      .onSnapshot(snapshot=>{
          var allDonations=[]
          snapshot.docs.map(doc=>{
              var donations=doc.data()
              donations["doc_id"]=doc.id;
              allDonations.push(donations)
          })
      })
      this.setState({
          allDonations:allDonations,
      })
    }
    getDonorDetails=(userId)=>{
        db.collection('Users').where("Email","==",userId).get()
        .then(
            snapshot=>{
                snapshot.forEach(doc=>{
                    this.setState({
                        donorName:doc.data().FirstName+" "+doc.data().LastName,
                    })
                })
            }
        )
    }

    sendNotification=(bookDetails,RequestStatus)=>{
        
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.RequestStatus==="Send Book"){
            var RequestStatus="donor interested"
            db.collection('AllDonations').doc(bookDetails.doc_id).update({
                'RequestStatus':RequestStatus
            })
        this.sendNotification(bookDetails,RequestStatus)
        }
        else if(bookDetails.RequestStatus==="Book Sent"){
            db.collection('AllDonations').doc(bookDetails.doc_id).update({
                'RequestStatus':"Book Sent"
            })
            this.sendNotification(bookDetails,RequestStatus);
        }
    }
   
    render(){
        return(
            <View>
                <Text>My donations</Text>
               <FlatList
                  data={this.state.allDonations}
                  renderItem={
                    ({ item }) => (
                      <View style={{ borderBottomWidth: 2 }}>
                        <View>
                          <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.RequestedBy}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{item.RequestStatus}</Text>
                            <TouchableOpacity style={styles.button} onPress={
                             this.sendBook(item)
                            }>
                              <Text style={{ color: '#ffff' }}>Donate Book</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )
                  }
                  keyExtractor={(item, index) => {
                    index.toString();
                  }}
                />
            </View>
        )
    }
}