import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class UserPermissions {
    //Main request permission function
    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            console.log('Status: ', status)
            if (status != "granted") {
                alert("We need your permission to use your camera roll")
            }
        }
    };
} export default new UserPermissions();