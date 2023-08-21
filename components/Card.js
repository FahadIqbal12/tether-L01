import React from 'react';
import { Image } from 'react-native';
import { View,Text,StyleSheet } from 'react-native';


const Card = (props) => {

    const address = props.address
  return (
    <View style={styles.container} >
       <Image src={'https://img.freepik.com/free-icon/tether_318-627090.jpg'} style={{width:80,height:80}} />
        <Text style={styles.header} >{`Address: ${address.slice(0,5)}...${address.slice(-6)}` || 'XXXXX...XXXXX'}</Text>
       
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'95%',
        marginTop:35,
        height:180,
        borderRadius:20,
        borderWidth:2,
        backgroundColor:'#1BA27A',
        padding:10
    },
    header:{
        color:'#fff',
        fontSize:20,
        marginTop:20
    },
    subText:{
        color:'#fff',
        fontSize:18
    }
})

export default Card