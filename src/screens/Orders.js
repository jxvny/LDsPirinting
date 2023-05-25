import React, {
    useState,
    useEffect
} from "react";
import {
    View,
    FlatList,
} from "react-native";
import {
    Layout,
    TopNav,
    Text,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
    getAuth,
} from "firebase/auth";
import { db } from '../provider/AuthProvider';
import {
    collection,
    getDocs,
} from 'firebase/firestore';

export default function ({ navigation }) {

    //Get Auth
    const auth = getAuth();

    //Get userID
    const uid = auth.currentUser?.uid;
    console.log('User ID: ', uid)

    //Create messages bool to enable the hidden message
    const [showMessage, setShowMessage] = useState(true);

    //Create array that will store all information from the docs in the collection
    const [orders, setOrders] = useState([]);

    //Runs fetchOrders() on mount
    useEffect(() => {
        fetchOrders();
    }, []);

    //Fetch orders gathers all orders from firebase and sets the information onto the orders array
    const fetchOrders = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users', uid, 'orders'));
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
                            <Text>
                                {item.address}
                            </Text>
                            <Text>
                                {item.city}, {item.state}, {item.zip}
                            </Text>
                        </View>
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