import React, {
    useEffect,
    useState
} from "react";
import {
    Image,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
    Layout,
    Button,
    Text,
    TopNav,
    Section,
    SectionContent,
} from "react-native-rapi-ui";
const logo = require("../../assets/mainLogo.png")

export default function ({ navigation }) {

    //Gets Auth
    const auth = getAuth();

    // Creates state variables
    const [loggedIn, setLoggedIn] = useState(false)
    const [master, setMaster] = useState(false)

    //Checks to see if user is the master user
    const checkMaster = () => {
        const uid = (auth.currentUser?.uid);
        if (uid === 'Fkmsz6wZa2PgCvds9gOYV6i7kin1' || uid === 'WMbshK7VHSRPy85RBOMzO9X7VJj1') {
            console.log('Master User Logged In')
            setMaster(true)
        }
    }

    //Checks if user is logged in or not
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
                console.log('User has logged in')
                checkMaster()
            } else {
                setLoggedIn(false);
            }
        });
        return unsubscribe;
    }, [auth]);

    return (
        <Layout
            backgroundColor='#FFFFFF'
        >
            <TopNav
                middleContent="Home"
            />
            <Image
                source={logo}
                style={{
                    height: 300,
                    justifyContent: 'center',
                    marginTop: 30,
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center'
                }}
            />
            <Section
                style={{
                    marginTop: 20
                }}
            >
                <SectionContent>
                    <Text
                        fontWeight="bold"
                        style={{
                            textAlign: "center"
                        }}
                    >
                        Welcome To LD's Printing
                    </Text>
                    <Text>                                                                                          </Text>
                    <Button
                        style={{ marginTop: 10 }}
                        text="Gallery"
                        color='#0C134F'
                        status="info"
                        onPress={() => { navigation.navigate("Gallery"); }}
                    />
                    <Button
                        style={{ marginTop: 10 }}
                        text="Create Your Own"
                        color='#0C134F'
                        status="info"
                        onPress={() => { navigation.navigate("Step1"); }}
                    />
                    {!loggedIn && <Button
                        text="Login / Register"
                        color='#0C134F'
                        onPress={() => {
                            navigation.navigate("Login")
                        }}
                        style={{
                            marginTop: 15,
                        }}
                    />
                    }{
                        loggedIn &&
                        <Button
                            text="Settings"
                            color='#0C134F'
                            onPress={() => {
                                navigation.navigate("Settings");
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        />
                    }
                    {
                        master &&
                        <Button
                            text="Master"
                            color='#FF0000'
                            onPress={() => {
                                navigation.navigate("MGMTPortal");
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        />
                    }
                </SectionContent>
            </Section>
        </Layout>
    );
}
