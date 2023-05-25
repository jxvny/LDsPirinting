import React, {
    useEffect,
    useState
} from "react";
import {
    FlatList,
    View,
    Image
} from "react-native";
import {
    Layout,
    TopNav,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "../provider/AuthProvider";

export default function ({ navigation }) {

    function Products() {

        //Creates array to store all data from the collection
        const [products, setProducts] = useState([]);

        // Runs the function on mount
        useEffect(() => {
            let products = [];

            //Creates a query to move all data from the collection into the array
            const querySnapshot = getDocs(collection(db, "Gallery",)).then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    products.push({
                        ...doc.data(),
                        ket: doc.id,
                    });
                });
                setProducts(products);
            })
        })

        return (
            <FlatList
                data={products}
                horizontal={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 'wrap',
                            resizeMode: 'contain',
                        }}
                    >
                        <View
                            style={{
                                padding: 5,
                                margin: 5,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                borderColor: '#0C134F',
                                borderWidth: 3,
                                alignItems: 'center',
                                width: 195,
                            }}
                        >
                            <Image
                                source={{ url: `${item.Image}` }}
                                style={{
                                    height: 175,
                                    width: 175,
                                    alignItems: 'center',
                                }}
                            />
                        </View>
                    </View>
                )}
            />
        )
    }

    return (
        <Layout>
            <TopNav
                middleContent="Gallery"
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
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#FFFFFF',
                    resizeMode: 'contain',
                }}
            >
                <Products />
            </View>
        </Layout>
    );
}
