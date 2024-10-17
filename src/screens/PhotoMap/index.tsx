import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { IconButton } from '@components/IconButton';
import themes from '../../theme/themes';



export const PhotoMap = ()=>{
    const handleUploadReceipt = ()=>{
        console.log('Upload Photo')
    };
    const handleLocation =()=>{
        console.log('Location')
    };


    return (
        <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
          
            <View style={styles.photo}>
                <View style={styles.wrappingContainer}>
                    <View style={styles.innerWrapper}>
                
                <IconButton iconName="receipt-sharp" size={40} color={themes.colors.purple_2} uploadReceipt={handleUploadReceipt}/>
                      

                    </View>

                </View>
            </View>
                <View style={styles.map}>
                <View style={styles.wrappingContainer}>
                    <View style={styles.innerWrapper}>
                    <IconButton iconName="google-maps" size={40} color={themes.colors.purple_2} loadMap={handleLocation}/>

                    </View>
                </View>
                </View>
        </LinearGradient>
    )
};