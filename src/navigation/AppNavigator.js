//Required Imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Main Screens
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Gallery from "../screens/Gallery";
import Orders from "../screens/Orders";
import Step4 from "../screens/Step4";
import Step3 from "../screens/Step3";
import Step2 from "../screens/Step2";
import Step1 from "../screens/Step1";
import MGMTPortal from "../screens/MGMTPortal";
import ShippingInformation from "../screens/ShippingInformation";
import UpdateShippingInfo from "../screens/UpdateShippingInfo";
import DeleteAccount from "../screens/DeleteAccount";
import ThankYou from "../screens/ThankYou";
import AddGallery from "../screens/AddGallery";
import DeleteGallery from "../screens/DeleteGallery";
import EditOrder from "../screens/EditOrder";
import EditOrders from "../screens/EditOrders";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

const MainStack = createNativeStackNavigator();

const Main = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Settings" component={Settings} />
            <MainStack.Screen name="Gallery" component={Gallery} />
            <MainStack.Screen name="ShippingInformation" component={ShippingInformation} />
            <MainStack.Screen name="UpdateShippingInfo" component={UpdateShippingInfo} />
            <MainStack.Screen name="Step4" component={Step4} />
            <MainStack.Screen name="Orders" component={Orders} />
            <MainStack.Screen name="Step3" component={Step3} />
            <MainStack.Screen name="Step2" component={Step2} />
            <MainStack.Screen name="Step1" component={Step1} />
            <MainStack.Screen name="MGMTPortal" component={MGMTPortal} />
            <MainStack.Screen name="DeleteAccount" component={DeleteAccount} />
            <MainStack.Screen name="ThankYou" component={ThankYou} />
            <MainStack.Screen name="Login" component={Login} />
            <MainStack.Screen name="AddGallery" component={AddGallery} />
            <MainStack.Screen name="DeleteGallery" component={DeleteGallery} />
            <MainStack.Screen name="EditOrder" component={EditOrder} />
            <MainStack.Screen name="EditOrders" component={EditOrders} />
            <MainStack.Screen name="Register" component={Register} />
            <MainStack.Screen name="ForgetPassword" component={ForgetPassword} />
        </MainStack.Navigator>
    );
};

export default () => {
    //Build Navigation Containers
    return (
        <NavigationContainer>
            <Main />
        </NavigationContainer>
    );
};
