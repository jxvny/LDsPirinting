import React, {
    useState,
    useEffect
} from "react";
import {
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable
} from "firebase/storage";
import UserPermissions from './utils/UserPermission';
import * as ImagePicker from "expo-image-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import {
    Layout,
    TopNav,
    Button,
    Text,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
    getAuth,
} from "firebase/auth";
import { useRoute } from '@react-navigation/native';

export default function ({ navigation }) {
    //Get imports
    const auth = getAuth();
    const route = useRoute();
    const storage = getStorage();

    //Get userID
    const uid = (auth.currentUser?.uid);
    console.log('User ID: ', uid)

    // Create state variables
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)

    //Sets default image as the upload image icon
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/lds-printing.appspot.com/o/UploadPhoto.png?alt=media&token=a59ee944-01d3-4d6d-98eb-e9d941a2f2a1');

    //Get data from previous screen
    const pI = route.params.pI;
    const pT = route.params.pT;
    const pP = route.params.pP;
    const pS = route.params.pS;
    const phone = route.params.phone;
    const shirt = route.params.shirt;
    const userEmail = route.params.userEmail;
    console.log('Passed Data')
    console.log("Image URI: ", pI)
    console.log("Product Title: ", pT)
    console.log("Price: ", pP)
    console.log("SKU: ", pS)
    console.log("User Email: ", userEmail)
    console.log("Phone Type: ", phone)
    console.log("Shirt Size: ", shirt)

    //Uploads selected photo to firebase
    const uploadPhotoAsync = async (uri) => {
        const response = await fetch(uri);
        const file = await response.blob();
        const storageRef = ref(storage, `${uid}/file.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                //Monitors the progress of the uploadd
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log("Error: ", error)
            },
            () => {
                //Gets the firebase photo URL and sets it to the phot variable
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setPhoto(downloadURL);
                });
                setLoading(false);
            }
        );
    }

    // Allows the user to select a photo from camera roll
    const handlePhotoPick = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing: true,
            aspect: [4, 4],
        });
        let resultUri = result.assets[0].uri;
        console.log("Result URI: ", resultUri);
        if (!result.canceled) {
            setLoading(true);
            uploadPhotoAsync(resultUri);
        }
    };

    //Checks to see if upload has completed while disabling the next button
    const checkUpload = () => {
        if (photo === 'https://firebasestorage.googleapis.com/v0/b/lds-printing.appspot.com/o/UploadPhoto.png?alt=media&token=a59ee944-01d3-4d6d-98eb-e9d941a2f2a1') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    //Frequently checks if upload has completed
    useEffect(() => {
        checkUpload()
    })

    return (
        <Layout>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
            />
            <TopNav
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
                <Text
                    fontWeight='bold'
                    size='h2'
                    style={{
                        marginBottom: 15,
                    }}
                >
                    Upload Your Image
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        handlePhotoPick();
                    }}
                >
                    <Image
                        style={{
                            padding: 20,
                            margin: 20,
                            height: 300,
                            width: 300,
                            borderRadius: 15,
                            borderWidth: 3,
                            borderColor: '#0C134F'
                        }}
                        source={{ uri: photo }}
                    />
                </TouchableOpacity>
                <Button
                    color='#0C134F'
                    text='Next Step'
                    style={{
                        marginTop: 15,
                    }}
                    onPress={() => {
                        navigation.navigate('Step4', {
                            pP,
                            pS,
                            pT,
                            pI,
                            phone,
                            shirt,
                            userEmail,
                            photo,
                        })
                    }}
                    disabled={disabled}
                />
            </View>
        </Layout>
    );
}
