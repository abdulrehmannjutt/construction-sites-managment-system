"use client"; // Add this for Next.js 13+

import React from "react";
import { useState, useEffect } from "react";
import SiteForm from "./components/SiteForm";
import WorkerForm from "./components/WorkerForm";
import AttendanceSheet from "./components/AttendanceSheet";
import SiteList from "./components/SiteList";
// Import your CSS here if using a separate file

export default function Home() {
  // Copy the state and functions from the App component I provided
  const [sites, setSites] = useState([]);
  const [currentSite, setCurrentSite] = useState(null);
  const [view, setView] = useState("sites");

  // Add useEffect hooks for loading/saving data
  useEffect(() => {
    const savedSites = localStorage.getItem("constructionSites");
    if (savedSites) {
      setSites(JSON.parse(savedSites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("constructionSites", JSON.stringify(sites));
  }, [sites]);

  const addSite = (site) => {
    const newSite = {
      ...site,
      id: Date.now().toString(),
      workers: [],
    };
    setSites([...sites, newSite]);
  };

  const selectSite = (siteId) => {
    const site = sites.find((s) => s.id === siteId);
    setCurrentSite(site);
    setView("workers");
  };

  const addWorker = (worker) => {
    if (!currentSite) return;

    const workerWithId = {
      ...worker,
      id: Date.now().toString(),
      attendance: {},
    };

    const updatedSites = sites.map((site) => {
      if (site.id === currentSite.id) {
        return {
          ...site,
          workers: [...site.workers, workerWithId],
        };
      }
      return site;
    });

    setSites(updatedSites);
    setCurrentSite({
      ...currentSite,
      workers: [...currentSite.workers, workerWithId],
    });
  };

  const updateAttendance = (workerId, date, status) => {
    if (!currentSite) return;

    const updatedSites = sites.map((site) => {
      if (site.id === currentSite.id) {
        const updatedWorkers = site.workers.map((worker) => {
          if (worker.id === workerId) {
            return {
              ...worker,
              attendance: {
                ...worker.attendance,
                [date]: status,
              },
            };
          }
          return worker;
        });

        return {
          ...site,
          workers: updatedWorkers,
        };
      }
      return site;
    });

    setSites(updatedSites);

    // Update current site as well
    const updatedCurrentSite = updatedSites.find(
      (s) => s.id === currentSite.id
    );
    setCurrentSite(updatedCurrentSite);
  };

  const goBack = () => {
    if (view === "workers" || view === "attendance") {
      setView("sites");
      setCurrentSite(null);
    } else if (view === "attendance") {
      setView("workers");
    }
  };

  // Return the JSX from the App component I provided
  return (
    <div className="App">
      <header className="App-header">
        <h1>Construction Site Attendance Management</h1>
      </header>
      <div className="container">
        {view === "sites" && (
          <>
            <SiteForm addSite={addSite} />
            <SiteList sites={sites} selectSite={selectSite} />
          </>
        )}

        {view === "workers" && currentSite && (
          <>
            <button onClick={goBack} className="back-btn">
              Back to Sites
            </button>
            <h2>
              Site: {currentSite.name} ({currentSite.details})
            </h2>
            <WorkerForm addWorker={addWorker} />
            <button
              onClick={() => setView("attendance")}
              className="view-attendance-btn"
              disabled={currentSite.workers.length === 0}
            >
              View Attendance Sheet
            </button>
            <div className="workers-list">
              <h3>Workers ({currentSite.workers.length})</h3>
              <ul>
                {currentSite.workers.map((worker) => (
                  <li key={worker.id}>
                    {worker.name} - {worker.role}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {view === "attendance" && currentSite && (
          <>
            <button onClick={() => setView("workers")} className="back-btn">
              Back to Workers
            </button>
            <h2>Attendance: {currentSite.name}</h2>
            <AttendanceSheet
              site={currentSite}
              updateAttendance={updateAttendance}
            />
          </>
        )}
      </div>
    </div>
  );
}
