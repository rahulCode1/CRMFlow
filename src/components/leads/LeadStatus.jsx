import { useSearchParams, Link } from "react-router-dom";
import useLeadContext from "../../context/LeadContext";
import Leads from "./Leads";

const LeadStatus = ({ allLeads }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { salesAgent } = useLeadContext();

  const filterNewLeads =
    searchParams.get("status") === null
      ? allLeads
      : allLeads.filter((lead) => lead.status === searchParams.get("status"));
  const filterByAgents =
    searchParams.get("agent") === null
      ? filterNewLeads
      : filterNewLeads.filter(
          (lead) =>
            lead.salesAgent && lead.salesAgent.id === searchParams.get("agent"),
        );
  const filterByPriority =
    searchParams.get("priority") === null
      ? filterByAgents
      : filterByAgents.filter(
          (lead) => lead.priority === searchParams.get("priority"),
        );

  const onUpdateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const leadsStatusArr = [
    { name: "New", value: "New" },
    { name: "Contacted", value: "Contacted" },
    { name: "Qualified", value: "Qualified" },
    { name: "Proposal Sent", value: "Proposal Sent" },
    { name: "Closed", value: "Closed" },
  ];

  const priorityArr = ["High", "Medium", "Low"];

  const sortViaCloseTime = [...filterByPriority];

  if (searchParams.get("time") === "closeSoon") {
    sortViaCloseTime.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  if (searchParams.get("time") === "takeLonger") {
    sortViaCloseTime.sort((a, b) => b.timeToClose - a.timeToClose);
  }

  return (
    <>
      <div className="container-fluid p-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom sticky-top">
          <div className="container-fluid  py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h5 mb-0 fw-bold">Leads by Status</h1>
              <Link
                to="/"
                className="btn btn-outline-secondary btn-sm d-md-flex"
              >
                <span className="d-none d-md-flex me-2"> Go to </span>Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="container-fluid  py-4">
          {/* Filters Section */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-2 align-items-end">
                {/* Status Filter */}
                <div className="col-6 col-md-3">
                  <label
                    htmlFor="status"
                    className="form-label small text-muted mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="form-select form-select-sm"
                    onChange={(e) => onUpdateParams("status", e.target.value)}
                    value={searchParams.get("status") || ""}
                  >
                    <option value="">All Leads</option>
                    {leadsStatusArr.map((lead, index) => (
                      <option key={index} value={lead.value}>
                        {lead.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sales Agent Filter */}
                <div className="col-6 col-md-3">
                  <label
                    htmlFor="agent"
                    className="form-label small text-muted mb-1"
                  >
                    Sales Agent
                  </label>
                  <select
                    id="agent"
                    className="form-select form-select-sm"
                    onChange={(e) => onUpdateParams("agent", e.target.value)}
                    value={searchParams.get("agent") || ""}
                  >
                    <option value="">All Agents</option>
                    {salesAgent.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Filter */}
                <div className="col-sm-6 col-md-2">
                  <label
                    htmlFor="priority"
                    className="form-label small text-muted mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="form-select form-select-sm"
                    onChange={(e) => onUpdateParams("priority", e.target.value)}
                    value={searchParams.get("priority") || ""}
                  >
                    <option value="">All</option>
                    {priorityArr.map((priority, index) => (
                      <option key={index} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time to Close Filter */}
                <div className="col-12 col-sm-6 col-md-3">
                  <label className="form-label small text-muted mb-1">
                    Time to Close
                  </label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        id="closeSoon"
                        name="timeToClose"
                        value="closeSoon"
                        onChange={(e) => onUpdateParams("time", e.target.value)}
                        className="form-check-input"
                        checked={searchParams.get("time") === "closeSoon"}
                      />
                      <label
                        htmlFor="closeSoon"
                        className="form-check-label small"
                      >
                        Soon
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="takeLonger"
                        name="timeToClose"
                        value="takeLonger"
                        onChange={(e) => onUpdateParams("time", e.target.value)}
                        className="form-check-input"
                        checked={searchParams.get("time") === "takeLonger"}
                      />
                      <label
                        htmlFor="takeLonger"
                        className="form-check-label small"
                      >
                        Longer
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status Display */}
          <div className="mb-3">
            <h5 className="text-muted">
              <i className="bi bi-funnel me-2"></i>
              Leads Status:
              <span className="fw-semibold text-dark">
                {searchParams.get("status")
                  ? " " + searchParams.get("status")
                  : " All Leads"}
              </span>
            </h5>
          </div>

          {/* Leads List */}
          <div className="row g-3">
            {sortViaCloseTime && sortViaCloseTime.length !== 0 ? (
              sortViaCloseTime.map((lead, index) => (
                <Leads lead={lead} index={index} />
              ))
            ) : (
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body text-center py-5">
                    <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                    <h5 className="text-muted">No Leads Found</h5>
                    <p className="text-muted">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadStatus;
