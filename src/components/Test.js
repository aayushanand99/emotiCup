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
// import WifiManager from 'react-native-wifi-reborn';
import {wifiCurrentSSID} from '../wifiManager';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', password: '', status: '', currentSSID: ''};
  }

  componentDidMount() {
    // WifiManager.getCurrentWifiSSID().then(
    //   (ssid) => {
    //     console.log('Your current connected wifi SSID is ' + ssid);
    //   },
    //   () => {
    //     console.log('Cannot get current SSID!');
    //   },
    // );
  }

  connectToWifi = () => {
    let that = this;
    // WifiManager.connectToProtectedSSID(
    //   this.state.name,
    //   this.state.password,
    //   false,
    // ).then(
    //   () => {
    //     that.setState({status: 'Connected successfully!'});
    //   },
    //   () => {
    //     that.setState({status: 'Connection failed!'});
    //   },
    // );
    alert(wifiCurrentSSID());
  };

  detectSSID = () => {
    wifiCurrentSSID()
      .then((res) => {
        this.setState({ssidStatus: JSON.stringify(res)});
      })
      .catch((err) => {
        this.setState({ssidStatus: err.message});
      });
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

          <Button title="Detect SSID" onPress={() => this.detectSSID()} />
          <Text style={{color: 'red'}}>{this.state.ssidStatus}</Text>

          <View style={styles.row}>
            <Text style={styles.text}>Current Wifi SSID</Text>
            <TextInput
              value={this.state.currentSSID}
              onChangeText={(text) => this.setState({currentSSID: text})}
              style={styles.input}
            />
          </View>
          <Button title="disconnect wifi" onPress={() => this.disconnect()} />
          <Text style={{color: 'red'}}>{this.state.ssidStatus}</Text>
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
