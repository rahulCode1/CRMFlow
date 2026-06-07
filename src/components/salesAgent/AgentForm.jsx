import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModelOverlay from "../model/ModelOverlay";

import SubmitLoadingSpinner from "../SubmitLoadingSpinnr";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import useLeadContext from "../../context/LeadContext";
import api from "../../utils/axios";

const AgentForm = () => {
  const initialData = {
    name: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSalesAgent, error, setError } = useLeadContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const toastId = showLoadingToast("Adding new agent...");

    try {
      setIsSubmitting(true);
      const response = await api.post(`/api/agents`, formData);

      showSuccessToast(toastId, "New agent added successfully.");
      setSalesAgent((prevStat) => [
        ...prevStat,
        { ...response.data.savedAgent },
      ]);
      setFormData(initialData);
      navigate(`/salesAgent`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error occurred while adding sales agent.",
      );
      showErrorToast(
        toastId,
        error.response?.data?.message ||
          "Error occurred while add sales agent.",
      );
    }
    setIsSubmitting(false);
  };

  return (
    <>
     {error &&  <ModelOverlay
        title="Error occurred"
        text={error}
        onClose={() => setError(null)}
      />}
      <div className="container-fluid p-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom sticky-top rounded">
          <div className="container-fluid  py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h3 mb-0 fw-bold">Add Agent</h1>
              <div className="d-flex gap-2">
                <Link to="/" className="btn btn-outline-secondary">
                  <i className="bi bi-house-door me-2"></i>
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className=" py-4">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <Form onSubmit={handleFormSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={handleChange}
                        placeholder="Enter agent name"
                        className="form-control"
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleChange}
                        placeholder="Enter agent email"
                        className="form-control"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="d-flex gap-2">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-primary w-100"
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        {isSubmitting && <SubmitLoadingSpinner />}
                        {isSubmitting ? "Adding agent..." : "Add agent"}
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentForm;
