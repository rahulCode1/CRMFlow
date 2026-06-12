import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useLeadContext from "../../context/LeadContext";
import Leads from "./Leads";

const LeadsListItem = ({ leads }) => {
  const [salesAgentId, setSalesAgentId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const { salesAgent } = useLeadContext();

  const filteredLeads =
    searchParams.get("status") === null
      ? leads
      : leads.filter((lead) => lead.status === searchParams.get("status"));

  const salesAgentFilter =
    searchParams.get("agent") === null
      ? filteredLeads
      : filteredLeads.filter(
          (lead) =>
            lead.salesAgent &&
            lead.salesAgent._id === searchParams.get("agent"),
        );

  const leadsStatusArr = [
    { name: "New", value: "New" },
    { name: "Contacted", value: "Contacted" },
    { name: "Qualified", value: "Qualified" },
    { name: "Proposal Sent", value: "Proposal Sent" },
    { name: "Closed", value: "Closed" },
  ];

  const sortByArr = ["High", "Medium", "Low"];

  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  let displayLeads = searchParams.get("priority")
    ? [...salesAgentFilter].sort((a, b) => {
        const priority = searchParams.get("priority");

        if (a.priority === priority && b.priority !== priority) return -1;
        if (b.priority === priority && a.priority !== priority) return 1;
        return 0;
      })
    : salesAgentFilter;

  if (searchParams.get("timeToClose") === "ClosingSoon") {
    displayLeads = [...displayLeads].sort(
      (a, b) => Number(a.timeToClose) - Number(b.timeToClose),
    );
  } else if (searchParams.get("timeToClose") === "tackingLonger") {
    displayLeads = [...displayLeads].sort(
      (a, b) => Number(b.timeToClose) - Number(a.timeToClose),
    );
  }

  return (
    <>
      <div className="container-fluid p-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom rounded">
          <div className="container-fluid  py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h3 mb-0 fw-bold text-dark">All Leads</h1>

              <Link to="addLeads" className="btn btn-primary btn-sm">
                <i className="bi bi-plus-circle me-1"></i>
                Add New Lead
              </Link>
            </div>
          </div>
        </div>

        <div className="container-fluid   py-2">
          {/* Compact Filters - Horizontal Layout */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body ">
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
                    onChange={(e) =>
                      updateSearchParams("status", e.target.value)
                    }
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
                    htmlFor="agentId"
                    className="form-label small text-muted mb-1"
                  >
                    Sales Agent
                  </label>
                  <select
                    id="agentId"
                    className="form-select form-select-sm"
                    onChange={(e) =>
                      updateSearchParams("agent", e.target.value)
                    }
                  >
                    <option value="">All Agents</option>
                    {salesAgent &&
                      salesAgent.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Priority Filter */}
                <div className="col-6 col-md-2">
                  <label
                    htmlFor="priority"
                    className="form-label small text-muted mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="form-select form-select-sm"
                    onChange={(e) =>
                      updateSearchParams("priority", e.target.value)
                    }
                    value={searchParams.get("priority") || ""}
                  >
                    <option value="">All</option>
                    {sortByArr.map((sort, index) => (
                      <option key={index} value={sort}>
                        {sort}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time to Close Filter */}
                <div className="col-6 col-md-3">
                  <label
                    htmlFor="timeToClose"
                    className="form-label small text-muted mb-1"
                  >
                    Time to Close
                  </label>
                  <select
                    id="timeToClose"
                    className="form-select form-select-sm"
                    onChange={(e) =>
                      updateSearchParams("timeToClose", e.target.value)
                    }
                    value={searchParams.get("timeToClose") || ""}
                  >
                    <option value="">All</option>
                    <option value="ClosingSoon">Closing Soon</option>
                    <option value="tackingLonger">Taking Longer</option>
                  </select>
                </div>

               
              </div>
            </div>
          </div>

          {/* Leads List */}
          {displayLeads && displayLeads.length !== 0 ? (
            <div>
              <div className="mb-3 text-muted">
                <small>Showing {displayLeads.length} lead(s)</small>
              </div>
              <div className="row g-3">
                {displayLeads.map((lead, index) => (
                  <Leads lead={lead} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                <h5 className="text-muted">No leads found</h5>
                <p className="text-muted mb-4">
                  Try adjusting your filters or add a new lead
                </p>
                <Link to="addLeads" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Lead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .lead-card {
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .lead-card:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }

        .lead-card:active {
          transform: translateY(0);
        }

        @media (max-width: 767.98px) {
          .form-select-sm {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  );
};

export default LeadsListItem;
