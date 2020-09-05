import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import constants from '../utils/constants';
import Header from './Header';
import colors from '../utils/colors';
import {color} from 'react-native-reanimated';

export default class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openIndices: []};
  }

  addToOpenIndices = (index) => {
    let openIndices = this.state.openIndices;
    openIndices.push(index);
    this.setState({openIndices});
  };

  removeFromOpenIndices = (index) => {
    let openIndices = this.state.openIndices;
    openIndices = openIndices.filter((item) => item != index);
    this.setState({openIndices});
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
        <Header drawerNavigation={this.props.navigation} title={'FAQ'} />
        <ScrollView style={{backgroundColor: '#fff', paddingHorizontal: 10}}>
          {constants.FAQ_DATA.map((item, index) => {
            if (this.state.openIndices.indexOf(index) != -1)
              return (
                <TouchableOpacity
                  style={styles.faqItemBox}
                  onPress={() => this.removeFromOpenIndices(index)}
                  key={index}>
                  <Text style={styles.question}>
                    <FontAwesome
                      name={'question'}
                      size={25}
                      color={colors.yellow}
                    />
                    {`  ${item.question.trim()}`}
                  </Text>
                  <Text style={styles.answer}>
                    <FontAwesome
                      name={'angle-double-right'}
                      size={25}
                      color={colors.yellow}
                    />
                    {`  ${item.answer.trim()}`}
                  </Text>
                </TouchableOpacity>
              );
            else
              return (
                <TouchableOpacity
                  style={styles.faqItemBox}
                  onPress={() => this.addToOpenIndices(index)}
                  key={index}>
                  <Text style={styles.question}>
                    <FontAwesome
                      name={'question'}
                      size={25}
                      color={colors.yellow}
                    />
                    {`  ${item.question.trim()}`}
                  </Text>
                </TouchableOpacity>
              );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  faqItemBox: {
    padding: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: colors.yellow,
    marginTop: 20,
  },
});
