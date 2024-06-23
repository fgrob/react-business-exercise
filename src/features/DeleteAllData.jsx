import React from "react";
import { db } from "../firebase-config";
import { collection, getDocs, writeBatch } from "firebase/firestore";

const DeleteAllData = () => {
  const deleteData = async () => {
    try {
      const salesCollection = collection(db, "sales");
      const sales = await getDocs(salesCollection);

      const batch = writeBatch(db);
      sales.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log("Data eliminada correctamente");
    } catch (error) {
      console.error("Error al intentar eliminar la data", error);
    }
  };
  return (
    <div>
      <button onClick={deleteData}>Eliminar Data</button>
    </div>
  );
};

export default DeleteAllData;
