import { Link } from "react-router-dom";
import Loading from "./Loading";

const SalesAgentsCard = ({ salesAgent, isLoading }) => {
  return (
    <>
      <div className="container-fluid p-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom sticky-top rounded">
          <div className="container-fluid px-2 px-md-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" mb-0 fw-bold"> Sales Agents</h5>
              <div className="d-flex gap-2">
                <Link to="add" className="btn btn-primary btn-sm">
              
                  Add Agent
                </Link>
              </div>
            </div>
          </div>
        </div>

        

        {/* Main Content */}
        <div className="container-fluid  py-4 " style={{maxWidth: "1000px", margin: "auto"}}>
          <div className="row justify-content-center ">
            <div className="col-lg-10 ">
              <div className="card shadow-sm ">
                <div className="card-body p-0 ">
                  {isLoading ? (
                    <Loading />
                  ) : salesAgent && salesAgent.length !== 0 ? (
                    <div className="list-group list-group-flush rounded">
                      {salesAgent.map((agent, index) => (
                        <div key={index} className="list-group-item">
                          <div className="d-flex align-items-center">
                            {agent?.profileImg ? (
                              <img
                                src={agent.profileImg}
                                alt={agent.name}
                                style={{
                                  objectFit: "cover",
                                  width: "35px",
                                  height: "35px",
                                  borderRadius: "50%",
                                }}
                                className="me-3"
                              />
                            ) : (
                              <div
                                style={{ width: "30px", height: "30px" }}
                                className="bg-primary bg-opacity-10 rounded-circle p-3 me-3"
                              >
                                <i className="bi bi-person-fill text-primary fs-5"></i>
                              </div>
                            )}

                            <div className="flex-grow-1">
                              <h6 className="mb-1 fw-semibold">{agent.name}</h6>
                              <small className="text-muted">
                                <i className="bi bi-envelope me-1"></i>
                                {agent.email}
                              </small>
                            </div>
                            <div>
                              <i className="bi bi-chevron-right text-muted"></i>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-people display-1 text-muted mb-3"></i>
                      <h5 className="text-muted">No Sales Agents Found</h5>
                      <p className="text-muted mb-4">
                        Add your first sales agent to get started
                      </p>
                      <Link to="add" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i>
                        Add New Agent
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAgentsCard;
