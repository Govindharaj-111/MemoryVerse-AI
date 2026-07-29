import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem("documents");
    return saved ? JSON.parse(saved) : [];
  });

  const [category, setCategory] = useState("Resume");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const newDocs = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      category,
      size: (file.size / 1024).toFixed(2) + " KB",
      uploadedAt: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file),
    }));

    setDocuments([...documents, ...newDocs]);
    e.target.value = "";
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const filteredDocuments = documents.filter((doc) => {
    const search =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch =
      filterCategory === "All" || doc.category === filterCategory;

    return search && categoryMatch;
  });
    return (
    <>
      {/* Login Popup */}
      {showLogin && (
        <div className="login-overlay">
          <div className="login-box">
            <button
              className="close-btn"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>

            <h2>Welcome Back 👋</h2>

            <input
              type="email"
              placeholder="Enter your Email"
              className="login-input"
            />

            <input
              type="password"
              placeholder="Enter your Password"
              className="login-input"
            />

            <button
              className="login-submit"
              onClick={() => {
                setIsLoggedIn(true);
                setShowLogin(false);
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="navbar">
        <h2>MemoryVerse AI</h2>

        {isLoggedIn ? (
          <button
            className="login-btn"
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
        ) : (
          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Your Intelligent <span>Digital Identity</span>
        </h1>

        <p>
          Upload and manage your important documents securely.
        </p>

        <div className="category-select">
          <label>Select Document Type</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Resume</option>
            <option>Certificate</option>
            <option>Internship</option>
            <option>Project</option>
            <option>Academic</option>
          </select>
        </div>

        <label className="upload-btn">
          📤 Upload {category}

          <input
            type="file"
            hidden
            multiple
            accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
            onChange={handleUpload}
          />
        </label>
      </section>

      {/* Dashboard */}
      <section className="categories">
        <div className="category-card">
          <h3>Total Documents</h3>
          <h1>{documents.length}</h1>
        </div>

        <div className="category-card">
          <h3>Resume</h3>
          <h1>
            {documents.filter(d => d.category === "Resume").length}
          </h1>
        </div>

        <div className="category-card">
          <h3>Certificates</h3>
          <h1>
            {documents.filter(d => d.category === "Certificate").length}
          </h1>
        </div>

        <div className="category-card">
          <h3>Projects</h3>
          <h1>
            {documents.filter(d => d.category === "Project").length}
          </h1>
        </div>
      </section>
            {/* Documents */}
      <section className="documents">
        <h2>📁 My Documents</h2>

        <input
          type="text"
          placeholder="🔍 Search Documents..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-box"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Resume">Resume</option>
          <option value="Certificate">Certificate</option>
          <option value="Internship">Internship</option>
          <option value="Project">Project</option>
          <option value="Academic">Academic</option>
        </select>

        {filteredDocuments.length === 0 ? (
          <p className="empty">No Documents Found</p>
        ) : (
          <div className="document-list">
            {filteredDocuments.map((doc) => (
              <div className="document-item" key={doc.id}>
                <div>
                  <h3>{doc.name}</h3>

                  <p>
                    <b>Category:</b> {doc.category}
                  </p>

                  <p>
                    <b>Size:</b> {doc.size}
                  </p>

                  <p>
                    <b>Uploaded:</b> {doc.uploadedAt}
                  </p>
                </div>

                <div className="document-actions">
                  <a
                    href={doc.url}
                    download={doc.name}
                    className="download-btn"
                  >
                    ⬇ Download
                  </a>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="preview-btn"
                  >
                    👀 Preview
                  </a>

                  <button
                    className="delete-btn"
                    onClick={() => deleteDocument(doc.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <h3>MemoryVerse AI</h3>

        <p>
          Smart Digital Identity Management System
        </p>

        <p>
          © 2026 Developed by Govindharaj M
        </p>
      </footer>

    </>
  );
}

export default App;