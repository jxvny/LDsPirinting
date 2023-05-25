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
import { db } from '../provider/AuthProvider';
import {
    collection,
    doc,
    addDoc,
} from 'firebase/firestore';

export default function ({ navigation }) {
    // Get imports
    const auth = getAuth();
    const storage = getStorage();

    // Get user ID
    const uid = (auth.currentUser?.uid);
    console.log('UserID: ', uid)

    //State Variables
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/lds-printing.appspot.com/o/UploadPhoto.png?alt=media&token=a59ee944-01d3-4d6d-98eb-e9d941a2f2a1');

    //Uploads photo into database and gives the URL into the photo variable
    const uploadPhotoAsync = async (uri) => {
        const response = await fetch(uri);
        const file = await response.blob();
        const storageRef = ref(storage, `${uid}/file.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                if (snapshot?.state === 'running' && snapshot?.bytesTransferred && snapshot?.totalBytes) {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }
            },
            (error) => {
                console.log('Error: ', error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at ', downloadURL);
                    setPhoto(downloadURL);
                });
                setLoading(false);
                setDisabled(false)
            }
        );
    }

    //Allows Master user to select a desired photo to be uploaded
    const handlePhotoPick = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing: true,
            aspect: [4, 4],
        });
        if (!result.cancelled && result.assets && result.assets.length > 0) {
            let resultUri = result.assets[0].uri;

            console.log('Result: ', resultUri);
            setLoading(true);
            setDisabled(true)
            uploadPhotoAsync(resultUri);
        }
    };

    //Does not let the Master user proceed without uploading a photo
    const checkUpload = () => {
        if (photo === 'https://firebasestorage.googleapis.com/v0/b/lds-printing.appspot.com/o/UploadPhoto.png?alt=media&token=a59ee944-01d3-4d6d-98eb-e9d941a2f2a1') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    //Checks to see if the Master user uploads a photo
    useEffect(() => {
        checkUpload();
    }, [])

    // Uploads the photo directly to the main gallery
    const addToGallery = async () => {
        const data = {
            Image: photo
        }
        console.log('Data: ', data)
        await addDoc(collection(db, "Gallery"), data);

        alert('Success')
        navigation.goBack()
    }

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
                    text='Add To Gallery'
                    style={{
                        marginTop: 15,
                    }}
                    onPress={() => {
                        addToGallery()
                    }}
                    disabled={disabled}
                />
            </View>
        </Layout>
    );
}
