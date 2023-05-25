import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/provider/AuthProvider";
import { ThemeProvider } from "react-native-rapi-ui";
import { StripeProvider } from '@stripe/stripe-react-native';
import { LogBox } from "react-native";

export default function App(props) {
    //Load core images 
    const images = [
        require("./assets/icon.png"),
        require("./assets/splash.png"),
        require("./assets/login.png"),
        require("./assets/register.png"),
        require("./assets/forget.png"),
    ];

    // Ignore firebase v9 AsyncStorage warning
    React.useEffect(() => {
        LogBox.ignoreLogs([
            "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
        ]);
        LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
        LogBox.ignoreAllLogs()
    }, []);

    return (

        <ThemeProvider images={images}>
            <StripeProvider
                publishableKey="pk_test_51N7OiuKoksGm3AnGuF5fvJlLg0yA08PHRkhYxeANbs9NBvvTScjrzPdWfGAN96t54Ffih5VtXrmMamYsoPv1ecdS009KiqFGvs">
                <AuthProvider>
                    <AppNavigator />
                </AuthProvider>
            </StripeProvider>
        </ThemeProvider>
    );
}
