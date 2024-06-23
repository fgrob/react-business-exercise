import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import { sortByDateDesc } from "../utils/sorting";

const Company = () => {
  const sales = useSelector((state) => state.sales.salesData);
  const { empresa } = useParams();
  const [agencySales, setAgencySales] = useState([]);

  const getAgencySales = (companyName) => {
    const filteredSales = sales.filter(
      (sale) =>
        sale.nameAgency.toLowerCase().replace(/ /g, "-") === companyName,
    );

    const sortedSales = sortByDateDesc(filteredSales, "day");

    return sortedSales;
  };

  useEffect(() => {
    const data = getAgencySales(empresa);
    setAgencySales(data);
  }, [sales]);

  return (
    <div>
      <div className="flex gap-2 p-4">
        <Link to="/empresas">
          <div className="font-bold text-blue-500 underline">Empresa</div>
        </Link>
        <div>
          {">"} {empresa}
        </div>
      </div>
      <div>
        <TableComponent
          headers={[
            { value: "Nombre cliente", filterColName: "name" },
            { value: "Personas", filterColName: "persons" },
            { value: "Día", filterColName: "day" },
            { value: "Hora" },
            { value: "Valor venta", filterColName: "finalPrice" },
          ]}
          data={agencySales}
          dataCols={[
            { value: "name" },
            { value: "persons" },
            { value: "day", valueType: "date" },
            { value: "hour" },
            { value: "finalPrice", valueType: "price" },
          ]}
        />
      </div>
    </div>
  );
};

export default Company;
