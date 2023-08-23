import React, { useContext, useEffect, useState } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import { Info } from '../api/context';
import TabNavigator from './TabNavigator';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

const WalletConnect = () => {
    const { open, isConnected,address,provider,close } = useWalletConnectModal();
    const [isConn,setIsConnected] = useState(false);
  const [pro,setPro] = useState(null);
  const [iniPro,setIniPro] = useState(false);
    
const projectId = 'PROJECT ID';

const providerMetadata = {
  name: 'Tether Dapp',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://tether.to/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const initializeProvider = ()=>{

  if(isConnected == false){
    setTimeout(() => {
      return(
        <TouchableOpacity style={styles.button}>
      <Text style={{color:'#fff',fontSize:20}} onPress={()=>{open();setIsConnected(isConnected)}}>{isConnected ? 'Connected':'Connect'}</Text>
      </TouchableOpacity>
      )
    }, 5000);

    return(
      <ActivityIndicator size="large" color="#0000ff" style={{marginTop:30}} />
     )
  }else{
    setTimeout(() => {
      try{
        if(provider !== undefined){
          setPro(new ethers.providers.Web3Provider(provider));
          setIniPro(true)
          setIsConnected(isConnected)
        }
      }catch(eror){
        console.log('ws1',eror);
        setPro(new ethers.providers.Web3Provider(provider));
        setIniPro(true)
        setIsConnected(isConnected)
      }
    }, 5000);
    if(provider == undefined){
      console.log('not available')
    }else{
      console.log('available')
    }
        
    return(
      <View style={{marginTop:30}} >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{color:'#fff'}} >Redirecting...</Text>
      </View>
     
    )
  }

}




  return (
    <Info.Provider value={{address:address,isConnected:isConn,Provider:pro}} >
   { isConn == false?
    <View style={styles.container}>
        <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
        <Image src={'https://cdn3d.iconscout.com/3d/premium/thumb/wallet-3732310-3121282.png'} style={{width:500,height:400,marginTop:25}}/>
        <Text style={styles.heading} > Please Connect Your Wallet </Text>
       {initializeProvider()}
        <Text style={{position:'absolute',color:'red',bottom:20}}>The intent behind building this app is learning.</Text>
    </View>
    :
    <TabNavigator/>
    }
    </Info.Provider>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
       backgroundColor:'#000'
    },
    heading:{
        color:'#fff',
        fontSize:25,
        fontWeight:'bold'
    },
    button:{
        marginTop:20,
        borderWidth:1,
        borderColor:'#6B7CD6',
        padding:10,
        borderRadius:10

    }

})

export default WalletConnect;
