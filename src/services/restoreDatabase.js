import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const uploadData = async () => {
    try {
        const data = await fetch("/sales.json");
        const sales = await data.json();

        const salesCollection = collection(db, "sales");
        const batch = writeBatch(db); // Para escribir todo el lote de una en la BD

        sales.forEach((sale) => {
            const docRef = doc(salesCollection);
            batch.set(docRef, sale);
        });

        await batch.commit();

        console.log("Datos cargados correctamente");
    } catch (error) {
        console.error("Error al intentar cargar la data", error);
    }
};

export default uploadData;
