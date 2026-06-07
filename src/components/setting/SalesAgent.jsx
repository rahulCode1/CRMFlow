import useLeadContext from "../../context/LeadContext";
import { useState } from "react";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import api from "../../utils/axios";

const SalesAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { salesAgent, setSalesAgent } = useLeadContext();

  const deleteSalesAgent = async (id) => {
    const toastId = showLoadingToast("Delete agent...");
    try {
      setIsLoading(true);
      const response = await api.delete(`/api/agents/${id}`);

      setSalesAgent((prevStat) => prevStat.filter((agent) => agent.id !== id));
      showSuccessToast(
        toastId,
        response?.data?.message || "Agent deleted successfully.",
      );
    } catch (error) {
      showErrorToast(
        toastId,
        error.response?.data?.message || "Failed to delete sales agent.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid p-0">
        {/* Main Content */}
        <div className="container-fluid py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm">
                <div className="card-body p-0">
                  {salesAgent && salesAgent.length !== 0 ? (
                    <div className="list-group list-group-flush">
                      {salesAgent.map((agent, index) => (
                        <div key={index} className="list-group-item">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                              <i className="bi bi-person-fill text-primary fs-5"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 fw-semibold">{agent.name}</h6>
                              <small className="text-muted">
                                <i className="bi bi-envelope me-1"></i>
                                {agent.email}
                              </small>
                            </div>
                            <div>
                              <i className="bi bi-chevron-right text-muted"></i>
                            </div>
                            <div>
                              <button
                                disabled={isLoading}
                                onClick={() => deleteSalesAgent(agent.id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-people display-1 text-muted mb-3"></i>
                      <h5 className="text-muted">No Sales Agents Found</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAgent;
