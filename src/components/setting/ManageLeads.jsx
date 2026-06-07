import {
  
  Link,
  useFetcher,
  useNavigation,
} from "react-router-dom";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import axios from "axios";
const ManageLeads = ({leads }) => {
  const fetcher = useFetcher();
  
  const navigation = useNavigation();

  const isLoading = navigation.state === "submitting";

  return (
    <>
      {leads && leads.length !== 0 ? (
        <>
          <div className="mb-3 text-muted py-2">
            <h3>Showing {leads.length} leads</h3>
          </div>

          <div className="row g-3">
            {leads.map((lead, index) => (
              <div key={index} className="col-12 col-xl-6">
                <div className="position-relative">
                  <Link
                    to={`/leads/${lead.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card border-0 shadow-sm lead-card">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-start">
                          {/* Lead Icon */}
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 flex-shrink-0">
                            <i className="bi bi-person-fill text-primary fs-5"></i>
                          </div>

                          {/* Lead Info */}
                          <div className="flex-grow-1">
                            <h5 className="mb-2 fw-semibold text-dark">
                              {lead.name}
                            </h5>

                            <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                              <span
                                className={`badge ${
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
                                className={`badge ${
                                  lead.priority === "High"
                                    ? "bg-danger"
                                    : lead.priority === "Medium"
                                    ? "bg-warning text-dark"
                                    : "bg-secondary"
                                }`}
                              >
                                {lead.priority}
                              </span>
                            </div>

                            <div className="row g-2">
                              <div className="col-sm-6">
                                <small className="text-muted d-block">
                                  <i className="bi bi-person-badge me-1"></i>
                                  {lead.salesAgent
                                    ? lead.salesAgent.name
                                    : "Unknown"}
                                </small>
                              </div>
                              <div className="col-sm-6">
                                <small className="text-muted d-block">
                                  <i className="bi bi-calendar-event me-1"></i>
                                  {lead.timeToClose} days to close
                                </small>
                              </div>
                            </div>
                          </div>

                          {/* Arrow Icon */}
                          <div className="ms-2 text-muted">
                            <i className="bi bi-chevron-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <fetcher.Form
                    method="post"
                    className="position-absolute top-0 end-0 m-2"
                  >
                    <button
                      type="submit"
                      name="intent"
                      value={"delete"}
                      disabled={isLoading}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    <input type="hidden" name="leadId" value={lead.id} />
                  </fetcher.Form>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <h5 className="text-muted">No leads found</h5>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageLeads;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const leadId = formData.get("leadId");
  const toastId = showLoadingToast("Delete lead...");

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/leads/${leadId}`
    );

    showSuccessToast(
      toastId,
      response?.data?.message || "Failed to delete lead."
    );
  } catch (error) {
    showErrorToast(
      toastId,
      error.response?.data?.message || "Failed to delete leads."
    );
  }
};
