import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Modal, Text } from "react-native";
import { CommonActions } from "@react-navigation/native"
import Spinner from 'react-native-loading-spinner-overlay';
import BackgroundTimer from 'react-native-background-timer';
import Toast from 'react-native-simple-toast';
const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = Dimensions.get('window').width;

export default class OptionsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            keys: props.route.params.keys,
            ssid: props.route.params.ssid,
        }

        this.data = [
            {
                key: "key1",
                image: require("../assets/images/1.jpg"),
                name: "Black Tea",
                url: "http://192.168.1.101/black_tea",
                seconds:10
            },
            {
                key: "key2",
                image: require("../assets/images/2.jpg"),
                name: "Black Coffee",
                url: "http://192.168.1.101/black_coffee",
                seconds:10
            },
            {
                key: "key3",
                image: require("../assets/images/3.jpg"),
                name: "Tea",
                url: "http://192.168.1.101/tea",
                seconds:10
            },
            {
                key: "key4",
                image: require("../assets/images/4.jpg"),
                name: "Coffee",
                url: "http://192.168.1.101/coffee",
                seconds:10
            },
            {
                key: "key5",
                image: require("../assets/images/5.jpg"),
                name: "Light Tea",
                url: "http://192.168.1.101/light_tea",
                seconds:10
            },
            {
                key: "key6",
                image: require("../assets/images/6.jpg"),
                name: "Light Coffee",
                url: "http://192.168.1.101/light_coffee",
                seconds:10
            },
            {
                key: "key7",
                image: require("../assets/images/7.jpg"),
                name: "Strong Tea",
                url: "http://192.168.1.101/strong_tea",
                seconds:10
            },
            {
                key: "key8",
                image: require("../assets/images/8.jpg"),
                name: "Strong Coffee",
                url: "http://192.168.1.101/strong_coffee",
                seconds:10
            },
            {
                key: "key9",
                image: require("../assets/images/9.jpg"),
                name: "Hot Milk",
                url: "http://192.168.1.101/milk",
                seconds:7
            },
            {
                key: "key10",
                image: require("../assets/images/10.jpg"),
                name: "Hot Water",
                url: "http://192.168.1.101/hot_water",
                seconds:5
            },
            {
                key: "key11",
                image: require("../assets/images/11.jpg"),
                name: "Steam",
                url: "http://192.168.1.101/steam",
                seconds:5
            }
        ];

        this.timeout;
    }

    componentDidMount() {

        BackgroundTimer.runBackgroundTimer(() => { 
            console.log("Product timer");
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Home' , params: { error: "Selection Timeout" }}],
              }),
            );
            
            }, 
          15000); 
    }

    componentWillUnmount() {
        BackgroundTimer.stopBackgroundTimer();
    }


    callApi(data) {

        this.setState({
            spinner: true,
        })

        console.log("prduct pressed");

        fetch(data.url).then(response => {
            this.setState({
                spinner: false,
            })
            const statusCode = response.status;
            if (statusCode == 200) {
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Dispense", params: { item: data, ssid: this.state.ssid } }]
                    }),
                );
                return 1;
            }
            else {
                this.setState({
                    spinner: false,
                })
                BackgroundTimer.stopBackgroundTimer();
                this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'Home', params: { error: "Network Failure" }}],
                    }),
                  );
            }
        }).catch(error => {
            this.setState({
                spinner: false,
            })
            BackgroundTimer.stopBackgroundTimer();
            Toast.show("Network Failure")
            this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Home', params: { error: "Network Failure" }}],
                }),
              );
        });

        
    }

    render() {
        let { keys } = this.state;
        let newData = this.data.filter(el => {
            return keys[el.key] == true;
        });
        return (
            <View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.spinner}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <Image
                                    source={require("../../assets/images/cupLoader.gif")}
                                    resizeMode={'contain'}
                                    style={{
                                        width: width*0.5,
                                        height: 100,
                                        paddingVertical: 5
                                    }}
                                />  
                            </View>
                            <Text>Processing...</Text>
                        </View>
                    </View>
                </Modal>
                {newData && newData.length > 0 ?
                    <FlatList
                        data={newData}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', height: (ITEM_WIDTH) / 2 }}
                                onPress={() => this.callApi(item)} key={item.key}
                                disabled={this.state.spinner}
                                >
                                <Image
                                    style={{
                                        width: (ITEM_WIDTH) / 2, height: "100%", justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    source={item.image}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.key}
                    />
                    : null}
            </View >
        )
    }
}


const styles = StyleSheet.create({
    
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
  },
  modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
  }
  });
  