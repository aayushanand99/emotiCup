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
      this.selectedProduct = props.route.params.item; 
      
      this.state = {
        progress: 0,
        ssid: props.route.params.ssid,
        spinnerDispense: false
      };
    }

    componentDidMount() {
        BackgroundTimer.stopBackgroundTimer();
        this.dispenseProduct();
    }


    progress() {
        console.log("dispense");
        let progress = 0;
        this.setState({ progress });
        this.intervalID = setInterval(() => {
            progress = this.state.progress
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
        this.progress();
        fetch(this.selectedProduct.url);
    }

    cancelDispense() {
        console.log('dispense stopped');

        this.setState({
            spinnerDispense: true,
        })
        fetch(this.selectedProduct.url).then(response => {
            this.setState({
                spinnerDispense: false,
            })
            const statusCode = response.status;
            if (statusCode == 200) {
                this.setState({
                    progress: 2,
                });
            }
            else {
                this.setState({
                    spinnerDispense: false,
                })
                alert("Please wait.");
            }
        }).catch(error => {
            this.setState({
                spinnerDispense: false,
            })
            alert("Please wait.");
        });
    }

    completeDispense() {
        console.log('dispense completed');
        clearInterval(this.intervalID);
        this.props.navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: "ThankYou", params: { ssid: this.state.ssid } }]
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
                visible={this.state.spinnerDispense}
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
                                <Text>Processing...</Text>

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
                    source={this.selectedProduct.image}
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
                <TouchableOpacity                                 
                    onPress={this.cancelDispense.bind(this)}
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
                </TouchableOpacity>
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
  