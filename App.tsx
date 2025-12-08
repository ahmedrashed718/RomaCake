import React from 'react';
import {StatusBar, I18nManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {store} from './src/redux';
import AppStack from './src/navigation/AppStack';
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          {/* <StatusBar
          barStyle="light-content"
          backgroundColor="#E91E84"
          translucent={false}
        /> */}
          <AppStack />
          <Toast />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
