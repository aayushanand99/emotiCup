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
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';

import colors from '../utils/colors';

const {width, height} = Dimensions.get('screen');
const credentials = {
  zero: 'one',
  EC0001: 'BM1000',
  EC0002: 'BM2000',
  EC0003: 'BM3000',
  EC0004: 'BM4000',
  EC0005: 'BM5000',
  EC0006: 'BM6000',
  EC0007: 'BM7000',
  EC0008: 'BM8000',
  EC0009: 'BM9000',
  EC0010: 'BM10000',
  EC0011: 'BM11000',
  EC0012: 'BM12000',
  EC0013: 'BM13000',
  EC0014: 'BM14000',
  EC0015: 'BM15000',
  EC0016: 'BM16000',
  EC0017: 'BM17000',
  EC0018: 'BM18000',
  EC0019: 'BM19000',
  EC0020: 'BM20000',
  EC0021: 'BM21000',
  EC0022: 'BM22000',
  EC0023: 'BM23000',
  EC0024: 'BM24000',
  EC0025: 'BM25000',
  EC0026: 'BM26000',
  EC0027: 'BM27000',
  EC0028: 'BM28000',
  EC0029: 'BM29000',
  EC0030: 'BM30000',
  EC0031: 'BM31000',
  EC0032: 'BM32000',
  EC0033: 'BM33000',
  EC0034: 'BM34000',
  EC0035: 'BM35000',
  EC0036: 'BM36000',
  EC0037: 'BM37000',
  EC0038: 'BM38000',
  EC0039: 'BM39000',
  EC0040: 'BM40000',
  EC0041: 'BM41000',
  EC0042: 'BM42000',
  EC0043: 'BM43000',
  EC0044: 'BM44000',
  EC0045: 'BM45000',
  EC0046: 'BM46000',
  EC0047: 'BM47000',
  EC0048: 'BM48000',
  EC0049: 'BM49000',
  EC0050: 'BM50000',
  EC0051: 'BM51000',
  EC0052: 'BM52000',
  EC0053: 'BM53000',
  EC0054: 'BM54000',
  EC0055: 'BM55000',
  EC0056: 'BM56000',
  EC0057: 'BM57000',
  EC0058: 'BM58000',
  EC0059: 'BM59000',
  EC0060: 'BM60000',
  EC0061: 'BM61000',
  EC0062: 'BM62000',
  EC0063: 'BM63000',
  EC0064: 'BM64000',
  EC0065: 'BM65000',
  EC0066: 'BM66000',
  EC0067: 'BM67000',
  EC0068: 'BM68000',
  EC0069: 'BM69000',
  EC0070: 'BM70000',
  EC0071: 'BM71000',
  EC0072: 'BM72000',
  EC0073: 'BM73000',
  EC0074: 'BM74000',
  EC0075: 'BM75000',
  EC0076: 'BM76000',
  EC0077: 'BM77000',
  EC0078: 'BM78000',
  EC0079: 'BM79000',
  EC0080: 'BM80000',
  EC0081: 'BM81000',
  EC0082: 'BM82000',
  EC0083: 'BM83000',
  EC0084: 'BM84000',
  EC0085: 'BM85000',
  EC0086: 'BM86000',
  EC0087: 'BM87000',
  EC0088: 'BM88000',
  EC0089: 'BM89000',
  EC0090: 'BM90000',
  EC0091: 'BM91000',
  EC0092: 'BM92000',
  EC0093: 'BM93000',
  EC0094: 'BM94000',
  EC0095: 'BM95000',
  EC0096: 'BM96000',
  EC0097: 'BM97000',
  EC0098: 'BM98000',
  EC0099: 'BM99000',
  EC0100: 'BM100000',
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {sliderActiveSlide: 0};
  }

  componentDidMount() {
    AsyncStorage.getItem('userId').then((item) => {
      if (Object.keys(credentials).indexOf(item) != -1) {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home'}],
          }),
        );
      }
    });
  }

  login = async () => {
    if (
      credentials[this.state.id] &&
      credentials[this.state.id] === this.state.password
    ) {
      await AsyncStorage.setItem('userId', this.state.id);
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
    } else {
      Toast.show('ID password combination is incorrect', Toast.LONG);
    }
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
          onChangeText={(text) => {
            if (type === 'id') {
              this.setState({id: text});
            } else {
              this.setState({password: text});
            }
          }}
          secureTextEntry={type === 'id' ? false : true}
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
    color: colors.black
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
