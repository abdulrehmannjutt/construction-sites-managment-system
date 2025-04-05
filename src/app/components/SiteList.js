import React from "react";

function SiteList({ sites, selectSite }) {
  if (sites.length === 0) {
    return (
      <p className="no-data">No sites added yet. Add a site to get started.</p>
    );
  }

  return (
    <div className="site-list">
      <h2>Your Construction Sites</h2>
      <div className="site-cards">
        {sites.map((site) => (
          <div
            key={site.id}
            className="site-card"
            onClick={() => selectSite(site.id)}
          >
            <h3>{site.name}</h3>
            <p>{site.details}</p>
            <p>Workers: {site.workers.length}</p>
            <button className="manage-btn">Manage Workers & Attendance</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SiteList;
