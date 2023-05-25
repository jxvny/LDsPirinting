import React, {
    useState,
    useEffect
} from "react";
import {
    View,
    Image,
} from "react-native";
import {
    Layout,
    TopNav,
    Text,
    Button,
} from "react-native-rapi-ui";
import {
    collection,
    addDoc,
    doc,
    getDoc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import {
    getAuth,
} from "firebase/auth";
import { db } from '../provider/AuthProvider';
import { useRoute } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';



export default function ({ navigation }) {
    //Get imports
    const auth = getAuth();
    const route = useRoute();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    //Get userID
    const uid = (auth.currentUser?.uid);

    //Get data from previous screen
    const pI = route.params.pI;
    const pT = route.params.pT;
    const pP = route.params.pP;
    const pS = route.params.pS;
    const phone = route.params.phone;
    const shirt = route.params.shirt;
    const photo = route.params.photo;
    const userEmail = route.params.userEmail;
    console.log('Passed Data')
    console.log("Image URI: ", pI)
    console.log("Product Title: ", pT)
    console.log("Price: ", pP)
    console.log("SKU: ", pS)
    console.log("User Email: ", userEmail)
    console.log("Phone Type: ", phone)
    console.log("Shirt Size: ", shirt)
    console.log("Uploaded Photo URL: ", photo)
    //Create state variables
    const [loading, setLoading] = useState(false);

    //Shipping information state variables
    const [shippingInfoMSG, setShippingInfoMSG] = useState('Missing Shipping Information ');
    const [shippingInfo, setShippingInfo] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zip, setZip] = useState(0);
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    //Get Stripe API URL link
    const API_URL = 'https://1svh9t9jd6.execute-api.us-west-2.amazonaws.com/';

    console.log(pS, pP, pT, phone, shirt, userEmail,)

    //Get users shipping information
    async function startUp() {
        const docRef = doc(db, "users", uid, "ShippingInfo", 'Info');
        const docSnap = (await getDoc(docRef));
        const userData = docSnap.data();

        //Check if user shipping information exists
        if (docSnap.exists()) {
            console.log("Shipping Information: ", userData)
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setAddress(userData.address);
            setZip(userData.zip);
            setPhoneNumber(userData.phone);
            setCity(userData.city);
            setState(userData.state);
            setShippingInfo(true);
            setShippingInfoMSG('Shipping Info:');
        } else {
            //If it does not set variables to default
            setShippingInfo(false);
            setFirstName('N/A');
            setLastName('N/A');
            setAddress('N/A');
            setZip('N/A');
            setPhoneNumber('N/A');
            setCity('N/A');
            setState('N/A');
            setShippingInfoMSG('Missing Shipping Info');
        }
    }

    //Get data from server to initialize Stripe
    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/payment-sheet/${pS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    //Initialize Stripe to allow user purchase
    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        //Populate data for the payment sheet 
        const { error } = await initPaymentSheet({
            merchantDisplayName: "LD's Printing.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        } else {
            console.log('Error: ', error)
        }
    };

    //Run on mount
    useEffect(() => {
        setLoading(false);
        startUp();
        initializePaymentSheet();
    }, []);

    //Open payment sheet so user can enter information and check out
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            console.log("Error: ", error)
            alert(`Error: ${error.code}`, error.message);
        } else {
            alert('Success', 'Your order is confirmed!');
            completeCheckOut();
        }
    };

    //Check if user has filled out shipping information before checking out
    const buyNow = async () => {

        if (shippingInfo === true) {
            openPaymentSheet();
        } else {
            alert('Must update shipping information')
        }
    }

    //Complete checkout function 
    const completeCheckOut = async () => {

        //Creates date to save in firebase
        let month = "";
        let today = new Date();
        if ((today.getMonth() + 1) <= 9) {
            month = "0" + (today.getMonth() + 1);
        } else {
            month = (today.getMonth() + 1);
        }
        let dateSetter = today.getFullYear() + '-' + (month) + '-' + today.getDate();

        //Populate the data to be stored
        const data = {
            date: dateSetter,
            title: pT,
            price: pP,
            image: pI,
            phone: phone,
            photo: photo,
            shirt: shirt,
            user: uid,
            tracking: 'N/A',
            firstName: firstName,
            lastName: lastName,
            city: city,
            state: state,
            address: address,
            zip: zip,
            status: 'Preparation',
            phoneNumber: phoneNumber,
            userEmail,
        };
        console.log("Data: ", data)
        //Save the data
        const docref = doc(collection(db, "users"), uid);
        const colref = collection(docref, "orders");
        const userDoc = await addDoc(colref, data);
        const docKey = userDoc.id

        //This data is different to store users doc location in order to allow the master user to modify the data
        const data1 = {
            date: dateSetter,
            title: pT,
            price: pP,
            image: pI,
            phone: phone,
            photo: photo,
            shirt: shirt,
            user: uid,
            tracking: 'N/A',
            firstName: firstName,
            lastName: lastName,
            city: city,
            state: state,
            address: address,
            zip: zip,
            status: 'Preparation',
            phoneNumber: phoneNumber,
            userEmail: userEmail,
            docKey: docKey,
        };

        //Saves the data into the master users order location
        await addDoc(collection(db, "CompletedOrders"), data1);
        console.log('Data1: ', data1)

        //navigates to the thank you screen
        navigation.navigate("ThankYou");
    }

    return (
        <Layout>
            <TopNav
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
                }}
            >
                <Text
                    fontWeight='bold'
                    size="h3"
                    style={{
                        paddingTop: 15,
                    }}
                >
                    {pT}
                </Text>
                <Image
                    style={{
                        padding: 20,
                        margin: 20,
                        height: 300,
                        width: 300,
                        borderRadius: 15,
                        borderWidth: 3,
                        borderColor: '#0C134F'

                    }}
                    source={{ uri: photo }}
                />
                <Text
                    fontWeight='bold'
                    size="h4"
                    style={{
                        padding: 5,
                    }}
                >
                    ${pP}
                </Text>
                <Text
                    style={{
                        marginTop: 15,
                    }}
                >
                    {shippingInfoMSG}
                </Text>
                {
                    shippingInfo && <Text>
                        {firstName} {lastName}
                    </Text>
                }
                {
                    shippingInfo && <Text>
                        {address}
                    </Text>
                }
                {
                    shippingInfo && <Text>
                        {city}, {state}, {zip},
                    </Text>
                }
                <Button
                    style={{ marginTop: 15, }}
                    text="Update Shipping Information"
                    onPress={() => {
                        navigation.navigate('UpdateShippingInfo')
                    }}
                />
                <Button
                    disabled={!loading}
                    style={{
                        padding: 10,
                        margin: 10,
                        height: 50,
                    }}
                    text='Buy Now'
                    onPress={() => {
                        buyNow()
                    }}
                />
            </View>
        </Layout>
    );
}