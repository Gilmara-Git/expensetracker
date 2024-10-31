import { useSQLiteContext } from "expo-sqlite"

type VendorData = {
    id: number,
    expenseId: string,
    name: string,
    address: string,
    imageURL: string,
    lat: number,
    long: number

}


export const useVendorDatabase = ()=>{
    const vendorDb = useSQLiteContext();

    const create = async(data: Omit<VendorData, 'id'>)=>{
        
        const statement =  await vendorDb.prepareAsync(
            'INSERT INTO vendor (expenseId, name, address, imageURL, lat, long) VALUES ($expenseId, $name, $address, $imageURL, $lat , $long)',
        )

        try{
            let result = await statement.executeAsync({
                $expenseId: data.expenseId, 
                $name: data.name, 
                $address: data.address, 
                $imageURL: data.imageURL, 
                $lat: data.lat , 
                $long: data.long

            })

            const  insertedRowId = result.lastInsertRowId;

            return { insertedRowId  }

        }
        catch(error){
            throw error
        }finally{
            await statement.finalizeAsync();
        }
    }

    

    return { create } 
}