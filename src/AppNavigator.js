import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Test, Login, Home, ScannerPage, ProductPage, Dispense, ThankYou} from './components';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dispense"
          component={Dispense}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYou}
          options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
