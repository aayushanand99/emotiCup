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
  Keyboard,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import colors from '../utils/colors';

const {width, height} = Dimensions.get('screen');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {sliderActiveSlide: 0};
  }
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
              bottom: '-30%',
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
          }}
          onPress={this.openScanner}>
          <Image
            source={require('../../assets/images/scanIcon.png')}
            resizeMode={'contain'}
            style={{
              height: 150,
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
        <Text
          style={{
            color: colors.black,
            position: 'absolute',
            bottom: 0,

            alignSelf: 'flex-start',
            fontSize: 25,
            fontWeight: '500',
            marginLeft: 10,
          }}>
          FAQ
        </Text>
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
});
