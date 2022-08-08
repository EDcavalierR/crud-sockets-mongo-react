import { connect } from "mongoose";
import { MONGODB_URI } from "./config"

export const connectDB = async () => {
    try {
        await connect(MONGODB_URI)
        console.log('DB is connected');
    } catch (error) {
        console.log('Error en la conexion a la DB ', error);
    }
}