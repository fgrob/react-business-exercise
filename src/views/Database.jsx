import React from "react";
import TableComponent from "../components/TableComponent";
import { useSelector } from "react-redux";

const Database = () => {
  const sales = useSelector((state) => state.sales.salesData);

  return (
    <TableComponent
      headers={[
        { value: "id", filterColName: "id" },
        { value: "createdAt", filterColName: "createdAt" },
        { value: "datePayment", filterColName: "datePayment" },
        { value: "day", filterColName: "day" },
        { value: "finalPrice", filterColName: "finalPrice" },
        { value: "hour" },
        { value: "name", filterColName: "name" },
        { value: "nameAgency", filterColName: "nameAgency" },
        { value: "PaymentStatus" },
        { value: "paymentType", filterColName: "paymentType" },
        { value: "persons", filterColName: "persons" },
        { value: "timeZone" },
        { value: "totalPrice" },
        { value: "wayToPay", filterColName: "wayToPay" },
      ]}
      data={sales}
      dataCols={[
        { value: "id", customFormat: "bg-gray-100" },
        { value: "createdAt", valueType: "fullDate" },
        { value: "datePayment", valueType: "fullDate" },
        { value: "day", valueType: "date" },
        { value: "finalPrice", valueType: "price" },
        { value: "hour" },
        { value: "name" },
        { value: "nameAgency" },
        { value: "PaymentStatus" },
        { value: "paymentType" },
        { value: "persons" },
        { value: "timeZone" },
        { value: "totalPrice", valueType: "price" },
        { value: "wayToPay" },
      ]}
    />
  );
};

export default Database;
