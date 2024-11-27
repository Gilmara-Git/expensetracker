import { useSQLiteContext } from "expo-sqlite"

type VendorData = {
    id: number,
    expenseId: string,
    address: string | null,
    lat: number,
    long: number
    imageURL: string,

}


export const useVendorDatabase = ()=>{
    const vendorDb = useSQLiteContext();

    const create = async(data: Omit<VendorData, 'id'>)=>{

        const statement =  await vendorDb.prepareAsync(
            'INSERT INTO vendor (expenseId, address, imageURL, lat, long) VALUES ($expenseId, $address, $imageURL, $lat , $long)',
        )

        try{
            let result = await statement.executeAsync({
                $expenseId: data.expenseId, 
                $address: data.address, 
                $imageURL: data.imageURL, 
                $lat: data.lat , 
                $long: data.long

            })

            const  insertedRowId = result.lastInsertRowId.toLocaleString();
        

            return { insertedRowId  }

        }
        catch(error){
            throw error
        }finally{
            await statement.finalizeAsync();
        }
    }

    



    const getAllReceiptMap = async()=>{
        const query  = 'SELECT * FROM vendor'
        
        try{
           const response =  await vendorDb.getAllAsync<VendorData>(query);
       
           return response;

        }catch(error){
            throw error
        }
    };

 const searchReceiptMapByExpenseId = async(expenseId: string)=>{
    
   
    try{
        const query =  'SELECT * FROM vendor WHERE expenseId LIKE ?'
        const response = await vendorDb.getAllAsync(query, `%${expenseId}%`)
     
        return response;

    }catch(error){
        throw error;

    }
 }
   



    return { create, getAllReceiptMap, searchReceiptMapByExpenseId } 
}