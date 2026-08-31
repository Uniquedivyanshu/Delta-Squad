
import { useMemo, useRef, useState } from "react";
import "./Documents.css";

const mockDocuments = [
  {
    id: 1,
    name: "Geological Survey Report - Singrauli",
    type: "PDF",
    category: "Geological Survey",
    date: "29 Aug 2026",
    size: "4.8 MB",
    status: "Processed",
  },
  {
    id: 2,
    name: "Mining Plan - Dhanbad Block",
    type: "DOCX",
    category: "Mining Plan",
    date: "28 Aug 2026",
    size: "2.4 MB",
    status: "Processed",
  },
  {
    id: 3,
    name: "Monthly Production Report - Korba",
    type: "XLSX",
    category: "Production Report",
    date: "28 Aug 2026",
    size: "1.8 MB",
    status: "Processing",
  },
  {
    id: 4,
    name: "Coal Reserve Estimation Report",
    type: "PDF",
    category: "Coal Reserve",
    date: "27 Aug 2026",
    size: "6.2 MB",
    status: "Processed",
  },
  {
    id: 5,
    name: "Environmental Impact Assessment",
    type: "PDF",
    category: "Environmental Assessment",
    date: "26 Aug 2026",
    size: "8.7 MB",
    status: "Pending",
  },
  {
    id: 6,
    name: "Mine Production Data - Q2",
    type: "XLSX",
    category: "Production Report",
    date: "25 Aug 2026",
    size: "3.1 MB",
    status: "Processed",
  },
  {
    id: 7,
    name: "Geological Mapping Data",
    type: "JPG",
    category: "Geological Survey",
    date: "24 Aug 2026",
    size: "5.6 MB",
    status: "Failed",
  },
];

function StatusBadge({ status }) {
  return (
    <span className={`document-status ${status.toLowerCase()}`}>
      <span className="status-dot"></span>
      {status}
    </span>
  );
}

function Documents() {
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState(mockDocuments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Types");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    setSelectedFiles(fileArray);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    handleFiles(event.dataTransfer.files);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("Please select a document first.");
      return;
    }

    const newDocuments = selectedFiles.map((file, index) => {
      const extension =
        file.name.split(".").pop()?.toUpperCase() || "FILE";

      return {
        id: Date.now() + index,
        name: file.name,
        type: extension,
        category: "New Document",
        date: "30 Aug 2026",
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        status: "Pending",
      };
    });

    setDocuments((previous) => [...newDocuments, ...previous]);
    setSelectedFiles([]);

    alert(
      "Document added successfully. Real backend upload will be connected later."
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    setDocuments((previous) =>
      previous.filter((document) => document.id !== id)
    );
  };

  const handleView = (document) => {
    alert(`Viewing: ${document.name}`);
  };

  const handleDownload = (document) => {
    alert(`Download will be connected with backend later:\n${document.name}`);
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch =
        document.name.toLowerCase().includes(search.toLowerCase()) ||
        document.category.toLowerCase().includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "PDF") {
        matchesFilter = document.type === "PDF";
      } else if (filter === "DOCX") {
        matchesFilter = document.type === "DOCX";
      } else if (filter === "XLSX") {
        matchesFilter = document.type === "XLSX";
      } else if (filter === "Images") {
        matchesFilter =
          document.type === "JPG" ||
          document.type === "PNG";
      }

      return matchesSearch && matchesFilter;
    });
  }, [documents, search, filter]);

  return (
    <main className="documents-page">
      <div className="documents-header">
        <div>
          <div className="documents-breadcrumb">
            GeoMineAI / Documents
          </div>

          <h1>Document Management</h1>

          <p>
            Upload, process and manage geological, mining and
            administrative documents.
          </p>
        </div>

        <div className="document-count">
          <strong>{documents.length}</strong>
          <span>Total Documents</span>
        </div>
      </div>

      {/* Upload Section */}

      <section className="upload-card">
        <div className="upload-heading">
          <div className="upload-icon">↑</div>

          <div>
            <h2>Upload Documents</h2>
            <p>
              Add geological, mining, production or administrative
              documents for processing.
            </p>
          </div>
        </div>

        <div
          className={`drop-zone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="drop-icon">⇧</div>

          <h3>Drag & Drop your files here</h3>

          <p>or</p>

          <button
            className="browse-button"
            onClick={handleBrowse}
          >
            Browse Files
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            hidden
          />

          <span className="supported-formats">
            Supported formats: PDF, DOCX, XLSX, JPG, PNG
          </span>
        </div>

        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <strong>
              Selected Files ({selectedFiles.length})
            </strong>

            {selectedFiles.map((file) => (
              <div className="selected-file" key={file.name}>
                <span>📄</span>
                {file.name}
              </div>
            ))}
          </div>
        )}

        <div className="upload-footer">
          <span>
            Documents will be processed by GeoMineAI after backend
            integration.
          </span>

          <button
            className="upload-button"
            onClick={handleUpload}
          >
            Upload Document
          </button>
        </div>
      </section>

      {/* Documents Section */}

      <section className="documents-card">
        <div className="documents-toolbar">
          <div>
            <h2>Documents</h2>
            <p>
              Manage and monitor all documents in the platform.
            </p>
          </div>

          <div className="document-controls">
            <div className="document-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search documents..."
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
              <option>All Types</option>
              <option>PDF</option>
              <option>DOCX</option>
              <option>XLSX</option>
              <option>Images</option>
            </select>
          </div>
        </div>

        <div className="documents-table-wrapper">
          <table className="documents-table">
            <thead>
              <tr>
                <th>DOCUMENT NAME</th>
                <th>DOCUMENT TYPE</th>
                <th>UPLOAD DATE</th>
                <th>FILE SIZE</th>
                <th>PROCESSING STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td>
                      <div className="document-name-cell">
                        <div
                          className={`file-type-icon ${document.type.toLowerCase()}`}
                        >
                          {document.type === "JPG" ||
                          document.type === "PNG"
                            ? "IMG"
                            : document.type}
                        </div>

                        <div>
                          <strong>{document.name}</strong>
                          <span>{document.category}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="type-text">
                        {document.type}
                      </span>
                    </td>

                    <td>{document.date}</td>

                    <td>{document.size}</td>

                    <td>
                      <StatusBadge status={document.status} />
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          title="View"
                          onClick={() =>
                            handleView(document)
                          }
                        >
                          👁
                        </button>

                        <button
                          title="Download"
                          onClick={() =>
                            handleDownload(document)
                          }
                        >
                          ↓
                        </button>

                        <button
                          title="Delete"
                          className="delete-action"
                          onClick={() =>
                            handleDelete(document.id)
                          }
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-documents"
                  >
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="documents-footer">
          Showing{" "}
          <strong>{filteredDocuments.length}</strong>{" "}
          of <strong>{documents.length}</strong> documents
        </div>
      </section>
    </main>
  );
}

export default Documents;