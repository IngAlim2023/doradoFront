import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import useAuthContext from "./context/AuthHook";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
const App = () => {
  const { isAutenticate, setIsAutenticate } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3333/dorado/validate", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.message === "Autorizado") {
          return setIsAutenticate(true);
        }
        return setIsAutenticate(false);
      } catch (e) {
        return setIsAutenticate(false);
      }
    };
    checkAuth();
  }, [isAutenticate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
