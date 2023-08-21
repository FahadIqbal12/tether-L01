import React, { useState } from 'react';
import {View,Text,Button,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Accordion = ({children,header}) => {

    const [w,setW] = useState(0);
    const [h,setH] = useState(0)

    const handleToggle = ()=>{
        if(w == 0 && h == 0){
            setW('100%');
            setH('auto')
        }else{
            setW(0);
            setH(0)
        }
    }


  return (
    <View style={{margin:10}}>
        <View style={{flexDirection:'row'}} >
            <Text style={{color:'#fff',fontSize:15,fontWeight:'bold'}} >{header}</Text>
            <TouchableOpacity style={{left:'50%'}} onPress={()=>{handleToggle()}} >
                { w == 0?
                <MaterialCommunityIcons name='arrow-expand-down' color={'#fff'} size={20}/>
                :
                <MaterialCommunityIcons name='arrow-expand-up' color={'#fff'} size={20}/>
                }
            </TouchableOpacity>
        </View>

        <View style={{width:w,height:h}}>
            {children}
        </View>
    </View>
  )
}

export default Accordion