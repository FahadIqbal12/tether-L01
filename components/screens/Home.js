
import React,{useContext,useState} from 'react';
import { View,Text,StyleSheet,TextInput,Button,KeyboardAvoidingView,Linking,Clipboard,ScrollView } from 'react-native';
import { Info } from '../../api/context';
import Card from '../Card';
import { contractAddress,abi } from '../contract/ContractInfo';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import Accordion from '../Accordion';

const Home = () => {
     const i = useContext(Info);
    const provider = i.Provider;
    const Signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress,abi,Signer)

    function convertToInternationalCurrencySystem (labelValue) {

      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+9
  
      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6
  
      ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3
  
      ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
  
      : Math.abs(Number(labelValue));
  
  }

const addresses = ['0xc5451b523d5FFfe1351337a221688a62806ad91a','0x5a52E96BAcdaBb82fd05763E25335261B270Efcb','0xc7C8f8284c5360D0086a2f0A05BdD07AFdE23246'];
const etherscan_url='https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7?a='

    const [TS,setTS] = useState()
    const totalSupply =async ()=>{
      const ts = await contract.totalSupply();
      setTS(ethers.utils.formatUnits(ts,'wei'))
    }

    const [owner,setOwner] = useState('0000000000')
    const getOwner =async ()=>{
      const go = await contract.getOwner();
      setOwner(go)
    }

    const [boOwner,setBoOwner] = useState(0)
    const balanceOfOwner =async ()=>{
      const bo = await contract.balanceOf(owner);
      setBoOwner(ethers.utils.formatUnits(bo,'wei'))
    }

    const [BA,setBA] = useState('')
    const [balance,setBalance] = useState(0)
    const balanceOf = async(address)=>{
      const bo = await contract.balanceOf(address);
      setBalance(ethers.utils.formatUnits(bo,'wei'));
    }

    const [BLA,setBLA] = useState('')
    const [bklStatus,setBlkStatus] = useState(false)
    const blacklistStatus = async(address)=>{
      const bo = await contract.getBlackListStatus(address);
      setBlkStatus(bo);
    }


    balanceOfOwner()
    getOwner()
    totalSupply(); 




  return (
    <KeyboardAvoidingView style={styles.container}>
        <Card address={i.address} />

        <ScrollView style={{marginTop:20,marginLeft:10}}>
          <Text style={{color:'#6B7CD6',textDecorationLine:'underline'}} onPress={()=>{Linking.openURL('https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7')}} >Read Contract on Etherscan</Text>
          <Text style={{color:'#fff',fontWeight:'bold'}}>Total Supply: {convertToInternationalCurrencySystem(TS)}</Text>

          <View style={{marginTop:10}} >
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}} >Contract Interaction:</Text>
            <View style={{marginLeft:10}} >

            <Accordion header='getOwner'>
            <Text style={{color:'#fff'}}> {`Owner's Address: ${owner.slice(0,5)}...${owner.slice(-6)}` || 'XXXXX...XXXXX'}</Text>
            </Accordion>

            <Accordion header='Owners holding'>
            <Text style={{color:'#fff'}}> {convertToInternationalCurrencySystem(boOwner)} USDT</Text>
            </Accordion>

            <Accordion header='check balance' >
              <TextInput style={{borderWidth:1,borderColor:'#6B7CD6',padding:5,color:'#fff',borderRadius:5}} onChangeText={(text)=>{setBA(text)}} />
              <Button title={'Check'} style={{backgroundColor:'#6B7CD6'}} onPress={()=>{balanceOf(BA)}} />
              <Text style={{color:'#fff'}} >{convertToInternationalCurrencySystem(balance)} USDT</Text>
            </Accordion>

            <Accordion header='getBlacklistStatus' >
              <TextInput style={{borderWidth:1,borderColor:'#6B7CD6',padding:5,color:'#fff',borderRadius:5}} onChangeText={(text)=>{setBLA(text)}} />
              <Button title={'Check'} style={{backgroundColor:'#6B7CD6'}} onPress={()=>{blacklistStatus(BLA)}} />
              <Text style={{color:'#fff'}} >{bklStatus ? 'True':'False'}</Text>
            </Accordion>

            </View>
            <View style={{marginTop:60}}>
            <Accordion header={'List of address with USDT'}>
              {addresses.map((item,index)=>{
                return(
                  <View style={{flexDirection:'row',justifyContent:'space-between',margin:1}} key={index}>

                    <Text style={{color:'#fff'}}>{item.slice(0,5)}.....{item.slice(-5)} <Text onPress={()=>{Clipboard.setString(item)}} >📋</Text> </Text>
                    <Text style={{color:'#6B7CD6',textDecorationLine:'underline'}} onPress={()=>{Linking.openURL(etherscan_url+item)}}>View on Etherscan</Text>
                  </View>
                )
              })}
            </Accordion>
            </View>
           
            
          </View>
          <Text style={{color:'red',textAlign:'center'}}>The intent behind building this app is learning.</Text>
        </ScrollView>
        
        
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
   
    },
  });
  

export default Home