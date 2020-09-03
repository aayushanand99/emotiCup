import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import colors from '../utils/colors';

export default class ScannerPage extends Component {
  constructor(props) {
    super(props);
  }
  onSuccess = (e) => {
    this.props.navigation.navigate('ProductPage', {
      QRData: e.data,
    });
    //Toast.show(e.data);
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <QRCodeScanner
          onRead={this.onSuccess}
          //flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.
            </Text>
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
