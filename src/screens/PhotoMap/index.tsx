import { useState , useEffect, useLayoutEffect  } from "react";
import { View, Alert, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import themes from "../../theme/themes";
import { IconButton } from "@components/IconButton";
import { Button } from "@components/Button";


import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { mapStaticPreviewURL } from "@utils/mapStaticPreview";
import { useNavigation , useRoute, useIsFocused } from '@react-navigation/native';
import { StackNavProps } from "@routes/app.routes";


type ImageType = {
  uri: string;
  fileName: string | null | undefined;
};

export type LocationType = {
  lat: number;
  long: number;
};

type PhotoMapType = {
  expenseId: string
  lat: number
  long: number
  imageURL: string
}

export const PhotoMap = () => {
  const [cameraPermission, requestPermission] = ImagePicker.useCameraPermissions();
  const [receiptImage, setReceiptImage] = useState<ImageType>({} as ImageType);
  const [location, setLocation] = useState<LocationType>({} as LocationType);
  const [ receiptMapInfo, setReceiptMapInfo ] = useState<PhotoMapType>();
  const [errorMsg, setErrorMsg] = useState({});

  const [ expenseID, setExpenseID] = useState('');

  const navigation = useNavigation<StackNavProps>();
  const route = useRoute();
  const { params } = route as any;
  console.log(receiptMapInfo, '46')


  const isFocused = useIsFocused();

  const handleSubmitReceiptMap = ()=>{
    console.log('receipt and Map')
    //validar se tem image e map, se não tiver por um alert se quer continuar sem salvar or quer tirar a photo e pegar o maap

// saber se tem os componentes de receiptMapInfo

  }
  const requestPermissionIOSNeedsCameraPermissions = async () => {
    // check if there is no permission and if it is not granted

    if (
      cameraPermission?.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const response = await requestPermission();
      // this returns true of false
      return response.granted;
    }

    if (cameraPermission?.status === ImagePicker.PermissionStatus.DENIED) {
      Alert.alert(
        "Permission to Camera was denied",
        "You MUST allow camera usage for this app to take photos. If You deny you will not be asked for permission anymore."
      );

      const response = await requestPermission();
      return response.granted;
    }

    return true;
  };

  const handleUploadReceipt = async () => {
    // ios needs permission to use the camera. Even though android does not, we will return if there is not permission
    const isPermissionGranted =
      await requestPermissionIOSNeedsCameraPermissions();

    if (!isPermissionGranted) {
      return;
    }

    const receipt = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 8],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
    });
    if (receipt.assets) {
      setReceiptImage({
        uri: receipt.assets[0].uri,
        fileName: receipt.assets[0].fileName,
      });
     
    }
  };

  const handleMapView = ()=>{
   
    navigation.navigate('mapViewScreen', {id: expenseID, latitude: location.lat, longitude: location.long})

  };


  const handleLocation = async () => {

    if(!receiptImage.uri){
      Alert.alert('No Image yet!!','Please take a picture of your receipt first.')
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      
    });
    // user location returns by default lat and lon from California atitude": 37.785834, "longitude": -122.406417
    // console.log(userLocation, 'userLocation')
    
    setLocation({
      lat: userLocation.coords.latitude,
      long: userLocation.coords.longitude,
    });
  };

useEffect(()=>{
  if(params.lat && params.long && isFocused){
    setLocation({ lat: params.lat, long: params.long})
  }


  setReceiptMapInfo({
    expenseId: expenseID,
    lat: location.lat,
    long: location.long,
    imageURL: receiptImage.uri
  })
 
},[isFocused]);

useEffect(()=>{
  setExpenseID(params.id.id)
},[])

useLayoutEffect(()=>{
  navigation.setOptions({
    headerRight: ({tintColor})=>(
      <IconButton iconName='save' size={16} color={tintColor} onPress={handleSubmitReceiptMap}/>
    )

    
  })
   
},[])

  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      <View style={styles.photo}>
        <View style={styles.wrappingContainer}>
          <View style={styles.innerWrapper}>
            {receiptImage.uri ? (
              <View style={styles.imagePreview}>
                <Image
                  style={styles.imageTaken}
                  source={{ uri: receiptImage.uri }}
                />
                <Button
                  style={styles.trashButton}
                  onPress={() => setReceiptImage({} as ImageType)}
                  icon={
                    <IconButton
                      disabled
                      iconName="trash-outline"
                      size={20}
                      color={themes.colors.warn}
                    />
                  }
                />
              </View>
            ) : (
              <View style={styles.photoIconContainer}>
                <IconButton
                  iconName="receipt-sharp"
                  size={35}
                  color={themes.colors.purple_2}
                  uploadReceipt={handleUploadReceipt}
                />

                <Text style={styles.iconTitle}>Upload Receipt</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.map}>
        <View style={styles.wrappingContainer}>
          <View style={styles.innerWrapper}>
            {location.lat ? (
              <View style={styles.imagePreview}>
                <Image
                  style={styles.imageTaken}
                  source={{
                    uri: mapStaticPreviewURL(location.lat, location.long),
                  }}
                />
              
                
                <View style={styles.mapContainer}>
                  <Button
                      style={styles.mapButton}
                      onPress={handleMapView}
                      title='Pick Location'
                      // icon={
                      //   <IconButton
                      //   disabled
                      //   iconName="location-arrow"
                      //   size={40}
                      //   color={themes.colors.warn}
                      //   />
                      // }
                      />  
                      {/* <Text style={{color: themes.colors.warn, fontFamily: themes.fonts.balsamiq_700}}>Set Location</Text> */}
                  </View>
                  
              </View>
            ) : (
              <View style={styles.innerWrapper}>
                <IconButton
                  iconName="google-maps"
                  size={35}
                  color={themes.colors.purple_2}
                  loadMap={handleLocation}
                />

                <Text style={styles.iconTitle}>Load Map</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
