import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import {CategoriesPage, OccasionsPage, ProductsPage, CheckoutPage, ConfirmationPage} from '../screens/appScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const isLoggedIn = useSelector(state => state.UserReducer.login);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={isLoggedIn ? "BottomTabs" : "AuthStack"}>
      {!isLoggedIn ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen 
            name="BottomTabs" 
            component={BottomTabs}
            options={{
              gestureEnabled: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen name="CategoriesPage" component={CategoriesPage} />
          <Stack.Screen name="OccasionsPage" component={OccasionsPage} />
          <Stack.Screen name="ProductsPage" component={ProductsPage} />
          <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
          <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
