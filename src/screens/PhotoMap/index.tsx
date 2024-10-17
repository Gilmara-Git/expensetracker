import { useState } from 'react';
import { View , Alert, Image, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import themes from '../../theme/themes';
import { IconButton } from '@components/IconButton';
import  { Button } from '@components/Button';
import *  as ImagePicker from 'expo-image-picker';




type ImageType = {
    uri: string,
    fileName: string | null | undefined
}

export const PhotoMap = ()=>{

    const [receiptImage, setReceiptImage] = useState<ImageType>({} as ImageType);
    const [ cameraPermission, requestPermission ]=  ImagePicker.useCameraPermissions();

    const requestPermissionIOSNeedsCameraPermissions = async()=>{
        // check if there is no permission and if it is not granted
      
           if(cameraPermission?.status === ImagePicker.PermissionStatus.UNDETERMINED){
               const response =  await requestPermission();
               // this returns true of false
               return response.granted

           }

           if(cameraPermission?.status === ImagePicker.PermissionStatus.DENIED){
            Alert.alert('Permission to Camera was denied','You need to allow camera usage for this app to take photos')
            return false;

        }
   
            return true;

    }
    
    
    const handleUploadReceipt = async()=>{

        // ios needs permission to use the camera. Even though android does not, we will return if there is not permission
        const isPermissionGranted = await requestPermissionIOSNeedsCameraPermissions();

        if(!isPermissionGranted){
            return;
        }

        const receipt = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [6,4],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            cameraType: ImagePicker.CameraType.back


        })
        if(receipt.assets){
            setReceiptImage({uri: receipt.assets[0].uri, fileName: receipt.assets[0].fileName})
            console.log(receipt.assets[0].fileName, receipt.assets[0].uri)

        }
     
    };
    const handleLocation =()=>{
        console.log('Location')
    };


    return (
        <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
          
            <View style={styles.photo}>
                <View style={styles.wrappingContainer}>
                    <View style={styles.innerWrapper}>
                
                      
                {
                    receiptImage.uri ? 
                        <View style={styles.imagePreview}>
                            <Image style={styles.imageTaken} source={{uri: receiptImage.uri}} /> 
                            <Button style={styles.trashButton}
                                onPress={()=>setReceiptImage({} as ImageType)}
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

                    :
                    <View style={styles.photoIconContainer}>
                        <IconButton 
                            iconName="receipt-sharp" 
                            size={35} 
                            color={themes.colors.purple_2} 
                            uploadReceipt={handleUploadReceipt}/>

                            <Text style={styles.iconTitle}>Upload Receipt</Text>
                    </View>


                }
                    </View>

                </View>
            </View>
                <View style={styles.map}>
                <View style={styles.wrappingContainer}>
                        <View style={styles.innerWrapper}>
                            <IconButton 
                                iconName="google-maps" 
                                size={35} 
                                color={themes.colors.purple_2} 
                                loadMap={handleLocation}/>
                                
                            <Text style={styles.iconTitle}>Load Map</Text>
                    </View>
                </View>
                </View>
        </LinearGradient>
    )
};