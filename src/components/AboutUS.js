import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import constants from '../utils/constants';
import Header from './Header';
import colors from '../utils/colors';
import {color} from 'react-native-reanimated';

export default class AboutUS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openIndices: []};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Header drawerNavigation={this.props.navigation} title={'About Us'} />
        <View style={styles.contentContainer}>
          <ScrollView>
            <Image
              source={require('../../assets/images/about-emoticup1.png')}
              style={styles.imageSizeLarge}
            />
            <Text style={styles.textSmall}>
              Emoticup brings a perfectly brewed cup of Tea and Coffee made with
              Fresh Milk and natural ingredients to corporates around the
              country. The best part is more than just what is in your cup. It’s
              a story of integrity and perseverance, and doing what’s right
              above all else. Our aim is to unite the global customers on the
              emoticup platform by offering very less known yet aromatic
              products across globe.
            </Text>
            <Image
              source={require('../../assets/images/about-emoticup-2.png')}
              style={styles.imageSizesmall}
              resizeMode="stretch"
            />
            <Text style={styles.textSmall}>
              The technology enabled, fully automatic machines are 100% process
              driven and a press of a button fills the cup with your choice of
              Tea or Coffee. We offer turn-key solutions for all kind of
              customers, from small offices to large-scale MNC’s having PAN
              India network. We create “Brewing Memories” !
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageSizeLarge: {
    height: 300,
    width: 500,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  imageSizesmall: {
    height: 200,
    width: '100%',

    alignSelf: 'center',
    marginTop: 10,
  },
  textSmall: {
    fontSize: 18,
    marginTop: 10,
  },
});
