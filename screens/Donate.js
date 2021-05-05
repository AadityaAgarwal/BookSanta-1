import * as React from 'react'
import {ListItem} from 'react-native-elements'
import db from '../config'
import {View,Text,KeyboardAvoidingView,FlatList,StyleSheet,TouchableOpacity} from 'react-native'

export default class Donate extends React.Component{
    constructor(){
      super()
      this.state = {
        requestedBooksList : []
      }
    this.requestRef= null
    }
  
    getRequestedBooksList =()=>{
      this.requestRef = db.collection('Requested_Books')
      .onSnapshot((snapshot)=>{
        var requestedBooksList = snapshot.docs.map(document => document.data());
        this.setState({
          requestedBooksList : requestedBooksList
        });
      })
    }
  
    componentDidMount(){
      this.getRequestedBooksList();
      console.log(this.state.requestedBooksList)
    }
  
    componentWillUnmount(){
      this.requestRef();
    }
  
    keyExtractor = (item, index) => index.toString()
  
    renderItem = ( {item, i} ) =>{
      return (
        <ListItem
          key={i}
          title={item.Book_Name}
          subtitle={item.Book_Reason}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button} onPress={
                  this.props.navigation.navigate('ReceiverDetails',{"Details":item})
              }>
                <Text style={{color:'#ffff'}}>View</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
    }
  
    render(){
      return(
        <View style={{flex:1}}>
           
          <View style={{flex:1}}>
            {
              this.state.requestedBooksList.length === 0
              ?(
                <View style={styles.subContainer}>
                  <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
                </View>
              )
              :(
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.requestedBooksList}
                  renderItem={this.renderItem}
                />
              )
            }
          </View>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })