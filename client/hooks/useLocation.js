import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getUserCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    if (coords) {
      const { latitude, longitude } = coords;
      setLat(latitude);
      setLong(longitude);
      //   location in human-readable format
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setAddress(response[0]?.formattedAddress);
    }
  };
  useEffect(() => {
    getUserCurrentLocation();
  }, []);
  return { address, lat, long, errorMsg };
};

export default useLocation;
