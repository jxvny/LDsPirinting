import React, {
    useState,
    useEffect
} from "react";
import {
    View,
    Image,
    TextInput,
    Linking,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import {
    Layout,
    Button,
    TopNav,
    Section,
    SectionContent,
    Text,
    Picker,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
    collection,
    setDoc,
    doc,
} from 'firebase/firestore';
import { db } from '../provider/AuthProvider';
import { useRoute } from '@react-navigation/native';


export default function ({ navigation }) {
    // Get Route
    const route = useRoute();

    // Get data from previous screen
    const item = route.params.item;
    console.log('Order Info: ', item)

    //State Variables
    const [tracking, setTracking] = useState(item.tracking)
    const [status, setStatus] = useState(item.status)

    //Call checkTracking on mount
    useEffect(() => {
        checkTracking()
    }, [])

    //If Tracking is 'N/A' this function allows the placeholder text to display instead
    const checkTracking = () => {
        if (tracking === 'N/A') {
            setTracking(null)
        }
    }

    // Stores the picker items for the status picker
    const pickerItems = [
        { label: 'Preparation', value: 'Preparation' },
        { label: 'Building', value: 'Building' },
        { label: 'Shipped', value: 'Shipped' },
        { label: 'Delivered', value: 'Delivered' },
    ];

    // Submits the modifications to the document
    const submitChanges = async () => {
        const data = item
        data.tracking = tracking;
        data.status = status
        console.log('Tracking: ', tracking)
        console.log("Status: ", status)

        //Submits changes to the Master Order screen
        const collectionRef = collection(db, "CompletedOrders");
        const docRef = doc(collectionRef, item.key);
        await setDoc(docRef, data);

        //Submit changes to the users order screen
        const collectionRef1 = collection(db, "users", item.user, "orders");
        const docRef1 = doc(collectionRef1, item.docKey);
        await setDoc(docRef1, data);

        alert('Success')
        navigation.goBack()
    }

    const space = '                                                        ';

    return (
        <KeyboardAvoidingView
            behavior="height"
            enabled
            style={{
                flex: 1
            }}
        >
            <Layout
                backgroundColor='#FFFFFF'
            >
                <TopNav
                    leftContent={
                        <Ionicons
                            name="chevron-back"
                            size={20}
                        />
                    }
                    leftAction={() => navigation.goBack()}
                />
                <ScrollView>
                    <Section>
                        <SectionContent>
                            <View
                                style={{
                                    alignItems: 'center',
                                }}
                            >
                                <Text>
                                    {space}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(item.photo)
                                    }}
                                >
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
                                        source={{ uri: item.photo }}
                                    />
                                </TouchableOpacity>
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
                                    Status: {status}
                                </Text>
                                <Text>
                                    Tracking: {tracking}
                                </Text>
                                <Text>
                                    Phone Type {item.phone}
                                </Text>
                                <Text>
                                    Shirt Size: {item.shirt}
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
                                <Text> Phone Number: {item.phoneNumber}</Text>
                                <Text> Email: {item.userEmail}</Text>
                                <Text
                                    fontWeight='bold'
                                    style={{
                                        marginBottom: 5,
                                        marginTop: 10,
                                    }}
                                >
                                    Tracking Number:
                                </Text>
                                <TextInput
                                    containerStyle={{
                                        marginTop: 10,
                                    }}
                                    placeholder="Add tracking number"
                                    maxLength={40}
                                    value={tracking}
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    placeholderTextColor="#7d807c"
                                    autoCorrect={false}
                                    style={{
                                        padding: 5,
                                        borderWidth: 2,
                                        marginBottom: 10,
                                        borderRadius: 90,
                                        borderColor: '#0C134F',
                                    }}
                                    onChangeText={text => setTracking(text)}
                                />
                                <Picker
                                    items={pickerItems}
                                    value={status}
                                    placeholder="Change status"
                                    onValueChange={val => setStatus(val)}
                                    iconColor='#'
                                    borderRadius={90}
                                    borderColor='#0C134F'
                                    borderWidth={2}
                                    selectionBorderRadius="90"
                                    closeIconColor='#0C134F'
                                    style={{
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    alignItems: 'center'
                                }}
                            >
                                <Button
                                    color='#0C134F'
                                    text='Submit Changes'
                                    style={{
                                        marginTop: 20,
                                    }}
                                    onPress={() => {
                                        submitChanges()

                                    }}
                                />
                            </View>
                        </SectionContent>
                    </Section>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}