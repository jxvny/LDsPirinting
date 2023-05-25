import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import {
    Layout,
    TopNav,
    Text,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { db } from '../provider/AuthProvider';
import {
    collection,
    getDocs,
} from 'firebase/firestore';

export default function ({ navigation }) {

    // Show no orders have been placed if none have been placed
    const [showMessage, setShowMessage] = useState(true);

    //orders stores the data from the docs in the collection
    const [orders, setOrders] = useState([]);

    //Navigates to a screen to modify a specific order
    const editOrder = (item) => {
        console.log('Order Info: ', item)
        navigation.navigate('EditOrder', {
            item,
        })

    }
    //Runs the fetch Orders on mount
    useEffect(() => {
        fetchOrders();
    }, []);

    //Gathers all orders from firebase
    const fetchOrders = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'CompletedOrders'));
            const fetchedOrders = [];
            querySnapshot.forEach((doc) => {
                fetchedOrders.push({
                    ...doc.data(),
                    key: doc.id,
                });
            });
            setOrders(fetchedOrders);
            setShowMessage(fetchedOrders.length === 0);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    return (
        <Layout>
            <TopNav
                middleContent="Orders"
                leftContent={
                    <Ionicons
                        name="chevron-back"
                        size={20}
                    />
                }
                leftAction={() => navigation.goBack()}
            />
            <View
                style={{
                    flex: 1,
                    marginTop: 30,
                }}
            >
                <FlatList
                    data={orders}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                editOrder(item)
                            }}
                        >
                            <View
                                style={{
                                    padding: 15,
                                    margin: 15,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 10,
                                    borderWidth: 3,
                                    borderColor: '#0C134F',
                                    alignItems: 'center',
                                }}
                            >
                                <Text>
                                    Order No: {item.key}
                                </Text>
                                <Text>
                                    Purchased On: {item.date}
                                </Text>
                                <Text>
                                    Item Purchased: {item.title}
                                </Text>
                                <Text>
                                    Status: {item.status}
                                </Text>
                                <Text>
                                    Tracking: {item.tracking}
                                </Text>
                                <Text>
                                    Shipping To: {item.firstName} {item.lastName}
                                </Text>
                                <Text>{item.address}</Text>
                                <Text>
                                    {item.city}, {item.state}, {item.zip}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                {
                    showMessage && <Text
                        size='h3'
                        fontWeight='bold'
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginBottom: 500,
                        }}
                    >
                        No orders have been placed
                    </Text>
                }
            </View>
        </Layout>
    );
}