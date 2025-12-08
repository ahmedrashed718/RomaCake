import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = {
  // Store authentication token
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  // Get authentication token
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Clear all auth data on logout
  logout: async () => {
    try {
      await AsyncStorage.multiRemove([
        'userToken',
        'userData',
        'refreshToken',
      ]);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  // Store user data
  setUserData: async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  // Get user data
  getUserData: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },
};

export default Auth;

