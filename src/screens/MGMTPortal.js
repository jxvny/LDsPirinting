import React from "react";
import {
    View,
} from "react-native";
import {
    Layout,
    TopNav,
    Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

    // Displays several buttons to all the master user to edit the gallery and orders

    return (
        <Layout>
            <TopNav
                middleContent="Master"
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
                <Button
                    style={{
                        padding: 15,
                        marginBottom: 10,
                    }}
                    color='#0C134F'
                    onPress={() => { navigation.navigate("AddGallery"); }}
                    text={'Add To Gallery'}
                />
                <Button
                    style={{
                        padding: 15,
                        marginBottom: 10,
                    }}
                    color='#0C134F'
                    onPress={() => { navigation.navigate("DeleteGallery"); }}
                    text={'Delete From Gallery'}
                />
                <Button
                    style={{
                        padding: 15,
                        marginBottom: 10,
                    }}
                    color='#0C134F'
                    onPress={() => { navigation.navigate("EditOrders"); }}
                    text={'Edit Orders'}
                />
            </View>
        </Layout>
    );
}
