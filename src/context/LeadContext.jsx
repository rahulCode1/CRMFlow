import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LeadContext = createContext();

const useLeadContext = () => useContext(LeadContext);

export default useLeadContext;

export const LeadProvider = ({ children }) => {
  const [salesAgent, setSalesAgent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchAllSalesAgent = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/agents`);
        const salesAgent = response.data?.allSalesAgents;

        setSalesAgent(salesAgent || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSalesAgent();
  }, [apiUrl]);

  return (
    <LeadContext.Provider
      value={{
        isLoading,
        salesAgent,
        setSalesAgent,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};
