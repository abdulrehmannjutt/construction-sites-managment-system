import React, { useState } from "react";

function SiteForm({ addSite }) {
  const [siteName, setSiteName] = useState("");
  const [siteDetails, setSiteDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!siteName.trim()) return;

    addSite({
      name: siteName,
      details: siteDetails,
    });

    setSiteName("");
    setSiteDetails("");
  };

  return (
    <div className="form-container">
      <h2>Add New Construction Site</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Site Name:</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="e.g., Lake City Project"
            required
          />
        </div>
        <div className="form-group">
          <label>Site Details:</label>
          <input
            type="text"
            value={siteDetails}
            onChange={(e) => setSiteDetails(e.target.value)}
            placeholder="e.g., 870 m3"
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Site
        </button>
      </form>
    </div>
  );
}

export default SiteForm;
