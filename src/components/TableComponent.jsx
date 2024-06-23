import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

import { LiaSortSolid } from "react-icons/lia";
import { LiaSortUpSolid } from "react-icons/lia";
import { LiaSortDownSolid } from "react-icons/lia";

import { sortByField } from "../utils/sorting";

const TableComponent = ({ headers, data, dataCols }) => {
  const [tableData, setTableData] = useState(data);
  const [selectedSorting, setSelectedSorting] = useState([null, "desc"]);

  const formatCell = (value, type, extras) => {
    if (value === null || value === undefined || value === "") {
      return value;
    }
    switch (type) {
      case "fullDate":
        return moment(value).tz("America/Santiago").format("DD/MM/yyyy HH:mm");
      case "date":
        return moment(value).tz("America/Santiago").format("DD/MM/yyyy");
      case "price":
        return Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(value);
      case "link":
        return (
          <Link to={`${value}`}>
            <div>{extras.linkText}</div>
          </Link>
        );
      default:
        return value;
    }
  };

  const sortData = (header) => {
    let sortedData = [...data];
    let newOrder;

    if (selectedSorting[0] === header) {
      newOrder = selectedSorting[1] === "desc" ? "asc" : "desc";
    } else if (selectedSorting[0] === null && selectedSorting[1] === "desc") {
      newOrder = "asc";
    } else {
      newOrder = "desc";
    }

    sortedData = sortByField(sortedData, header, newOrder);
    setSelectedSorting([header, newOrder]);
    setTableData(sortedData);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <table className="w-full text-center text-xs">
      <thead className="sticky top-0 mt-3 bg-gray-300">
        <tr className="tracking-wider">
          {headers.map((header, index) => (
            <th key={index} className="border p-2">
              <div className="flex justify-center gap-1">
                <div>{header.value}</div>
                {header.filterColName && (
                  <button
                    className="text-xl"
                    onClick={() => sortData(header.filterColName)}
                  >
                    {selectedSorting[0] === header.filterColName ? (
                      selectedSorting[1] === "asc" ? (
                        <LiaSortUpSolid />
                      ) : (
                        <LiaSortDownSolid />
                      )
                    ) : (
                      <LiaSortSolid />
                    )}
                  </button>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((dataRow, index) => (
          <tr key={index} className="tracking-wider">
            {dataCols.map((dataCol, index) => (
              <td
                key={index}
                className={`${
                  dataCol.customFormat && dataCol.customFormat
                } border p-2`}
              >
                {formatCell(
                  dataRow[dataCol.value],
                  dataCol.valueType,
                  dataCol.extras,
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
