import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Header from './Header';
import colors from '../utils/colors';
import {TabRouter} from '@react-navigation/native';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodFeedback: false,
      badFeedback: false,
      quality: false,
      service: false,
      other: '',
      badFeedbackSubmitted: false,
    };
  }

  goodFeedbackPressed = () => {
    this.setState({goodFeedback: true});
  };

  badFeedbackPressed = () => {
    this.setState({badFeedback: true});
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Header drawerNavigation={this.props.navigation} />
        <View
          style={{
            justifyContent: 'center',
            width: '96%',
            alignItems: 'center',
            flex: 1,
          }}>
          {this.state.goodFeedback === false &&
            this.state.badFeedback === false && (
              <TouchableOpacity
                style={styles.goodFeedbackIconContainer}
                onPress={this.goodFeedbackPressed}>
                <Image
                  source={require('../../assets/images/goodFeedback.png')}
                />
              </TouchableOpacity>
            )}
          {this.state.goodFeedback === false &&
            this.state.badFeedback === false &&
            this.state.badFeedbackSubmitted === false && (
              <TouchableOpacity
                style={styles.badFeedbackIconContainer}
                onPress={this.badFeedbackPressed}>
                <Image
                  source={require('../../assets/images/goodFeedback.png')}
                />
              </TouchableOpacity>
            )}

          {this.state.goodFeedback && (
            <View style={styles.goodFeedbackMessageCont}>
              <Text style={styles.textBold}>
                Thank you for choosing Emoticup
              </Text>
              <Text style={styles.textItallic}>Stay Safe - Stay Healthy</Text>
            </View>
          )}
          {this.state.badFeedback && this.state.badFeedbackSubmitted === false && (
            <View style={styles.badFeedbackMessageCont}>
              <Text style={styles.textBold}>Choose the reason(s)</Text>
              <View
                style={[
                  styles.row,
                  {
                    borderWidth: 1,
                    borderColor: colors.yellow,
                    paddingVertical: 10,
                  },
                ]}>
                <View
                  style={[
                    styles.flex1,
                    {
                      borderLeftWidth: 1,
                      borderRightWidth: 0.5,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <Text style={styles.issueFont}>Quality</Text>
                </View>
                <View
                  style={[
                    styles.flex1,
                    {
                      justifyContent: 'center',
                      borderLeftWidth: 0.5,
                      borderRightWidth: 1,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <CheckBox
                    value={this.state.quality}
                    onValueChange={() =>
                      this.setState({quality: !this.state.quality})
                    }
                    boxType="square"
                    onCheckColor={colors.yellow}
                    onTintColor={colors.yellow}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.row,
                  {
                    borderWidth: 1,
                    borderColor: colors.yellow,
                    paddingVertical: 10,
                  },
                ]}>
                <View
                  style={[
                    styles.flex1,
                    {
                      borderLeftWidth: 1,
                      borderRightWidth: 0.5,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <Text style={styles.issueFont}>Service</Text>
                </View>
                <View
                  style={[
                    styles.flex1,
                    {
                      justifyContent: 'center',
                      borderLeftWidth: 0.5,
                      borderRightWidth: 1,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <CheckBox
                    value={this.state.service}
                    onValueChange={() =>
                      this.setState({service: !this.state.service})
                    }
                    boxType="square"
                    onCheckColor={colors.yellow}
                    onTintColor={colors.yellow}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.row,
                  {
                    borderWidth: 1,
                    borderColor: colors.yellow,
                    paddingVertical: 10,
                  },
                ]}>
                <View
                  style={[
                    styles.flex1,
                    {
                      borderLeftWidth: 1,
                      borderRightWidth: 0.5,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <Text style={styles.issueFont}>Other</Text>
                </View>
                <View
                  style={[
                    styles.flex1,
                    {
                      justifyContent: 'center',
                      borderLeftWidth: 0.5,
                      borderRightWidth: 1,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <TextInput
                    value={this.state.other}
                    placeholder={'Type your feedback'}
                    style={{fontSize: 15, height: 25}}
                    onChangeText={(text) => this.setState({other: text})}
                  />
                </View>
              </View>
              <Text style={[styles.textBold, {marginTop: 10}]}>
                Please let us know about you
              </Text>
              <View
                style={[
                  styles.row,
                  {
                    borderWidth: 1,
                    borderColor: colors.yellow,
                    paddingVertical: 10,
                  },
                ]}>
                <View
                  style={[
                    styles.flex1,
                    {
                      borderLeftWidth: 1,
                      borderRightWidth: 0.5,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <Text style={styles.issueFont}>Name</Text>
                </View>
                <View
                  style={[
                    styles.flex1,
                    {
                      justifyContent: 'center',
                      borderLeftWidth: 0.5,
                      borderRightWidth: 1,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <TextInput
                    value={this.state.name}
                    placeholder={'Name'}
                    style={{fontSize: 15, height: 25}}
                    onChangeText={(text) => this.setState({name: text})}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  {
                    borderWidth: 1,
                    borderColor: colors.yellow,
                    paddingVertical: 10,
                  },
                ]}>
                <View
                  style={[
                    styles.flex1,
                    {
                      borderLeftWidth: 1,
                      borderRightWidth: 0.5,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <Text style={styles.issueFont}>Email Id</Text>
                </View>
                <View
                  style={[
                    styles.flex1,
                    {
                      justifyContent: 'center',
                      borderLeftWidth: 0.5,
                      borderRightWidth: 1,
                      borderColor: colors.yellow,
                    },
                  ]}>
                  <TextInput
                    value={this.state.email}
                    placeholder={'Email'}
                    style={{fontSize: 15, height: 25}}
                    onChangeText={(text) => this.setState({email: text})}
                  />
                </View>
              </View>

              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.yellow,
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 50,
                }}
                contentStyle={{
                  height: 50,
                  width: 100,
                }}
                onPress={() => this.setState({badFeedbackSubmitted: true})}>
                Submit
              </Button>
            </View>
          )}
          {this.state.goodFeedback === false &&
            this.state.badFeedback === true &&
            this.state.badFeedbackSubmitted === true && (
              <View style={styles.goodFeedbackMessageCont}>
                <Text style={styles.textBold}>
                  Thank you for choosing Emoticup
                </Text>
                <Text style={styles.textItallic}>We will revert shortly</Text>
              </View>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goodFeedbackIconContainer: {
    position: 'absolute',
    top: '30%',
    left: '20%',
  },
  badFeedbackIconContainer: {
    position: 'absolute',
    top: '30%',
    right: '20%',
  },
  goodFeedbackMessageCont: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.yellow,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  badFeedbackMessageCont: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textItallic: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  flex1: {
    flex: 1,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    borderColor: 'red',
    height: 20,
    width: 20,
  },
  issueFont: {
    fontWeight: '400',
    fontSize: 20,
  },
});
