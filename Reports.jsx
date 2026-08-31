
import { useMemo, useState } from "react";
import "./Reports.css";

const mockReports = [
  {
    id: 1,
    name: "Monthly Production Performance Report",
    type: "Production",
    date: "30 Aug 2026",
    department: "Mining Operations",
    status: "Generated",
  },
  {
    id: 2,
    name: "Singrauli Geological Assessment Report",
    type: "Geological",
    date: "29 Aug 2026",
    department: "Geology",
    status: "Generated",
  },
  {
    id: 3,
    name: "Coal Reserve Estimation Report",
    type: "Reserve",
    date: "28 Aug 2026",
    department: "Exploration",
    status: "Generated",
  },
  {
    id: 4,
    name: "Environmental Compliance Report",
    type: "Environmental",
    date: "27 Aug 2026",
    department: "Environment",
    status: "Pending",
  },
  {
    id: 5,
    name: "Mining Plan Analysis Report",
    type: "Mining Plan",
    date: "26 Aug 2026",
    department: "Mine Planning",
    status: "Generated",
  },
  {
    id: 6,
    name: "Quarterly Mine Performance Report",
    type: "Production",
    date: "25 Aug 2026",
    department: "Mining Operations",
    status: "Processing",
  },
];

const reportTypes = [
  "All Types",
  "Production",
  "Geological",
  "Reserve",
  "Environmental",
  "Mining Plan",
];

function ReportStatus({ status }) {
  return (
    <span className={`report-status ${status.toLowerCase()}`}>
      <span className="report-status-dot"></span>
      {status}
    </span>
  );
}

function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Types");

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        report.name.toLowerCase().includes(searchText) ||
        report.type.toLowerCase().includes(searchText) ||
        report.department.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All Types" || report.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reports, search, filter]);

  const generatedCount = reports.filter(
    (report) => report.status === "Generated"
  ).length;

  const pendingCount = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const processingCount = reports.filter(
    (report) => report.status === "Processing"
  ).length;

  const handleGenerateReport = () => {
    const newReport = {
      id: Date.now(),
      name: "AI Generated Mining Summary Report",
      type: "Production",
      date: "30 Aug 2026",
      department: "GeoMineAI",
      status: "Generated",
    };

    setReports((previous) => [newReport, ...previous]);

    alert(
      "Demo report generated successfully. Real report generation will be connected later."
    );
  };

  const handleView = (report) => {
    alert(`Viewing report:\n${report.name}`);
  };

  const handleDownload = (report) => {
    alert(
      `Download will be connected with backend later:\n${report.name}`
    );
  };

  return (
    <main className="reports-page">
      <div className="reports-header">
        <div>
          <div className="reports-breadcrumb">
            GeoMineAI / Reports
          </div>

          <h1>Reports</h1>

          <p>
            Generate, monitor and manage geological, mining and
            operational reports.
          </p>
        </div>

        <button
          className="generate-report-button"
          onClick={handleGenerateReport}
        >
          + Generate Report
        </button>
      </div>

      {/* KPI Cards */}

      <section className="reports-kpi-grid">
        <div className="report-kpi-card">
          <div className="report-kpi-icon">▤</div>
          <div>
            <strong>{reports.length}</strong>
            <span>Total Reports</span>
          </div>
        </div>

        <div className="report-kpi-card">
          <div className="report-kpi-icon generated-icon">✓</div>
          <div>
            <strong>{generatedCount}</strong>
            <span>Generated</span>
          </div>
        </div>

        <div className="report-kpi-card">
          <div className="report-kpi-icon pending-icon">◷</div>
          <div>
            <strong>{pendingCount}</strong>
            <span>Pending</span>
          </div>
        </div>

        <div className="report-kpi-card">
          <div className="report-kpi-icon processing-icon">↻</div>
          <div>
            <strong>{processingCount}</strong>
            <span>Processing</span>
          </div>
        </div>
      </section>

      {/* Report Generator */}

      <section className="report-generator">
        <div className="generator-icon">✦</div>

        <div className="generator-content">
          <h2>GeoMineAI Report Generator</h2>

          <p>
            Create structured reports from geological, mining,
            production and environmental information.
          </p>
        </div>

        <button
          className="generator-button"
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
      </section>

      {/* Reports Table */}

      <section className="reports-card">
        <div className="reports-toolbar">
          <div>
            <h2>Recent Reports</h2>
            <p>
              View and manage reports generated on the platform.
            </p>
          </div>

          <div className="reports-controls">
            <div className="report-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
            >
              {reportTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>REPORT NAME</th>
                <th>TYPE</th>
                <th>DEPARTMENT</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div className="report-name-cell">
                        <div className="report-file-icon">
                          PDF
                        </div>

                        <div>
                          <strong>{report.name}</strong>
                          <span>GeoMineAI Report</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="report-type">
                        {report.type}
                      </span>
                    </td>

                    <td>{report.department}</td>

                    <td>{report.date}</td>

                    <td>
                      <ReportStatus status={report.status} />
                    </td>

                    <td>
                      <div className="report-actions">
                        <button
                          title="View"
                          onClick={() =>
                            handleView(report)
                          }
                        >
                          👁
                        </button>

                        <button
                          title="Download"
                          onClick={() =>
                            handleDownload(report)
                          }
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-reports"
                  >
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="reports-footer">
          Showing{" "}
          <strong>{filteredReports.length}</strong>{" "}
          of <strong>{reports.length}</strong> reports
        </div>
      </section>
    </main>
  );
}

export default Reports;
