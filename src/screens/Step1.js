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
    Text,
} from "react-native-rapi-ui";
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../provider/AuthProvider";

export default function ({ navigation }) {
    // Get Auth
    const auth = getAuth();

    //Get userID
    const uid = (auth.currentUser?.uid);
    console.log('UserID: ', uid)
    //Create variable to store user's email
    const [userEmail, setUserEmail] = useState('N/A')

    //Depending on what item is chosen the app might have to navigate to a different screen to collect more information such as shirt size etc
    const checkStep = (item) => {
        console.log('Selected Item Data: ', item)
        // Only users can proceed
        if (!uid) {

            alert('Must be logged in to continue')

        } else {
            //Gets the user's email
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in
                    setUserEmail(user.email);
                    console.log('User Email:', user.email);
                    // You can use the userEmail in your code as needed
                }

            })
            if (item.SKU == 'LD017' || item.SKU == 'LD016') {
                navigation.navigate('Step2', {
                    userEmail,
                    pI: `${item.Image}`,
                    pT: `${item.Title}`,
                    pP: `${item.Pricing}`,
                    pS: `${item.SKU}`,
                })
            } else {
                navigation.navigate('Step3', {
                    userEmail,
                    pI: `${item.Image}`,
                    pT: `${item.Title}`,
                    pP: `${item.Pricing}`,
                    pS: `${item.SKU}`,
                    phone: 'N/A',
                    shirt: 'N/A',
                })
            }
        }
    }

    function Products() {
        //Create array to store all products and data from the collection
        const [products, setProducts] = useState([]);

        useEffect(() => {
            let products = [];

            //Create a querey to get all data from collection
            const querySnapshot = getDocs(collection(db, "Product")).then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    products.push({
                        ...doc.data(),
                        ket: doc.id,
                    });
                });
                //Sets the data from the collectionto the products array
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
                                alignItems: 'center',
                                width: 195,
                            }}
                        >
                            <Text
                                fontWeight='bold'
                                size='lg'
                                style={{
                                    padding: 5,
                                    paddingBottom: 15,
                                }}
                            >
                                {item.Title}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    checkStep(item)
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
                            </TouchableOpacity>
                            <Text
                                fontWeight='bold'
                                size="h4"
                                style={{
                                    padding: 5
                                }}
                            >
                                {item.Pricing}
                            </Text>
                        </View>
                    </View>
                )}
            />
        )
    }

    return (
        <Layout>
            <TopNav
                middleContent="Select An Item"
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
