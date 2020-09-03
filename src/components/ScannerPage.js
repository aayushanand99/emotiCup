import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import Toast from 'react-native-simple-toast';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import colors from '../utils/colors';
import WifiManager from 'react-native-wifi-reborn';

const {width, height} = Dimensions.get('screen');



export default class ScannerPage extends Component {
  constructor(props) {
    super(props);
  }
  onSuccess = (e) => {

    const QR_Code = JSON.parse(e.data);
    this.connectToWifi(QR_Code.ssid, QR_Code.password, QR_Code.keys);


    // // temporary code 
    // this.props.navigation.navigate('Options', {
    //   keys: QR_Code.keys,
    // });

  };

  connectToWifi = (name, password, keys) => {
    let that = this;
    WifiManager.connectToProtectedSSID(
      name,
      password,
      false,
    ).then(
      () => {
        Toast.show("connection succesfull");
        this.props.navigation.navigate('Options', {
          keys: keys,
        });
      },
      () => {
        Toast.show("connection failed");
      },
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <QRCodeScanner
          onRead={this.onSuccess}
          //flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
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
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
