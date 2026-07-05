import { Link } from "react-router-dom";
import CommentPage from "../../pages/CommentPage";

const LeadManagement = ({ lead, comments }) => {
  return (
    <>
      <div className="min-vh-100 bg-light">
        {/* Header Section */}
        <div className="w-100 bg-white d-none d-sm-block">
          <div className="p-2 px-md-4 d-flex align-items-center justify-content-between">
            <h3>Lead details</h3>
            <Link  to="/" className="btn btn-outline-secondary btn-sm">
              Go to Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-4 ms-3 d-sm-none">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            Go to Dashboard
          </Link>
        </div>

        <div className="container my-4">
          <div className="row g-4">
            {/* Lead Details Card */}
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <h4 className="mb-3 d-sm-none">Lead details</h4>
                      <p className="text-muted small mb-0">
                        <span className="me-2">Lead Name:</span>
                        <span className="fw-bold text-dark">{lead.name}</span>
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="text-muted small mb-0">
                        <span className="me-2">Sales Agent:</span>
                        <span className="fw-bold text-dark">
                          {lead.salesAgent ? lead.salesAgent.name : "Unknown"}
                        </span>
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="text-muted small mb-0">
                        <span className="me-2">Lead Source:</span>
                        <span className="fw-bold text-dark">{lead.source}</span>
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="text-muted small mb-0">
                        <span className="me-2">Lead Status:</span>
                        <span className="badge bg-primary rounded-pill">
                          {lead.status}
                        </span>
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="text-muted small mb-0">
                        <span className="me-2">Priority:</span>
                        <span className="fw-bold text-dark">
                          {lead.priority}
                        </span>
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="text-muted small mb-0">
                        <span className="me-2">Time to Close:</span>
                        <span className="fw-bold text-dark">
                          {lead.timeToClose}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <Link to={`edit`} className="btn btn-secondary btn-sm">
                    <i className="bi bi-pencil me-2"></i>Edit Lead Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">
                    <i className="bi bi-chat-dots me-2"></i>Comments
                  </h5>
                  <span className="badge bg-secondary rounded-pill">
                    {comments ? comments.length : 0}
                  </span>
                </div>
                <div className="card-body">
                  {console.log(comments)}
                  {comments && comments.length !== 0 ? (
                    <div className="comments-list">
                      {comments.map((comment, index) => (
                        <div
                          key={index}
                          className="comment-item p-3 mb-3 bg-light rounded border"
                        >
                          <div className="d-flex align-items-start">
                            {comment?.author?.profileImg ? (
                              <img
                                src={comment.author.profileImg}
                                alt={comment.author.name}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                }}
                                className="me-3"
                              />
                            ) : (
                              <div
                                className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  minWidth: "40px",
                                }}
                              >
                                {comment && comment.author
                                  ? comment.author.name.charAt(0).toUpperCase()
                                  : "U"}
                              </div>
                            )}
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">
                                {comment.author
                                  ? comment.author.name
                                  : "Unknown"}
                              </h6>
                              <p className="text-muted mb-0">
                                {comment.commentText}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i
                        className="bi bi-chat-square-text text-muted"
                        style={{ fontSize: "3rem" }}
                      ></i>
                      <p className="text-muted mt-3 mb-0">
                        No comments yet. Be the first to add one!
                      </p>
                    </div>
                  )}

                  <CommentPage leadId={lead.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadManagement;
