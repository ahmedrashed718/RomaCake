import React from 'react';
import {StatusBar, I18nManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {store} from './src/redux';
import AppStack from './src/navigation/AppStack';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <GestureHandlerRootView style={{flex: 1}}> */}
        {/* <StatusBar
          barStyle="light-content"
          backgroundColor="#E91E84"
          translucent={false}
        /> */}
        <AppStack />
        <Toast />
        {/* </GestureHandlerRootView> */}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
