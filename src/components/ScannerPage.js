import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,  Modal, AppState, Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import { CommonActions } from "@react-navigation/native"
import QRCodeScanner from 'react-native-qrcode-scanner';
import colors from '../utils/colors';
import WifiManager from 'react-native-wifi-reborn';
import Spinner from 'react-native-loading-spinner-overlay';
import {check, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';


const {width, height} = Dimensions.get('screen');

export default class ScannerPage extends Component {
  constructor(props) {
    super(props);
    this.state = { "currentSSID": "", "spinner": false, appState: AppState.currentState}
  }

  componentDidMount() {
    check(PERMISSIONS.IOS.CAMERA)
    .then((result) => {
      if(result !== RESULTS.GRANTED) {
        Alert.alert(
          "",
          "Camera permission required",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Settings", onPress: () => openSettings().catch(() => console.warn('cannot open settings')) }
          ],
          { cancelable: false }
        );
      }
    })
    .catch((error) => {
      Toast.show("Permission error")
    });


    this.getCurrentSsid()
    AppState.addEventListener('change', this._handleAppStateChange)
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.scanner.reactivate()
    }
    this.setState({ appState: nextAppState });
  }

  getCurrentSsid = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      this.setState({"currentSSID": ssid})
      console.log('Your current connected wifi SSID is ' + ssid);
    } catch (error) {
      console.log('Cannot get current SSID!', {error});
    }
  }

  onSuccess = (e) => {
    this.setState({"spinner": true})
    console.log(e.data);
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
          this.setState({"spinner": false})
          Toast.show("connection Successfull");
            
            this.props.navigation.dispatch(
              CommonActions.reset({
                  index: 1,
                  routes: [{ name: "Options", params: { keys: keys, ssid: name} }]
              }),
          );
        } catch (error) {
          this.setState({"spinner": false})
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home', params: { error: "Connection failed" }}],
            }),
          );
        }
      } else {
        this.setState({"spinner": false})
        Toast.show("Connection succesfull");
            this.props.navigation.navigate('Options', {
              keys: keys,
            });
      }
      
    
    
  };

  cancelScan = () =>  {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home', params: { error: "Scan Cancelled" }}],
      }),
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.spinner}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <Image
                                source={require("../../assets/images/cupLoader.gif")}
                                resizeMode={'contain'}
                                style={{
                                    width: width*0.5,
                                    height: 100,
                                    paddingVertical: 5
                                }}
                            />  
                        </View>
                        <Text>Processing...</Text>
                    </View>
                </View>
            </Modal>
        <QRCodeScanner
          onRead={this.onSuccess}
          //flashMode={RNCamera.Constants.FlashMode.torch}
          ref={(node) => { this.scanner = node }}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
}
});
