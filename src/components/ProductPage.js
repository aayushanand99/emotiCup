import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  FlatList,
  Text
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import WifiManager from 'react-native-wifi-reborn';
import {wifiCurrentSSID} from '../wifiManager';


const {width, height} = Dimensions.get('screen');
import colors from '../utils/colors';
import BackgroundTimer from 'react-native-background-timer';
import Toast from 'react-native-simple-toast';


export default class ProductPage extends Component {
    constructor(props) {
      super(props);
      this.state = {isLoading: true, data: []};
      //this.data = JSON.parse(this.props.route.params.QRData);

    }

    componentDidMount() {
        fetch('http://localhost:443/machine')
        .then((response) => response.json())
        .then((json) => {
          this.setState({ data: json[0] });
          console.log(json[0]);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });

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

    connectToWifi = (name, password, item) => {
      this.setState({ isLoading: true });
      let that = this;
      WifiManager.connectToProtectedSSID(
        name,
        password,
        false,
      ).then(
        () => {
          //that.setState({status: 'Connected successfully!'});
          this.setState({ isLoading: false });
          Toast.show("connected successfully ")

          this.props.navigation.navigate('Dispense', {
          item: item,
          machineUrl: this.state.data.machineUrl
          });
        },
        () => {
          //that.setState({status: 'Connection failed!'});
          this.setState({ isLoading: false });
          Toast.show("connection failed ")
        },
      );
    };

    selectProduct = (item) => {
        // this.props.navigation.navigate('Dispense', {
        //   key: item,
        // });
        this.connectToWifi(item.ssid, item.password, item)
    }
    
    render() {
      const { data, isLoading } = this.state;
      return (
        <View style={styles.container}>
          <View style={styles.rows}>
          {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data.products}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <TouchableOpacity
                      onPress={this.selectProduct.bind(this, item)}
                      >
                      <Image
                      source={require('../../assets/images/key2.jpg')}
                      resizeMode={'contain'}
                      style={{
                          width: width*0.5,
                          height: 200,
                          paddingVertical: 10
                      }}
                      />
                      
                </TouchableOpacity>
              )}
            />
          )}
          </View>
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

