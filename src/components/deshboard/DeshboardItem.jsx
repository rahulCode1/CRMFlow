import { Link, useSearchParams } from "react-router-dom";

const DashboardItem = ({ leads }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredLeads = !searchParams.get("status")
    ? leads
    : leads.filter((lead) => lead.status === searchParams.get("status"));
  const newLeads = leads.filter((lead) => lead.status === "New");
  const contactedLeads = leads.filter((lead) => lead.status === "Contacted");
  const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified");

  return (
    <>
      <div className="container-fluid p-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom sticky-top rounded">
          <div className="container-fluid px-4 py-2 py-md-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h3 mb-0 fw-bold text-dark fs-4">Dashboard</h1>
              <Link
                to="leads/addLeads"
                className="btn btn-primary d-none d-md-inline-flex align-items-center"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add New Lead
              </Link>
            </div>
          </div>
        </div>

        <div className="container-fluid  py-4">
          {/* Quick Filters */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3 fw-semibold">Quick Filters</h5>
              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setSearchParams("status=New")}
                >
                  <i className="bi bi-star me-1"></i>
                  New
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={() => setSearchParams("status=Contacted")}
                >
                  <i className="bi bi-telephone me-1"></i>
                  Contacted
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => setSearchParams("status=Qualified")}
                >
                  <i className="bi bi-check-circle me-1"></i>
                  Qualified
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => setSearchParams("status=Proposal Sent")}
                >
                  <i className="bi bi-file-earmark-text me-1"></i>
                  Proposal Sent
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSearchParams("status=Closed")}
                >
                  <i className="bi bi-archive me-1"></i>
                  Closed
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted mb-1 small">New Leads</p>
                      <h3 className="mb-0 fw-bold">{newLeads.length}</h3>
                    </div>
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <i className="bi bi-star-fill text-primary fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted mb-1 small">Contacted</p>
                      <h3 className="mb-0 fw-bold">{contactedLeads.length}</h3>
                    </div>
                    <div className="bg-info bg-opacity-10 p-3 rounded">
                      <i className="bi bi-telephone-fill text-info fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted mb-1 small">Qualified</p>
                      <h3 className="mb-0 fw-bold">{qualifiedLeads.length}</h3>
                    </div>
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <i className="bi bi-check-circle-fill text-success fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leads List */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0 fw-semibold">Recent Leads</h5>
            </div>
            <div className="card-body p-0">
              {filteredLeads && filteredLeads.length !== 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td className="py-3 px-4">
                            <Link
                              to={`leads/${lead.id}`}
                              className="text-decoration-none d-flex align-items-center"
                            >
                              <div
                                className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 d-none d-sm-flex align-items-center justify-content-center flex-shrink-0"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-person-fill text-primary"></i>
                              </div>

                              <div className="flex-grow-1">
                                <div className="fw-semibold text-dark hover-primary">
                                  {lead.name}
                                </div>
                                <div className="small text-muted mt-1">
                                  Status: 
                                  <span className="fw-medium text-secondary px-2">
                                     {lead.status}
                                  </span>
                                </div>
                              </div>

                              <i className="bi bi-chevron-right ms-auto text-muted"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <p className="text-muted mt-3 mb-0">No leads found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile FAB Button */}
          <Link
            to="leads/addLeads"
            className="btn btn-primary rounded-circle shadow-lg position-fixed d-md-none d-flex align-items-center justify-content-center"
            style={{
              width: "50px",
              height: "50px",
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
            }}
          >
            <i className="bi bi-plus-lg fs-4">+</i>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hover-primary:hover {
          color: var(--bs-primary) !important;
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default DashboardItem;
