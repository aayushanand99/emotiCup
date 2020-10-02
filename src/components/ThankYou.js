import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {wifiDisconnect} from '../wifiManager';




const {width, height} = Dimensions.get('screen');
import colors from '../utils/colors';
import BackgroundTimer from 'react-native-background-timer';


export default class ThankYou extends Component {
    constructor(props) {
      super(props);
      this.ssid = props.route.params.ssid;
    }

    componentDidMount() {
      this.disconnectWifi()
      console.log("Product timerrrrr");
      BackgroundTimer.runBackgroundTimer(() => { 
        console.log("Product timer");
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home', params: { error: "Visit again!!!" }}],
          }),
        );
        
        }, 
      5000); 
    }

    disconnectWifi = async () => {
      try {
        await wifiDisconnect(this.ssid)
        console.log('wifi disconnected ' + ssid);
      } catch (error) {
        console.log('wifi dicinnect error!', {error});
      }
    }

    componentWillUnmount() {
      BackgroundTimer.stopBackgroundTimer();
    }

    render() { 
      return (
        <View style={styles.container}>
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
            <View style={styles.thankView}>
              <Text style={styles.thankYou}>ThankYou</Text>
              <Image
                    source={require("../../assets/images/iconSmile.jpg")}
                    resizeMode={'contain'}
                    style={{
                        width: width*0.5,
                        height: 200,
                    }}
                />  
            </View>
            
            <View style={styles.centeredView}>
                
            </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      subTextTitle: {
        fontSize: 18,
        position: 'absolute',
        top: '60%',
        right: 120,
      },
      coverImageContainer: {
        height: '30%',
        // backgroundColor: 'red',
      },
      imageContainer: {
          height: width*0.5,
          width: width*0.5,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
      },
      centeredView: {
        flex: 1,
        alignItems: "center",
    },
    thankYou: {
      fontWeight: '500',
      fontFamily: 'DessauMedium',
      fontSize: 20,
      color: colors.black,
      marginTop: 10
      },
    thankView: {
      flex: 1,
      alignItems: 'center'
    }
    
  });