
import { useEffect, useState } from "react";
import "./Analytics.css";

const productionData = {
  Monthly: [
    { label: "Jan", value: 62 },
    { label: "Feb", value: 70 },
    { label: "Mar", value: 67 },
    { label: "Apr", value: 78 },
    { label: "May", value: 82 },
    { label: "Jun", value: 88 },
    { label: "Jul", value: 91 },
    { label: "Aug", value: 96 },
  ],
  Quarterly: [
    { label: "Q1", value: 68 },
    { label: "Q2", value: 81 },
    { label: "Q3", value: 91 },
    { label: "Q4", value: 96 },
  ],
  Yearly: [
    { label: "2023", value: 72 },
    { label: "2024", value: 79 },
    { label: "2025", value: 87 },
    { label: "2026", value: 96 },
  ],
};

const mines = [
  "All Mines",
  "Singrauli",
  "Korba",
  "Dhanbad",
  "Talcher",
];

const intelligenceProjects = [
  "Rajmahal Coalfield Analysis",
  "Singrauli Basin Review",
  "Korba Resource Planning",
  "Dhanbad Operations Intelligence",
];

const analysisStages = [
  "Reading geological data...",
  "Analyzing mineral composition...",
  "Evaluating resource potential...",
  "Detecting operational risks...",
  "Generating AI recommendations...",
];

