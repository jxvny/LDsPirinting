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
    createUserWithEmailAndPassword
} from "firebase/auth";
import {
    Layout,
    Text,
    TextInput,
    Button,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
    // Get Auth
    const auth = getAuth();

    //State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    //Move to home screen on successful register
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate("Home");
            }
        });
        return unsubscribe;
    }, [auth, navigation]);

    //Main register function
    async function register() {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password).catch(function (
            error
        ) {
            var errorCode = error.code;
            var errorMessage = error.message;
            setLoading(false);
            alert(errorMessage);
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
                            source={require("../../../assets/register.png")}
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
                            size="h3"
                            style={{
                                alignSelf: "center",
                                padding: 30,
                            }}
                        >
                            Register
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
                            text={loading ? "Loading" : "Create an account"}
                            onPress={() => {
                                register();
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
