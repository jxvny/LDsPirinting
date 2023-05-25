import React, {
    useState,
    useEffect
} from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Image,
} from "react-native";
import {
    getAuth,
    signInWithEmailAndPassword
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
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    //Move to home screen after successful auth
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate("Home");
            }
        });

        return unsubscribe;
    }, [auth, navigation]);

    //Main login function
    async function login() {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // User signed in successfully
                setLoading(false);
            })
            .catch((error) => {
                // Handle sign-in errors
                setLoading(false);
                console.log(error.code);
                alert(error.message);
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

                            }}
                            source={require("../../../assets/login.png")}
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
                            fontWeight="bold"
                            style={{
                                alignSelf: "center",
                                padding: 30,
                            }}
                            size="h3"
                        >
                            Login
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
                        <Text
                            fontWeight='bold'
                            style={{
                                marginTop: 15
                            }}
                        >
                            Password
                        </Text>
                        <TextInput
                            containerStyle={{
                                marginTop: 15
                            }}
                            placeholder="Enter your password"
                            value={password}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Button
                            text="Skip"
                            color='#0C134F'
                            onPress={() => {
                                navigation.navigate("Home")
                            }}
                            style={{
                                marginTop: 20,
                            }}

                        />
                        <Button
                            text={loading ? "Loading" : "Continue"}
                            onPress={() => {
                                login();
                            }}
                            style={{
                                marginTop: 10,
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
                                Don't have an account?
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Register");
                                }}
                            >
                                <Text
                                    size="md"
                                    fontWeight="bold"
                                    style={{
                                        marginLeft: 5,
                                    }}
                                >
                                    Register here
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ForgetPassword");
                                }}
                            >
                                <Text
                                    size="md"
                                    fontWeight="bold"
                                >
                                    Forget password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}
