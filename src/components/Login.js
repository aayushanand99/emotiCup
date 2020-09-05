import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Keyboard,
} from 'react-native';

import {CommonActions} from '@react-navigation/native';

import colors from '../utils/colors';

const {width, height} = Dimensions.get('screen');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {sliderActiveSlide: 0};
  }

  login = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  };

  renderInput = (type) => {
    return (
      <View
        style={[
          styles.inputContainer,
          {marginTop: type === 'password' ? 10 : 0},
        ]}>
        <TextInput
          style={styles.input}
          placeholder={
            type === 'id' ? 'Please Enter ID.' : 'Please Enter Password'
          }
        />
      </View>
    );
  };
  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1, width: '100%'}} behavior="padding">
        <TouchableOpacity
          style={styles.container}
          onPress={() => Keyboard.dismiss()}>
          <View>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{
                width: width * 0.9,
                height: height * 0.15,
                alignSelf: 'center',
                // backgroundColor: 'red',
                top: -20,
              }}
              resizeMode={'contain'}
            />
            <Text style={styles.subTextTitle}>Brewing Memories</Text>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            {this.renderInput('id')}
            {this.renderInput('password')}
            <TouchableOpacity style={styles.loginbutton} onPress={this.login}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontWeight: '500',
    fontFamily: 'DessauMedium',
    fontSize: 100,
    color: colors.yellow,
  },
  darkColorText: {
    color: colors.black,
  },
  subTextTitle: {
    fontSize: 18,
    position: 'absolute',
    top: 70,
    right: 120,
  },
  smileIcon: {
    position: 'absolute',
    height: 85,
    width: 80,
    top: 85,
    right: 10,
  },
  inputContainer: {
    width: '90%',
    height: 60,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '95%',
    // backgroundColor: 'red',
    fontSize: 25,
  },
  loginbutton: {
    marginTop: 10,
    height: 60,
    width: '90%',
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
  },
});
