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
  Alert,
  Platform,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Toast from 'react-native-simple-toast';
import BackgroundTimer from 'react-native-background-timer';
import {
  requestMultiple,
  PERMISSIONS,
  openSettings,
  request,
  check,
  RESULTS,
} from 'react-native-permissions';

import Header from './Header';

import colors from '../utils/colors';

const {width, height} = Dimensions.get('screen');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {sliderActiveSlide: 0};
  }

  componentDidMount() {
    let that = this;
    if (Platform.OS === 'ios') {
      requestMultiple([PERMISSIONS.IOS.CAMERA]).then((statuses) => {
        if (statuses[PERMISSIONS.IOS.CAMERA] !== 'granted') {
          Alert.alert(
            '',
            'Camera permission required',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Settings',
                onPress: () =>
                  openSettings().catch(() =>
                    console.warn('cannot open settings'),
                  ),
              },
            ],
            {cancelable: false},
          );
        }
      });
    } else {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                if (result != RESULTS.GRANTED) {
                  that.showCamerPermissionRequiredAlert();
                }
              });
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              that.showCamerPermissionRequiredAlert();
              break;
          }
        })
        .catch((error) => {
          Toast.show('Permission error');
        });
    }
    BackgroundTimer.stopBackgroundTimer();
    if (this.props.route.params) {
      if (this.props.route.params.error)
        Toast.show(this.props.route.params.error, Toast.LONG);
    }
  }

  showCamerPermissionRequiredAlert = () => {
    Alert.alert(
      '',
      'Camera permission required',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Settings',
          onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
      ],
      {cancelable: false},
    );
  };

  _renderCarouselImage = ({item, index}) => {
    return (
      <Image
        source={item}
        style={{height: '100%', width: width}}
        resizeMode="contain"
        key={index}
      />
    );
  };

  openScanner = () => {
    this.props.navigation.push('Scanner');
  };
  render() {
    return (
      <View style={styles.container}>
        <Header drawerNavigation={this.props.navigation} />
        <View>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: width * 0.9,
              height: height * 0.15,
              alignSelf: 'center',
              // backgroundColor: 'red',
              top: -10,
            }}
            resizeMode={'contain'}
          />
          <Text style={styles.subTextTitle}>Brewing Memories</Text>
        </View>
        <View style={styles.coverImageContainer}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={[
              require('../../assets/images/carousel1.jpg'),
              require('../../assets/images/carousel2.png'),
              require('../../assets/images/carousel3.jpg'),
              require('../../assets/images/carousel4.jpg'),
              require('../../assets/images/carousel5.jpg'),
            ]}
            renderItem={this._renderCarouselImage}
            sliderWidth={width}
            itemWidth={width}
            autoplay={true}
            autoplayDelay={500}
            automaticallyAdjustContentInsets={true}
            // snapToStart={true}
            loop={true}
            onSnapToItem={(index) => this.setState({sliderActiveSlide: index})}
          />
          <Pagination
            dotColor={colors.yellow}
            inactiveDotColor={'#adadad'}
            containerStyle={{
              // backgroundColor: 'red',
              // width: 100,
              // height: 100,
              position: 'absolute',
              bottom: '-20%',
              alignSelf: 'center',
            }}
            activeDotIndex={this.state.sliderActiveSlide}
            dotsLength={5}
            dotStyle={{width: 15, height: 15, borderRadius: 8}}
            carouselRef={this._carousel}
            tappableDots={!!this._carousel}
          />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: '20%',
            height: 170,
            width: 200,
            alignSelf: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            justifyContent: 'center',
            // backgroundColor: 'red',
          }}
          onPress={this.openScanner}>
          <Image
            source={require('../../assets/images/scanIcon.png')}
            resizeMode={'contain'}
            style={{
              height: Platform.OS === 'ios' ? 150 : 130,
              width: 200,
            }}
          />
          <Text
            style={{
              color: colors.yellow,
              // position: 'absolute',
              // bottom: '2%',
              // height: 150,

              alignSelf: 'center',
              fontSize: 25,
              fontWeight: '500',
            }}>
            Scan QR Code
          </Text>
        </TouchableOpacity>
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
});
