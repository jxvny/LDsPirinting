import React, {
    useState,
    useEffect
} from "react";
import {
    View,
    TouchableOpacity,
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
import { useRoute } from '@react-navigation/native';


export default function ({ navigation }) {

    //Get data from pervious scxreen
    const route = useRoute();
    const pI = route.params.pI;
    const pT = route.params.pT;
    const pP = route.params.pP;
    const pS = route.params.pS;
    const userEmail = route.params.userEmail;
    console.log('Passed Data')
    console.log("Image URI: ", pI)
    console.log("Product Title: ", pT)
    console.log("Price: ", pP)
    console.log("SKU: ", pS)
    console.log("User Email: ", userEmail)

    //Set state variables
    const [one, setOne] = useState('#d1d1d1')
    const [two, setTwo] = useState('#d1d1d1')
    const [three, setThree] = useState('#d1d1d1')
    const [four, setFour] = useState('#d1d1d1')
    const [five, setFive] = useState('#d1d1d1')
    const [phone, setPhone] = useState('N/A')
    const [shirt, setShirt] = useState('N/A')
    const [loading, setLoading] = useState(true);
    //Check what screen data to display on mount

    useEffect(() => {
        ScreenData(),
            checkPhone()
    })
    // Check if phone is selected
    const checkPhone = () => {
        if (phone != 'N/A') {
            setLoading(false)
        }
    }

    //Select which shirt size while changing button colors
    const selectShirtSize = (props) => {
        setLoading(false)
        console.log("Shirt Size: ", props)
        if (props === 'XS') {
            setShirt('XS')
            setOne('#0C134F')
            setTwo('#d1d1d1')
            setThree('#d1d1d1')
            setFour('#d1d1d1')
            setFive('#d1d1d1')
        } else if (props === 'S') {
            setShirt('S')
            setOne('#d1d1d1')
            setTwo('#0C134F')
            setThree('#d1d1d1')
            setFour('#d1d1d1')
            setFive('#d1d1d1')
        } else if (props === 'M') {
            setShirt('M')
            setOne('#d1d1d1')
            setTwo('#d1d1d1')
            setThree('#0C134F')
            setFour('#d1d1d1')
            setFive('#d1d1d1')
        } else if (props === 'L') {
            setShirt('L')
            setOne('#d1d1d1')
            setTwo('#d1d1d1')
            setThree('#d1d1d1')
            setFour('#0C134F')
            setFive('#d1d1d1')
        } else if (props === 'XL') {
            setShirt('XL')
            setOne('#d1d1d1')
            setTwo('#d1d1d1')
            setThree('#d1d1d1')
            setFour('#d1d1d1')
            setFive('#0C134F')
        }
    }

    //Picker items for phone case size
    const pickerItems = [
        { label: 'iPhone 14', value: 'iPhone 14' },
        { label: 'iPhone 14 Pro', value: 'iPhone 14 Pro' },
        { label: 'iPhone 14 Pro Max', value: 'iPhone 14 Pro Max' },
        { label: 'iPhone 13', value: 'iPhone 13' },
        { label: 'iPhone 13 Pro', value: 'iPhone 13 Pro' },
        { label: 'iPhone 13 Pro Max', value: 'iPhone 13 Pro Max' },
        { label: 'iPhone 12', value: 'iPhone 12' },
        { label: 'iPhone 12 Pro', value: 'iPhone 12 Pro' },
        { label: 'iPhone 12 Pro Max', value: 'iPhone 12 Pro Max' },
        { label: 'Galaxy S23', value: 'Galaxy S23' },
        { label: 'Galaxy S23 Ultra', value: 'Galaxy S23 Ultra' },
        { label: 'Galaxy S22', value: 'Galaxy S22' },
        { label: 'Galaxy S22 Ultra', value: 'Galaxy S22 Ultra' },
        { label: 'Galaxy S21 FE', value: 'Galaxy S21 FE' },
        { label: 'Galaxy S21', value: 'Galaxy S21' },
        { label: 'Galaxy S21 Ultra', value: 'Galaxy S21 Ultra' },
        { label: 'Pixel 7', value: 'Pixel 7' },
        { label: 'Pixel 7a', value: 'Pixel 7a' },
        { label: 'Pixel 7 Pro', value: 'Pixel 7 Pro' },
        { label: 'Pixel 6', value: 'Pixel 6' },
        { label: 'Pixel 6a', value: 'Pixel 6a' },
        { label: 'Pixel 6 Pro', value: 'Pixel 6 Pro' },
        { label: 'Pixel 5', value: 'Pixel 5' },
        { label: 'Pixel 5a', value: 'Pixel 5a' },
    ];


    const ScreenData = () => {
        if (pS === 'LD017') {
            return (
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Text
                        fontWeight='bold'
                        size='h2'
                        style={{
                            marginBottom: 15,
                        }}
                    >
                        Select A Shirt Size
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            numRows: 5,
                            borderRadius: 45,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                selectShirtSize('XS')
                            }}
                        >
                            <View
                                style={{
                                    flex: 'flex-start',
                                    padding: 20,
                                    paddingBottom: 20.2,
                                    marginRight: -2,
                                    borderBottomLeftRadius: 45,
                                    borderTopLeftRadius: 45,
                                    backgroundColor: `${one}`,
                                }}
                            >
                                <Text
                                    fontWeight='bold'
                                    style={{
                                        color: '#FFFFFF'
                                    }}
                                >
                                    XS
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                selectShirtSize('S')
                            }}
                        >
                            <View
                                style={{
                                    padding: 20,
                                    paddingLeft: 21,
                                    backgroundColor: `${two}`,
                                }}
                            >
                                <Text
                                    fontWeight='bold'
                                    style={{
                                        color: '#FFFFFF'
                                    }}
                                >
                                    S
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                selectShirtSize('M')
                            }}
                        >
                            <View
                                style={{
                                    padding: 20,
                                    backgroundColor: `${three}`,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF'
                                    }}
                                    fontWeight='bold'
                                >
                                    M
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                selectShirtSize('L')
                            }}
                        >
                            <View
                                style={{
                                    padding: 20,
                                    backgroundColor: `${four}`,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF'
                                    }}
                                    fontWeight='bold'
                                >
                                    L
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                selectShirtSize('XL')
                            }}
                            style={{
                                flex: 'flex-end',
                            }}
                        >
                            <View
                                style={{
                                    padding: 20,
                                    borderBottomRightRadius: 45,
                                    borderTopRightRadius: 45,
                                    backgroundColor: `${five}`,
                                }}                    >
                                <Text
                                    style={{
                                        color: '#FFFFFF'
                                    }}
                                    fontWeight='bold'
                                >
                                    XL
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (pS === 'LD016') {
            setLoading(true)
            return (
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Text
                        fontWeight='bold'
                        size='h2'
                        style={{
                            marginBottom: 15,
                        }}
                    >
                        Select A Phone
                    </Text>
                    <Picker
                        items={pickerItems}
                        value={phone}
                        placeholder="Choose a Phone"
                        onValueChange={val => setPhone(val)}
                        iconColor='#'
                        borderRadius={90}
                        borderColor='#0C134F'
                        borderWidth={2}
                        selectionBorderRadius="90"
                        closeIconColor='#0C134F'
                        style={{
                            marginTop: 15,
                        }}
                    />
                </View>
            )
        } else {
            console.log("Error: This SKU should not be on this screen")
            navigation.navigate('Step3', {
                pS,
                pT,
                pP,
                pI,
                phone,
                shirt,
                userEmail,
            })
        }
    }
    return (
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
            <Section>
                <SectionContent>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                
                        <ScreenData />
                    </View>
                </SectionContent>
                <SectionContent>
                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            color='#0C134F'
                            text='Next Step'
                            style={{
                                marginTop: 15,
                            }}
                            onPress={() => {
                                navigation.navigate('Step3', {
                                    pP,
                                    pS,
                                    pT,
                                    pI,
                                    phone,
                                    shirt,
                                })
                            }}
                            disabled={loading}
                        />
                    </View>
                </SectionContent>
            </Section>
        </Layout>
    );
}