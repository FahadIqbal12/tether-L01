import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet,ActivityIndicator,ScrollView } from 'react-native';
import axios from 'axios';


const LatestTrx = () => {
  const [trxInfo,setTrxInfo] = useState(null)

  const fetchTrxInfo =async()=>{
 await axios.get('https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xdAC17F958D2ee523a2206206994597C13D831ec7&address=0xC6CDE7C39eB2f0F0095F41570af89eFC2C1Ea828&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=ZFPMXPH4TP8NHM6V1JXJJ4CWHYAAY1EQYD').then((res)=>{
  setTrxInfo(res.data['result']);
 }).catch((error)=>{
  console.log(error)
 })
 
  }


  useEffect(()=>{
    fetchTrxInfo()
  },[])


  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',color:'#00CDFF',textAlign:'center'}}>The data present below is the realtime token transaction history of the owner of USDT. The data is retrieved from Etherscan using its official api.</Text>
      <ScrollView style={{marginTop:15}}>
      {trxInfo == null
      ?
      <ActivityIndicator size="large" color="#0000ff" />
      :
     
      trxInfo.map((item,index)=>{
        return(
          <View style={{marginLeft:10,borderBottomWidth:1,marginRight:10,marginBottom:1,marginTop:1}} key={index}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}} >
            <Text style={{fontSize:12,fontWeight:'bold'}} >{`Trx hash: ${item.hash.slice(0,5)}....${item.hash.slice(-5)}`}</Text>
            <Text style={{fontSize:12,fontWeight:'bold'}}>Block no: {item.blockNumber}</Text>
            </View>
            <Text style={{fontWeight:'bold',color:'#1BA27A'}}>Token Name: {item.tokenName}</Text>
            <Text style={{fontWeight:'bold',color:'#6B7CD6'}}>Value: {item.value} {item.tokenSymbol}</Text>
            <Text style={{fontWeight:'bold'}} >From: {item.from}</Text>
            <Text style={{fontWeight:'bold'}}>To: {item.to}</Text>
          </View>
          
        )
      })
      }
      
      </ScrollView>
      <Text style={{color:'red',textAlign:'center'}}>The intent behind building this app is learning.</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:35
      
    },
  });
  

export default LatestTrx