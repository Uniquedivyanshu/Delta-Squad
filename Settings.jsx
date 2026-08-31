
import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(true);
  const [aiNotifications, setAiNotifications] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <main className="settings-page">
      {/* PAGE HEADER */}

      <div className="settings-header">
        <div>
          <div className="settings-breadcrumb">
            GeoMineAI / Settings
          </div>

          <h1>Settings</h1>

          <p>
            Manage your GeoMineAI workspace and application
            preferences.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        {/* SETTINGS NAVIGATION */}

        <aside className="settings-menu">
          <div className="settings-menu-title">
            SETTINGS
          </div>

          <button className="settings-menu-item active">
            <span>👤</span>
            Profile
          </button>

          <button className="settings-menu-item">
            <span>🏢</span>
            Organization
          </button>

          <button className="settings-menu-item">
            <span>🔔</span>
            Notifications
          </button>

          <button className="settings-menu-item">
            <span>🎨</span>
            Appearance
          </button>

          <button className="settings-menu-item">
            <span>🔐</span>
            Security
          </button>

          <button className="settings-menu-item">
            <span>⚙</span>
            System
          </button>
        </aside>

        {/* SETTINGS CONTENT */}

        <div className="settings-content">
          {/* PROFILE */}

          <section className="settings-card">
            <div className="settings-card-header">
              <div>
                <h2>Profile Information</h2>

                <p>
                  Basic information associated with the GeoMineAI
                  workspace.
                </p>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-avatar">
                GK
              </div>

              <div>
                <strong>GeoMineAI Administrator</strong>

                <span>
                  System Administrator
                </span>

                <button className="change-avatar">
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="settings-field">
                <label>FULL NAME</label>

                <input
                  type="text"
                  defaultValue="GeoMineAI Administrator"
                />
              </div>

              <div className="settings-field">
                <label>ROLE</label>

                <input
                  type="text"
                  defaultValue="System Administrator"
                  disabled
                />
              </div>

              <div className="settings-field">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  defaultValue="admin@geomineai.gov.in"
                />
              </div>

              <div className="settings-field">
                <label>ORGANIZATION</label>

                <input
                  type="text"
                  defaultValue="CMPDI / CIL"
                />
              </div>
            </div>
          </section>

          {/* ORGANIZATION */}

          <section className="settings-card">
            <div className="settings-card-header">
              <div>
                <h2>Organization</h2>

                <p>
                  Configure your organization and operational
                  information.
                </p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="settings-field">
                <label>ORGANIZATION NAME</label>

                <input
                  type="text"
                  defaultValue="Central Mine Planning & Design Institute"
                />
              </div>

              <div className="settings-field">
                <label>ORGANIZATION CODE</label>

                <input
                  type="text"
                  defaultValue="CMPDI"
                />
              </div>

              <div className="settings-field">
                <label>SECTOR</label>

                <select defaultValue="Coal Mining">
                  <option>Coal Mining</option>
                  <option>Mineral Mining</option>
                  <option>Geological Survey</option>
                </select>
              </div>

              <div className="settings-field">
                <label>REGION</label>

                <select defaultValue="Central India">
                  <option>Central India</option>
                  <option>Eastern India</option>
                  <option>Western India</option>
                  <option>Northern India</option>
                </select>
              </div>
            </div>
          </section>

          {/* NOTIFICATIONS */}

          <section className="settings-card">
            <div className="settings-card-header">
              <div>
                <h2>Notifications</h2>

                <p>
                  Control which alerts and updates you receive.
                </p>
              </div>
            </div>

            <div className="notification-list">
              <div className="notification-row">
                <div>
                  <strong>Email Notifications</strong>

                  <span>
                    Receive important system notifications
                    through email.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    emailAlerts ? "on" : ""
                  }`}
                  onClick={() =>
                    setEmailAlerts(!emailAlerts)
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="notification-row">
                <div>
                  <strong>Report Generation Alerts</strong>

                  <span>
                    Get notified when a report is ready.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    reportAlerts ? "on" : ""
                  }`}
                  onClick={() =>
                    setReportAlerts(!reportAlerts)
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="notification-row">
                <div>
                  <strong>AI Insight Notifications</strong>

                  <span>
                    Receive alerts about important AI-generated
                    insights.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    aiNotifications ? "on" : ""
                  }`}
                  onClick={() =>
                    setAiNotifications(!aiNotifications)
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </section>

          {/* SYSTEM */}

          <section className="settings-card">
            <div className="settings-card-header">
              <div>
                <h2>System Preferences</h2>

                <p>
                  Configure general application preferences.
                </p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="settings-field">
                <label>DEFAULT LANGUAGE</label>

                <select defaultValue="English">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>

              <div className="settings-field">
                <label>DATE FORMAT</label>

                <select defaultValue="DD MMM YYYY">
                  <option>DD MMM YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </div>

              <div className="settings-field">
                <label>TIME ZONE</label>

                <select defaultValue="IST (UTC+5:30)">
                  <option>IST (UTC+5:30)</option>
                  <option>UTC</option>
                </select>
              </div>

              <div className="settings-field">
                <label>DATA REFRESH</label>

                <select defaultValue="Every 30 minutes">
                  <option>Every 15 minutes</option>
                  <option>Every 30 minutes</option>
                  <option>Every hour</option>
                </select>
              </div>
            </div>
          </section>

          {/* SAVE */}

          <div className="settings-save-bar">
            {saved && (
              <span className="save-message">
                ✓ Settings saved successfully
              </span>
            )}

            <button
              className="save-settings"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;