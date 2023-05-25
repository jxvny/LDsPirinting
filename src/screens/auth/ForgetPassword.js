import React, { useState } from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Image,
} from "react-native";
import {
    getAuth,
    sendPasswordResetEmail
} from "firebase/auth";
import {
    Layout,
    Text,
    TextInput,
    Button,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
    //Get Auth
    const auth = getAuth();

    //State variables
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    //Forgot password main function
    async function forget() {
        setLoading(true);
        console.log('Email: ', email)
        await sendPasswordResetEmail(auth, email)
            .then(function () {
                setLoading(false);
                navigation.navigate("Login");
                alert("Your password reset has been sent to your email");
            })
            .catch(function (error) {
                setLoading(false);
                console.log('Error: ', error)
                alert(error);
            });
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
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#FFFFFF'
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            style={{
                                height: 220,
                                backgroundColor: '#FFFFFF'

                            }}
                            source={require("../../../assets/forget.png")}
                        />
                    </View>
                    <View
                        style={{
                            flex: 3,
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            backgroundColor: '#FFFFFF'
                        }}
                    >
                        <Text
                            size="h3"
                            fontWeight="bold"
                            style={{
                                alignSelf: "center",
                                padding: 30,
                            }}
                        >
                            Forget Password
                        </Text>
                        <Text
                            fontWeight='bold'
                        >
                            Email
                        </Text>
                        <TextInput
                            containerStyle={{
                                marginTop: 15
                            }}
                            placeholder="Enter your email"
                            value={email}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            autoCorrect={false}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Button
                            text={loading ? "Loading" : "Send email"}
                            onPress={() => {
                                forget();
                            }}
                            style={{
                                marginTop: 20,
                            }}
                            disabled={loading}
                            color='#0C134F'
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 15,
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                size="md"
                            >
                                Already have an account?
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Login");
                                }}
                            >
                                <Text
                                    size="md"
                                    fontWeight="bold"
                                    style={{
                                        marginLeft: 5,
                                    }}
                                >
                                    Login here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}
