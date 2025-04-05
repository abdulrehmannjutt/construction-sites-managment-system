import React, { useState } from "react";

function WorkerForm({ addWorker }) {
  const [workerName, setWorkerName] = useState("");
  const [workerRole, setWorkerRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!workerName.trim()) return;

    addWorker({
      name: workerName,
      role: workerRole,
    });

    setWorkerName("");
    setWorkerRole("");
  };

  return (
    <div className="form-container">
      <h3>Add New Worker</h3>
      <form onSubmit={handleSubmit} className="worker-form">
        <div className="form-group">
          <label>Worker Name:</label>
          <input
            type="text"
            value={workerName}
            onChange={(e) => setWorkerName(e.target.value)}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            value={workerRole}
            onChange={(e) => setWorkerRole(e.target.value)}
            placeholder="e.g., Mason, Carpenter"
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Worker
        </button>
      </form>
    </div>
  );
}

export default WorkerForm;
