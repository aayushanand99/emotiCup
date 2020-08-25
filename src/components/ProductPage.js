import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';


const {width, height} = Dimensions.get('screen');
import colors from '../utils/colors';
import BackgroundTimer from 'react-native-background-timer';
import Toast from 'react-native-simple-toast';


export default class ProductPage extends Component {
    constructor(props) {
      super(props);
      this.state = {sliderActiveSlide: 0};
    }

    componentDidMount() {
        BackgroundTimer.runBackgroundTimer(() => { 
          console.log("Product timer");
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          );
          
          }, 
        15000); 
    }

    componentWillUnmount() {
      BackgroundTimer.stopBackgroundTimer();
    }

    selectProduct = (item) => {
        this.props.navigation.navigate('Dispense', {
          key: item,
        });
    }
    
    render() {
      const data = JSON.parse(this.props.route.params.QRData);
 
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.rows}>
                {Object.keys(data.keys).map((item) => {
                    console.log(item);
                    const image = `../../assets/images/${item}.jpg`;
                    console.log(image);
                    return (
                      <TouchableOpacity
                      onPress={this.selectProduct.bind(this, item)}
                      >
                      <Image
                      source={require("../../assets/images/key1.jpg")}
                      resizeMode={'contain'}
                      style={{
                          width: width*0.5,
                          height: 200,
                          paddingVertical: 10
                      }}
                      />
                      
                      </TouchableOpacity>
                    );
                })}
              
              
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    
    rows: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
  });