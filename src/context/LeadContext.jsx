import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showLoadingToast, showSuccessToast } from "../utils/toast";
const LeadContext = createContext();

const useLeadContext = () => useContext(LeadContext);

export default useLeadContext;

export const LeadProvider = ({ children }) => {
  const [salesAgent, setSalesAgent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("userId"));
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchAllSalesAgent = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/api/agents`);
        const salesAgent = response.data?.allSalesAgents;

        setSalesAgent(salesAgent || []);
      } catch (error) {
        console.log(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSalesAgent();
  }, [apiUrl]);

  const handleLogout = (navigate) => {
    const toastId = showLoadingToast("Loging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLogin(null);
    navigate("/login");
    showSuccessToast(toastId, "User logout successfully.");
  };
  return (
    <LeadContext.Provider
      value={{
        isLoading,
        salesAgent,
        setSalesAgent,
        isLogin,
        setIsLogin,
        handleLogout,
        error,
        setError,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};
