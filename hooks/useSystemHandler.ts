import getContact from "@/utils/getContact";
import { Alert, Linking } from "react-native";
import { InstalledApps,  RNLauncherKitHelper } from 'react-native-launcher-kit';

const useSystemHandler = () => {
  const makeCall = async (name: string) => {
    const {success, number, message} = await getContact(name);
    if(!success)
      return  Alert.alert("Error", message)
    Linking.openURL(`tel:${number}`);
  };

  const openApp = async (appName: string) => {
    const apps = await InstalledApps.getApps();
    const lowerCommand = appName.toLowerCase();
  
    const foundApp = apps.find(app =>
      app.label.toLowerCase().includes(lowerCommand)
    );
  
    if (foundApp) {
      RNLauncherKitHelper.launchApplication(foundApp.packageName);
    } else {
      Alert.alert(`No app found named ${appName}`)
    }
  }

  return { makeCall, openApp };
};

export default useSystemHandler;
