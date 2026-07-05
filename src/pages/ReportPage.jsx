import { Await, Link, useRouteLoaderData } from "react-router-dom";
import TotalLeadsClosed from "../components/report/TotalLeadsClosedOrIn";
import LeadsClosedByAgent from "../components/report/LeadsClosedByAgent";
import ReportViaStatus from "../components/report/ReportViaStatus";
import Loading from "../components/Loading";
import { Suspense } from "react";

const ReportPage = () => {
  const { leads } = useRouteLoaderData("allLeads");

  return (
    <>
      {/* HEADER */}
      <div className="bg-white d-none d-sm-block shadow-sm mb-4 rounded">
        <div className="container-fluid p-3 d-flex justify-content-between align-items-center">
          <h3 className="mb-0 fw-bold">Report Overview</h3>
          <Link to="/" className="btn btn-secondary">
            Back to dashboard
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container-fluid pb-4">
        <div className="my-3 d-sm-none">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            Go to dashboard
          </Link>
          <h3 className="mt-3">Lead report overview</h3>
        </div>

        <div className="row g-4">
          {/* PIE CHART */}
          <div className="col-12 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body ">
                <Suspense fallback={<Loading />}>
                  <Await resolve={leads}>
                    {(isLeadLoad) => <TotalLeadsClosed leads={isLeadLoad} />}
                  </Await>
                </Suspense>
              </div>
            </div>
          </div>

          {/* BAR: CLOSED BY AGENT */}
          <div className="col-12 col-lg-8">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <Suspense fallback={<Loading />}>
                  <Await resolve={leads}>
                    {(isLeadLoad) => <LeadsClosedByAgent leads={isLeadLoad} />}
                  </Await>
                </Suspense>
              </div>
            </div>
          </div>

          {/* BAR: STATUS */}
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <Suspense fallback={<Loading />}>
                  <Await resolve={leads}>
                    {(isLeadLoad) => <ReportViaStatus allLeads={isLeadLoad} />}
                  </Await>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
