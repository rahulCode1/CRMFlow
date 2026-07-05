import { useNavigation, Form } from "react-router-dom";
import { useEffect, useRef } from "react";
import SubmitLoadingSpinner from "../SubmitLoadingSpinnr";
import useLeadContext from "../../context/LeadContext";

const CommentForm = () => {
  const { salesAgent } = useLeadContext();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const formRef = useRef(null);
  const wasSubmitting = useRef(false);

  useEffect(() => {
    if (navigation.state === "submitting") {
      wasSubmitting.current = true;
    }

    if (navigation.state === "idle" && wasSubmitting.current) {
      formRef.current?.reset();
      wasSubmitting.current = false;
    }
  }, [navigation.state]);

  return (
    <>
      <div className="mt-4">
        <Form method="post" ref={formRef}>
          <div className="card bg-light border-0">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Add a Comment</h6>

              <div className="mb-3">
                <label htmlFor="author" className="form-label fw-semibold">
                  Author
                </label>
                <select
                  id="author"
                  name="author"
                  className="form-select"
                  required
                >
                  <option disabled value="">
                    Select Author
                  </option>
                  {salesAgent.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="commentText" className="form-label fw-semibold">
                  Comment
                </label>
                <textarea
                  id="commentText"
                  name="commentText"
                  className="form-control"
                  rows="3"
                  placeholder="Write your comment here..."
                  required
                />
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center gap-2 btn-sm"
                  disabled={isLoading}
                >
                  {isLoading && <SubmitLoadingSpinner />}
                  {isLoading ? "Adding comment..." : "Add Comment"}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CommentForm;
