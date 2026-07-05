import useLeadContext from "../../context/LeadContext";
import { useState } from "react";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import api from "../../utils/axios";
import { FaTrash } from "react-icons/fa";

const SalesAgent = () => {
  const [agentId, setAgentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { salesAgent, setSalesAgent } = useLeadContext();

  const deleteSalesAgent = async (id) => {
    const toastId = showLoadingToast("Delete agent...");
    try {
      setIsLoading(true);
      setAgentId(id);
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
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
            <div>
              <h4 className="fw-bold mb-1">Manage sales agent</h4>
              <p className="text-muted mb-0">
                Showing <strong>{salesAgent.length}</strong> sales agent
              </p>
            </div>
          </div>

          <div className="row g-4">
            {salesAgent.length > 0 ? (
              salesAgent.map((agent) => (
                <div
                  className="col-12 col-sm-6 col-md-4  col-xl-3"
                  key={agent._id}
                >
                  <div
                    className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                    style={{ transition: "all .3s ease", cursor: "pointer" }}
                  >
                    {/* Profile Image */}
                    {agent?.profileImg ? (
                      <img
                        src={agent.profileImg}
                        alt={agent.name}
                        className="card-img-top"
                        style={{
                          height: "260px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light"
                        style={{ height: "260px" }}
                      >
                        <div
                          className="rounded-circle border border-dark d-flex align-items-center justify-content-center"
                          style={{
                            width: "120px",
                            height: "120px",
                          }}
                        >
                          <h1 className="fw-bold m-0">
                            {agent.name.charAt(0).toUpperCase()}
                          </h1>
                        </div>
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="card-body text-center d-flex flex-column">
                      <h5 className="fw-bold mb-1">{agent.name}</h5>

                      <p
                        className="text-muted small mb-4"
                        style={{
                          wordBreak: "break-word",
                        }}
                      >
                        {agent.email}
                      </p>

                      <button
                        disabled={isLoading && agent.id === agentId}
                        onClick={() => deleteSalesAgent(agent.id)}
                        className="btn btn-outline-danger rounded-pill mt-auto"
                      >
                        {isLoading && agent.id === agentId ? (
                          <span className="spinner-border spinner-sm ms-2" />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-100 h-100 d-flex justify-content-center">
                <div className="text-center py-5">
                  <i className="bi bi-people display-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No Sales Agents Found</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAgent;
