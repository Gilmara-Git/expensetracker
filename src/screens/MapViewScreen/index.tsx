import { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Button } from "@components/Button";
import MapView, { Marker, LatLng, MapPressEvent } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavProps } from "@routes/app.routes";
import { styles } from "./styles";

export const MapViewScreen = () => {
  const [selectedCoords, setSelectedCoords] = useState<LatLng>();
  const [expenseId, setExpenseId] = useState("");
  const route = useRoute() as any;
  const navigation = useNavigation<StackNavProps>();

  const handleConfirm = () => {
    if (!selectedCoords) {
      return Alert.alert(
        "No location picked!",
        "Please select a location on the map."
      );
    }

    navigation.navigate("photoMap", {
      lat: selectedCoords?.latitude,
      long: selectedCoords?.longitude,
    });
  };

  const onMapPresHandler = (event: MapPressEvent) => {
    setSelectedCoords({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const region = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.006,
  };

  useEffect(() => {
    setExpenseId(route.params.id);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        zoomControlEnabled
        zoomEnabled
        style={styles.mapContainer}
        onPress={onMapPresHandler}
        initialRegion={region}
      >
        {selectedCoords && <Marker coordinate={selectedCoords} />}
      </MapView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 30,
          paddingTop: 10,
        }}
      >
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};
