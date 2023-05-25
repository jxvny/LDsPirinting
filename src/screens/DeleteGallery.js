import React, {
    useEffect,
    useState
} from "react";
import {
    FlatList,
    View,
    TouchableOpacity,
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
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../provider/AuthProvider";

export default function ({ navigation }) {

    function Products() {
        //Creates arrasy to store all doc information from gallery
        const [products, setProducts] = useState([]);

        //Runs the function on mount
        useEffect(() => {
            fetchProducts();
        }, []);

        //Gathers all the docs in the Gallery collection and sets it to the products array
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Gallery'));
                const fetchedProducts = [];
                querySnapshot.forEach((doc) => {
                    fetchedProducts.push({
                        ...doc.data(),
                        key: doc.id,
                    });
                });
                setProducts(fetchedProducts);
            } catch (error) {
                console.log('Error: ', error);
            }
        };

        //Deletes a specific doc using the propID passed in 
        const deleteProduct = async (productId) => {
            try {
                await deleteDoc(doc(db, 'Gallery', productId));

                // Refresh the product list after successful deletion
                fetchProducts();
            } catch (error) {
                console.log('Error: ', error);
            }
        };
        return (
            <FlatList
                data={products}
                horizontal={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 'wrap',
                            resizeMode: 'contain'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => deleteProduct(item.key)}
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
                                source={{ uri: item.Image }}
                                style={{
                                    height: 175,
                                    width: 175,
                                    alignItems: 'center',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        );
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
