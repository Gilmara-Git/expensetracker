
import { useState } from 'react';
import { View, Alert  } from 'react-native';
import MapView , { Marker, LatLng, MapPressEvent} from 'react-native-maps';
import { styles } from './styles';
import { Button } from '@components/Button';


type MapTypeProps = {
    lat: number,
    long:number,
    getPickedLocation: (pickedLocation: LatLng)=>void;
    workingOnMap: (working: boolean)=>void;
}

export const Map =({lat, long, getPickedLocation , workingOnMap }:MapTypeProps)=>{
    const [ selectedCoords, setSelectedCoords ] = useState<LatLng>();
    
    const region = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.009,
        longitudeDelta: 0.006,
    }

    const onMapPresHandler = (event: MapPressEvent)=>{
     
        setSelectedCoords({latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude}) 
        
    }

    const handleConfirm = ()=>{
          
        if(!selectedCoords){
            return Alert.alert('No location picked!','Please select a location on the map.')
        }

        getPickedLocation(selectedCoords);
        workingOnMap(false)
}


    return (
        <View style={{flex:1}}>
            <MapView 
                zoomControlEnabled
                zoomEnabled
                style={styles.mapContainer}
                onPress={onMapPresHandler}
                initialRegion={region}
                >
                    {
                        selectedCoords && 

                        <Marker  coordinate={selectedCoords}/>
                    }

            </MapView>
                <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 30, paddingTop: 10}}>
                    <Button title='Confirm' onPress={handleConfirm}/>
                </View>
                
        </View>
        )

};