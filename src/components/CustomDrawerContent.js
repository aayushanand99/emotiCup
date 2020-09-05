import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import constants from '../utils/constants';
import colors from '../utils/colors';
import {DrawerActions} from '@react-navigation/native';

const customDrawerContent = function (props) {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={styles.logoContainer} />
      <View style={styles.appLinks}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            props.navigation.navigate('Profile');
          }}>
          <View style={styles.iconContainer}>
            <Entypo name="user" size={25} />
          </View>

          <Text style={styles.menuItemText}>{constants.Profile}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            props.navigation.navigate('Feedback');
          }}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="feedback" size={25} />
          </View>

          <Text style={styles.menuItemText}>{constants.Feedback}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="help" size={25} />
          </View>

          <Text style={styles.menuItemText}>{constants.Help}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="info" size={25} />
          </View>

          <Text style={styles.menuItemText}>{constants.aboutUs}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            props.navigation.navigate('FAQ');
          }}>
          <View style={styles.iconContainer}>
            <Entypo name="clipboard" size={25} />
          </View>

          <Text style={styles.menuItemText}>{constants.FAQ}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, {bottom: 20, position: 'absolute'}]}
          onPress={() => {
            // AsyncStorage.setItem('phone', '');
            // AsyncStorage.setItem('liveOTP', '');
            // props.dispatch(replaceCart({}));
            // props.navigation.dispatch(DrawerActions.closeDrawer());
            // props.navigation.replace('Login');
          }}>
          <View style={styles.iconContainer}>
            <Entypo name="log-out" size={25} />
          </View>

          <Text style={styles.menuItemText}>{constants.Logout}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: '20%',
            height: 170,
            width: 200,
            alignSelf: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Image
            source={require('../../assets/images/scanIcon.png')}
            resizeMode={'contain'}
            style={{
              height: 150,
              width: 200,
            }}
          />
          <Text
            style={{
              color: colors.yellow,
              // position: 'absolute',
              // bottom: '2%',
              // height: 150,

              alignSelf: 'center',
              fontSize: 25,
              fontWeight: '500',
            }}>
            Scan QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 2,
    // backgroundColor: 'red',
  },
  appLinks: {
    flex: 5,
    // backgroundColor: 'blue',
  },
  menuItem: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '5%',
    marginRight: '5%',
    // backgroundColor: 'green',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  menuItemText: {
    color: '#000',
    fontSize: 25,
    fontWeight: '200',
  },
  iconContainer: {
    paddingRight: 20,
  },
});
const mapStateToProps = (state) => ({
  cart: state.cart,
});
export default customDrawerContent;
