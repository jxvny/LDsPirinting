import React, {
    useState,
    useEffect
} from "react";
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import {
    Layout,
    TopNav,
    Text,
    Section,
    SectionContent,
    Button,
} from "react-native-rapi-ui";
import {
    doc,
    getDoc,
} from 'firebase/firestore';
import { db } from '../provider/AuthProvider';
import { getAuth } from 'firebase/auth'
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
    //Get Auth
    const auth = getAuth();

    //Get userID
    const uid = (auth.currentUser?.uid);

    //State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState(0);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState(0);

    //Runs check data on mount
    useEffect(() => {
        checkData();
    })

    //Gets the user's shipping information from firestore if the user does not have data there it will be replaced with "N/A"
    const checkData = async () => {
        const docRef = doc(db, "users", uid, "ShippingInfo", "Info");
        const docSnap = (await getDoc(docRef));

        const userData = docSnap.data();

        if (docSnap.exists()) {
            console.log('User Data: ', userData)
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setAddress(userData.address);
            setZip(userData.zip);
            setPhone(userData.phone);
            setCity(userData.city);
            setState(userData.state);
        } else {
            setFirstName('N/A');
            setLastName('N/A');
            setAddress('N/A');
            setZip('N/A');
            setPhone('N/A');
            setCity('N/A');
            setState('N/A');
        }
    }

    return (
        <KeyboardAvoidingView
            behavior="height"
            enabled
            style={{
                flex: 1
            }}
        >
            <Layout>
                <TopNav
                    middleContent="Shipping Information"
                    leftContent={
                        <Ionicons
                            name="chevron-back"
                            size={20}
                        />
                    }
                    leftAction={() => navigation.goBack()}
                />
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                >
                    <Section>
                        <SectionContent>
                            <Text
                                style={{
                                    margin: 10,
                                }}
                            >
                                First Name: {firstName}
                            </Text>
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Last Name: {lastName}
                            </Text>
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Address: {address}
                            </Text>
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                City: {city}
                            </Text>
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                State: {state}
                            </Text>
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Zip Code: {zip}
                            </Text>
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Phone Number: {phone}
                            </Text>
                            <Button
                                style={{
                                    padding: 35,
                                    marginTop: 10,
                                }}
                                onPress={() => {
                                    navigation.navigate('UpdateShippingInfo')
                                }}
                                color='#0C134F'
                                text="Update Shipping Information"
                            />
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                            </View>
                        </SectionContent>
                    </Section>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}
