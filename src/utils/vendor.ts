export class Vendor {
    address: string;
    name: string;
    lat: number;
    long: number;
    imageURL: string

    constructor(address: string, name: string , lat: number, long: number, imageURL: string) {
        this.address =  address ;
        this.name = name;
        this.lat = lat;
        this.long = long;
        this.imageURL = imageURL
          
    }


}