import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import cleanDatabase from "../services/cleanDatabase";
import uploadData from "../services/restoreDatabase";
import { useDispatch } from "react-redux";
import { clearSalesData, fetchSales } from "../redux/salesSlice";

const Settings = ({ setIsSettingsOpen, settingsButtonRef }) => {
  const dispatch = useDispatch();
  const settingsRef = useRef();

  const handleLinkClick = () => {
    setIsSettingsOpen(false);
  };

  const handleRestoreOrClean = async (action) => {
    setIsSettingsOpen(false);
    if (action === "clean") {
      await cleanDatabase();
      dispatch(clearSalesData());
    } else if (action === "restore") {
      await uploadData();
      dispatch(fetchSales());
    }
  };

  const handleClickOutside = (event) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target) &&
      !settingsButtonRef.current.contains(event.target)
    ) {
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="absolute right-5 top-16 z-50 rounded-xl border-2 border-gray-500 bg-gray-200 p-4 shadow-2xl"
      ref={settingsRef}
    >
      <ul>
        <li>
          <Link to="/empresas" onClick={handleLinkClick}>
            <div className="block p-2 hover:rounded-xl hover:bg-gray-100">
              Dashboard
            </div>
          </Link>
        </li>
        <li>
          <Link to="/database" onClick={handleLinkClick}>
            <div className="block p-2 hover:rounded-xl hover:bg-gray-100">
              Base de datos
            </div>
          </Link>
        </li>
        <li>
          <button
            className="block p-2 hover:rounded-xl hover:bg-gray-100"
            onClick={() => handleRestoreOrClean("clean")}
          >
            Limpiar Base de datos
          </button>
        </li>
        <li>
          <button
            className="block p-2 hover:rounded-xl hover:bg-gray-100"
            onClick={() => handleRestoreOrClean("restore")}
          >
            Restaurar Base de datos
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
