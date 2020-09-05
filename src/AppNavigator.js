import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Test,
  Login,
  Home,
  ScannerPage,
  OptionsScreen,
  Dispense,
  ThankYou,
  CustomDrawerContent,
  Profile,
  Feedback,
  FAQ,
  ContactUs,
  AboutUS,
} from './components';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = (props) => {
  let stackNavigator = props.navigation;
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent {...props} stackNavigator={stackNavigator} />
      )}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: 'false',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: 'false',
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerShown: 'false',
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerShown: 'false',
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: 'false',
        }}
      />
      <Drawer.Screen
        name="AboutUS"
        component={AboutUS}
        options={{
          headerShown: 'false',
        }}
      />
    </Drawer.Navigator>
  );
};

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
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Options"
          component={OptionsScreen}
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
