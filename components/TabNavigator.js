import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import LatestTrx from './screens/LatestTrx';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TabNavigator = () => {

    const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
   <Tab.Navigator screenOptions={{tabBarStyle:{position:'absolute',bottom:20,height:60,width:'70%',left:'15%',backgroundColor:'#000',borderWidth:3,borderColor:'#6B7CD6',borderRadius:20}}}>
        <Tab.Screen name='Home' component={Home} options={{headerShown:false,tabBarIcon:()=>(<MaterialCommunityIcons name='home' color={'#6B7CD6'} size={30} />),tabBarShowLabel:false}}  />
        <Tab.Screen name='Latest Trx' component={LatestTrx} options={{headerShown:false,tabBarIcon:()=>(<MaterialCommunityIcons name='file-sign' color={'#6B7CD6'} size={30} />),tabBarShowLabel:false}} />
   </Tab.Navigator>
   </NavigationContainer>
  )
}

export default TabNavigator