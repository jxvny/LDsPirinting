import React, {
    useState,
} from "react";
import { View } from "react-native";
import {
    Layout,
    TopNav,
    Text,
    Button,
    TextInput,
    Section,
    SectionContent,
} from "react-native-rapi-ui";
import {
    getAuth,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
    // Get Auth
    const auth = getAuth();

    //State Variables
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //Init the delete account process
    const startDelete = async () => {
        console.log('Email: ', email)
        try {
            //Firebase requires user to be authenticated before deleting the account
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                password
            )

            const result = await reauthenticateWithCredential(
                auth.currentUser,
                credential

            )
        } catch (error) {

            console.log('Error: ', error)
            alert(error);
        }
        //Deletes the account
        await deleteUser(auth.currentUser)

        alert(('Account Deletion Successful'))
    }

    return (
        <Layout>
            <TopNav
                middleContent="Delete Account"
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
                        <Text
                            fontWeight={'bold'}
                            style={{
                                padding: 15,
                                marginBottom: 10,
                            }}
                        >
                            This will permanately delete your account
                        </Text>
                        <Text
                            fontWeight={'bold'}
                            style={{

                                marginBottom: 10,
                            }}
                        >
                            Email
                        </Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text
                            fontWeight={'bold'}
                            style={{
                                marginTop: 15,
                                marginBottom: 10,
                            }}

                        >
                            Password
                        </Text>
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Button
                            text="Delete Account"
                            color="#FF0000"
                            onPress={() => startDelete()}
                            style={{
                                padding: 15,
                                marginTop: 20
                            }}
                        />
                    </SectionContent>
                </Section>
            </View>
        </Layout>
    );
}
