import { Form, useNavigation, redirect, Link } from "react-router-dom";
import SubmitLoadingSpinner from "../components/SubmitLoadingSpinnr";
import useLeadContext from "../context/LeadContext";
import ModelOverlay from "../components/model/ModelOverlay";
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../utils/toast";
import api from "../utils/axios";

const LeadForm = () => {
  const { salesAgent, error, setError } = useLeadContext();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <>
      {error && (
        <ModelOverlay
          text={error}
          title={"Error occurred"}
          onClose={() => setError(null)}
        />
      )}
      <div className="bg-white shadow-sm border-bottom sticky-top rounded mb-4">
        <div className="container-fluid px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="h4 mb-0 fw-bold text-dark">Lead Form</h3>
            <Link
              to="/"
              className="btn btn-primary d-none d-md-inline-flex align-items-center"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <Form method="post" className="container py-4 shadow rounded">
        {/* Lead Name */}
        <div className="mb-3">
          <label className="form-label">Lead Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            required
          />
        </div>

        {/* Source & Closed At */}
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label className="form-label">Lead Source</label>
              <select
                id="source"
                name="source"
                className="form-select"
                required
              >
                <option value="" disabled selected>
                  Select Lead Source
                </option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
              </select>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label className="form-label" htmlFor="closedAt">
                Closed At
              </label>
              <input
                type="date"
                id="closedAt"
                name="closedAt"
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        {/* Status & Sales Agent */}
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label className="form-label">Lead Status</label>
              <select
                id="status"
                name="status"
                className="form-select"
                required
              >
                <option value="" disabled selected>
                  Lead Status
                </option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label className="form-label">Assigned Sales Agent</label>
              <select
                id="salesAgent"
                name="salesAgent"
                className="form-select"
                required
              >
                <option value={""} disabled selected>
                  Select Sales Agent{" "}
                </option>
                {salesAgent.map((agent) => (
                  <option value={agent.id} id="salesAgent">
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Time to Close & Priority */}
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label className="form-label">Time to Close (days)</label>
              <input
                type="number"
                id="timeToClose"
                name="timeToClose"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label className="form-label">Priority</label>
              <select
                id="priority"
                name="priority"
                className="form-select"
                required
              >
                <option value="" disabled selected>
                  Priority
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label className="form-label" htmlFor="tags">
            Tags
          </label>

          <div className="form-check">
            <input type="checkbox" name="tags" value="High Value" />
            <label className="px-2">High Value</label>
          </div>

          <div className="form-check">
            <input type="checkbox" name="tags" value="Follow-up" />
            <label className="px-2">Follow-up</label>
          </div>
        </div>

        <button disabled={isLoading} type="submit" className="btn btn-primary">
          {isLoading && <SubmitLoadingSpinner />}
          {isLoading ? "Adding lead..." : "Add new Lead"}
        </button>
      </Form>
    </>
  );
};

export default LeadForm;

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const toastId = showLoadingToast("Adding lead...");

  const data = {
    name: formData.get("name"),
    source: formData.get("source"),
    closedAt: formData.get("closedAt"),
    status: formData.get("status"),
    salesAgent: formData.get("salesAgent"),
    timeToClose: Number(formData.get("timeToClose")),
    priority: formData.get("priority"),
    tags: formData.getAll("tags"), // ✅ multiple checkbox
  };

  try {
    const response = await api.post(`/api/leads`, data);
    console.log(response);
    showSuccessToast(toastId, "Lead  added successfully.");
    return redirect(`/leads`);
  } catch (error) {
    showErrorToast(
      toastId,
      error.response?.data?.message || "Error occurred while add  lead ❌",
    );
  }
};
