import { Pie } from "react-chartjs-2";

const TotalLeadsClosedOrIn = ({ leads }) => {
  const closedLeads = leads.filter((lead) => lead.status === "Closed").length;
  const activeLeads = leads.length - closedLeads;

  const data = {
    labels: ["Active Leads", "Closed Leads"],
    datasets: [
      {
        data: [activeLeads, closedLeads],
        backgroundColor: ["#4ade80", "#FFBF00"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          font: {
            size: 13,
          },
        },
      },
      datalabels: {
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  return (
    <div className="h-100 d-flex flex-column overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-3">
        <h5 className="fw-bold mb-1">Lead Status Overview</h5>
        <p className="text-muted mb-0">Active vs Closed Leads</p>
      </div>

      {/* Stats */}
      <div className="d-flex justify-content-center gap-5 mb-4 flex-wrap">
        <div className="text-center">
          <h2 className="text-success fw-bold mb-0">{activeLeads}</h2>
          <small className="text-muted">Active</small>
        </div>

        <div className="text-center">
          <h2 className="text-warning fw-bold mb-0">{closedLeads}</h2>
          <small className="text-muted">Closed</small>
        </div>
      </div>

      {/* Responsive Chart */}
      <div
        className="mx-auto w-100"
        style={{
          maxWidth: "340px",
          aspectRatio: "1 / 1",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalLeadsClosedOrIn;
