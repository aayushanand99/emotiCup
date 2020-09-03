import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';


const {width, height} = Dimensions.get('screen');
import colors from '../utils/colors';
import BackgroundTimer from 'react-native-background-timer';


export default class ThankYou extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        BackgroundTimer.runBackgroundTimer(() => { 
          console.log("Product timer");
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          );
          }, 
        5000); 
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
            <View style={styles.centeredView}>
                <Image
                    source={require("../../assets/images/iconSmile.jpg")}
                    resizeMode={'contain'}
                    style={{
                        width: width*0.5,
                        height: 200,
                        paddingVertical: 10
                    }}
                />  
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
        top: 70,
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    
  });