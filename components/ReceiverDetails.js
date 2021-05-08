import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements';

export default class ReceiverDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            requestId: this.props.navigation.getParam('Details')["Request_Id"],
            mobileNo: '',
            Address: '',
            ReceiverName: '',
            Book_Name: this.props.navigation.getParam('Details')["Book_Name"],
            Book_Reason: this.props.navigation.getParam('Details')["Book_Reason"],
            Receiver_Id: this.props.navigation.getParam('Details')["User_Id"],
            ReceiverRequestDocId: '',
            donorName: ''
        }
    }

    getReceiverDetails = () => {
        db.collection('User').where('EmailId', "==", this.state.Receiver_Id).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        mobileNo: doc.data().MobileNo,
                        Address: doc.data().Address,
                        ReceiverName: doc.data().FirstName,
                    })
                })
            }
        )
        db.collection('Requested_Books').where('Request_ID', '==', this.state.requestId).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        ReceiverRequestDocId: doc.id,
                    })
                })
            }
        )
    }

    componentDidMount = () => {
        this.getDonorDetails(this.state.userId);
        this.getReceiverDetails();
    }

    updateBooks = () => {
        db.collection('AllDonations').add({
            'BookName': this.state.Book_Name,
            'RequestId': this.state.RequestId,
            'RequestedBy': this.state.ReceiverName,
            'DonorId': this.state.userId,
            'RequestStatus': "Donor Interested",
        })

    }

    addNotifications = () => {
        var message = this.state.donorName + " has shown interest in donating";
        db.collection('AllNotifications').add({
            'BookName': this.state.Book_Name,
            'RequestId': this.state.RequestId,
            'RequestedBy': this.state.ReceiverName,
            'DonorId': this.state.userId,
            'RequestStatus': "Donor Interested",
            'NotificationStatus': "unread",
            'Message': message,
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

    render() {
        return (
            <View>
                <View>
                    <Card
                        title={"Book Information"}>
                        <Card><Text>
                            Name:{this.state.Book_Name}
                        </Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    <Card >
                        <Text>
                            Reason:{this.state.Book_Reason}
                        </Text>
                    </Card>
                    <Card title={"Receiver Information"}>
                        <Card>
                            <Card>
                                <Text>Name:{this.state.ReceiverName}</Text>
                            </Card>
                            <Card>
                                <Text>Address:{this.state.Address}</Text>
                            </Card>
                            <Card>
                                <Text>Mobile Number:{this.state.mobileNo}</Text>
                            </Card>
                        </Card>
                    </Card>
                </View>

                {(this.state.Receiver_Id !== this.state.userId) ?
                    (<TouchableOpacity onPress={() => {
                        this.updateBooks()
                        this.addNotifications()
                        this.props.navigation.navigate('MyDonations')
                    }}>
                        <Text>Donate</Text>
                    </TouchableOpacity>)
                    :
                    null
                }
            </View>


        )
    }
}