import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const salesCollectionRef = collection(db, 'sales');

export const getSalesData = async () => {
    const data = await getDocs(salesCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

