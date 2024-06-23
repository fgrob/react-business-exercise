import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import { useSelector } from "react-redux";
import { sortByField } from "../utils/sorting";
import {
  calculateSalesByAgency,
  calculateTopAgency,
  calcTopSalesDate,
} from "../utils/calcs";
import { monthNames } from "../utils/constants";

const Companies = () => {
  const sales = useSelector((state) => state.sales.salesData);
  const [salesByAgency, setSalesByAgency] = useState([]);
  const [topAgency, setTopAgency] = useState();
  const [topSalesDate, setTopSalesDate] = useState();

  useEffect(() => {
    const salesByAgencyArray = calculateSalesByAgency(sales);
    const sortedList = sortByField(
      [...salesByAgencyArray],
      "nameAgency",
      "desc",
    );
    setSalesByAgency(sortedList);
    const topAgencyResult = calculateTopAgency(salesByAgencyArray);
    setTopAgency(topAgencyResult);

    const topDate = calcTopSalesDate(sales);
    setTopSalesDate(topDate);
  }, [sales]);
  return (
    <div>
      <div className="flex justify-evenly gap-4 p-4">
        <div className="flex-1 rounded-xl bg-gray-200 p-4 text-center text-lg font-bold">
          <div>{topAgency?.nameAgency}</div>
          <div className="text-3xl">
            {Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
            }).format(topAgency?.total)}
          </div>
        </div>
        <div className="flex-1 rounded-xl bg-gray-200 p-4 text-center text-lg font-bold">
          <div>MES MAS VENTAS</div>
          <div className="text-3xl">{monthNames[topSalesDate?.month]}</div>
        </div>
      </div>
      <div>
        <TableComponent
          headers={[
            { value: "Nombre empresa", filterColName: "nameAgency" },
            { value: "Total de ventas", filterColName: "total" },
            { value: "Comisión", filterColName: "commission" },
            { value: "Detalle" },
          ]}
          data={salesByAgency}
          dataCols={[
            { value: "nameAgency" },
            { value: "total", valueType: "price" },
            { value: "commission", valueType: "price" },
            {
              value: "path",
              valueType: "link",
              extras: { linkText: "Ver detalle" },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Companies;
