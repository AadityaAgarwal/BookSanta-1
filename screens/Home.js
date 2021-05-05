import * as React from 'react'
import {View,Text, FlatList,} from 'react-native'
import db from '../config'
import {ListItem} from 'react-native-elements'

export default class Home extends React.Component{
    constructor(){
        super();
        this.state={
            all_Items:[],
        }
    }
    fetchData=async()=>{
        var all_Items=[];
        var items=await db.collection('Requested_Items').get().then(query=>{
            query.forEach(doc=>{
                all_Items.push(doc.data())
            })
        })
        this.setState({
            all_Items:all_Items
        })
    }

    componentDidMount=async()=>{
        this.fetchData()
    }

    renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.Item_Name}
            subtitle={item.Item_Description}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                  <Text style={{color:'#ffff'}}>View</Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
      }
    render(){
        return(
            <View>
                 <Text style={{ marginTop: 20, fontWeight: 'bold', textAlign: 'center', fontSize: 20, backgroundColor: 'cyan', width: 400, alignSelf: 'center', height: 50 }}>Available Item</Text>
                <FlatList 
                data={this.state.all_Items}
                 renderItem={
                     this.renderItem()

                //    ({item})=>(
                //     <View style={{borderBottomWidth:2}}>
                //         <View style={{marginTop:10}}>
                //         <Text>{'Item Name: '+ item.Item_Name}</Text>
                //         </View>
                //         <View >
                //         <Text>{'Item Description: '+ item.Item_Description}</Text>
                //         </View>
                        
                //     </View>
                // )
            }
                keyExtractor={(item,index)=>{
                    index.toString();
                }}
                />
            </View>
        )
    }
}