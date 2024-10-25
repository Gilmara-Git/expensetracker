import { GOOGLE_MAP_STATIC_API } from "@env";

export const mapStaticPreviewURL = (lat:number, long: number)=>{

    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=12&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${long}&key=${GOOGLE_MAP_STATIC_API}`

    return url;
}

// If you pass the city and state, it will return your city
//`https://maps.googleapis.com/maps/api/staticmap?center=Elizabeth,NJ&zoom=12&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${long}&key=AIzaSyD9Ao4G3KxJZus2C_IMLOsgm_tGcJX_Ah8`
