import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          height: 40,
          width: '100%',
          backgroundColor: 'white',
          flexDirection: 'row',
          marginLeft: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.drawerNavigation.openDrawer();
          }}>
          <Entypo name="menu" size={35} />
        </TouchableOpacity>
        {this.props.title ? (
          <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 30}}>
            {this.props.title}
          </Text>
        ) : (
          <View />
        )}
        <View style={{width: 35}} />
      </View>
    );
  }
}
