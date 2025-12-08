import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, CategoriesPage} from '../screens/appScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="CategoriesPage" component={CategoriesPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;

