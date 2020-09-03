import React, { Component } from 'react';
import { ScrollView, View, Button, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { CommonActions } from "@react-navigation/native"
import Spinner from 'react-native-loading-spinner-overlay';
import BackgroundTimer from 'react-native-background-timer';


const ITEM_WIDTH = Dimensions.get('window').width;

export default class OptionsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            keys: this.props.route.params.keys
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
        //this.timeoutNavigate();

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

    // timeoutNavigate = () => {
    //     this.timeout = setTimeout(() => {
    //         this.navigateToScanner();
    //     }, 15000);
    // }

    // navigateToScanner = () => {
    //     this.props.navigation.dispatch(
    //         CommonActions.reset({
    //             index: 0,
    //             routes: [{ name: "Scanner" }],
    //         })
    //     );
    // }

    callApi = (data) => {
        // this.setState({
        //     spinner: true,
        // })
        // fetch(data.url).then(response => {
        //     this.setState({
        //         spinner: false,
        //     })
        //     const statusCode = response.status;
        //     if (statusCode == 200) {
        //         this.navigateToCountdown(data);
        //     }
        //     else {
        //         alert("Please wait.");
        //     }
        // }).catch(error => {
        //     this.setState({
        //         spinner: false,
        //     })
        //     alert("Please wait.");
        // });

        this.props.navigation.navigate('Dispense', {
            item: data,
            });
    }

    // navigateToCountdown = (data) => {
    //     clearTimeout(this.timeout);
    //     this.props.navigation.dispatch(
    //         CommonActions.reset({
    //             index: 0,
    //             routes: [{ name: "Countdown", params: { data: data } }]
    //         }),
    //     );
    // }

    render() {
        let { keys } = this.state;
        let newData = this.data.filter(el => {
            return keys[el.key] == true;
        });
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Processing...'}
                    textStyle={{ color: '#FFF' }}
                />
                {newData && newData.length > 0 ?
                    <FlatList
                        data={newData}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', height: (ITEM_WIDTH) / 2 }}
                                onPress={() => this.callApi(item)} key={item.key}>
                                <Image
                                    style={{
                                        width: (ITEM_WIDTH) / 2, height: "100%", justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    source={item.image}
                                />
                            </TouchableOpacity>
                        )}
                    />
                    : null}
            </ScrollView >
        )
    }
}