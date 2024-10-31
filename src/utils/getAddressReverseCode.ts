import axios from "axios";
import { GOOGLE_MAP_STATIC_API } from "@env";

export const getAddressReverseCode = async (lat: number, long: number )=>{

    try {
       const response =  await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAP_STATIC_API}`)
       if(!response){
        throw new Error('Failed to get address')
       }

       const {data} = response;
       const address =  data.results[0].formatted_address;

       return address;


    } catch (error) {
        console.log(error)
    }
}