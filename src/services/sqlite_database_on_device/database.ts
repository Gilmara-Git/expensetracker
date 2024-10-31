import { type SQLiteDatabase}  from 'expo-sqlite';

export const initDb = async(database: SQLiteDatabase)=>{
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS vendor (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        expenseId TEXT NOT NULL, 
        name TEXT NOT NULL, 
        address TEXT NOT NULL, 
        imageURL TEXT NOT NULL, 
        lat REAL NOT NULL, 
        long REAL NOT NULL
        );`)
}


