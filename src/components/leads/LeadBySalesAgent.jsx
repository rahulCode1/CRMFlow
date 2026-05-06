import { Link,  useSearchParams } from "react-router-dom";
import Leads from "./Leads";

import useLeadContext from "../../context/LeadContext";
const LeadsBySalesAgent = ({allLeads}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { salesAgent } = useLeadContext();
 

  const salesAgentId = searchParams.get("agentId");
  let filterLeads =
    salesAgentId === null
      ? allLeads
      : allLeads.filter(
          (lead) => lead.salesAgent && lead.salesAgent.id === salesAgentId
        );

  filterLeads =
    searchParams.get("status") === null
      ? filterLeads
      : filterLeads.filter(
          (lead) => lead.status === searchParams.get("status")
        );

  filterLeads =
    searchParams.get("priority") === null
      ? filterLeads
      : filterLeads.filter(
          (lead) => lead.priority === searchParams.get("priority")
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

  const sortViaCloseTime = [...filterLeads];

  if (searchParams.get("time") === "closeSoon") {
    sortViaCloseTime.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  if (searchParams.get("time") === "takeLonger") {
    sortViaCloseTime.sort((a, b) => b.timeToClose - a.timeToClose);
  }

  return (
    <>
      <div className="min-vh-100 bg-light">
        {/* Header Section */}
        <div className="bg-white shadow-sm mb-3">
          <div className=" py-2 d-flex justify-content-between align-items-center px-2">
            <h5 className=" mb-0 fw-bold">Leads by Sales Agent</h5>
            <Link
              to={"/"}
              className="text-decoration-none  mb-2 d-inline-block  btn btn-secondary"
            >
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className=" my-2">
          {/* Sales Agent Filter */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label fw-semibold mb-md-0">
                    Filter via Sales Agent:
                  </label>
                </div>
                <div className="col-12 col-md-9">
                  <select
                    id="agentId"
                    className="form-select"
                    onChange={(e) => onUpdateParams("agentId", e.target.value)}
                  >
                    <option value={""}>All Leads</option>
                    {salesAgent &&
                      salesAgent.map((agent) => (
                        <option value={agent.id} key={agent.id}>
                          Leads by {agent.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="card shadow-sm border-0 mb-2">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-funnel me-2"></i>Filters
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    className="form-select"
                    onChange={(e) => onUpdateParams("status", e.target.value)}
                  >
                    <option value={""}>All Leads</option>
                    {leadsStatusArr.map((lead) => (
                      <option value={lead.value} key={lead.value}>
                        {lead.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold">Priority</label>
                  <select
                    className="form-select"
                    onChange={(e) => onUpdateParams("priority", e.target.value)}
                  >
                    <option value={""}>Select Priority</option>
                    {priorityArr.map((priority) => (
                      <option value={priority} key={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold d-block">
                    Time to Close
                  </label>
                  <div className="form-check mt-2">
                    <input
                      type="radio"
                      name="timeToClose"
                      value={"closeSoon"}
                      onChange={(e) => onUpdateParams("time", e.target.value)}
                      className="form-check-input"
                      id="closeSoon"
                    />
                    <label className="form-check-label" htmlFor="closeSoon">
                      Close Soon
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="timeToClose"
                      value={"takeLonger"}
                      onChange={(e) => onUpdateParams("time", e.target.value)}
                      className="form-check-input"
                      id="takeLonger"
                    />
                    <label className="form-check-label" htmlFor="takeLonger">
                      Take Longer
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leads Display */}
          <div className="row g-4 mb-4">
            {sortViaCloseTime && sortViaCloseTime.length !== 0 ? (
              sortViaCloseTime.map((lead, index) => (
                <Leads lead={lead} index={index} />
              ))
            ) : (
              <div className="col-12">
                <div
                  className="alert alert-info border-0 shadow-sm"
                  role="alert"
                >
                  <i className="bi bi-info-circle me-2"></i>
                  No lead found with this agent.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadsBySalesAgent;
