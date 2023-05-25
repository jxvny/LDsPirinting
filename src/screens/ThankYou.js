import React, { useState, } from "react";
import { View } from "react-native";
import {
    Layout,
    TopNav,
    Text,
    Button,
    Section,
    SectionContent,
} from "react-native-rapi-ui";



export default function ({ navigation }) {
    // Simple thank you screen
    return (
        <Layout
            backgroundColor="#0C134F"
        >
            <TopNav
                middleContent="Thank You"
                backgroundColor="#0C134F"
                borderColor="#0C134F"
                middleTextStyle={{ color: "#FFFFFF" }}
            />
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0C134F",
                }}
            >
                <Section>
                    <SectionContent>
                        <Text
                            fontWeight="bold"
                            style={{
                                textAlign: "center",

                            }}
                        >
                            Thank You For Your Purchase
                        </Text>
                        <Text
                            style={{
                                marginTop: 15,
                            }}                        >
                            You will receive a confirmation email as well as an Invoice within 24 - 48 hours of purchase. The 'Orders' page will contain a tracking number that you may use to check the status of your shipment.
                        </Text>
                        <Button
                            style={{
                                marginTop: 10
                            }}
                            text="Continue"
                            onPress={() => navigation.navigate("Home")}
                        />
                    </SectionContent>
                </Section>
            </View>
        </Layout>
    );
}