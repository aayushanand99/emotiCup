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
import {CommonActions} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {Icon} from 'react-native-elements';

export default class Dispense extends Component {
  constructor(props) {
    super(props);
    this.selectedProduct = props.route.params.item;

    this.state = {
      progress: 0,
      ssid: props.route.params.ssid,
      keys: props.route.params.keys,
      spinnerDispense: false,
    };
  }

  componentDidMount() {
    BackgroundTimer.stopBackgroundTimer();
    this.progress();
    //this.dispenseProduct();
  }

  progress() {
    console.log('dispense');
    let progress = 0;
    this.setState({progress, displayMenuBtn: 0});
    this.intervalID = setInterval(() => {
      progress = this.state.progress;
      progress += this.selectedProduct.seconds/100;
      if (progress > 1) {
        this.setState({displayMenuBtn: 1})
      }
      if(progress > 1.8) {
        clearInterval(this.intervalID);
        this.completeDispense();
      }
      this.setState({progress});
    }, 1000);
  }

  // dispenseProduct = () => {
  //     this.progress();
  //     fetch(this.selectedProduct.url);
  // }

  cancelDispense() {
    console.log('dispense stopped');

    if(this.state.progress<1) {
      this.setState({
        spinnerDispense: true,
      });
      fetch(this.selectedProduct.url)
      .then((response) => {
        this.setState({
          spinnerDispense: false,
        });
        const statusCode = response.status;
        if (statusCode == 200) {
          this.setState({
            progress: 1,
          });
        } else {
          this.setState({
            spinnerDispense: false,
          });
          alert('Please wait.');
        }
      })
      .catch((error) => {
        this.setState({
          spinnerDispense: false,
        });
        alert('Please wait.');
      });
    } else {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'ThankYou', params: {ssid: this.state.ssid}}],
          }),
        );
    }
    
  }

  completeDispense() {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'ThankYou', params: {ssid: this.state.ssid}}],
      }),
    );
  }

  goBackToMenu() {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'Options',
            params: {
              keys: this.state.keys,
              ssid: this.state.ssid,
              timerDuration: 7000
            },
          },
        ],
      }),
    );
  }

  addCup(){
    this.setState({
      spinnerDispense: true,
    });
    fetch(this.selectedProduct.url)
    .then((response) => {
      this.setState({
        spinnerDispense: false,
      });
      const statusCode = response.status;
      if (statusCode == 200) {
        this.progress();
      } else {
        this.setState({
          spinnerDispense: false,
        });
        alert('Please wait.');
      }
    })
    .catch((error) => {
      this.setState({
        spinnerDispense: false,
      });
      alert('Please wait.');
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.spinnerDispense}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={require('../../assets/images/cupLoader.gif')}
                resizeMode={'contain'}
                style={{
                  width: width * 0.5,
                  height: 100,
                  paddingVertical: 5,
                }}
              />
              <Text>Processing...</Text>
            </View>
          </View>
        </Modal>

        <View>
          <Image
            source={require('../../assets/images/logo.jpeg')}
            style={{
              width: width * 0.9,
              height: height * 0.15,
              alignSelf: 'center',
              // backgroundColor: 'red',
              top: 0,
            }}
            resizeMode={'contain'}
          />
          {/* <Text style={styles.subTextTitle}>Brewing Memories</Text> */}
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/1.jpg')}
            resizeMode={'contain'}
            style={{
              width: width * 0.5,
              height: 200,
              paddingVertical: 10,
            }}
          />
        </View>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={this.state.progress}
            width={width * 0.8}
            color="#EBB53D"
            borderColor="#EBB53D"
          />
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={this.cancelDispense.bind(this)}>
            <Image
              source={require('../../assets/images/stop.png')}
              resizeMode={'contain'}
              style={{
                width: width * 0.3,
                height: 100,
                paddingVertical: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        {this.state.displayMenuBtn? (
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'red',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={this.goBackToMenu.bind(this)}>
              <Image
                source={require('../../assets/images/GoToMenu.png')}
                resizeMode={'contain'}
                style={{
                  width: width * 0.3,
                  height: 100,
                  paddingVertical: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addCup.bind(this)}>
              <Image
                source={require('../../assets/images/addAnotherCup.png')}
                resizeMode={'contain'}
                style={{
                  width: width * 0.3,
                  height: 100,
                  paddingVertical: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        ): null}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
