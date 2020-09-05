import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import constants from '../utils/constants';
import Header from './Header';
import colors from '../utils/colors';
import {color} from 'react-native-reanimated';

export default class ContactUs extends React.Component {
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
        <Header drawerNavigation={this.props.navigation} title={'Contact Us'} />
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <AntDesign name={'phone'} size={25} color={colors.yellow} />
              <Text style={styles.boldText}>Phone</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={styles.textDetail}>080 3200 6600</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Entypo name={'email'} size={25} color={colors.yellow} />
              <Text style={styles.boldText}>Email</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={styles.textDetail}>info@emoticup.com</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <MaterialIcons name={'web'} size={25} color={colors.yellow} />
              <Text style={styles.boldText}>Website</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={styles.textDetail}>www.emoticup.com</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Entypo name={'address'} size={25} color={colors.yellow} />
              <Text style={[styles.boldText, {fontSize: 20}]}>Address</Text>
            </View>
            <View style={styles.flex2}>
              <Text
                style={
                  styles.textDetail
                }>{`No. 949, 39th Cross, 24th Main, Jayanagar 4th T Block,  Bangalore – 560041`}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    // paddingHorizontal: 10,
    paddingVertical: 10,
  },
  boldText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textDetail: {
    fontSize: 22,
    marginLeft: 10,
  },
  flex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  flex2: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.yellow,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
