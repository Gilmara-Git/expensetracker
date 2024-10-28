import { useState , useEffect, useLayoutEffect , useCallback } from "react";
import { View, Alert, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import themes from "../../theme/themes";
import { IconButton } from "@components/IconButton";
import { Button } from "@components/Button";
import { Map } from "@components/Map";
import { ExpIdType } from "@contexts/expensesContext";
import { LatLng } from 'react-native-maps'


import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { mapStaticPreviewURL } from "@utils/mapStaticPreview";
import { useNavigation , useRoute  } from '@react-navigation/native';
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
  const [defaultLocation, setDefaultLocation] = useState<LatLng>({} as LatLng);
  const [pickedLocation, setPickedLocation] = useState<LatLng>({} as LatLng);

  const [ workOnMap, setWorkOnMap ] = useState(false);
  const [receiptMapInfo, setReceiptMapInfo ] = useState<PhotoMapType>({}as PhotoMapType);
  const [errorMsg, setErrorMsg] = useState({});

  const route = useRoute();
  const { id} = route.params as ExpIdType;


  const navigation = useNavigation<StackNavProps>();



  // se tiver dependencia quando terminar de criar a funcao, colocar a dependecia na useCallback()
  const handleSubmitReceiptAndMap = useCallback(()=>{

   if(!receiptImage.uri ){
    return Alert.alert('No receipt found','Upload your receipt')
   }
   if(!pickedLocation.latitude || !pickedLocation.longitude){

    return Alert.alert('Select the Vendor location on the map.','Select your location.')
   }
      
   //console.log('pronto para salvar no SQLite')
   console.log(receiptMapInfo)
 

  },[pickedLocation, receiptImage, workOnMap])


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

    setWorkOnMap(true);
   
    // navigation.navigate('mapViewScreen', {latitude: defaultLocation.lat, longitude: defaultLocation.long})

  };


  const handleLocation = async () => {

    // if(!receiptImage.uri){
    //   Alert.alert('No Image yet!!','Please take a picture of your receipt first.')
    // }

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
    
    setDefaultLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });
  };

const updatePickedLocation = (pickedLocation: LatLng)=>{
  setPickedLocation(pickedLocation)
}

const closeMap = ()=>{
  setWorkOnMap(false)
}

useEffect(()=>{


  if(pickedLocation.latitude && pickedLocation.longitude){
    setWorkOnMap(false);
    setDefaultLocation(pickedLocation)
   
  }


  setReceiptMapInfo({
    expenseId: id,
    lat: pickedLocation.latitude,
    long: pickedLocation.longitude,
    imageURL: receiptImage.uri
  })
 
},[pickedLocation]);



useLayoutEffect(()=>{
  navigation.setOptions({
    headerRight: ({tintColor})=>(
      <IconButton iconName='save' size={16} color={tintColor} onPress={handleSubmitReceiptAndMap}/>
    )

    
  })
   
},[navigation, handleSubmitReceiptAndMap])

  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      {
        workOnMap  ? 
     
          <Map 
            lat={defaultLocation.latitude} 
            long={defaultLocation.longitude}
            getPickedLocation={updatePickedLocation} 
            workingOnMap={closeMap} 
            />
        
    
      :
    <>
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
            {defaultLocation.latitude ? (
              <View style={styles.imagePreview}>
                <Image
                  style={styles.imageTaken}
                  source={{
                    uri: mapStaticPreviewURL(defaultLocation.latitude, defaultLocation.longitude),
                  }}
                />
              
                
                <View style={styles.mapContainer}>
                  <Button
                      style={styles.mapButton}
                      onPress={handleMapView}
                      title='Pick Location'
                     
                      />  
                      
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
    </>
    }
     
    </LinearGradient>
  );
};
