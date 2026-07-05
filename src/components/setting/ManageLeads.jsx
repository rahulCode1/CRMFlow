import { Link, useFetcher, useNavigation } from "react-router-dom";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import api from "../../utils/axios";
const ManageLeads = ({ leads }) => {
  const fetcher = useFetcher();

  const navigation = useNavigation();

  const isLoading = navigation.state === "submitting";

  return (
    <main className="container-fluid py-3">
      {leads && leads.length > 0 ? (
        <>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
            <div>
              <h4 className="fw-bold mb-1">Manage Leads</h4>
              <p className="text-muted mb-0">
                Showing <strong>{leads.length}</strong> leads
              </p>
            </div>
          </div>

          <div className="row g-4">
            {leads.map((lead, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4">
                <div className="card border-0 shadow-sm lead-card h-100">
                  <Link
                    to={`/leads/${lead.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card-body">
                      {/* Top */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold mb-1">{lead.name}</h5>

                          <small className="text-muted">
                            Assigned to{" "}
                            <strong>
                              {lead.salesAgent
                                ? lead.salesAgent.name
                                : "Unknown"}
                            </strong>
                          </small>
                        </div>

                        <i className="bi bi-chevron-right fs-5 text-secondary"></i>
                      </div>

                      {/* Status & Priority */}
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            lead.status === "New"
                              ? "bg-primary"
                              : lead.status === "Contacted"
                                ? "bg-info"
                                : lead.status === "Qualified"
                                  ? "bg-success"
                                  : lead.status === "Proposal Sent"
                                    ? "bg-warning text-dark"
                                    : "bg-secondary"
                          }`}
                        >
                          {lead.status}
                        </span>

                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            lead.priority === "High"
                              ? "bg-danger"
                              : lead.priority === "Medium"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                          }`}
                        >
                          {lead.priority} Priority
                        </span>
                      </div>

                      {/* Bottom */}
                      <div className="row text-center g-3">
                        <div className="col-6">
                          <div className="bg-light rounded p-3 h-100">
                            <i className="bi bi-calendar-event fs-4 text-primary"></i>
                            <p className="small text-muted mb-1 mt-2">
                              Time to Close
                            </p>
                            <h6 className="fw-bold mb-0">
                              {lead.timeToClose} Days
                            </h6>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="bg-light rounded p-3 h-100">
                            <i className="bi bi-person-check fs-4 text-success"></i>
                            <p className="small text-muted mb-1 mt-2">
                              Sales Agent
                            </p>
                            <h6 className="fw-bold mb-0 text-truncate">
                              {lead.salesAgent
                                ? lead.salesAgent.name
                                : "Unknown"}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
                    <fetcher.Form method="post">
                      <input type="hidden" name="leadId" value={lead.id} />

                      <button
                        type="submit"
                        name="intent"
                        value="delete"
                        disabled={isLoading}
                        className="btn btn-outline-danger w-100"
                      >
                        <i className="bi bi-trash me-2"></i>
                        Delete Lead
                      </button>
                    </fetcher.Form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox display-2 text-secondary"></i>

            <h4 className="mt-3">No Leads Found</h4>

            <p className="text-muted mb-0">
              Start by creating your first lead.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageLeads;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const leadId = formData.get("leadId");
  const toastId = showLoadingToast("Deleting lead...");

  try {
    const response = await api.delete(`/api/leads/${leadId}`);

    showSuccessToast(
      toastId,
      response?.data?.message || "Lead deleted successfully.",
    );
  } catch (error) {
    showErrorToast(
      toastId,
      error.response?.data?.message || "Failed to delete leads.",
    );
  }
};
