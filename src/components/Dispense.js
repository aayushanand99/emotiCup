import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  Modal,
  TouchableHighlight
} from 'react-native';

const {width, height} = Dimensions.get('screen');
import colors from '../utils/colors';
import BackgroundTimer from 'react-native-background-timer';
import { CommonActions } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-elements'






export default class Dispense extends Component {
    constructor(props) {
      super(props); 
      //this.selectedProduct = props.route.params.key;  
      
      this.state = {
        progress: 0,
        modalVisible: true,
      };
    }

    componentDidMount() {
        BackgroundTimer.stopBackgroundTimer();
    }

    componentWillUnmount() {
      BackgroundTimer.stopBackgroundTimer();
    }

    progress() {
        let progress = 0;
        this.setState({ progress });
        this.intervalID = setInterval(() => {
            progress += 0.08333333;
            if (progress > 1) {
              progress = 1;
              clearInterval(this.intervalID);
              this.completeDispense()
            }
            this.setState({ progress });
          }, 1000);
      }

    dispenseProduct = () => {
        this.setState({ modalVisible: false})
        this.progress();
        fetch('http://192.168.1.101/hot_water');
    }

    cancelDispense() {
        this.setState({ modalVisible: false})
        this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          );
    }

    completeDispense() {
        console.log('dispense completed');
        clearInterval(this.intervalID);
        this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'ThankYou'}],
            }),
          );
    }
    
    render() {
      const data = { keys: { key1: true, key2: true, key3: true}};
      return (
        <View style={styles.container}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
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
                        <View>
                            <Text>Keep Cup On the Tray</Text>
                        </View>
                        <View style={styles.modalBtnContainer}>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: colors.yellow }}
                                onPress={this.dispenseProduct.bind(this)}
                            >
                                <Text style={styles.textStyle}>Dispense</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{ position: 'absolute', top: '5%', right: '5%' }}>
                            <TouchableHighlight                                 
                            onPress={this.cancelDispense.bind(this)}
                            >
                                <Icon
                                name='close'
                                color='#517fa4'
                                />
                            </TouchableHighlight>
                        </View>

                        
                    </View>
                </View>
            </Modal>

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
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/images/key1.jpg")}
                    resizeMode={'contain'}
                    style={{
                        width: width*0.5,
                        height: 200,
                        paddingVertical: 10
                    }}
                />  
            </View>
            <View style={styles.progressContainer}>
                <Progress.Bar progress={this.state.progress} width={width*0.8} />
            </View>
            <View style={styles.imageContainer}>
                <TouchableHighlight                                 
                    onPress={this.completeDispense.bind(this)}
                >
                    <Image
                        source={require("../../assets/images/iconStop.png")}
                        resizeMode={'contain'}
                        style={{
                            width: width*0.3,
                            height: 100,
                            paddingVertical: 10
                        }}
                    />  
                </TouchableHighlight>
                <Text style={{ color: 'red'}}>Stop</Text>
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
    progressContainer: {
        padding: 20,
        alignSelf: 'center',
        alignItems: 'center',
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
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
  });
  