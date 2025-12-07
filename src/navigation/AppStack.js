import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import {Home} from '../screens/appScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const isLoggedIn = useSelector(state => state.UserReducer.login);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="AuthStack">
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppStack;
