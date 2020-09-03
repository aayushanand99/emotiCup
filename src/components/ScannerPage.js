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
    this.state = { "currentSSID": ""}
  }

  componentDidMount() {
    this.getCurrentSsid()
  }

  getCurrentSsid = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      this.setState({"currentSSID": ssid})
      console.log('Your current connected wifi SSID is ' + ssid);
    } catch (error) {
      setSsid('Cannot get current SSID!' + error.message);
      console.log('Cannot get current SSID!', {error});
    }
  }

  onSuccess = (e) => {
    const QR_Code = JSON.parse(e.data);
    console.log("on successs");
    this.connectToWifi(QR_Code.ssid, QR_Code.password, QR_Code.keys);

  };

  connectToWifi = async (name, password, keys) => {
      if(name !== this.state.currentSSID) {
        try {
          const data = await WifiManager.connectToProtectedSSID(
            name,
            password,
            false,
          );
          console.log('Connected successfully!', {data});
          Toast.show("connection succesfull");
            this.props.navigation.navigate('Options', {
              keys: keys,
            });
        } catch (error) {
          Toast.show("connection failed");
          console.log('Connection failed!', {error});
        }
      } else {
        Toast.show("connection succesfull");
            this.props.navigation.navigate('Options', {
              keys: keys,
            });
      }
      
    
    
  };

  cancelScan()  {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  }

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
            <TouchableOpacity style={styles.buttonTouchable} onPress={this.cancelScan}>
              <Text style={styles.buttonText}>Cancel Scan</Text>
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
