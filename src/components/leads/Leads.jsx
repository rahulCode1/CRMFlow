import { Link } from "react-router-dom";
const Leads = ({ lead }) => {
  return (
    <>
      <div className="col-12 col-xl-6">
        <Link to={`/leads/${lead.id}`} className="text-decoration-none">
          <div className="card border-0 shadow-sm lead-card">
            <div className="card-body p-3">
              <div className="d-flex align-items-start">
                {/* Lead Icon */}
                <div className="d-none d-md-block bg-primary bg-opacity-10 rounded-circle p-2 me-3 flex-shrink-0">
                  <i className="bi bi-person-fill text-primary fs-5"></i>
                </div>

                {/* Lead Info */}
                <div className="flex-grow-1">
                  <h5 className="mb-2 fw-semibold text-dark">{lead.name}</h5>

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
                        {lead.salesAgent ? lead.salesAgent.name : "Unknown"}
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
      </div>
    </>
  );
};

export default Leads;
