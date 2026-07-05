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
  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const { setSalesAgent, error, setError } = useLeadContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e) => {
    if (e.target && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
      setFile(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return setError("Please select profile image.");
    }

    const toastId = showLoadingToast("Adding new agent...");

    try {
      setIsSubmitting(true);

      const userData = new FormData();
      userData.append("name", formData.name);
      userData.append("email", formData.email);
      userData.append("image", file);
      const response = await api.post(`/api/agents`, userData);

      setSalesAgent((prevStat) => [
        ...prevStat,
        { ...response.data.savedAgent },
      ]);
      setFormData(initialData);
      setFile("");
      setPreviewUrl("");
      showSuccessToast(toastId, "New agent added successfully.");
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
      {error && (
        <ModelOverlay
          title="Error occurred"
          text={error}
          onClose={() => setError(null)}
        />
      )}
      <div className="container-fluid p-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom sticky-top rounded">
          <div className="container-fluid  py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className=" mb-0 fs-5 fw-bold">Add Agent</h4>
              <div className="d-flex gap-2">
                <Link to="/" className="btn btn-outline-secondary d-flex btn-sm">
                
                  <span className="d-none d-md-flex me-2">Go to </span>Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="container py-4" style={{ maxWidth: "900px" }}>
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
                    <div className="mb-4">
                      <label htmlFor="image" className="form-label">
                        Profle image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        required
                        onChange={handleFileSelect}
                        className="form-control"
                        accept=".jpg,.jpeg,.png"
                      />
                    </div>

                    <div
                      className="mb-3"
                      style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="img img-fluid"
                          style={{ objectFit: "cover", maxHeight: "250px" }}
                        />
                      )}
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
