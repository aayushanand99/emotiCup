import React from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import Header from './Header';
import colors from '../utils/colors';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', name: '', phone: ''};
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
        <Header drawerNavigation={this.props.navigation} />
        <View
          style={{
            justifyContent: 'center',
            width: '96%',
            alignItems: 'center',
          }}>
          <TextInput
            label="Email"
            mode="outlined"
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
            style={{width: '100%', marginTop: 30}}
            underlineColor={'#000'}
            selectionColor={'#000'}
          />
          <TextInput
            label="Name"
            mode="outlined"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
            style={{width: '100%', marginTop: 30}}
            underlineColor={'#000'}
            selectionColor={'#000'}
          />
          <TextInput
            label="Phone Number"
            mode="outlined"
            value={this.state.phone}
            onChangeText={(text) => this.setState({phone: text})}
            style={{width: '100%', marginTop: 30}}
            underlineColor={'black'}
            selectionColor={'#000'}
          />
          <Button
            mode="contained"
            style={{
              backgroundColor: colors.yellow,
              color: 'white',
              marginTop: 50,
            }}
            contentStyle={{
              height: 50,
              width: 100,
            }}
            onPress={() => console.log('Pressed')}>
            Save
          </Button>
        </View>
      </View>
    );
  }
}