function Analytics() {
  const [period, setPeriod] = useState("Monthly");
  const [mine, setMine] = useState("All Mines");
  const [selectedProject, setSelectedProject] = useState(intelligenceProjects[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [analysisReady, setAnalysisReady] = useState(false);

  const data = productionData[period];
  const maxValue = 100;
  const chartWidth = 700;
  const chartHeight = 260;
  const padding = { top: 20, right: 18, bottom: 34, left: 32 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;
  const xStep = data.length > 1 ? innerWidth / (data.length - 1) : 0;

  const points = data.map((item, index) => {
    const x = padding.left + index * xStep;
    const y =
      chartHeight -
      padding.bottom -
      (item.value / maxValue) * innerHeight;

    return { ...item, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding.bottom} L ${points[0].x} ${chartHeight - padding.bottom} Z`;
  const yTicks = [0, 25, 50, 75, 100];

  useEffect(() => {
    if (!isAnalyzing) {
      return undefined;
    }

    if (activeStage >= analysisStages.length - 1) {
      const timer = window.setTimeout(() => {
        setAnalysisReady(true);
        setIsAnalyzing(false);
      }, 600);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setActiveStage((previous) => previous + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [activeStage, isAnalyzing]);

  useEffect(() => {
    setAnalysisReady(false);
    setIsAnalyzing(false);
    setActiveStage(0);
  }, [selectedProject]);

  function handleRunAnalysis() {
    setAnalysisReady(false);
    setIsAnalyzing(true);
    setActiveStage(0);
  }

  return (
    <main className="analytics-page">
      {/* Header */}

      <div className="analytics-header">
        <div>
          <div className="analytics-breadcrumb">
            GeoMineAI / Analytics
          </div>

          <h1>Analytics & Insights</h1>

          <p>
            Monitor production, reserves, mine performance and
            environmental indicators.
          </p>
        </div>

        <div className="analytics-filters">
          <select
            value={mine}
            onChange={(event) => setMine(event.target.value)}
          >
            {mines.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>

      <section className="intelligence-center">
        <div className="intelligence-center-header">
          <div>
            <div className="analytics-breadcrumb">GeoMineAI / Intelligence Center</div>
            <h2>GeoMineAI Intelligence</h2>
            <p>AI-powered geological and mining intelligence</p>
          </div>

          <div className="intelligence-header-badge">Enterprise AI</div>
        </div>

        <div className="intelligence-center-body">
          <div className="intelligence-primary-panel">
            <div className="intelligence-form-row">
              <label htmlFor="project-selector">Project</label>
              <select
                id="project-selector"
                value={selectedProject}
                onChange={(event) => setSelectedProject(event.target.value)}
              >
                {intelligenceProjects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="run-analysis-button"
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
            </button>

            <div className="analysis-progress-panel">
              <div className="analysis-progress-header">
                <span>AI Workflow</span>
                <strong>{isAnalyzing ? `${activeStage + 1}/${analysisStages.length}` : analysisReady ? "Complete" : "Ready"}</strong>
              </div>

              <div className="analysis-progress-track">
                <span
                  style={{ width: `${isAnalyzing ? ((activeStage + 1) / analysisStages.length) * 100 : analysisReady ? 100 : 0}%` }}
                ></span>
              </div>

              <div className="analysis-stage-text">
                {isAnalyzing ? analysisStages[activeStage] : analysisReady ? "Analysis complete." : "Awaiting analysis run."}
              </div>
            </div>
          </div>

          <div className="intelligence-result-panel">
            {analysisReady ? (
              <>
                <div className="result-topline">
                  <span>AI Confidence</span>
                  <strong>94%</strong>
                </div>

                <div className="result-grid">
                  <div className="result-stat">
                    <span>Resource Potential</span>
                    <strong className="status-high">HIGH</strong>
                  </div>

                  <div className="result-stat">
                    <span>Risk Level</span>
                    <strong className="status-medium">LOW–MODERATE</strong>
                  </div>

                  <div className="result-stat">
                    <span>Environmental Score</span>
                    <strong>91/100</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="intelligence-placeholder">
                <div className="placeholder-dot"></div>
                <p>Awaiting AI analysis to generate geological insight.</p>
              </div>
            )}
          </div>
        </div>

        {analysisReady && (
          <div className="ai-insight-grid">
            <div className="ai-summary-card">
              <div className="section-heading-row">
                <h3>AI Geological Summary</h3>
                <span className="summary-pill">Live model output</span>
              </div>

              <p>
                The Rajmahal mining system shows strong production continuity with high-grade seam consistency,
                stable mineral distribution, and manageable operational risk. Resource confidence remains elevated,
                while restoration efforts need continued focus to close the gap around the southern rehabilitation target.
              </p>
            </div>

            <div className="ai-summary-card">
              <div className="section-heading-row">
                <h3>Key Findings</h3>
              </div>

              <ul className="finding-list">
                <li><span>Production trend</span><strong>Strong upward trajectory</strong></li>
                <li><span>Resource potential</span><strong>High with scope for expansion</strong></li>
                <li><span>Mine efficiency</span><strong>Optimized operating profile</strong></li>
                <li><span>Environmental condition</span><strong>Stable but restoration-sensitive</strong></li>
              </ul>
            </div>

            <div className="ai-summary-card">
              <div className="section-heading-row">
                <h3>Risk Detection</h3>
              </div>

              <div className="risk-list">
                <div className="risk-item">
                  <div>
                    <span>Land restoration</span>
                    <strong>78% vs 80% target</strong>
                  </div>
                  <em className="severity warning">Moderate</em>
                </div>

                <div className="risk-item">
                  <div>
                    <span>Operational risk</span>
                    <strong>Low to moderate</strong>
                  </div>
                  <em className="severity low">Low</em>
                </div>

                <div className="risk-item">
                  <div>
                    <span>Environmental risk</span>
                    <strong>Managed within thresholds</strong>
                  </div>
                  <em className="severity low">Low</em>
                </div>
              </div>
            </div>

            <div className="ai-summary-card">
              <div className="section-heading-row">
                <h3>AI Recommendations</h3>
              </div>

              <ol className="recommendation-list">
                <li>Prioritize seam-by-seam optimization in the high-potential extraction blocks to sustain throughput without increasing operational risk.</li>
                <li>Accelerate restoration and reclamation work in the southern corridor to close the 2% restoration gap against target.</li>
                <li>Increase predictive maintenance checks around haulage and ventilation networks to sustain the current high efficiency profile.</li>
              </ol>
            </div>

            <div className="ai-summary-card wide-card">
              <div className="section-heading-row">
                <h3>Why AI Says This</h3>
              </div>

              <details open className="reasoning-panel">
                <summary>View reasoning</summary>
                <div className="reasoning-content">
                  <p>
                    The model compares production trend consistency, seam quality distribution, and operational throughput across the current cycle.
                    The region demonstrates stable output and a strong reserve profile, which supports a high resource potential assessment.
                  </p>
                  <p>
                    Restoration and environmental monitoring remain active concerns, but the risk is largely controlled because air quality, water quality,
                    and compliance indicators remain within acceptable operational thresholds.
                  </p>
                </div>
              </details>
            </div>
          </div>
        )}
      </section>

      {/* KPI Cards */}

      <section className="analytics-kpi-grid">
        <div className="analytics-kpi">
          <div className="analytics-icon production">
            ⛏
          </div>

          <div>
            <span>Coal Production</span>
            <strong>12.8 MT</strong>
            <small className="positive">↑ 8.4% vs last period</small>
          </div>
        </div>

        <div className="analytics-kpi">
          <div className="analytics-icon reserve">
            ◈
          </div>

          <div>
            <span>Estimated Reserves</span>
            <strong>486 MT</strong>
            <small className="positive">↑ 3.2% updated</small>
          </div>
        </div>

        <div className="analytics-kpi">
          <div className="analytics-icon efficiency">
            %
          </div>

          <div>
            <span>Mine Efficiency</span>
            <strong>87.6%</strong>
            <small className="positive">↑ 5.1% improvement</small>
          </div>
        </div>

        <div className="analytics-kpi">
          <div className="analytics-icon environment">
            ♧
          </div>

          <div>
            <span>Environmental Score</span>
            <strong>91 / 100</strong>
            <small className="positive">↑ 2.8% improvement</small>
          </div>
        </div>
      </section>

      {/* Production Chart */}

      <section className="analytics-grid">
        <div className="analytics-panel production-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Production Overview</h2>
              <p>
                Coal production trend for {mine}.
              </p>
            </div>

            <span className="trend-badge">
              ↑ 8.4%
            </span>
          </div>

          <div className="analytics-chart">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="production-svg"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Production overview chart"
            >
              {yTicks.map((tick) => {
                const y =
                  chartHeight -
                  padding.bottom -
                  (tick / maxValue) * innerHeight;

                return (
                  <g key={tick}>
                    <line
                      x1={padding.left}
                      x2={chartWidth - padding.right}
                      y1={y}
                      y2={y}
                      className="chart-grid-line"
                    />
                    <text
                      x={10}
                      y={y + 4}
                      className="chart-axis-label chart-axis-label-y"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              <path d={areaPath} className="chart-area-path" />
              <path d={linePath} className="chart-line-path" />

              {points.map((point) => (
                <g key={point.label} className="chart-point-group">
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    className="chart-point"
                  >
                    <title>{`${point.label}: ${point.value} MT`}</title>
                  </circle>
                </g>
              ))}

              {points.map((point) => (
                <text
                  key={`${point.label}-label`}
                  x={point.x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="chart-axis-label chart-axis-label-x"
                >
                  {point.label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Mine Performance */}

        <div className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Mine Performance</h2>
              <p>Operational performance score</p>
            </div>
          </div>

          <div className="mine-performance">
            <div className="performance-item">
              <div>
                <strong>Singrauli</strong>
                <span>92%</span>
              </div>

              <div className="performance-track">
                <span style={{ width: "92%" }}></span>
              </div>
            </div>

            <div className="performance-item">
              <div>
                <strong>Korba</strong>
                <span>87%</span>
              </div>

              <div className="performance-track">
                <span style={{ width: "87%" }}></span>
              </div>
            </div>

            <div className="performance-item">
              <div>
                <strong>Dhanbad</strong>
                <span>81%</span>
              </div>

              <div className="performance-track">
                <span style={{ width: "81%" }}></span>
              </div>
            </div>

            <div className="performance-item">
              <div>
                <strong>Talcher</strong>
                <span>76%</span>
              </div>

              <div className="performance-track">
                <span style={{ width: "76%" }}></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Analytics */}

      <section className="analytics-bottom-grid">
        <div className="analytics-panel statistics-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Key Statistics</h2>
              <p>Current operational indicators</p>
            </div>
          </div>

          <div className="statistics-list">
            <div className="statistics-item">
              <span>Active Mining Blocks</span>
              <strong>24</strong>
            </div>

            <div className="statistics-item">
              <span>Documents Processed</span>
              <strong>1,248</strong>
            </div>

            <div className="statistics-item">
              <span>Reports Generated</span>
              <strong>386</strong>
            </div>

            <div className="statistics-item">
              <span>AI Queries Resolved</span>
              <strong>2,741</strong>
            </div>
          </div>
        </div>

        <div className="analytics-panel environmental-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Environmental Indicators</h2>
              <p>Latest monitoring results</p>
            </div>
          </div>

          <div className="environment-grid">
            <div className="env-tile">
              <span>Air Quality</span>
              <strong>Good</strong>
              <small>92 AQI</small>
              <em className="status-pill positive">Stable</em>
            </div>

            <div className="env-tile">
              <span>Water Quality</span>
              <strong>Good</strong>
              <small>88 / 100</small>
              <em className="status-pill positive">Healthy</em>
            </div>

            <div className="env-tile warning">
              <span>Land Restoration</span>
              <strong>78%</strong>
              <small>Target: 80%</small>
              <em className="status-pill warning">Monitor</em>
            </div>

            <div className="env-tile">
              <span>Compliance</span>
              <strong>96%</strong>
              <small>All major checks</small>
              <em className="status-pill positive">Compliant</em>
            </div>
          </div>
        </div>

        <div className="analytics-panel intelligence-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>GeoMineAI Intelligence</h2>
              <p>Field recommendation engine</p>
            </div>
            <span className="ai-badge">AI Confidence 94%</span>
          </div>

          <div className="intelligence-list">
            <div className="intel-item">
              <div className="intel-icon positive">↗</div>
              <div className="intel-text">
                <strong>Production trend insight</strong>
                <p>Monthly output is trending upward with a steady increase from the previous phase and stronger efficiency across upstream operations.</p>
              </div>
            </div>

            <div className="intel-item">
              <div className="intel-icon environmental">◌</div>
              <div className="intel-text">
                <strong>Environmental insight</strong>
                <p>Air and water indicators remain within healthy thresholds, supporting continued high-confidence operational planning.</p>
              </div>
            </div>

            <div className="intel-item warning-item">
              <div className="intel-icon warning">!</div>
              <div className="intel-text">
                <strong>Land restoration warning</strong>
                <p>Restoration progress is nearing target but still requires accelerated reclamation activity in the southern blocks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="analytics-note">
        <strong>Analytics Demo Mode</strong>
        <span>
          Values shown are mock data. Live analytics will be
          connected to GeoMineAI data services later.
        </span>
      </div>
    </main>
  );
}

export default Analytics;
