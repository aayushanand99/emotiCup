import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', password: '', status: ''};
  }

  componentDidMount() {
    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        console.log('Your current connected wifi SSID is ' + ssid);
      },
      () => {
        console.log('Cannot get current SSID!');
      },
    );
  }

  connectToWifi = () => {
    let that = this;
    WifiManager.connectToProtectedSSID(
      this.state.name,
      this.state.password,
      false,
    ).then(
      () => {
        that.setState({status: 'Connected successfully!'});
      },
      () => {
        that.setState({status: 'Connection failed!'});
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => Keyboard.dismiss()}>
          <View style={styles.row}>
            <Text style={styles.text}>Wifi Name</Text>
            <TextInput
              value={this.state.name}
              onChangeText={(text) => this.setState({name: text})}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
              style={styles.input}
            />
          </View>
          <Button title="Connect" onPress={this.connectToWifi} />
          <Text style={{color: 'red'}}>{this.state.status}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    width: 150,
    marginLeft: 10,
  },
  text: {
    color: 'white',
  },
});
