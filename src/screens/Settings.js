import React from "react";
import { View } from "react-native";
import {
    getAuth,
    signOut
} from "firebase/auth";
import {
    Layout,
    TopNav,
    Button,
    Section,
    SectionContent,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

    //Get Auth
    const auth = getAuth();

    //Main signout function
    const onSignOut = () => {
        signOut(auth).catch(error => console.log("Error logging out: ", error));
        navigation.goBack()
    };

    return (
        <Layout>
            <TopNav
                middleContent="Settings"
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
                <Section>
                    <SectionContent>
                        <Button
                            text={'Shipping Information'}
                            onPress={() => { navigation.navigate("ShippingInformation"); }}
                            color='#0C134F'
                            style={{
                                padding: 15,
                                marginBottom: 10,
                            }}
                        />
                        <Button
                            style={{
                                padding: 15,
                                marginBottom: 10,
                            }}
                            color='#0C134F'
                            onPress={() => { navigation.navigate("Orders"); }}
                            text={'Orders'}
                        />
                        <Button
                            style={{
                                padding: 15,
                                marginBottom: 10,
                            }}
                            color='#0C134F'
                            onPress={() => { onSignOut() }}
                            text={'Logout'}
                        />
                        <Button style={{
                            padding: 15,
                            marginBottom: 10,
                        }}
                            color='#FF0000'
                            text={'Delete Account'}
                            onPress={() => { navigation.navigate("DeleteAccount"); }}
                        />
                    </SectionContent>
                </Section>
            </View>
        </Layout>
    );
}
