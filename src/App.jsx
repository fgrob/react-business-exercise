import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Database from "./views/Database";
import Companies from "./views/Companies";
import NavBar from "./components/NavBar";
import { BiLoaderCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "./redux/salesSlice";
import Company from "./views/Company";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.sales.isLoading);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="flex h-screen flex-col">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <BiLoaderCircle className="animate-spin text-2xl text-gray-500" />
        </div>
      ) : (
        <>
          <div className="h-14 flex-shrink-0">
            <NavBar />
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-scroll">
              <Routes>
                <Route path="/" element={<Navigate to="/empresas" replace />} />
                <Route path="/database" element={<Database />} />
                <Route path="/empresas" element={<Companies />} />
                <Route path="/empresas/:empresa" element={<Company />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
