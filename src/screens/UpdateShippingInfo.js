import React, { useState } from "react";
import {
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import {
    Layout,
    TopNav,
    Text,
    Section,
    SectionContent,
    Picker,
    Button,
} from "react-native-rapi-ui";
import {
    doc,
    setDoc,
} from 'firebase/firestore';
import { db } from '../provider/AuthProvider';
import { getAuth } from 'firebase/auth'
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

    //Get Auth
    const auth = getAuth();

    //Get UserID
    const uid = (auth.currentUser?.uid);
    console.log("UserID: ", uid)

    //Create state variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState(0);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState(0);

    //Checks if Shipping information has beem entered correcly
    const updateSI = () => {

        if (firstName) {
            if (lastName) {
                if (address) {
                    if (zip) {
                        if (state) {
                            if (phone) {
                                pushSI();
                            } else { alert('Must enter a valid phone number') }
                        } else { alert('Must select your state') }
                    } else { alert('Must enter your zip code') }
                } else { alert('Must enter your address') }
            } else { alert('Must enter your last name') }
        } else {
            alert('Must enter your first name')
        }
    }

    //Sends shipping information into the firebase
    const pushSI = async () => {

        //Populate the date for doc
        let data = {
            firstName,
            lastName,
            zip,
            city,
            state,
            phone,
            address,
            uid,
        }
        console.log('Shipping Info: ', data)
        await setDoc(doc(db, "users", uid, "ShippingInfo", "Info"), data);
        alert('Update Successful')
        navigation.navigate('Home')
        console.log('Shipping information sent')
    }

    //Picker items for states and values
    const pickerItems = [
        { label: 'New Jersey', value: 'NJ' },
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorada', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Deleware', value: 'DE' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennslyvania', value: 'PA' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' },
    ];

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
                    middleContent="Update Shipping Information"
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
                                First Name:
                            </Text>
                            <TextInput
                                containerStyle={{
                                    marginTop: 15,
                                }}
                                placeholder=" Enter your first name"
                                maxLength={40}
                                value={firstName}
                                autoCapitalize="none"
                                autoCompleteType="off"
                                placeholderTextColor="#7d807c"
                                autoCorrect={false}
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderRadius: 90,
                                    borderColor: '#0C134F',
                                }}
                                onChangeText={text => setFirstName(text)}
                            />
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Last Name:
                            </Text>
                            <TextInput
                                containerStyle={{
                                    marginTop: 15,
                                }}
                                placeholder=" Enter your last name"
                                maxLength={40}
                                value={lastName}
                                autoCapitalize="none"
                                autoCompleteType="off"
                                placeholderTextColor="#7d807c"
                                autoCorrect={false}
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderRadius: 90,
                                    borderColor: '#0C134F',
                                }}
                                onChangeText={text => setLastName(text)}
                            />
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Address:
                            </Text>
                            <TextInput
                                containerStyle={{
                                    marginTop: 15,
                                }}
                                placeholder=" Enter your address"
                                maxLength={40}
                                value={address}
                                autoCapitalize="none"
                                autoCompleteType="off"
                                placeholderTextColor="#7d807c"
                                autoCorrect={false}
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderRadius: 90,
                                    borderColor: '#0C134F',
                                }}
                                onChangeText={text => setAddress(text)}
                            />
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                City:
                            </Text>
                            <TextInput
                                containerStyle={{
                                    marginTop: 15,
                                }}
                                placeholder=" Enter your city"
                                maxLength={40}
                                value={city}
                                autoCapitalize="none"
                                autoCompleteType="off"
                                placeholderTextColor="#7d807c"
                                autoCorrect={false}
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderRadius: 90,
                                    borderColor: '#0C134F',
                                }}
                                onChangeText={text => setCity(text)}
                            />
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                State:
                            </Text>
                            <Picker
                                items={pickerItems}
                                value={state}
                                placeholder="Select your state"
                                onValueChange={val => setState(val)}
                                iconColor="#0C134F"
                                borderRadius={90}
                                borderWidth={2}
                                borderColor="#0C134F"
                                selectionBorderRadius={90}
                                closeIconColor="#0C134F"
                            />
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Zip Code:
                            </Text>
                            <TextInput
                                containerStyle={{
                                    marginTop: 15,
                                }}
                                placeholder=" Enter your zip code"
                                maxLength={40}
                                value={zip}
                                autoCapitalize="none"
                                autoCompleteType="off"
                                placeholderTextColor="#7d807c"
                                autoCorrect={false}
                                keyboardType="numeric"
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderRadius: 90,
                                    borderColor: '#0C134F',
                                }}
                                onChangeText={text => setZip(text)}
                            />
                            <Text
                                style={{
                                    margin: 10,
                                    marginTop: 20,
                                }}
                            >
                                Phone Number:
                            </Text>
                            <TextInput
                                containerStyle={{
                                    marginTop: 15,
                                }}
                                placeholder=" Enter your phone number"
                                maxLength={40}
                                value={phone}
                                autoCapitalize="none"
                                autoCompleteType="off"
                                keyboardType="numeric"
                                placeholderTextColor="#7d807c"
                                autoCorrect={false}
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderRadius: 90,
                                    borderColor: '#0C134F',
                                }}
                                onChangeText={text => setPhone(text)}
                            />
                            <Button
                                style={{
                                    padding: 35,
                                    marginTop: 25,
                                }}
                                onPress={() => {
                                    updateSI();
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